// APIクライアント関数

// クラブ関連のAPI
export async function fetchClubs() {
  const response = await fetch("/api/clubs")
  if (!response.ok) {
    throw new Error("クラブの取得に失敗しました")
  }
  return response.json()
}

export async function fetchClubById(id: string) {
  const response = await fetch(`/api/clubs/${id}`)
  if (!response.ok) {
    throw new Error("クラブの取得に失敗しました")
  }
  return response.json()
}

export async function createClub(clubData: any) {
  const response = await fetch("/api/clubs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clubData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "クラブの作成に失敗しました")
  }

  return response.json()
}

export async function updateClubById(id: string, clubData: any) {
  const response = await fetch(`/api/clubs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clubData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "クラブの更新に失敗しました")
  }

  return response.json()
}

export async function deleteClubById(id: string) {
  const response = await fetch(`/api/clubs/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "クラブの削除に失敗しました")
  }

  return response.json()
}

// スケジュール関連のAPI
export async function fetchSchedules() {
  const response = await fetch("/api/schedules")
  if (!response.ok) {
    throw new Error("スケジュールの取得に失敗しました")
  }
  return response.json()
}

export async function fetchScheduleById(id: string) {
  const response = await fetch(`/api/schedules/${id}`)
  if (!response.ok) {
    throw new Error("スケジュールの取得に失敗しました")
  }
  return response.json()
}

export async function createSchedule(scheduleData: any) {
  const response = await fetch("/api/schedules", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scheduleData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "スケジュールの作成に失敗しました")
  }

  return response.json()
}

export async function updateScheduleById(id: string, scheduleData: any) {
  const response = await fetch(`/api/schedules/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scheduleData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "スケジュールの更新に失敗しました")
  }

  return response.json()
}

export async function deleteScheduleById(id: string) {
  const response = await fetch(`/api/schedules/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "スケジュールの削除に失敗しました")
  }

  return response.json()
}
