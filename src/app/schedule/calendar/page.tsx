"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import { schedules, teams } from "@/lib/data"

// 日本語の月名と曜日名
const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
const DAYS = ["日", "月", "火", "水", "木", "金", "土"]

// スケジュールの型定義
type Schedule = {
  id: string
  teamId: string
  date: string
  time: string
  location: string
  details: string
  isPublic: boolean
  teamName?: string
  teamColor?: string
}

// 日付をYYYY-MM-DD形式に変換する関数
function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export default function CalendarPage() {
  // 現在の年月を状態として保持
  const [currentDate, setCurrentDate] = useState(new Date())

  // 前月へ移動
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  // 翌月へ移動
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // 今月へ移動
  const currentMonth = () => {
    setCurrentDate(new Date())
  }

  // カレンダーに表示する日付の配列を生成
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // 月の最初の日
    const firstDay = new Date(year, month, 1)
    // 月の最後の日
    const lastDay = new Date(year, month + 1, 0)

    // 最初の日の曜日（0: 日曜日, 1: 月曜日, ...）
    const firstDayOfWeek = firstDay.getDay()
    // 最後の日の日付
    const lastDate = lastDay.getDate()

    // カレンダーに表示する日付の配列
    const days = []

    // 前月の日を追加
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevMonthLastDay = new Date(year, month, 0).getDate()
      const day = prevMonthLastDay - firstDayOfWeek + i + 1
      days.push({
        date: new Date(year, month - 1, day),
        isCurrentMonth: false,
      })
    }

    // 当月の日を追加
    for (let i = 1; i <= lastDate; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      })
    }

    // 翌月の日を追加（6週間分になるように）
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      })
    }

    return days
  }

  // チーム情報を付加したスケジュールを取得
  const getEnrichedSchedules = (): Schedule[] => {
    return schedules.map((schedule) => {
      const team = teams.find((t) => t.id === schedule.teamId)
      return {
        ...schedule,
        teamName: team?.name || "不明なチーム",
        teamColor: team?.color || "#CCCCCC",
      }
    })
  }

  // 特定の日のスケジュールを取得
  const getSchedulesForDate = (date: Date): Schedule[] => {
    const dateString = formatDate(date)
    return getEnrichedSchedules().filter((schedule) => schedule.date === dateString)
  }

  // カレンダーの日付配列
  const calendarDays = generateCalendarDays()

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/schedule" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="mr-1 h-4 w-4" />
            スケジュール一覧に戻る
          </Link>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">月間スケジュール</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevMonth}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
              aria-label="前月"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={currentMonth}
              className="inline-flex items-center justify-center rounded-md border px-3 py-1 text-sm hover:bg-muted"
            >
              今月
            </button>
            <button
              onClick={nextMonth}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
              aria-label="翌月"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-4 text-center text-xl font-semibold">
          {currentDate.getFullYear()}年 {MONTHS[currentDate.getMonth()]}
        </div>

        <div className="rounded-lg border shadow-sm">
          {/* 曜日ヘッダー */}
          <div className="grid grid-cols-7 border-b bg-muted/50">
            {DAYS.map((day, index) => (
              <div
                key={day}
                className={`py-2 text-center text-sm font-medium ${
                  index === 0 ? "text-red-500" : index === 6 ? "text-blue-500" : ""
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* カレンダー本体 */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              const dateSchedules = getSchedulesForDate(day.date)
              const isToday = formatDate(day.date) === formatDate(new Date())

              return (
                <div
                  key={index}
                  className={`min-h-[100px] border-b border-r p-1 ${
                    !day.isCurrentMonth ? "bg-muted/30 text-muted-foreground" : ""
                  } ${isToday ? "bg-primary/5" : ""}`}
                >
                  <div
                    className={`mb-1 text-right text-sm font-medium ${
                      day.date.getDay() === 0 ? "text-red-500" : day.date.getDay() === 6 ? "text-blue-500" : ""
                    }`}
                  >
                    {day.date.getDate()}
                    {isToday && (
                      <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                        今日
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    {dateSchedules.map((schedule) => (
                      <div
                        key={schedule.id}
                        className="rounded-sm p-1 text-[10px] leading-tight"
                        style={{
                          backgroundColor: `${schedule.teamColor}20`,
                          borderLeft: `2px solid ${schedule.teamColor}`,
                        }}
                      >
                        <div className="font-medium">{schedule.teamName}</div>
                        <div>{schedule.time}</div>
                        <div className="truncate">{schedule.location}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* チーム凡例 */}
        <div className="mt-8 rounded-lg border p-4">
          <h3 className="mb-2 font-medium">チーム凡例</h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {teams.map((team) => (
              <div key={team.id} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: team.color }}></div>
                <span className="text-sm">{team.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
