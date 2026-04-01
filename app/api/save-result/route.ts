import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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

    if (!phone) {
      return NextResponse.json(
        { error: "Thiếu số điện thoại." },
        { status: 400 }
      );
    }

    // kiểm tra số điện thoại đã tồn tại chưa
    const { data: existingResult, error: checkError } = await supabase
      .from("results")
      .select("id")
      .eq("phone", phone)
      .maybeSingle();

    if (checkError) {
      console.error("Check phone error:", checkError);

      return NextResponse.json(
        { error: checkError.message },
        { status: 500 }
      );
    }

    // nếu đã có thì giữ nguyên
    if (existingResult) {
      return NextResponse.json(
        {
          success: true,
          alreadyExists: true,
          message: "Số điện thoại này đã có kết quả trước đó.",
        },
        { status: 200 }
      );
    }

    // insert mới
    const { error: insertError } = await supabase
      .from("results")
      .insert([
        {
          facebook_name: facebookName,
          facebook_link: facebookLink,
          receiver_name: receiverName,
          phone,
          address,
          score,
          total,
          time_seconds: time, // SỬA Ở ĐÂY
        },
      ]);

    if (insertError) {
      console.error("Insert error:", insertError);

      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        alreadyExists: false,
        message: "Đã lưu kết quả thành công.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Internal server error",
      },
      { status: 500 }
    );
  }
}