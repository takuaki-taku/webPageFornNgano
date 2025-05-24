"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Pencil, Trash2, Search } from "lucide-react"
import { useScheduleStore } from "@/lib/store"

export default function SchedulesAdminPage() {
  const router = useRouter()
  const { schedules, deleteSchedule, fetchSchedules } = useScheduleStore()
  const [teams, setTeams] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isConfirmingDelete, setIsConfirmingDelete] = useState<string | null>(null)

  // チームデータとスケジュールデータの読み込み
  useEffect(() => {
    const loadData = async () => {
      try {
        // スケジュールデータの読み込み
        await fetchSchedules()

        // クラブデータの読み込み
        const response = await fetch("/api/clubs")
        const clubsData = await response.json()
        setTeams(clubsData)
      } catch (error) {
        console.error("データの読み込みに失敗しました:", error)
      }
    }

    loadData()
  }, [fetchSchedules])

  // 検索フィルター
  const filteredSchedules = schedules.filter((schedule) => {
    const team = teams.find((t) => t.id === (schedule.clubId || schedule.teamId))
    const teamName = team ? team.name : ""

    return (
      teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.date.includes(searchTerm)
    )
  })

  // スケジュール削除の確認
  const confirmDelete = (scheduleId: string) => {
    setIsConfirmingDelete(scheduleId)
  }

  // スケジュール削除の実行
  const handleDelete = (scheduleId: string) => {
    deleteSchedule(scheduleId)
    setIsConfirmingDelete(null)
  }

  // 削除のキャンセル
  const cancelDelete = () => {
    setIsConfirmingDelete(null)
  }

  // チーム名を取得
  const getTeamName = (schedule: any) => {
    const teamId = schedule.clubId || schedule.teamId
    const team = teams.find((t) => t.id === teamId)
    return team ? team.name : "不明なチーム"
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/admin" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="mr-1 h-4 w-4" />
            管理画面に戻る
          </Link>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">スケジュール管理</h1>
          <Link
            href="/admin/schedules/new"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-1 h-4 w-4" />
            新規スケジュール
          </Link>
        </div>

        <div className="mb-6 flex w-full items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="クラブ名、場所、日付などで検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        <div className="rounded-lg border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">クラブ名</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">日付</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">時間</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">場所</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedules.length > 0 ? (
                  filteredSchedules.map((schedule) => (
                    <tr key={schedule.id} className="border-b">
                      <td className="px-4 py-3 text-sm">{getTeamName(schedule)}</td>
                      <td className="px-4 py-3 text-sm">{schedule.date}</td>
                      <td className="px-4 py-3 text-sm">{schedule.time}</td>
                      <td className="px-4 py-3 text-sm">{schedule.location}</td>
                      <td className="px-4 py-3 text-right">
                        {isConfirmingDelete === schedule.id ? (
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleDelete(schedule.id)}
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
                              href={`/admin/schedules/${schedule.id}`}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">編集</span>
                            </Link>
                            <button
                              onClick={() => confirmDelete(schedule.id)}
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
                    <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                      {searchTerm
                        ? "検索条件に一致するスケジュールが見つかりませんでした。"
                        : "スケジュールが登録されていません。"}
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
