import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import { announcements } from "@/lib/data"

export default function AnnouncementPage() {
  // 日付の新しい順に並べ替え
  const sortedAnnouncements = [...announcements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">お知らせ</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          長野県内のピックルボール関連のお知らせや大会情報を掲載しています。
        </p>

        <div className="grid gap-6">
          {sortedAnnouncements.map((announcement) => (
            <div key={announcement.id} className="rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{announcement.date}</span>
                </div>
                <h2 className="text-2xl font-bold">{announcement.title}</h2>
                <p className="text-muted-foreground">{announcement.summary}</p>
                <Link
                  href={`/announcement/${announcement.id}`}
                  className="inline-flex items-center pt-2 text-sm font-medium text-primary hover:underline"
                >
                  詳細を見る
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
