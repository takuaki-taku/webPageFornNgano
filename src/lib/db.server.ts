// このファイルはサーバーサイドでのみ使用されます
import fs from "fs"
import path from "path"
import { teams, schedules } from "./data"

// データベースファイルのパス
const DB_DIR = path.join(process.cwd(), "db")
const CLUBS_FILE = path.join(DB_DIR, "clubs.json")
const SCHEDULES_FILE = path.join(DB_DIR, "schedules.json")

// データベースディレクトリの初期化
export function initDatabase() {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true })
    }

    // クラブデータの初期化
    if (!fs.existsSync(CLUBS_FILE)) {
      fs.writeFileSync(CLUBS_FILE, JSON.stringify(teams, null, 2))
    }

    // スケジュールデータの初期化
    if (!fs.existsSync(SCHEDULES_FILE)) {
      fs.writeFileSync(SCHEDULES_FILE, JSON.stringify(schedules, null, 2))
    }
  } catch (error) {
    console.error("データベースの初期化に失敗しました:", error)
  }
}

// クラブデータの取得
export function getClubs() {
  try {
    if (!fs.existsSync(CLUBS_FILE)) {
      return teams
    }
    const data = fs.readFileSync(CLUBS_FILE, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("クラブデータの取得に失敗しました:", error)
    return teams
  }
}

// 特定のクラブの取得
export function getClubById(id: string) {
  const clubs = getClubs()
  return clubs.find((club: any) => club.id === id)
}

// クラブの保存
export function saveClubs(clubs: any[]) {
  try {
    fs.writeFileSync(CLUBS_FILE, JSON.stringify(clubs, null, 2))
    return true
  } catch (error) {
    console.error("クラブデータの保存に失敗しました:", error)
    return false
  }
}

// クラブの追加
export function addClub(club: any) {
  const clubs = getClubs()
  clubs.push(club)
  return saveClubs(clubs)
}

// クラブの更新
export function updateClub(updatedClub: any) {
  const clubs = getClubs()
  const index = clubs.findIndex((club: any) => club.id === updatedClub.id)
  if (index !== -1) {
    clubs[index] = updatedClub
    return saveClubs(clubs)
  }
  return false
}

// クラブの削除
export function deleteClub(id: string) {
  const clubs = getClubs()
  const filteredClubs = clubs.filter((club: any) => club.id !== id)
  if (clubs.length !== filteredClubs.length) {
    return saveClubs(filteredClubs)
  }
  return false
}

// スケジュールデータの取得
export function getSchedules() {
  try {
    if (!fs.existsSync(SCHEDULES_FILE)) {
      return schedules
    }
    const data = fs.readFileSync(SCHEDULES_FILE, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("スケジュールデータの取得に失敗しました:", error)
    return schedules
  }
}

// 特定のスケジュールの取得
export function getScheduleById(id: string) {
  const schedules = getSchedules()
  return schedules.find((schedule: any) => schedule.id === id)
}

// スケジュールの保存
export function saveSchedules(schedules: any[]) {
  try {
    fs.writeFileSync(SCHEDULES_FILE, JSON.stringify(schedules, null, 2))
    return true
  } catch (error) {
    console.error("スケジュールデータの保存に失敗しました:", error)
    return false
  }
}

// スケジュールの追加
export function addSchedule(schedule: any) {
  const schedules = getSchedules()
  schedules.push(schedule)
  return saveSchedules(schedules)
}

// スケジュールの更新
export function updateSchedule(updatedSchedule: any) {
  const schedules = getSchedules()
  const index = schedules.findIndex((schedule: any) => schedule.id === updatedSchedule.id)
  if (index !== -1) {
    schedules[index] = updatedSchedule
    return saveSchedules(schedules)
  }
  return false
}

// スケジュールの削除
export function deleteSchedule(id: string) {
  const schedules = getSchedules()
  const filteredSchedules = schedules.filter((schedule: any) => schedule.id !== id)
  if (schedules.length !== filteredSchedules.length) {
    return saveSchedules(filteredSchedules)
  }
  return false
}

// データベースの初期化を実行
initDatabase()
