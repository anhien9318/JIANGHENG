"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const ACCESS_CODE = "xwjlqllaubo";

type FlowerItem = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  rotateStart: number;
  rotateEnd: number;
  opacity: number;
};

export default function AccessPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [showFlowerRain, setShowFlowerRain] = useState(false);
  const [shake, setShake] = useState(false);

  const flowers = useMemo<FlowerItem[]>(() => {
    const count = 28;

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 3.8 + Math.random() * 2,
      size: 55 + Math.random() * 55,
      drift: -50 + Math.random() * 100,
      rotateStart: -25 + Math.random() * 50,
      rotateEnd: -120 + Math.random() * 240,
      opacity: 0.75 + Math.random() * 0.25,
    }));
  }, [showFlowerRain]);

  function triggerFlowerRain() {
    setShowFlowerRain(false);

    setTimeout(() => {
      setShowFlowerRain(true);

      setTimeout(() => {
        setShowFlowerRain(false);
      }, 5200);
    }, 50);
  }

  function triggerShake() {
    setShake(false);

    setTimeout(() => {
      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 500);
    }, 10);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (code.trim() === ACCESS_CODE) {
      localStorage.setItem("access_granted", "true");
      router.push("/register");
      return;
    }

    setError("Mã truy cập không đúng");
    triggerFlowerRain();
    triggerShake();
  }

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#f0ead2] via-[#dde5b6] to-[#adc178] px-6 py-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#f0ead2]/70 blur-3xl" />
        <div className="absolute top-1/4 -right-16 h-80 w-80 rounded-full bg-[#dde5b6]/60 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#aad576]/35 blur-3xl" />
      </div>

      {showFlowerRain && (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
          {flowers.map((flower) => (
            <div
              key={flower.id}
              className="flower-wrap"
              style={
                {
                  left: `${flower.left}%`,
                  animationDelay: `${flower.delay}s`,
                  animationDuration: `${flower.duration}s`,
                  width: `${flower.size}px`,
                  opacity: flower.opacity,
                  "--drift": `${flower.drift}px`,
                  "--rotate-start": `${flower.rotateStart}deg`,
                  "--rotate-end": `${flower.rotateEnd}deg`,
                } as React.CSSProperties
              }
            >
              <img src="/flower.png" alt="flower" className="flower-img" />
            </div>
          ))}
        </div>
      )}

      <div
        className={`relative z-10 w-full max-w-xl rounded-[36px] border border-[#dde5b6] bg-white/78 p-10 shadow-[0_20px_60px_rgba(83,61,34,0.14)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(83,61,34,0.18)] ${
          shake ? "animate-shake" : ""
        }`}
      >
        <div className="mb-8 text-center">
          <p className="mb-3 inline-block rounded-full border border-[#dde5b6] bg-[#f0ead2] px-4 py-2 text-sm font-semibold tracking-wide text-[#538d22] shadow-sm">
            changhenngaygap
          </p>

          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-[#245501]">
            Nhập mã truy cập
          </h1>

          <p className="text-base sm:text-lg text-[#6b7d3f]">
            Vui lòng nhập mã để vào trang đăng ký chơi game
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>

            <input
              className="w-full rounded-2xl border border-[#dde5b6] bg-[#fdfcf6] px-5 py-4 text-lg font-medium text-[#245501] placeholder:text-[#aad576] outline-none transition duration-200 focus:border-[#73a942] focus:ring-4 focus:ring-[#dde5b6]"
              placeholder="Nhập mã truy cập"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-[#aad576] bg-[#fff8ef] px-4 py-3 text-[#a85632] shadow-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-[#73a942] to-[#538d22] px-6 py-4 text-xl font-bold text-white shadow-[0_12px_24px_rgba(83,141,34,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(83,141,34,0.35)] active:translate-y-0"
          >
            Tiếp tục
          </button>
        </form>
      </div>

      <style jsx>{`
        .flower-wrap {
          position: absolute;
          top: -140px;
          animation: flowerFall linear forwards;
          will-change: transform, opacity;
        }

        .flower-img {
          display: block;
          width: 100%;
          height: auto;
          pointer-events: none;
          user-select: none;
          object-fit: contain;
          filter: drop-shadow(0 8px 18px rgba(83, 61, 34, 0.16));
        }

        @keyframes flowerFall {
          0% {
            transform: translate3d(0, 0, 0) rotate(var(--rotate-start)) scale(0.9);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          25% {
            transform: translate3d(calc(var(--drift) * 0.35), 25vh, 0)
              rotate(calc((var(--rotate-start) + var(--rotate-end)) / 3))
              scale(0.96);
          }
          50% {
            transform: translate3d(calc(var(--drift) * 0.7), 55vh, 0)
              rotate(calc((var(--rotate-start) + var(--rotate-end)) / 1.8))
              scale(1);
            opacity: 1;
          }
          75% {
            transform: translate3d(calc(var(--drift) * 0.9), 85vh, 0)
              rotate(calc((var(--rotate-start) + var(--rotate-end)) / 1.2))
              scale(1.04);
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--drift), 120vh, 0)
              rotate(var(--rotate-end)) scale(1.08);
            opacity: 0.95;
          }
        }

        .animate-shake {
          animation: shake 0.45s ease;
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-6px);
          }
          40% {
            transform: translateX(6px);
          }
          60% {
            transform: translateX(-4px);
          }
          80% {
            transform: translateX(4px);
          }
        }

        @media (max-width: 640px) {
          .flower-wrap {
            top: -110px;
          }
        }
      `}</style>
    </main>
  );
}