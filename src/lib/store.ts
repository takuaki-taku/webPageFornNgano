import { create } from "zustand"
import * as api from "./api"

// クラブストアの型定義
interface ClubState {
  clubs: any[]
  loading: boolean
  error: string | null
  fetchClubs: () => Promise<void>
  addClub: (club: any) => Promise<any>
  updateClub: (club: any) => Promise<any>
  deleteClub: (id: string) => Promise<void>
}

// スケジュールストアの型定義
interface ScheduleState {
  schedules: any[]
  loading: boolean
  error: string | null
  fetchSchedules: () => Promise<void>
  addSchedule: (schedule: any) => Promise<any>
  updateSchedule: (schedule: any) => Promise<any>
  deleteSchedule: (id: string) => Promise<void>
}

// クラブストアの作成
export const useClubStore = create<ClubState>((set, get) => ({
  clubs: [],
  loading: false,
  error: null,

  fetchClubs: async () => {
    set({ loading: true, error: null })
    try {
      const clubs = await api.fetchClubs()
      set({ clubs, loading: false })
    } catch (error) {
      console.error("クラブの取得に失敗しました:", error)
      set({ error: (error as Error).message, loading: false })
    }
  },

  addClub: async (clubData) => {
    set({ loading: true, error: null })
    try {
      const newClub = await api.createClub(clubData)
      set((state) => ({
        clubs: [...state.clubs, newClub],
        loading: false,
      }))
      return newClub
    } catch (error) {
      console.error("クラブの追加に失敗しました:", error)
      set({ error: (error as Error).message, loading: false })
      throw error
    }
  },

  updateClub: async (clubData) => {
    set({ loading: true, error: null })
    try {
      const updatedClub = await api.updateClubById(clubData.id, clubData)
      set((state) => ({
        clubs: state.clubs.map((club) => (club.id === updatedClub.id ? updatedClub : club)),
        loading: false,
      }))
      return updatedClub
    } catch (error) {
      console.error("クラブの更新に失敗しました:", error)
      set({ error: (error as Error).message, loading: false })
      throw error
    }
  },

  deleteClub: async (id) => {
    set({ loading: true, error: null })
    try {
      await api.deleteClubById(id)
      set((state) => ({
        clubs: state.clubs.filter((club) => club.id !== id),
        loading: false,
      }))
    } catch (error) {
      console.error("クラブの削除に失敗しました:", error)
      set({ error: (error as Error).message, loading: false })
      throw error
    }
  },
}))

// スケジュールストアの作成
export const useScheduleStore = create<ScheduleState>((set, get) => ({
  schedules: [],
  loading: false,
  error: null,

  fetchSchedules: async () => {
    set({ loading: true, error: null })
    try {
      const schedules = await api.fetchSchedules()
      set({ schedules, loading: false })
    } catch (error) {
      console.error("スケジュールの取得に失敗しました:", error)
      set({ error: (error as Error).message, loading: false })
    }
  },

  addSchedule: async (scheduleData) => {
    set({ loading: true, error: null })
    try {
      const newSchedule = await api.createSchedule(scheduleData)
      set((state) => ({
        schedules: [...state.schedules, newSchedule],
        loading: false,
      }))
      return newSchedule
    } catch (error) {
      console.error("スケジュールの追加に失敗しました:", error)
      set({ error: (error as Error).message, loading: false })
      throw error
    }
  },

  updateSchedule: async (scheduleData) => {
    set({ loading: true, error: null })
    try {
      const updatedSchedule = await api.updateScheduleById(scheduleData.id, scheduleData)
      set((state) => ({
        schedules: state.schedules.map((schedule) => (schedule.id === updatedSchedule.id ? updatedSchedule : schedule)),
        loading: false,
      }))
      return updatedSchedule
    } catch (error) {
      console.error("スケジュールの更新に失敗しました:", error)
      set({ error: (error as Error).message, loading: false })
      throw error
    }
  },

  deleteSchedule: async (id) => {
    set({ loading: true, error: null })
    try {
      await api.deleteScheduleById(id)
      set((state) => ({
        schedules: state.schedules.filter((schedule) => schedule.id !== id),
        loading: false,
      }))
    } catch (error) {
      console.error("スケジュールの削除に失敗しました:", error)
      set({ error: (error as Error).message, loading: false })
      throw error
    }
  },
}))
