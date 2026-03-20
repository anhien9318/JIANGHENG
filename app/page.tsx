"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ACCESS_CODE = "xwjlqllaubo";

export default function AccessPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (code.trim() === ACCESS_CODE) {
      localStorage.setItem("access_granted", "true");
      router.push("/register");
      return;
    }

    setError("Mã truy cập không đúng");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-xl rounded-[36px] border border-white/70 bg-white/85 p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(0,0,0,0.10)]">
        <div className="mb-8 text-center">
          <p className="mb-3 inline-block rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm">
            Minigame ô chữ
          </p>

          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-gray-800">
            Nhập mã truy cập
          </h1>

          <p className="text-lg text-gray-600">
            Vui lòng nhập mã để vào trang đăng ký chơi game
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Mã truy cập
            </label>
            <input
              className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-lg font-medium text-gray-800 placeholder:text-gray-400 outline-none transition duration-200 focus:border-gray-400 focus:ring-4 focus:ring-gray-100"
              placeholder="Nhập mã truy cập"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-600 shadow-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-gray-700 px-6 py-4 text-xl font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl active:translate-y-0"
          >
            Tiếp tục
          </button>
        </form>
      </div>
    </main>
  );
}