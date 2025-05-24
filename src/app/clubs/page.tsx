import Link from "next/link"
import Image from "next/image"
import { MapPin, Users, ArrowRight } from "lucide-react"
import { getClubs } from "@/lib/db-prisma"

export default async function ClubsPage() {
  const clubs = await getClubs()

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">クラブ一覧</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          長野県内のピックルボールクラブをご紹介します。
          各クラブの詳細ページでは、活動内容や連絡先などの情報をご確認いただけます。
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => (
            <Link
              key={club.id}
              href={`/club/${club.id}`}
              className="group overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={club.imageUrl || "/placeholder.svg?height=200&width=300"}
                  alt={club.name}
                  width={300}
                  height={200}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold group-hover:text-primary">{club.name}</h2>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {club.location}
                </div>
                <div className="mt-1 flex items-center text-sm text-muted-foreground">
                  <Users className="mr-1 h-4 w-4" />
                  会員数: {club.memberCount}名
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{club.shortDescription}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  詳細を見る
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
