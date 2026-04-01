"use client";

import { useEffect, useRef, useState } from "react";

type ResultData = {
  score: number;
  total: number;
  time: number;
};

type PlayerData = {
  facebookName: string;
  facebookLink: string;
  receiverName: string;
  phone: string;
  address: string;
};

type SaveResponse = {
  success?: boolean;
  alreadyExists?: boolean;
  message?: string;
  error?: string;
};

export default function ResultPage() {
  const [result, setResult] = useState<ResultData | null>(null);
  const [savedToDb, setSavedToDb] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const savingRef = useRef(false);

  useEffect(() => {
    const accessGranted = localStorage.getItem("access_granted");
    const savedResult = localStorage.getItem("result");
    const savedPlayer = localStorage.getItem("player");

    if (accessGranted !== "true") {
      window.location.href = "/";
      return;
    }

    if (!savedResult) return;

    const parsedResult: ResultData = JSON.parse(savedResult);
    setResult(parsedResult);

    if (!savedPlayer) return;

    const parsedPlayer: PlayerData = JSON.parse(savedPlayer);

    const alreadySaved = sessionStorage.getItem("result_saved");

    if (alreadySaved === "true" || savingRef.current) {
      setSavedToDb(true);
      return;
    }

    async function saveResult() {
      try {
        setSaveError("");
        setSaveMessage("");
        savingRef.current = true;

        // chặn gọi lặp trong dev mode
        sessionStorage.setItem("result_saved", "true");

        const res = await fetch("/api/save-result", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            facebookName: parsedPlayer.facebookName,
            facebookLink: parsedPlayer.facebookLink,
            receiverName: parsedPlayer.receiverName,
            phone: parsedPlayer.phone,
            address: parsedPlayer.address,
            score: parsedResult.score,
            total: parsedResult.total,
            time: parsedResult.time,
          }),
        });

        const text = await res.text();

        let data: SaveResponse = {};
        try {
          data = text ? JSON.parse(text) : {};
        } catch {
          data = {};
        }

        if (!res.ok) {
          console.error("Save result failed:", {
            status: res.status,
            statusText: res.statusText,
            data,
          });

          sessionStorage.removeItem("result_saved");
          savingRef.current = false;
          setSaveError(data.error || "Lưu kết quả thất bại.");
          return;
        }

        setSavedToDb(true);

        if (data.alreadyExists) {
          setSaveMessage("Thi lại mấy lần rồi?");
        } else {
          setSaveMessage("Đã lưu kết quả thành công.");
        }
      } catch (error) {
        console.error("Save result error:", error);
        sessionStorage.removeItem("result_saved");
        savingRef.current = false;
        setSaveError("Có lỗi khi lưu kết quả.");
      }
    }

    saveResult();
  }, []);

  function formatTime(seconds: number) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#f0ead2] via-[#dde5b6] to-[#adc178] px-6 py-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#f0ead2]/60 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-[#dde5b6]/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#aad576]/35 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-2xl rounded-[36px] border border-[#dde5b6] bg-white/85 p-10 text-center shadow-[0_20px_60px_rgba(36,85,1,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(36,85,1,0.16)]">
        <div className="mb-8">
          <p className="mb-3 inline-block rounded-full border border-[#dde5b6] bg-[#f0ead2] px-4 py-2 text-sm font-semibold text-[#538d22] shadow-sm">
            Hoàn thành
          </p>

          <h1 className="text-4xl font-extrabold text-[#245501]">
            Kết quả của bạn
          </h1>

          <p className="mt-3 text-base text-[#538d22]">
            Cảm ơn bạn đã tham gia trò chơi
          </p>
        </div>

        {result ? (
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#dde5b6] bg-[#fffef8] p-7 shadow-sm">
              <p className="text-3xl font-bold text-[#245501]">
                yah~ xong rồi đó
              </p>
            </div>

            <div className="rounded-3xl border border-[#cfe19a] bg-[#f6faea] p-6 shadow-sm">
              <p className="text-xl font-semibold text-[#538d22]">
                Thời gian hoàn thành
              </p>
              <p className="mt-2 text-3xl font-extrabold text-[#245501]">
                {formatTime(result.time)}
              </p>
            </div>

            <p className="text-sm text-[#538d22]">
              {saveError
                ? saveError
                : saveMessage
                ? saveMessage
                : "Đang lưu kết quả..."}
            </p>

            <button
              onClick={() => {
                localStorage.removeItem("access_granted");
                localStorage.removeItem("player");
                localStorage.removeItem("result");
                sessionStorage.removeItem("result_saved");
                window.location.href = "/";
              }}
              className="inline-block rounded-2xl bg-gradient-to-r from-[#73a942] to-[#538d22] px-8 py-4 text-xl font-bold text-white shadow-[0_12px_24px_rgba(83,141,34,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(83,141,34,0.35)]"
            >
              Về trang đầu
            </button>
          </div>
        ) : (
          <p className="text-lg text-[#245501]">Không có dữ liệu kết quả.</p>
        )}
      </div>
    </main>
  );
}