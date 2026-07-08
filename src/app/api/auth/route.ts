import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const password = String(body?.password ?? "");

  if (password === process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: "密碼錯誤" }, { status: 401 });
}
