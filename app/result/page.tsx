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
    <main className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-2xl rounded-[36px] border border-white/70 bg-white/85 p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(0,0,0,0.10)]">
        <div className="mb-8">
          <p className="mb-3 inline-block rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm">
            Hoàn thành
          </p>
          <h1 className="text-4xl font-extrabold text-gray-800">
            Kết quả của bạn
          </h1>
        </div>

        {result ? (
          <div className="space-y-6">
            <div className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">
              <p className="text-3xl font-bold text-green-700">
                Bạn đúng {result.score}/{result.total}
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <p className="text-2xl font-bold text-gray-700">
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
              className="inline-block rounded-2xl bg-gray-700 px-8 py-4 text-xl font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl"
            >
              Về trang đầu
            </button>
          </div>
        ) : (
          <p className="text-lg text-gray-600">Không có dữ liệu kết quả.</p>
        )}
      </div>
    </main>
  );
}