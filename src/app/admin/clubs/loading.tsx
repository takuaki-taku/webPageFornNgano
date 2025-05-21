"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Pencil, Trash2, Search } from "lucide-react"
import { getAllTeams } from "@/lib/data"
import { useClubStore } from "@/lib/store"

export default function ClubsAdminPage() {
  const router = useRouter()
  const { clubs, deleteClub } = useClubStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [isConfirmingDelete, setIsConfirmingDelete] = useState<string | null>(null)

  // 初期データの読み込み
  useEffect(() => {
    if (clubs.length === 0) {
      // クラブデータがまだストアにない場合、初期データを読み込む
      useClubStore.setState({ clubs: getAllTeams() })
    }
  }, [clubs.length])

  // 検索フィルター
  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // クラブ削除の確認
  const confirmDelete = (clubId: string) => {
    setIsConfirmingDelete(clubId)
  }

  // クラブ削除の実行
  const handleDelete = (clubId: string) => {
    deleteClub(clubId)
    setIsConfirmingDelete(null)
  }

  // 削除のキャンセル
  const cancelDelete = () => {
    setIsConfirmingDelete(null)
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/admin" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="mr-1 h-4 w-4" />
            管理画面に戻る
          </Link>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">クラブ管理</h1>
          <Link
            href="/admin/clubs/new"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-1 h-4 w-4" />
            新規クラブ
          </Link>
        </div>

        <div className="mb-6 flex w-full items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="クラブ名や地域で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>

        <div className="rounded-lg border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">クラブ名</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">地域</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">会員数</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredClubs.length > 0 ? (
                  filteredClubs.map((club) => (
                    <tr key={club.id} className="border-b">
                      <td className="px-4 py-3 text-sm">{club.name}</td>
                      <td className="px-4 py-3 text-sm">{club.location}</td>
                      <td className="px-4 py-3 text-sm">{club.memberCount}名</td>
                      <td className="px-4 py-3 text-right">
                        {isConfirmingDelete === club.id ? (
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleDelete(club.id)}
                              className="inline-flex items-center justify-center rounded-md bg-destructive px-3 py-1 text-xs font-medium text-destructive-foreground hover:bg-destructive/90"
                            >
                              削除する
                            </button>
                            <button
                              onClick={cancelDelete}
                              className="inline-flex items-center justify-center rounded-md border px-3 py-1 text-xs font-medium hover:bg-accent hover:text-accent-foreground"
                            >
                              キャンセル
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              href={`/admin/clubs/${club.id}`}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">編集</span>
                            </Link>
                            <button
                              onClick={() => confirmDelete(club.id)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">削除</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-sm text-muted-foreground">
                      {searchTerm ? "検索条件に一致するクラブが見つかりませんでした。" : "クラブが登録されていません。"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
