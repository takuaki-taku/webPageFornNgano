import { type NextRequest, NextResponse } from "next/server"
import { getScheduleById, updateSchedule, deleteSchedule } from "@/lib/db-prisma"

// 特定のスケジュールの取得
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const schedule = await getScheduleById(id)

    if (!schedule) {
      return NextResponse.json({ error: "スケジュールが見つかりません" }, { status: 404 })
    }

    return NextResponse.json(schedule)
  } catch (error) {
    console.error("スケジュールの取得に失敗しました:", error)
    return NextResponse.json({ error: "スケジュールの取得に失敗しました" }, { status: 500 })
  }
}

// スケジュールの更新
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const scheduleData = await request.json()

    // 必須フィールドの検証
    if (!scheduleData.clubId || !scheduleData.date || !scheduleData.time || !scheduleData.location) {
      return NextResponse.json({ error: "クラブID、日付、時間、場所は必須です" }, { status: 400 })
    }

    // 既存のスケジュールの確認
    const existingSchedule = await getScheduleById(id)
    if (!existingSchedule) {
      return NextResponse.json({ error: "スケジュールが見つかりません" }, { status: 404 })
    }

    const updatedSchedule = await updateSchedule(id, scheduleData)
    return NextResponse.json(updatedSchedule)
  } catch (error) {
    console.error("スケジュールの更新に失敗しました:", error)
    return NextResponse.json({ error: "スケジュールの更新に失敗しました" }, { status: 500 })
  }
}

// スケジュールの削除
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // 既存のスケジュールの確認
    const existingSchedule = await getScheduleById(id)
    if (!existingSchedule) {
      return NextResponse.json({ error: "スケジュールが見つかりません" }, { status: 404 })
    }

    await deleteSchedule(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("スケジュールの削除に失敗しました:", error)
    return NextResponse.json({ error: "スケジュールの削除に失敗しました" }, { status: 500 })
  }
}
