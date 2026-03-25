"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [facebookName, setFacebookName] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const accessGranted = localStorage.getItem("access_granted");

    if (accessGranted !== "true") {
      router.push("/");
    }
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !facebookName ||
      !facebookLink ||
      !receiverName ||
      !phone ||
      !address
    ) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const newPlayer = {
      facebookName,
      facebookLink,
      receiverName,
      phone,
      address,
    };

    localStorage.setItem("player", JSON.stringify(newPlayer));
    router.push("/game");
  }

  return (
    <main
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-6 py-10"
      style={{
        backgroundImage: "url('/1.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-[#245501]/28 backdrop-blur-[3px]" />

      <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-[#f0ead2]/30 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-52 w-52 rounded-full bg-[#aad576]/25 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-[#dde5b6]/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-2xl rounded-[36px] border border-[#f0ead2]/70 bg-white/78 p-8 shadow-[0_20px_70px_rgba(36,85,1,0.22)] backdrop-blur-xl md:p-10">
        <div className="mb-8 text-center">
          <p className="mb-3 inline-block rounded-full border border-[#dde5b6] bg-[#f0ead2]/95 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#538d22] shadow-sm">
            changhenngaygap
          </p>

          <h1 className="text-3xl font-extrabold text-[#245501] md:text-4xl">
            Thông tin người chơi
          </h1>

          <p className="mt-3 text-sm text-[#538d22] md:text-base">
            Vui lòng nhập đầy đủ thông tin để vào trò chơi
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            className="w-full rounded-2xl border border-[#dde5b6] bg-[#fdfcf6] px-5 py-4 text-base text-[#245501] placeholder:text-[#adc178] outline-none transition duration-300 focus:-translate-y-0.5 focus:border-[#73a942] focus:bg-white focus:ring-4 focus:ring-[#dde5b6] md:text-lg"
            placeholder="Tên Facebook"
            value={facebookName}
            onChange={(e) => setFacebookName(e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-[#dde5b6] bg-[#fdfcf6] px-5 py-4 text-base text-[#245501] placeholder:text-[#adc178] outline-none transition duration-300 focus:-translate-y-0.5 focus:border-[#73a942] focus:bg-white focus:ring-4 focus:ring-[#dde5b6] md:text-lg"
            placeholder="Link Facebook"
            value={facebookLink}
            onChange={(e) => setFacebookLink(e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-[#dde5b6] bg-[#fdfcf6] px-5 py-4 text-base text-[#245501] placeholder:text-[#adc178] outline-none transition duration-300 focus:-translate-y-0.5 focus:border-[#73a942] focus:bg-white focus:ring-4 focus:ring-[#dde5b6] md:text-lg"
            placeholder="Tên người nhận hàng"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-[#dde5b6] bg-[#fdfcf6] px-5 py-4 text-base text-[#245501] placeholder:text-[#adc178] outline-none transition duration-300 focus:-translate-y-0.5 focus:border-[#73a942] focus:bg-white focus:ring-4 focus:ring-[#dde5b6] md:text-lg"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            className="w-full rounded-2xl border border-[#dde5b6] bg-[#fdfcf6] px-5 py-4 text-base text-[#245501] placeholder:text-[#adc178] outline-none transition duration-300 focus:-translate-y-0.5 focus:border-[#73a942] focus:bg-white focus:ring-4 focus:ring-[#dde5b6] md:text-lg"
            placeholder="Địa chỉ giao hàng"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={4}
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-[#73a942] to-[#538d22] px-6 py-4 text-lg font-bold text-white shadow-[0_10px_30px_rgba(83,141,34,0.35)] transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_16px_40px_rgba(83,141,34,0.4)] active:scale-[0.99] md:text-xl"
          >
            Vào trò chơi
          </button>
        </form>
      </div>
    </main>
  );
}