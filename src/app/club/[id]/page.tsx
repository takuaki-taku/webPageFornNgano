import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, MapPin, Users, Calendar, Clock, ExternalLink, Mail, Phone } from "lucide-react"
import { getTeamById, getTeamSchedules } from "@/lib/data"

interface ClubDetailPageProps {
  params: {
    id: string
  }
}

export default function ClubDetailPage({ params }: ClubDetailPageProps) {
  const club = getTeamById(params.id)

  if (!club) {
    notFound()
  }

  const schedules = getTeamSchedules(club.id)

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <Link href="/clubs" className="mb-8 inline-flex items-center text-sm font-medium text-primary hover:underline">
          <ArrowLeft className="mr-1 h-4 w-4" />
          クラブ一覧に戻る
        </Link>

        <div className="grid gap-8 md:grid-cols-3">
          {/* サイドバー */}
          <div className="md:col-span-1">
            <div className="sticky top-20 space-y-6">
              <div className="overflow-hidden rounded-lg border">
                <Image
                  src={club.imageUrl || "/placeholder.svg?height=300&width=300"}
                  alt={club.name}
                  width={300}
                  height={300}
                  className="aspect-square w-full object-cover"
                />
                <div className="p-4">
                  <h1 className="text-xl font-bold">{club.name}</h1>
                  <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    {club.location}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    会員数: {club.memberCount}名
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h2 className="mb-3 text-lg font-semibold">連絡先</h2>
                {club.contactPerson && (
                  <div className="mb-2 text-sm">
                    <span className="font-medium">担当者:</span> {club.contactPerson}
                  </div>
                )}
                {club.email && (
                  <div className="mb-2 flex items-center text-sm">
                    <Mail className="mr-1 h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${club.email}`} className="text-primary hover:underline">
                      {club.email}
                    </a>
                  </div>
                )}
                {club.phone && (
                  <div className="mb-2 flex items-center text-sm">
                    <Phone className="mr-1 h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${club.phone}`} className="text-primary hover:underline">
                      {club.phone}
                    </a>
                  </div>
                )}
                {club.website && (
                  <div className="flex items-center text-sm">
                    <ExternalLink className="mr-1 h-4 w-4 text-muted-foreground" />
                    <a
                      href={club.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      公式ウェブサイト
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* メインコンテンツ */}
          <div className="md:col-span-2">
            <div className="space-y-8">
              {/* クラブ紹介 */}
              <section>
                <h2 className="mb-4 text-2xl font-bold">クラブ紹介</h2>
                <div className="prose max-w-none dark:prose-invert">
                  {club.description.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* 活動情報 */}
              <section>
                <h2 className="mb-4 text-2xl font-bold">活動情報</h2>
                <div className="rounded-lg border p-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <h3 className="mb-2 font-medium">活動日</h3>
                      <p className="text-sm">{club.activityDays}</p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-medium">活動時間</h3>
                      <p className="text-sm">{club.activityHours}</p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-medium">活動場所</h3>
                      <p className="text-sm">{club.activityLocation}</p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-medium">会費</h3>
                      <p className="text-sm">{club.fee}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 直近のスケジュール */}
              <section>
                <h2 className="mb-4 text-2xl font-bold">直近のスケジュール</h2>
                {schedules.length > 0 ? (
                  <div className="space-y-4">
                    {schedules.map((schedule) => (
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
                ) : (
                  <p className="text-muted-foreground">現在予定されているスケジュールはありません。</p>
                )}
              </section>

              {/* 写真ギャラリー */}
              {club.galleryImages && club.galleryImages.length > 0 && (
                <section>
                  <h2 className="mb-4 text-2xl font-bold">写真ギャラリー</h2>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {club.galleryImages.map((image, index) => (
                      <div key={index} className="overflow-hidden rounded-lg">
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={image.alt || `${club.name}の活動写真 ${index + 1}`}
                          width={300}
                          height={200}
                          className="aspect-video w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
