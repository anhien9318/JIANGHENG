"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CrosswordGrid from "@/components/CrosswordGrid";
import CluesPanel from "@/components/CluesPanel";
import { grid, acrossClues, downClues } from "@/data/crossword";

function createEmptyGrid() {
  return grid.map((row) => row.map((cell) => (cell === "#" ? "#" : "")));
}

type Direction = "across" | "down";
type ActiveCell = { row: number; col: number } | null;

function isBlocked(row: number, col: number) {
  return !grid[row] || grid[row][col] === "#";
}

function isAcrossStart(row: number, col: number) {
  if (isBlocked(row, col)) return false;
  const leftBlocked = col === 0 || grid[row][col - 1] === "#";
  const rightOpen = col + 1 < grid[row].length && grid[row][col + 1] !== "#";
  return leftBlocked && rightOpen;
}

function isDownStart(row: number, col: number) {
  if (isBlocked(row, col)) return false;
  const topBlocked = row === 0 || grid[row - 1][col] === "#";
  const bottomOpen = row + 1 < grid.length && grid[row + 1][col] !== "#";
  return topBlocked && bottomOpen;
}

function buildWordMaps() {
  const acrossStarts: { row: number; col: number }[] = [];
  const downStarts: { row: number; col: number }[] = [];

  const acrossIndexMap = new Map<string, number>();
  const downIndexMap = new Map<string, number>();
  const cellNumberMap = new Map<string, number>();

  let clueNumber = 1;
  let acrossIndex = 0;
  let downIndex = 0;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === "#") continue;

      const acrossStart = isAcrossStart(r, c);
      const downStart = isDownStart(r, c);

      if (acrossStart || downStart) {
        cellNumberMap.set(`${r}-${c}`, clueNumber);
      }

      if (acrossStart) {
        acrossStarts.push({ row: r, col: c });

        let cc = c;
        while (cc < grid[r].length && grid[r][cc] !== "#") {
          acrossIndexMap.set(`${r}-${cc}`, acrossIndex);
          cc++;
        }

        acrossIndex++;
      }

      if (downStart) {
        downStarts.push({ row: r, col: c });

        let rr = r;
        while (rr < grid.length && grid[rr][c] !== "#") {
          downIndexMap.set(`${rr}-${c}`, downIndex);
          rr++;
        }

        downIndex++;
      }

      if (acrossStart || downStart) {
        clueNumber++;
      }
    }
  }

  return {
    acrossStarts,
    downStarts,
    acrossIndexMap,
    downIndexMap,
    cellNumberMap,
  };
}

export default function GamePage() {
  const router = useRouter();
  const [time, setTime] = useState(0);
  const [values, setValues] = useState<string[][]>(createEmptyGrid());
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeCell, setActiveCell] = useState<ActiveCell>(null);
  const [direction, setDirection] = useState<Direction>("across");

  const { acrossIndexMap, downIndexMap, cellNumberMap } = useMemo(
    () => buildWordMaps(),
    []
  );

  const activeAcrossIndex = activeCell
    ? acrossIndexMap.get(`${activeCell.row}-${activeCell.col}`) ?? null
    : null;

  const activeDownIndex = activeCell
    ? downIndexMap.get(`${activeCell.row}-${activeCell.col}`) ?? null
    : null;

  useEffect(() => {
    const accessGranted = localStorage.getItem("access_granted");
    const player = localStorage.getItem("player");

    if (accessGranted !== "true") {
      window.location.href = "/";
      return;
    }

    if (!player) {
      window.location.href = "/register";
      return;
    }

    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  async function handleSubmit() {
    let score = 0;
    let total = 0;

    setSubmitted(true);
    setLoading(true);

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] !== "#") {
          total++;
          if (values[r][c].toUpperCase() === grid[r][c].toUpperCase()) {
            score++;
          }
        }
      }
    }

    const currentPlayer = JSON.parse(localStorage.getItem("player") || "{}");

    const resultPayload = {
      facebookName: currentPlayer.facebookName || "",
      facebookLink: currentPlayer.facebookLink || "",
      receiverName: currentPlayer.receiverName || "",
      phone: currentPlayer.phone || "",
      address: currentPlayer.address || "",
      score,
      total,
      time,
    };

    localStorage.setItem("result", JSON.stringify(resultPayload));

    try {
      const res = await fetch("/api/save-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Không thể lưu kết quả");
        setLoading(false);
        return;
      }

      router.push("/result");
    } catch (error) {
      console.error("Submit error:", error);
      alert("Lỗi kết nối khi lưu kết quả");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f2f2f2] via-[#cccccc] to-[#a5a5a5] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-[1500px] rounded-[28px] border border-[#cccccc] bg-[#f2f2f2]/95 p-4 shadow-[0_20px_60px_rgba(127,127,127,0.18)] backdrop-blur-xl sm:rounded-[32px] sm:p-6 lg:rounded-[40px] lg:p-10">
        <div className="mb-6 flex flex-col gap-4 lg:mb-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 inline-block rounded-full border border-[#cccccc] bg-white px-4 py-2 text-xs font-semibold text-[#7f7f7f] shadow-sm sm:text-sm">
              Changhenngaygap
            </p>
            <h1 className="text-2xl font-extrabold tracking-tight text-[#7f7f7f] sm:text-3xl lg:text-5xl">
              Ô chữ Giang Hành
            </h1>
            <p className="mt-2 text-sm text-[#7f7f7f] sm:text-base">
              Chạm vào ô để chọn từ. Trên điện thoại có thể vuốt ngang nếu ô chữ rộng.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-2xl border border-[#cccccc] bg-white px-4 py-3 text-sm font-semibold text-[#7f7f7f] shadow-sm">
              Đang chọn:{" "}
              <span className="text-black">
                {direction === "across" ? "Hàng ngang" : "Hàng dọc"}
              </span>
            </div>

            <div className="rounded-2xl bg-[#7f7f7f] px-5 py-3 text-lg font-extrabold text-white shadow-lg sm:px-6 sm:text-xl lg:px-8 lg:py-4 lg:text-2xl">
              ⏱ {time}s
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:gap-8">
          <div className="min-w-0 flex-1 rounded-[24px] border border-[#cccccc] bg-white/70 p-3 shadow-sm sm:p-4 lg:min-h-[720px] lg:p-6">
            <CrosswordGrid
              grid={grid}
              values={values}
              setValues={setValues}
              submitted={submitted}
              activeCell={activeCell}
              setActiveCell={setActiveCell}
              direction={direction}
              setDirection={setDirection}
              activeAcrossIndex={activeAcrossIndex}
              activeDownIndex={activeDownIndex}
              cellNumberMap={cellNumberMap}
              acrossIndexMap={acrossIndexMap}
              downIndexMap={downIndexMap}
            />
          </div>

          <div className="w-full xl:w-[420px] xl:shrink-0">
            <CluesPanel
              across={acrossClues}
              down={downClues}
              activeAcrossIndex={activeAcrossIndex}
              activeDownIndex={activeDownIndex}
              direction={direction}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center lg:mt-10">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-2xl bg-[#7f7f7f] px-6 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-[#6f6f6f] hover:shadow-xl disabled:opacity-50 sm:w-auto sm:px-10 sm:text-xl"
          >
            {loading ? "Đang lưu..." : "Nộp bài"}
          </button>
        </div>
      </div>
    </main>
  );
}