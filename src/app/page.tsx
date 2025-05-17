import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Info } from "lucide-react"
import { getLatestAnnouncements, getUpcomingSchedules } from "@/lib/data"

export default function Home() {
  const announcements = getLatestAnnouncements(3)
  const schedules = getUpcomingSchedules(3)

  return (
    <div className="flex flex-col gap-12 pb-8 pt-6 md:gap-16 md:pb-16 md:pt-10 lg:pb-24 lg:pt-16">
      {/* ヒーローセクション */}
      <section className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                長野県ピックルボールクラブへようこそ
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                長野県内のピックルボール愛好家のための情報サイトです。
                県内チームの活動スケジュールや大会情報をご確認いただけます。
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/schedule"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                スケジュールを見る
              </Link>
              <Link
                href="/announcement"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                お知らせを見る
              </Link>
            </div>
          </div>
          <Image
            src="/placeholder.svg?height=400&width=600"
            width={600}
            height={400}
            alt="ピックルボールプレイ風景"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
          />
        </div>
      </section>

      {/* ピックルボールについて */}
      <section className="bg-muted/50 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">ピックルボールとは？</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              ピックルボールは、テニス、バドミントン、卓球の要素を組み合わせたスポーツです。
              老若男女問わず楽しめる、アメリカ発祥の人気スポーツで、日本でも急速に普及しています。
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m4.9 4.9 14.2 14.2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">初心者に優しい</h3>
                <p className="text-sm text-muted-foreground">ルールがシンプルで、短時間で基本的なプレイが可能です。</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">社交的</h3>
                <p className="text-sm text-muted-foreground">ダブルスが基本で、交流を深めながら楽しめます。</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M6.5 6.5 17.5 17.5" />
                    <path d="M16 7a1 1 0 1 0 2 0a1 1 0 0 0-2 0" />
                    <path d="M7 16a1 1 0 1 0 2 0a1 1 0 0 0-2 0" />
                    <path d="M3.34 7A10 10 0 0 1 12 2a10 10 0 0 1 8.66 5" />
                    <path d="M20.66 17A10 10 0 0 1 12 22a10 10 0 0 1-8.66-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">適度な運動量</h3>
                <p className="text-sm text-muted-foreground">激しすぎず、適度な運動量で健康維持に最適です。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 最新のお知らせ */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">最新のお知らせ</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="flex flex-col space-y-2 rounded-lg border p-4 shadow-sm">
                <div className="text-sm text-muted-foreground">{announcement.date}</div>
                <h3 className="line-clamp-2 text-lg font-bold">{announcement.title}</h3>
                <p className="line-clamp-3 text-sm text-muted-foreground">{announcement.summary}</p>
                <Link
                  href={`/announcement/${announcement.id}`}
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  詳細を見る
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Link
              href="/announcement"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              すべてのお知らせを見る
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 直近のスケジュール */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">直近のスケジュール</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="flex flex-col space-y-2 rounded-lg border p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: schedule.teamColor }}></div>
                  <span className="font-medium">{schedule.teamName}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {schedule.date} {schedule.time}
                </div>
                <div className="text-sm">
                  <span className="font-medium">場所:</span> {schedule.location}
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">{schedule.details}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Link
              href="/schedule"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              すべてのスケジュールを見る
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
