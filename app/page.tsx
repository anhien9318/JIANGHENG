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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f2f2f2] via-[#cccccc] to-[#a5a5a5] px-6 py-10">
      <div className="w-full max-w-xl rounded-[36px] border border-[#cccccc] bg-[#f2f2f2]/95 p-10 shadow-[0_20px_60px_rgba(127,127,127,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(127,127,127,0.22)]">
        
        <div className="mb-8 text-center">
          <p className="mb-3 inline-block rounded-full border border-[#cccccc] bg-white px-4 py-2 text-sm font-semibold text-[#7f7f7f] shadow-sm">
            changhenngaygap
          </p>

          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-[#7f7f7f]">
            Nhập mã truy cập
          </h1>

          <p className="text-lg text-[#7f7f7f]">
            Vui lòng nhập mã để vào trang đăng ký chơi game
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#7f7f7f]">
              Mã truy cập
            </label>

            <input
              className="w-full rounded-2xl border border-[#cccccc] bg-white px-5 py-4 text-lg font-medium text-[#7f7f7f] placeholder:text-[#a5a5a5] outline-none transition duration-200 focus:border-[#7f7f7f] focus:ring-4 focus:ring-[#cccccc]"
              placeholder="Nhập mã truy cập"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-[#cccccc] bg-[#f2f2f2] px-4 py-3 text-[#7f7f7f] shadow-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-[#7f7f7f] px-6 py-4 text-xl font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#6f6f6f] hover:shadow-xl active:translate-y-0"
          >
            Tiếp tục
          </button>
        </form>
      </div>
    </main>
  );
}