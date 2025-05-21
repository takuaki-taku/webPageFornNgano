"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { getAllTeams } from "@/lib/data"
import { useScheduleStore } from "@/lib/store"

export default function NewSchedulePage() {
  const router = useRouter()
  const { addSchedule } = useScheduleStore()
  const [teams, setTeams] = useState<any[]>([])
  const [formData, setFormData] = useState({
    teamId: "",
    date: "",
    time: "",
    location: "",
    details: "",
    isPublic: true,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState(false)

  // チームデータの読み込み
  useEffect(() => {
    setTeams(getAllTeams())
  }, [])

  // フォーム入力の処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    if (!formData.teamId) {
      newErrors.teamId = "クラブを選択してください"
    }

    if (!formData.date) {
      newErrors.date = "日付は必須です"
    }

    if (!formData.time) {
      newErrors.time = "時間は必須です"
    }

    if (!formData.location) {
      newErrors.location = "場所は必須です"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // フォーム送信の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSaving(true)

    // 新しいスケジュールIDの生成（実際のアプリでは、バックエンドでIDを生成することが多い）
    const newScheduleId = `sched${Date.now()}`

    // スケジュールの追加
    addSchedule({
      id: newScheduleId,
      ...formData,
    })

    // スケジュール一覧ページにリダイレクト
    setTimeout(() => {
      router.push("/admin/schedules")
    }, 500)
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/admin/schedules"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            スケジュール一覧に戻る
          </Link>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">新規スケジュール登録</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6 rounded-lg border p-6 shadow-sm">
            <div className="space-y-2">
              <label htmlFor="teamId" className="text-sm font-medium">
                クラブ <span className="text-destructive">*</span>
              </label>
              <select
                id="teamId"
                name="teamId"
                value={formData.teamId}
                onChange={handleChange}
                className={`w-full rounded-md border ${
                  errors.teamId ? "border-destructive" : "border-input"
                } bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
              >
                <option value="">クラブを選択してください</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
              {errors.teamId && <p className="text-xs text-destructive">{errors.teamId}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
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

              <div className="space-y-2">
                <label htmlFor="time" className="text-sm font-medium">
                  時間 <span className="text-destructive">*</span>
                </label>
                <input
                  id="time"
                  name="time"
                  type="text"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="10:00 - 12:00"
                  className={`w-full rounded-md border ${
                    errors.time ? "border-destructive" : "border-input"
                  } bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
                />
                {errors.time && <p className="text-xs text-destructive">{errors.time}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                場所 <span className="text-destructive">*</span>
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
              <label htmlFor="details" className="text-sm font-medium">
                詳細
              </label>
              <textarea
                id="details"
                name="details"
                rows={4}
                value={formData.details}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="スケジュールの詳細情報"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="isPublic"
                name="isPublic"
                type="checkbox"
                checked={formData.isPublic}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-input"
              />
              <label htmlFor="isPublic" className="text-sm font-medium">
                公開する
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <Link
              href="/admin/schedules"
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
