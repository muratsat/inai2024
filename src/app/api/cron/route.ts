import { NextResponse } from "next/server";

export async function GET() {
  const date = new Date().toISOString();
  return new NextResponse(
    JSON.stringify({ message: "Hello", serverTime: date }),
  );
}
