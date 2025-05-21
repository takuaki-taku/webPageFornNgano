"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Shield, Users, Calendar, ArrowRight } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // 簡易的な認証処理（実際のアプリでは適切な認証システムを使用してください）
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin123") {
      // 実際のアプリでは、このようなハードコードされたパスワードは使用しないでください
      setIsLoggedIn(true)
      setError("")
    } else {
      setError("パスワードが正しくありません")
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="container flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12 md:px-6">
        <div className="mx-auto w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Shield className="h-12 w-12 text-primary" />
            <h1 className="text-2xl font-bold">管理者ログイン</h1>
            <p className="text-sm text-muted-foreground">
              クラブ情報やスケジュールを管理するには、管理者としてログインしてください。
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                パスワード
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="パスワードを入力"
                required
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <button
              type="submit"
              className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              ログイン
            </button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            <p>デモ用パスワード: admin123</p>
            <p className="mt-1 text-xs">※実際のアプリでは適切な認証システムを実装してください</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">管理画面</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            ログアウト
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            href="/admin/clubs"
            className="group flex flex-col space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold">クラブ管理</h2>
            </div>
            <p className="text-muted-foreground">クラブの追加、編集、削除を行います。</p>
            <div className="flex items-center text-sm font-medium text-primary">
              クラブ管理へ進む
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/admin/schedules"
            className="group flex flex-col space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold">スケジュール管理</h2>
            </div>
            <p className="text-muted-foreground">スケジュールの追加、編集、削除を行います。</p>
            <div className="flex items-center text-sm font-medium text-primary">
              スケジュール管理へ進む
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
