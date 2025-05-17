"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/naganologo.png"
            alt="長野県ピックルボールクラブ"
            width={32}
            height={32}
            className="rounded-md"
          />
          <span className="hidden font-bold sm:inline-block">長野県ピックルボールクラブ</span>
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex md:gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            ホーム
          </Link>
          <Link href="/clubs" className="text-sm font-medium transition-colors hover:text-primary">
            クラブ一覧
          </Link>
          <Link href="/schedule" className="text-sm font-medium transition-colors hover:text-primary">
            スケジュール
          </Link>
          <Link href="/announcement" className="text-sm font-medium transition-colors hover:text-primary">
            お知らせ
          </Link>
        </nav>

        {/* モバイルメニューボタン */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="メニューを開く"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* モバイルナビゲーション */}
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col space-y-4 pb-4">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              ホーム
            </Link>
            <Link
              href="/clubs"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              クラブ一覧
            </Link>
            <Link
              href="/schedule"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              スケジュール
            </Link>
            <Link
              href="/announcement"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              お知らせ
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
