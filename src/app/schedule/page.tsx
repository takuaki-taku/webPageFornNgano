import Link from "next/link"
import { Calendar, MapPin, Clock, CalendarDays } from "lucide-react"
import { getSchedules, getClubs } from "@/lib/db-prisma"

export default async function SchedulePage() {
  const allSchedules = await getSchedules()
  const clubs = await getClubs()

  // スケジュールをクラブごとにグループ化
  const schedulesByTeam: Record<string, any[]> = {}

  clubs.forEach((club) => {
    schedulesByTeam[club.id] = allSchedules
      .filter((schedule) => schedule.clubId === club.id)
      .map((schedule) => ({
        ...schedule,
        teamName: schedule.club.name,
        teamColor: schedule.club.color,
      }))
  })

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">スケジュール</h1>
          <Link
            href="/schedule/calendar"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            月間カレンダー表示
          </Link>
        </div>

        <p className="mb-8 text-lg text-muted-foreground">
          長野県内のピックルボールチームの練習スケジュールです。
          参加を希望される場合は、各チームの連絡先にお問い合わせください。
        </p>

        <div className="space-y-12">
          {clubs.map((club) => {
            const teamSchedules = schedulesByTeam[club.id] || []

            if (teamSchedules.length === 0) return null

            return (
              <div key={club.id} className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full" style={{ backgroundColor: club.color }}></div>
                  <h2 className="text-2xl font-bold">{club.name}</h2>
                  <span className="text-sm text-muted-foreground">({club.location})</span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {teamSchedules.map((schedule) => (
                    <div key={schedule.id} className="rounded-lg border p-4 shadow-sm">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{schedule.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{schedule.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{schedule.location}</span>
                        </div>
                        <p className="pt-2 text-sm">{schedule.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
