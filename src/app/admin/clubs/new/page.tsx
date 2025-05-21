"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, AlertCircle } from "lucide-react"
import { useClubStore } from "@/lib/store"

export default function NewClubPage() {
  const router = useRouter()
  const { addClub } = useClubStore()
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    color: "#FF5733",
    shortDescription: "",
    description: "",
    memberCount: 0,
    activityDays: "",
    activityHours: "",
    activityLocation: "",
    fee: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    imageUrl: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  // フォーム入力の処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "memberCount" ? Number.parseInt(value) || 0 : value,
    }))

    // エラーをクリア
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // フォームの検証
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "クラブ名は必須です"
    }

    if (!formData.location.trim()) {
      newErrors.location = "地域は必須です"
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = "簡単な説明は必須です"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // フォーム送信の処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSaving(true)
    setApiError(null)

    try {
      // 新しいクラブの追加
      const newClub = await addClub({
        ...formData,
        galleryImages: [],
      })

      // クラブ一覧ページにリダイレクト
      setTimeout(() => {
        router.push("/admin/clubs")
      }, 500)
    } catch (error) {
      setIsSaving(false)
      setApiError((error as Error).message)
    }
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/admin/clubs"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            クラブ一覧に戻る
          </Link>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">新規クラブ登録</h1>
        </div>

        {apiError && (
          <div className="mb-6 flex items-center gap-2 rounded-md bg-destructive/10 p-4 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p>{apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 基本情報 */}
          <div className="space-y-6 rounded-lg border p-6 shadow-sm">
            <h2 className="text-xl font-semibold">基本情報</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  クラブ名 <span className="text-destructive">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${
                    errors.name ? "border-destructive" : "border-input"
                  } bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  地域 <span className="text-destructive">*</span>
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${
                    errors.location ? "border-destructive" : "border-input"
                  } bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
                />
                {errors.location && <p className="text-xs text-destructive">{errors.location}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="color" className="text-sm font-medium">
                  クラブカラー
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    id="color"
                    name="color"
                    type="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="h-10 w-10 cursor-pointer rounded-md border border-input"
                  />
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="memberCount" className="text-sm font-medium">
                  会員数
                </label>
                <input
                  id="memberCount"
                  name="memberCount"
                  type="number"
                  min="0"
                  value={formData.memberCount}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="shortDescription" className="text-sm font-medium">
                簡単な説明 <span className="text-destructive">*</span>
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                rows={2}
                value={formData.shortDescription}
                onChange={handleChange}
                className={`w-full rounded-md border ${
                  errors.shortDescription ? "border-destructive" : "border-input"
                } bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
                placeholder="クラブの簡単な説明（一覧表示用）"
              />
              {errors.shortDescription && <p className="text-xs text-destructive">{errors.shortDescription}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                詳細説明
              </label>
              <textarea
                id="description"
                name="description"
                rows={6}
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="クラブの詳細な説明（詳細ページ用）"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="imageUrl" className="text-sm font-medium">
                画像URL
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="text"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="/images/club.jpg"
              />
              <p className="text-xs text-muted-foreground">
                画像のURLを入力してください。空の場合はプレースホルダー画像が使用されます。
              </p>
            </div>
          </div>

          {/* 活動情報 */}
          <div className="space-y-6 rounded-lg border p-6 shadow-sm">
            <h2 className="text-xl font-semibold">活動情報</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="activityDays" className="text-sm font-medium">
                  活動日
                </label>
                <input
                  id="activityDays"
                  name="activityDays"
                  type="text"
                  value={formData.activityDays}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="毎週水曜日・土曜日"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="activityHours" className="text-sm font-medium">
                  活動時間
                </label>
                <input
                  id="activityHours"
                  name="activityHours"
                  type="text"
                  value={formData.activityHours}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="19:00-21:00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="activityLocation" className="text-sm font-medium">
                活動場所
              </label>
              <input
                id="activityLocation"
                name="activityLocation"
                type="text"
                value={formData.activityLocation}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="〇〇体育館、△△公民館"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="fee" className="text-sm font-medium">
                会費
              </label>
              <input
                id="fee"
                name="fee"
                type="text"
                value={formData.fee}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="入会金 2,000円、月会費 1,500円"
              />
            </div>
          </div>

          {/* 連絡先情報 */}
          <div className="space-y-6 rounded-lg border p-6 shadow-sm">
            <h2 className="text-xl font-semibold">連絡先情報</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="contactPerson" className="text-sm font-medium">
                  担当者名
                </label>
                <input
                  id="contactPerson"
                  name="contactPerson"
                  type="text"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  メールアドレス
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  電話番号
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="website" className="text-sm font-medium">
                  ウェブサイト
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <Link
              href="/admin/clubs"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
            >
              キャンセル
            </Link>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isSaving ? (
                <span className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  保存中...
                </span>
              ) : (
                <span className="flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  登録する
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
