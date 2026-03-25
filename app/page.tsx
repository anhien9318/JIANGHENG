"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const ACCESS_CODE = "hanhan99";

type FlowerItem = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
};

type CarrotItem = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
};

export default function AccessPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [showFlowerRain, setShowFlowerRain] = useState(false);
  const [shake, setShake] = useState(false);

  const [isUnlocking, setIsUnlocking] = useState(false);
  const [progress, setProgress] = useState(0);

  const flowers = useMemo<FlowerItem[]>(() => {
    const count = 12;

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: 5 + i * (90 / count) + (Math.random() * 3 - 1.5),
      delay: Math.random() * 1.4,
      duration: 3.4 + Math.random() * 1.2,
      size: 85 + Math.random() * 25,
    }));
  }, [showFlowerRain]);

  const carrots = useMemo<CarrotItem[]>(() => {
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.2,
      duration: 2.8 + Math.random() * 1.8,
      size: 34 + Math.random() * 26,
      rotate: -25 + Math.random() * 50,
    }));
  }, [isUnlocking]);

  function triggerFlowerRain() {
    setShowFlowerRain(false);

    setTimeout(() => {
      setShowFlowerRain(true);

      setTimeout(() => {
        setShowFlowerRain(false);
      }, 4200);
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

  function startUnlockAnimation() {
    setIsUnlocking(true);
    setProgress(0);

    const totalDuration = 2600;
    const intervalTime = 35;
    const step = 100 / (totalDuration / intervalTime);

    let current = 0;

    const timer = setInterval(() => {
      current += step;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(timer);

        localStorage.setItem("access_granted", "true");

        setTimeout(() => {
          router.push("/register");
        }, 250);

        return;
      }

      setProgress(current);
    }, intervalTime);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isUnlocking) return;

    if (code.trim() === ACCESS_CODE) {
      setError("");
      startUnlockAnimation();
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
              style={{
                left: `${flower.left}%`,
                animationDelay: `${flower.delay}s`,
                animationDuration: `${flower.duration}s`,
                width: `${flower.size}px`,
              }}
            >
              <img src="/flower.gif" alt="flower" className="flower-img" />
            </div>
          ))}
        </div>
      )}

      <div
        className={`relative z-10 w-full max-w-xl rounded-[36px] border border-[#dde5b6] bg-white/78 p-10 shadow-[0_20px_60px_rgba(83,61,34,0.14)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(83,61,34,0.18)] ${
          shake ? "animate-shake" : ""
        } ${isUnlocking ? "pointer-events-none blur-[2px] scale-[0.985]" : ""}`}
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
            <label className="mb-2 block text-sm font-semibold text-[#538d22]">
              Mã truy cập
            </label>

            <input
              className="w-full rounded-2xl border border-[#dde5b6] bg-[#fdfcf6] px-5 py-4 text-lg font-medium text-[#245501] placeholder:text-[#aad576] outline-none transition duration-200 focus:border-[#73a942] focus:ring-4 focus:ring-[#dde5b6]"
              placeholder="Nhập mã truy cập"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
              disabled={isUnlocking}
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-[#aad576] bg-[#fff8ef] px-4 py-3 text-[#a85632] shadow-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isUnlocking}
            className="w-full rounded-2xl bg-gradient-to-r from-[#73a942] to-[#538d22] px-6 py-4 text-xl font-bold text-white shadow-[0_12px_24px_rgba(83,141,34,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(83,141,34,0.35)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-80"
          >
            {isUnlocking ? "Đang mở..." : "Tiếp tục"}
          </button>
        </form>
      </div>

      {isUnlocking && (
        <div className="fixed inset-0 z-[10000] overflow-hidden bg-[#245501]/38 backdrop-blur-lg">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#aad576]/20 blur-3xl" />
          </div>

          {/* carrot rain */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden z-[1]">
            {carrots.map((carrot) => (
              <div
                key={carrot.id}
                className="carrot-wrap"
                style={{
                  left: `${carrot.left}%`,
                  animationDelay: `${carrot.delay}s`,
                  animationDuration: `${carrot.duration}s`,
                  width: `${carrot.size}px`,
                  transform: `rotate(${carrot.rotate}deg)`,
                }}
              >
                <img src="/carrot.png" alt="carrot" className="carrot-img" />
              </div>
            ))}
          </div>

          <div className="relative z-[2] flex min-h-screen flex-col items-center justify-center px-6 -translate-y-6">
            <p className="mb-3 text-sm font-semibold tracking-[0.35em] text-white/80">
              UNLOCKING
            </p>

            <h2 className="unlock-title mt-15 mb-10 text-center text-xl font-extrabold text-white sm:text-3xl">
              Lâm Lâm bé iu tới liền!!!
            </h2>

            <div className="relative w-[95vw] max-w-[1400px] h-[360px] sm:h-[420px]">
              {/* track */}
              <div className="absolute left-[4%] right-[4%] top-1/2 h-8 -translate-y-1/2 rounded-full bg-white/20 shadow-inner overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#c7ea8e] via-[#8fcf49] to-[#538d22] transition-all duration-200 unlock-progress-glow"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* rabbit */}
              <div
                className="absolute top-1/2 -translate-y-[52%] rabbit-bounce"
                style={{
                  left: "calc(98% - 300px)",
                }}
              >
                <img
                  src="/3.png"
                  alt="rabbit"
                  className={`w-[480px] sm:w-[560px] object-contain drop-shadow-2xl ${
                    progress >= 80 ? "rabbit-scared" : ""
                  }`}
                />
              </div>

              {/* wolf */}
              <div
                className="absolute top-1/2 transition-all duration-200"
                style={{
                  left:
                    progress >= 96
                      ? "calc(98% - 520px)"
                      : `calc(4% + ${progress * 0.90}%)`,
                  transform:
                    progress >= 96
                      ? "translate(0, -42%)"
                      : "translate(-50%, -42%)",
                }}
              >
                <img
                  src="/2.png"
                  alt="wolf"
                  className={`w-[300px] sm:w-[360px] object-contain drop-shadow-2xl ${
                    progress < 96 ? "wolf-run" : "wolf-stop"
                  }`}
                />
              </div>

              {/* sparkle */}
              {progress >= 85 && (
                <div className="absolute right-[5.5%] top-[34%] pointer-events-none">
                  <div className="sparkle sparkle-1">✨</div>
                  <div className="sparkle sparkle-2">✨</div>
                  <div className="sparkle sparkle-3">✨</div>
                </div>
              )}
            </div>

            <div className="mt-[-18px] text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-md">
                {Math.round(progress)}%
              </p>
              <p className="mt-1 text-sm sm:text-base font-medium text-white/85">
                Chuẩn bị chuyển sang trang đăng ký
              </p>
            </div>

            {progress >= 100 && (
              <div className="pointer-events-none fixed inset-0 z-[10001] overflow-hidden">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span
                    key={i}
                    className="final-flower"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 0.8}s`,
                      animationDuration: `${2.8 + Math.random() * 1.5}s`,
                    }}
                  >
                    🌸
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

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

        .carrot-wrap {
          position: absolute;
          top: -120px;
          animation: carrotFall linear infinite;
          will-change: transform, opacity;
          opacity: 0.95;
        }

        .carrot-img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          user-select: none;
          pointer-events: none;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
        }

        @keyframes flowerFall {
          0% {
            transform: translateY(0) translateX(0) scale(0.92) rotate(0deg);
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          50% {
            transform: translateY(55vh) translateX(-12px) scale(1) rotate(8deg);
            opacity: 1;
          }
          100% {
            transform: translateY(120vh) translateX(12px) scale(1.04)
              rotate(-8deg);
            opacity: 1;
          }
        }

        @keyframes carrotFall {
          0% {
            transform: translateY(-10vh) translateX(0) rotate(-8deg) scale(0.95);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateY(45vh) translateX(-12px) rotate(8deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(115vh) translateX(14px) rotate(18deg)
              scale(1.05);
            opacity: 1;
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

        .unlock-title {
          animation: titleFloat 1.8s ease-in-out infinite;
        }

        .unlock-progress-glow {
          box-shadow: 0 0 18px rgba(170, 213, 118, 0.55);
        }

        .wolf-run {
          animation: wolfBounce 0.7s ease-in-out infinite;
        }

        .wolf-stop {
          animation: wolfIdle 1.2s ease-in-out infinite;
        }

        .rabbit-bounce img {
          animation: rabbitIdle 1.6s ease-in-out infinite;
        }

        .rabbit-scared {
          animation: rabbitScared 0.22s linear infinite;
        }

        .sparkle {
          position: absolute;
          font-size: 26px;
          animation: sparklePop 1s ease-in-out infinite;
        }

        .sparkle-1 {
          left: 0;
          top: 0;
        }

        .sparkle-2 {
          left: 34px;
          top: 18px;
          animation-delay: 0.2s;
        }

        .sparkle-3 {
          left: 70px;
          top: -8px;
          animation-delay: 0.4s;
        }

        .final-flower {
          position: absolute;
          top: -10%;
          font-size: 34px;
          animation: finalFlowerFall linear forwards;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
        }

        @keyframes wolfBounce {
          0%,
          100% {
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(-12px) rotate(2deg);
          }
        }

        @keyframes wolfIdle {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-4px) rotate(1deg);
          }
        }

        @keyframes rabbitIdle {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-6px) rotate(-2deg);
          }
        }

        @keyframes rabbitScared {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(-2px, -2px) rotate(-2deg);
          }
          50% {
            transform: translate(2px, 1px) rotate(2deg);
          }
          75% {
            transform: translate(-1px, 2px) rotate(-1deg);
          }
        }

        @keyframes sparklePop {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(0.8) translateY(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.15) translateY(-8px);
          }
        }

        @keyframes titleFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes finalFlowerFall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(240deg);
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}