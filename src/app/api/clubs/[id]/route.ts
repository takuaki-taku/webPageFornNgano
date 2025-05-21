import { type NextRequest, NextResponse } from "next/server"
import { getClubById, updateClub, deleteClub } from "@/lib/db.server"

// 特定のクラブの取得
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const club = getClubById(id)

    if (!club) {
      return NextResponse.json({ error: "クラブが見つかりません" }, { status: 404 })
    }

    return NextResponse.json(club)
  } catch (error) {
    console.error("クラブの取得に失敗しました:", error)
    return NextResponse.json({ error: "クラブの取得に失敗しました" }, { status: 500 })
  }
}

// クラブの更新
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const clubData = await request.json()

    // 既存のクラブの確認
    const existingClub = getClubById(id)
    if (!existingClub) {
      return NextResponse.json({ error: "クラブが見つかりません" }, { status: 404 })
    }

    // 必須フィールドの検証
    if (!clubData.name || !clubData.location) {
      return NextResponse.json({ error: "クラブ名と地域は必須です" }, { status: 400 })
    }

    // IDを確保
    const updatedClub = {
      ...clubData,
      id,
    }

    const success = updateClub(updatedClub)

    if (success) {
      return NextResponse.json(updatedClub)
    } else {
      return NextResponse.json({ error: "クラブの更新に失敗しました" }, { status: 500 })
    }
  } catch (error) {
    console.error("クラブの更新に失敗しました:", error)
    return NextResponse.json({ error: "クラブの更新に失敗しました" }, { status: 500 })
  }
}

// クラブの削除
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // 既存のクラブの確認
    const existingClub = getClubById(id)
    if (!existingClub) {
      return NextResponse.json({ error: "クラブが見つかりません" }, { status: 404 })
    }

    const success = deleteClub(id)

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "クラブの削除に失敗しました" }, { status: 500 })
    }
  } catch (error) {
    console.error("クラブの削除に失敗しました:", error)
    return NextResponse.json({ error: "クラブの削除に失敗しました" }, { status: 500 })
  }
}
