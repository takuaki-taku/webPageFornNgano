import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "ファイルが選択されていません" }, { status: 400 })
    }

    // ファイルサイズの制限（5MB）
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "ファイルサイズが大きすぎます（最大5MB）" }, { status: 400 })
    }

    // ファイルタイプの検証
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "サポートされていないファイル形式です" }, { status: 400 })
    }

    // ファイル名の生成（タイムスタンプ + 元のファイル名）
    const timestamp = Date.now()
    const fileName = `${timestamp}-${file.name}`

    // Vercel Blob にアップロード
    const blob = await put(fileName, file, {
      access: "public",
    })

    return NextResponse.json({
      url: blob.url,
      fileName: fileName,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error("画像アップロードエラー:", error)
    return NextResponse.json({ error: "画像のアップロードに失敗しました" }, { status: 500 })
  }
}
