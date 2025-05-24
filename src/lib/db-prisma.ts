import prisma from "./prisma"
import { teams, schedules, announcements } from "./data"

// 初期データの投入
export async function seedDatabase() {
  try {
    // クラブ数をカウント
    const clubCount = await prisma.club.count()

    // クラブが存在しない場合のみ初期データを投入
    if (clubCount === 0) {
      console.log("初期データを投入します...")

      // クラブデータの投入
      for (const team of teams) {
        await prisma.club.create({
          data: {
            id: team.id,
            name: team.name,
            location: team.location,
            color: team.color,
            shortDescription: team.shortDescription,
            description: team.description,
            memberCount: team.memberCount,
            activityDays: team.activityDays,
            activityHours: team.activityHours,
            activityLocation: team.activityLocation,
            fee: team.fee,
            contactPerson: team.contactPerson,
            email: team.email,
            phone: team.phone,
            website: team.website || null,
            imageUrl: team.imageUrl,
          },
        })
      }

      // スケジュールデータの投入
      for (const schedule of schedules) {
        await prisma.schedule.create({
          data: {
            id: schedule.id,
            date: schedule.date,
            time: schedule.time,
            location: schedule.location,
            details: schedule.details,
            isPublic: schedule.isPublic,
            clubId: schedule.teamId,
          },
        })
      }

      // お知らせデータの投入
      for (const announcement of announcements) {
        await prisma.announcement.create({
          data: {
            id: announcement.id,
            date: announcement.date,
            title: announcement.title,
            summary: announcement.summary,
            content: announcement.content,
            isPublished: announcement.isPublished,
          },
        })
      }

      console.log("初期データの投入が完了しました")
    }
  } catch (error) {
    console.error("初期データの投入に失敗しました:", error)
  }
}

// クラブ関連の関数
export async function getClubs() {
  return prisma.club.findMany({
    orderBy: { name: "asc" },
  })
}

export async function getClubById(id: string) {
  return prisma.club.findUnique({
    where: { id },
  })
}

export async function createClub(data: any) {
  return prisma.club.create({
    data,
  })
}

export async function updateClub(id: string, data: any) {
  return prisma.club.update({
    where: { id },
    data,
  })
}

export async function deleteClub(id: string) {
  return prisma.club.delete({
    where: { id },
  })
}

// スケジュール関連の関数
export async function getSchedules() {
  return prisma.schedule.findMany({
    include: {
      club: {
        select: {
          name: true,
          color: true,
        },
      },
    },
    orderBy: { date: "asc" },
  })
}

export async function getScheduleById(id: string) {
  return prisma.schedule.findUnique({
    where: { id },
    include: {
      club: {
        select: {
          name: true,
          color: true,
        },
      },
    },
  })
}

export async function getSchedulesByClubId(clubId: string) {
  return prisma.schedule.findMany({
    where: { clubId },
    include: {
      club: {
        select: {
          name: true,
          color: true,
        },
      },
    },
    orderBy: { date: "asc" },
  })
}

export async function createSchedule(data: any) {
  return prisma.schedule.create({
    data,
    include: {
      club: {
        select: {
          name: true,
          color: true,
        },
      },
    },
  })
}

export async function updateSchedule(id: string, data: any) {
  return prisma.schedule.update({
    where: { id },
    data,
    include: {
      club: {
        select: {
          name: true,
          color: true,
        },
      },
    },
  })
}

export async function deleteSchedule(id: string) {
  return prisma.schedule.delete({
    where: { id },
  })
}

// お知らせ関連の関数
export async function getAnnouncements() {
  return prisma.announcement.findMany({
    where: { isPublished: true },
    orderBy: { date: "desc" },
  })
}

export async function getAllAnnouncements() {
  return prisma.announcement.findMany({
    orderBy: { date: "desc" },
  })
}

export async function getAnnouncementById(id: string) {
  return prisma.announcement.findUnique({
    where: { id },
  })
}

export async function getLatestAnnouncements(count: number) {
  return prisma.announcement.findMany({
    where: { isPublished: true },
    orderBy: { date: "desc" },
    take: count,
  })
}

export async function createAnnouncement(data: any) {
  return prisma.announcement.create({
    data,
  })
}

export async function updateAnnouncement(id: string, data: any) {
  return prisma.announcement.update({
    where: { id },
    data,
  })
}

export async function deleteAnnouncement(id: string) {
  return prisma.announcement.delete({
    where: { id },
  })
}
