"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CrosswordGrid from "@/components/CrosswordGrid";
import CluesPanel from "@/components/CluesPanel";
import {
  acrossClues,
  downClues,
  allClues,
  type CrosswordClue,
  type Direction,
  grid,
} from "@/data/crossword";

function createEmptyUserGrid() {
  return grid.map((row) => row.map((cell) => (cell === "#" ? "#" : "")));
}

function getWordFromUserGrid(
  userGrid: string[][],
  clue: CrosswordClue
): string {
  return clue.answer
    .split("")
    .map((_, index) => {
      const row = clue.direction === "across" ? clue.row : clue.row + index;
      const col = clue.direction === "across" ? clue.col + index : clue.col;
      return userGrid[row][col] || "";
    })
    .join("");
}

export default function GamePage() {
  const router = useRouter();
  const [userGrid, setUserGrid] = useState<string[][]>(createEmptyUserGrid);
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(
    null
  );
  const [direction, setDirection] = useState<Direction>("across");
  const [activeClue, setActiveClue] = useState<CrosswordClue | null>(acrossClues[0]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const player = localStorage.getItem("player");
    if (!player) {
      router.push("/register");
    }
  }, [router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (activeClue) {
      setDirection(activeClue.direction);
      setActiveCell({ row: activeClue.row, col: activeClue.col });
    }
  }, [activeClue]);

  const currentAnswerPreview = useMemo(() => {
    if (!activeClue) return "";
    return getWordFromUserGrid(userGrid, activeClue);
  }, [userGrid, activeClue]);

  function formatTime(totalSeconds: number) {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  function handleSelectClue(clue: CrosswordClue) {
    setActiveClue(clue);
    setDirection(clue.direction);
    setActiveCell({ row: clue.row, col: clue.col });
  }

  function handleSubmit() {
    let score = 0;

    const detail = allClues.map((clue) => {
      const userAnswer = getWordFromUserGrid(userGrid, clue);
      const correct = userAnswer === clue.answer;

      if (correct) score += 1;

      return {
        number: clue.number,
        direction: clue.direction,
        clue: clue.text,
        userAnswer,
        correctAnswer: clue.answer,
        correct,
      };
    });

    localStorage.setItem(
      "result",
      JSON.stringify({
        score,
        total: allClues.length,
        time,
        detail,
      })
    );

    router.push("/result");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f0ead2] via-[#eef4d4] to-[#dde5b6] px-4 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 rounded-[28px] border border-[#dde5b6] bg-white/80 p-4 shadow-[0_12px_32px_rgba(36,85,1,0.08)] backdrop-blur sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 inline-flex rounded-full border border-[#dde5b6] bg-[#f0ead2] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#538d22] sm:text-sm">
                changhenngaygap
              </div>
              <h1 className="text-2xl font-extrabold text-[#245501] sm:text-3xl">
                Thi học giữa học kì II
              </h1>
              <p className="mt-1 text-sm text-[#538d22] sm:text-base">
                Chạm vào ô hoặc chọn câu hỏi để điền đáp án
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-[#dde5b6] bg-[#fdfcf7] px-4 py-3 text-sm font-bold text-[#245501]">
                ⏱ {formatTime(time)}
              </div>

              <button
                type="button"
                onClick={() =>
                  setDirection((prev) => (prev === "across" ? "down" : "across"))
                }
                className="rounded-2xl border border-[#cfe19a] bg-[#f3f9e4] px-4 py-3 text-sm font-bold text-[#538d22] transition hover:-translate-y-0.5"
              >
                Đổi hướng: {direction === "across" ? "Ngang" : "Dọc"}
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-2xl bg-gradient-to-r from-[#73a942] to-[#538d22] px-5 py-3 text-sm font-extrabold text-white shadow-[0_10px_26px_rgba(83,141,34,0.28)] transition hover:-translate-y-0.5"
              >
                Nộp bài
              </button>
            </div>
          </div>
        </div>

        {activeClue && (
          <div className="sticky top-3 z-20 mb-5 rounded-[24px] border border-[#cfe19a] bg-[#f8fbef]/95 p-4 shadow-[0_12px_24px_rgba(36,85,1,0.07)] backdrop-blur">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#73a942] px-3 py-1 text-xs font-bold text-white">
                {activeClue.direction === "across" ? "Hàng ngang" : "Hàng dọc"}
              </span>
              <span className="rounded-full bg-[#f0ead2] px-3 py-1 text-xs font-bold text-[#538d22]">
                Câu {activeClue.number}
              </span>
            </div>

            <div className="text-base font-bold text-[#245501] sm:text-lg">
              {activeClue.text}
            </div>

            <div className="mt-2 text-sm text-[#5f7833]">
              Đang nhập:{" "}
              <span className="font-extrabold tracking-[0.2em] text-[#538d22]">
                {currentAnswerPreview || "________"}
              </span>
            </div>
          </div>
        )}

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="overflow-hidden rounded-[30px] border border-[#dde5b6] bg-white/55 p-3 shadow-[0_10px_30px_rgba(36,85,1,0.08)] backdrop-blur sm:p-5">
            <div className="overflow-x-auto">
              <CrosswordGrid
                grid={grid}
                userGrid={userGrid}
                setUserGrid={setUserGrid}
                activeCell={activeCell}
                setActiveCell={setActiveCell}
                direction={direction}
                setDirection={setDirection}
                activeClue={activeClue}
                setActiveClue={setActiveClue}
              />
            </div>
          </div>

          <div className="space-y-5">
            <CluesPanel
              title="Hàng ngang"
              clues={acrossClues}
              activeClueNumber={activeClue?.number ?? null}
              onSelectClue={handleSelectClue}
            />

            <CluesPanel
              title="Hàng dọc"
              clues={downClues}
              activeClueNumber={activeClue?.number ?? null}
              onSelectClue={handleSelectClue}
            />
          </div>
        </div>
      </div>
    </main>
  );
}