import { type NextRequest, NextResponse } from "next/server"
import { getClubs, addClub } from "@/lib/db.server"

// クラブ一覧の取得
export async function GET() {
  try {
    const clubs = getClubs()
    return NextResponse.json(clubs)
  } catch (error) {
    console.error("クラブ一覧の取得に失敗しました:", error)
    return NextResponse.json({ error: "クラブ一覧の取得に失敗しました" }, { status: 500 })
  }
}

// 新しいクラブの作成
export async function POST(request: NextRequest) {
  try {
    const clubData = await request.json()

    // 必須フィールドの検証
    if (!clubData.name || !clubData.location) {
      return NextResponse.json({ error: "クラブ名と地域は必須です" }, { status: 400 })
    }

    // IDの生成（実際のアプリでは、より堅牢なID生成方法を使用することをお勧めします）
    const newClub = {
      id: `team${Date.now()}`,
      ...clubData,
    }

    const success = addClub(newClub)

    if (success) {
      return NextResponse.json(newClub, { status: 201 })
    } else {
      return NextResponse.json({ error: "クラブの作成に失敗しました" }, { status: 500 })
    }
  } catch (error) {
    console.error("クラブの作成に失敗しました:", error)
    return NextResponse.json({ error: "クラブの作成に失敗しました" }, { status: 500 })
  }
}
