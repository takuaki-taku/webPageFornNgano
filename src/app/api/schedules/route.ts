import { type NextRequest, NextResponse } from "next/server"
import { getSchedules, addSchedule } from "@/lib/db.server"

// スケジュール一覧の取得
export async function GET() {
  try {
    const schedules = getSchedules()
    return NextResponse.json(schedules)
  } catch (error) {
    console.error("スケジュール一覧の取得に失敗しました:", error)
    return NextResponse.json({ error: "スケジュール一覧の取得に失敗しました" }, { status: 500 })
  }
}

// 新しいスケジュールの作成
export async function POST(request: NextRequest) {
  try {
    const scheduleData = await request.json()

    // 必須フィールドの検証
    if (!scheduleData.teamId || !scheduleData.date || !scheduleData.time || !scheduleData.location) {
      return NextResponse.json({ error: "チーム、日付、時間、場所は必須です" }, { status: 400 })
    }

    // IDの生成
    const newSchedule = {
      id: `sched${Date.now()}`,
      ...scheduleData,
    }

    const success = addSchedule(newSchedule)

    if (success) {
      return NextResponse.json(newSchedule, { status: 201 })
    } else {
      return NextResponse.json({ error: "スケジュールの作成に失敗しました" }, { status: 500 })
    }
  } catch (error) {
    console.error("スケジュールの作成に失敗しました:", error)
    return NextResponse.json({ error: "スケジュールの作成に失敗しました" }, { status: 500 })
  }
}
