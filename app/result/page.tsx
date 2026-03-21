"use client";

import { useEffect, useState } from "react";

type ResultData = {
  score: number;
  total: number;
  time: number;
};

export default function ResultPage() {
  const [result, setResult] = useState<ResultData | null>(null);

  useEffect(() => {
    const accessGranted = localStorage.getItem("access_granted");
    const savedResult = localStorage.getItem("result");

    if (accessGranted !== "true") {
      window.location.href = "/";
      return;
    }

    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f2f2f2] via-[#cccccc] to-[#a5a5a5] px-6 py-10">
      <div className="w-full max-w-2xl rounded-[36px] border border-[#cccccc] bg-[#f2f2f2]/95 p-10 text-center shadow-[0_20px_60px_rgba(127,127,127,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(127,127,127,0.22)]">
        <div className="mb-8">
          <p className="mb-3 inline-block rounded-full border border-[#cccccc] bg-white px-4 py-2 text-sm font-semibold text-[#7f7f7f] shadow-sm">
            Hoàn thành
          </p>
          <h1 className="text-4xl font-extrabold text-[#7f7f7f]">
            Kết quả của bạn
          </h1>
        </div>

        {result ? (
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#cccccc] bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-[#7f7f7f]">
                Bạn đúng {result.score}/{result.total}
              </p>
            </div>

            <div className="rounded-3xl border border-[#cccccc] bg-[#f2f2f2] p-6 shadow-sm">
              <p className="text-2xl font-bold text-[#7f7f7f]">
                Thời gian hoàn thành: {result.time}s
              </p>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("access_granted");
                localStorage.removeItem("player");
                localStorage.removeItem("result");
                window.location.href = "/";
              }}
              className="inline-block rounded-2xl bg-[#7f7f7f] px-8 py-4 text-xl font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#6f6f6f] hover:shadow-xl"
            >
              Về trang đầu
            </button>
          </div>
        ) : (
          <p className="text-lg text-[#7f7f7f]">Không có dữ liệu kết quả.</p>
        )}
      </div>
    </main>
  );
}