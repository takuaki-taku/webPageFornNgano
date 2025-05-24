import { type NextRequest, NextResponse } from "next/server"
import { getClubs, createClub } from "@/lib/db-prisma"

// クラブ一覧の取得
export async function GET() {
  try {
    const clubs = await getClubs()
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
    if (!clubData.name || !clubData.location || !clubData.shortDescription) {
      return NextResponse.json({ error: "クラブ名、地域、簡単な説明は必須です" }, { status: 400 })
    }

    const newClub = await createClub(clubData)
    return NextResponse.json(newClub, { status: 201 })
  } catch (error) {
    console.error("クラブの作成に失敗しました:", error)
    return NextResponse.json({ error: "クラブの作成に失敗しました" }, { status: 500 })
  }
}
