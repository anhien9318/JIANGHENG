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
      <div className="absolute inset-0 bg-[#7f7f7f]/55 backdrop-blur-[2px]" />

      <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-[#cccccc]/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-52 w-52 rounded-full bg-[#a5a5a5]/25 blur-3xl" />

      <div className="relative z-10 w-full max-w-2xl rounded-[36px] border border-[#cccccc]/60 bg-[#f2f2f2]/18 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-10">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#f2f2f2]/90">
            changhenngaygap
          </p>
          <h1 className="text-3xl font-extrabold text-[#f2f2f2] md:text-4xl">
            Thông tin người chơi
          </h1>
          <p className="mt-3 text-sm text-[#f2f2f2]/80 md:text-base">
            Vui lòng nhập đầy đủ thông tin để vào trò chơi
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            className="w-full rounded-2xl border border-[#cccccc] bg-[#f2f2f2]/95 px-5 py-4 text-base text-[#7f7f7f] placeholder:text-[#a5a5a5] outline-none transition duration-300 focus:-translate-y-0.5 focus:border-[#7f7f7f] focus:bg-white focus:ring-4 focus:ring-[#cccccc] md:text-lg"
            placeholder="Tên Facebook"
            value={facebookName}
            onChange={(e) => setFacebookName(e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-[#cccccc] bg-[#f2f2f2]/95 px-5 py-4 text-base text-[#7f7f7f] placeholder:text-[#a5a5a5] outline-none transition duration-300 focus:-translate-y-0.5 focus:border-[#7f7f7f] focus:bg-white focus:ring-4 focus:ring-[#cccccc] md:text-lg"
            placeholder="Link Facebook"
            value={facebookLink}
            onChange={(e) => setFacebookLink(e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-[#cccccc] bg-[#f2f2f2]/95 px-5 py-4 text-base text-[#7f7f7f] placeholder:text-[#a5a5a5] outline-none transition duration-300 focus:-translate-y-0.5 focus:border-[#7f7f7f] focus:bg-white focus:ring-4 focus:ring-[#cccccc] md:text-lg"
            placeholder="Tên người nhận hàng"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-[#cccccc] bg-[#f2f2f2]/95 px-5 py-4 text-base text-[#7f7f7f] placeholder:text-[#a5a5a5] outline-none transition duration-300 focus:-translate-y-0.5 focus:border-[#7f7f7f] focus:bg-white focus:ring-4 focus:ring-[#cccccc] md:text-lg"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            className="w-full rounded-2xl border border-[#cccccc] bg-[#f2f2f2]/95 px-5 py-4 text-base text-[#7f7f7f] placeholder:text-[#a5a5a5] outline-none transition duration-300 focus:-translate-y-0.5 focus:border-[#7f7f7f] focus:bg-white focus:ring-4 focus:ring-[#cccccc] md:text-lg"
            placeholder="Địa chỉ giao hàng"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={4}
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-[#7f7f7f] px-6 py-4 text-lg font-bold text-white shadow-[0_10px_30px_rgba(127,127,127,0.35)] transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:bg-[#6f6f6f] hover:shadow-[0_16px_40px_rgba(127,127,127,0.4)] active:scale-[0.99] md:text-xl"
          >
            Vào trò chơi
          </button>
        </form>
      </div>
    </main>
  );
}