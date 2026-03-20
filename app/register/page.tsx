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
      className="relative min-h-screen flex items-center justify-center px-6 py-10 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/1.jpg')",
      }}
    >
      {/* lớp phủ tối để chữ dễ nhìn */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />

      {/* hiệu ứng ánh sáng nền */}
      <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-pink-400/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-52 w-52 rounded-full bg-purple-400/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-2xl rounded-[36px] border border-white/30 bg-white/18 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-10">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
            changhenngaygap
          </p>
          <h1 className="text-3xl font-extrabold text-white md:text-4xl">
            Thông tin người chơi
          </h1>
          <p className="mt-3 text-sm text-white/80 md:text-base">
            Vui lòng nhập đầy đủ thông tin để vào trò chơi
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            className="w-full rounded-2xl border border-white/20 bg-gray-100/95 px-5 py-4 text-base text-gray-800 placeholder:text-gray-500 outline-none transition duration-300 focus:-translate-y-0.5 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-200 md:text-lg"
            placeholder="Tên Facebook"
            value={facebookName}
            onChange={(e) => setFacebookName(e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-white/20 bg-gray-100/95 px-5 py-4 text-base text-gray-800 placeholder:text-gray-500 outline-none transition duration-300 focus:-translate-y-0.5 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-200 md:text-lg"
            placeholder="Link Facebook"
            value={facebookLink}
            onChange={(e) => setFacebookLink(e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-white/20 bg-gray-100/95 px-5 py-4 text-base text-gray-800 placeholder:text-gray-500 outline-none transition duration-300 focus:-translate-y-0.5 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-200 md:text-lg"
            placeholder="Tên người nhận hàng"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-white/20 bg-gray-100/95 px-5 py-4 text-base text-gray-800 placeholder:text-gray-500 outline-none transition duration-300 focus:-translate-y-0.5 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-200 md:text-lg"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            className="w-full rounded-2xl border border-white/20 bg-gray-100/95 px-5 py-4 text-base text-gray-800 placeholder:text-gray-500 outline-none transition duration-300 focus:-translate-y-0.5 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-200 md:text-lg"
            placeholder="Địa chỉ giao hàng"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={4}
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-gray-200 px-6 py-4 text-lg font-bold text-gray-800 shadow-[0_10px_30px_rgba(255,255,255,0.18)] transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:bg-gray-100 hover:shadow-[0_16px_40px_rgba(255,255,255,0.22)] active:scale-[0.99] md:text-xl"
          >
            Vào trò chơi
          </button>
        </form>
      </div>
    </main>
  );
}