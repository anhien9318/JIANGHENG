import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      facebookName,
      facebookLink,
      receiverName,
      phone,
      address,
      score,
      total,
      time,
    } = body;

    const { error } = await supabaseAdmin.from("results").insert([
      {
        facebook_name: facebookName,
        facebook_link: facebookLink,
        receiver_name: receiverName,
        phone,
        address,
        score,
        total,
        time_seconds: time,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API save-result error:", error);
    return NextResponse.json(
      { error: "Lỗi server khi lưu kết quả" },
      { status: 500 }
    );
  }
}