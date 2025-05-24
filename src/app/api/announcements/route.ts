import { type NextRequest, NextResponse } from "next/server"
import { getAnnouncements, createAnnouncement } from "@/lib/db-prisma"

// お知らせ一覧の取得
export async function GET() {
  try {
    const announcements = await getAnnouncements()
    return NextResponse.json(announcements)
  } catch (error) {
    console.error("お知らせ一覧の取得に失敗しました:", error)
    return NextResponse.json({ error: "お知らせ一覧の取得に失敗しました" }, { status: 500 })
  }
}

// 新しいお知らせの作成
export async function POST(request: NextRequest) {
  try {
    const announcementData = await request.json()

    // 必須フィールドの検証
    if (!announcementData.title || !announcementData.summary || !announcementData.content) {
      return NextResponse.json({ error: "タイトル、概要、内容は必須です" }, { status: 400 })
    }

    const newAnnouncement = await createAnnouncement(announcementData)
    return NextResponse.json(newAnnouncement, { status: 201 })
  } catch (error) {
    console.error("お知らせの作成に失敗しました:", error)
    return NextResponse.json({ error: "お知らせの作成に失敗しました" }, { status: 500 })
  }
}
