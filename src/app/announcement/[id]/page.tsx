import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"
import { getAnnouncementById } from "@/lib/db-prisma"
import { notFound } from "next/navigation"

interface AnnouncementDetailPageProps {
  params: {
    id: string
  }
}

export default async function AnnouncementDetailPage({ params }: AnnouncementDetailPageProps) {
  const announcement = await getAnnouncementById(params.id)

  if (!announcement) {
    notFound()
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/announcement"
          className="mb-8 inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          お知らせ一覧に戻る
        </Link>

        <article className="prose prose-stone mx-auto max-w-none dark:prose-invert">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{announcement.date}</span>
          </div>
          <h1 className="mt-2">{announcement.title}</h1>

          {announcement.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>
      </div>
    </div>
  )
}
