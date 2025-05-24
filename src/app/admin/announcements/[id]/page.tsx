"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, AlertCircle } from "lucide-react"

interface AnnouncementEditPageProps {
  params: {
    id: string
  }
}

export default function AnnouncementEditPage({ params }: AnnouncementEditPageProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    summary: "",
    content: "",
    date: "",
    isPublished: true,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // お知らせデータの読み込み
  useEffect(() => {
    const loadAnnouncement = async () => {
      setIsLoading(true)
      setApiError(null)
      try {
        const response = await fetch(`/api/announcements/${params.id}`)
        if (!response.ok) {
          throw new Error("お知らせの取得に失敗しました")
        }
        const announcement = await response.json()
        setFormData({
          id: announcement.id,
          title: announcement.title,
          summary: announcement.summary,
          content: announcement.content,
          date: announcement.date,
          isPublished: announcement.isPublished,
        })
        setIsLoading(false)
      } catch (error) {
        console.error("お知らせデータの読み込みに失敗しました:", error)
        setApiError((error as Error).message)
        setIsLoading(false)
      }
    }

    loadAnnouncement()
  }, [params.id])

  // フォーム入力の処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
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

  // チェックボックスの処理
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  // フォームの検証
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "タイトルは必須です"
    }

    if (!formData.summary.trim()) {
      newErrors.summary = "概要は必須です"
    }

    if (!formData.content.trim()) {
      newErrors.content = "内容は必須です"
    }

    if (!formData.date) {
      newErrors.date = "日付は必須です"
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
    setSaveSuccess(false)
    setApiError(null)

    try {
      const response = await fetch(`/api/announcements/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "お知らせの更新に失敗しました")
      }

      // 保存成功の表示
      setIsSaving(false)
      setSaveSuccess(true)

      // 3秒後に成功メッセージを消す
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    } catch (error) {
      setIsSaving(false)
      setApiError((error as Error).message)
    }
  }

  if (isLoading) {
    return (
      <div className="container flex min-h-[400px] items-center justify-center px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="flex items-center">
          <svg
            className="h-5 w-5 animate-spin text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="ml-2">読み込み中...</span>
        </div>
      </div>
    )
  }

  if (apiError && !formData.id) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/admin/announcements"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              お知らせ一覧に戻る
            </Link>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">エラー</h1>
          </div>

          <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-4 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p>{apiError}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/admin/announcements"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            お知らせ一覧に戻る
          </Link>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">お知らせ編集</h1>
        </div>

        {apiError && (
          <div className="mb-6 flex items-center gap-2 rounded-md bg-destructive/10 p-4 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p>{apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6 rounded-lg border p-6 shadow-sm">
            <h2 className="text-xl font-semibold">基本情報</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  タイトル <span className="text-destructive">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${
                    errors.title ? "border-destructive" : "border-input"
                  } bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
                />
                {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  日付 <span className="text-destructive">*</span>
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${
                    errors.date ? "border-destructive" : "border-input"
                  } bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
                />
                {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="summary" className="text-sm font-medium">
                概要 <span className="text-destructive">*</span>
              </label>
              <textarea
                id="summary"
                name="summary"
                rows={3}
                value={formData.summary}
                onChange={handleChange}
                className={`w-full rounded-md border ${
                  errors.summary ? "border-destructive" : "border-input"
                } bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
                placeholder="お知らせの概要（一覧表示用）"
              />
              {errors.summary && <p className="text-xs text-destructive">{errors.summary}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                内容 <span className="text-destructive">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                rows={10}
                value={formData.content}
                onChange={handleChange}
                className={`w-full rounded-md border ${
                  errors.content ? "border-destructive" : "border-input"
                } bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
                placeholder="お知らせの詳細内容"
              />
              {errors.content && <p className="text-xs text-destructive">{errors.content}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="isPublished"
                name="isPublished"
                type="checkbox"
                checked={formData.isPublished}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-input"
              />
              <label htmlFor="isPublished" className="text-sm font-medium">
                公開する
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <Link
              href="/admin/announcements"
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
                  保存する
                </span>
              )}
            </button>
          </div>

          {saveSuccess && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">お知らせ情報を保存しました</p>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
