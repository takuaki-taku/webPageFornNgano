import { NextResponse } from "next/server"
import { seedDatabase } from "@/lib/db-prisma"

// 初期データを投入するためのエンドポイント
export async function GET() {
  try {
    await seedDatabase()
    return NextResponse.json({ success: true, message: "��期データを投入しました" })
  } catch (error) {
    console.error("初期データの投入に失敗しました:", error)
    return NextResponse.json({ success: false, error: "初期データの投入に失敗しました" }, { status: 500 })
  }
}
