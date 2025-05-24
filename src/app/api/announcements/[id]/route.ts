import { type NextRequest, NextResponse } from "next/server"
import { getAnnouncementById, updateAnnouncement, deleteAnnouncement } from "@/lib/db-prisma"

// 特定のお知らせの取得
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const announcement = await getAnnouncementById(id)

    if (!announcement) {
      return NextResponse.json({ error: "お知らせが見つかりません" }, { status: 404 })
    }

    return NextResponse.json(announcement)
  } catch (error) {
    console.error("お知らせの取得に失敗しました:", error)
    return NextResponse.json({ error: "お知らせの取得に失敗しました" }, { status: 500 })
  }
}

// お知らせの更新
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const announcementData = await request.json()

    // 必須フィールドの検証
    if (!announcementData.title || !announcementData.summary || !announcementData.content) {
      return NextResponse.json({ error: "タイトル、概要、内容は必須です" }, { status: 400 })
    }

    // 既存のお知らせの確認
    const existingAnnouncement = await getAnnouncementById(id)
    if (!existingAnnouncement) {
      return NextResponse.json({ error: "お知らせが見つかりません" }, { status: 404 })
    }

    const updatedAnnouncement = await updateAnnouncement(id, announcementData)
    return NextResponse.json(updatedAnnouncement)
  } catch (error) {
    console.error("お知らせの更新に失敗しました:", error)
    return NextResponse.json({ error: "お知らせの更新に失敗しました" }, { status: 500 })
  }
}

// お知らせの削除
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // 既存のお知らせの確認
    const existingAnnouncement = await getAnnouncementById(id)
    if (!existingAnnouncement) {
      return NextResponse.json({ error: "お知らせが見つかりません" }, { status: 404 })
    }

    await deleteAnnouncement(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("お知らせの削除に失敗しました:", error)
    return NextResponse.json({ error: "お知らせの削除に失敗しました" }, { status: 500 })
  }
}
