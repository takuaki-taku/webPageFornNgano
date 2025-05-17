// 静的データ（実際の開発では、JSONファイルから読み込むか、APIから取得します）

// チーム情報
export const teams = [
  { id: "team1", name: "長野市クラブ", location: "長野市", color: "#FF5733" },
  { id: "team2", name: "松本ピックルズ", location: "松本市", color: "#337DFF" },
  { id: "team3", name: "上田ピックルボールクラブ", location: "上田市", color: "#33FF57" },
  { id: "team4", name: "佐久ピックラーズ", location: "佐久市", color: "#F033FF" },
  { id: "team5", name: "諏訪湖クラブ", location: "諏訪市", color: "#FFDD33" },
]

// スケジュール情報
export const schedules = [
  {
    id: "sched1",
    teamId: "team1",
    date: "2025-06-01",
    time: "10:00 - 12:00",
    location: "長野市総合体育館",
    details: "基礎練習とミニゲームを行います。初心者歓迎！",
    isPublic: true,
  },
  {
    id: "sched2",
    teamId: "team2",
    date: "2025-06-05",
    time: "19:00 - 21:00",
    location: "松本市民体育館",
    details: "交流会形式の練習です。他チームの方も参加可能です。",
    isPublic: true,
  },
  {
    id: "sched3",
    teamId: "team3",
    date: "2025-06-08",
    time: "13:00 - 15:00",
    location: "上田市スポーツセンター",
    details: "ダブルス練習会を開催します。パートナーがいなくても参加できます。",
    isPublic: true,
  },
  {
    id: "sched4",
    teamId: "team4",
    date: "2025-06-10",
    time: "18:30 - 20:30",
    location: "佐久市総合体育館",
    details: "技術向上のための練習会です。中級者以上向けです。",
    isPublic: true,
  },
  {
    id: "sched5",
    teamId: "team5",
    date: "2025-06-12",
    time: "10:00 - 12:00",
    location: "諏訪市民体育館",
    details: "初心者向け講習会を開催します。道具の貸し出しあります。",
    isPublic: true,
  },
  // 同じチームの複数スケジュール例
  {
    id: "sched6",
    teamId: "team1",
    date: "2025-06-03",
    time: "19:00 - 21:00",
    location: "長野市北部体育館",
    details: "夜間練習会。仕事帰りの方も参加しやすい時間帯です。",
    isPublic: true,
  },
  {
    id: "sched7",
    teamId: "team2",
    date: "2025-06-15",
    time: "10:00 - 12:00",
    location: "松本市総合体育館",
    details: "初心者向け基礎練習会。ラケットの貸し出しあります。",
    isPublic: true,
  },
  {
    id: "sched8",
    teamId: "team1",
    date: "2025-06-08",
    time: "14:00 - 16:00",
    location: "長野市南長野運動公園",
    details: "屋外コートでの練習会。天候により中止の場合あり。",
    isPublic: true,
  },
  {
    id: "sched9",
    teamId: "team3",
    date: "2025-06-20",
    time: "18:00 - 20:00",
    location: "上田市民体育館",
    details: "ゲーム形式の練習会。チーム対抗戦を行います。",
    isPublic: true,
  },
  {
    id: "sched10",
    teamId: "team4",
    date: "2025-06-25",
    time: "10:00 - 12:00",
    location: "佐久市中央体育館",
    details: "シニア向け練習会。60歳以上の方を対象としています。",
    isPublic: true,
  },
]

// お知らせ情報
export const announcements = [
  {
    id: "info1",
    date: "2025-05-20",
    title: "第1回 長野県ピックルボール大会開催のお知らせ",
    summary: "長野市で初の公式大会を開催します。参加者募集中！",
    content:
      "2025年7月15日（土）、長野市総合体育館にて「第1回 長野県ピックルボール大会」を開催します。\n\n" +
      "【開催日時】2025年7月15日（土）9:00〜17:00\n" +
      "【開催場所】長野市総合体育館\n" +
      "【参加費】一般 3,000円、学生 1,500円\n" +
      "【種目】一般男女ダブルス、ミックスダブルス、シニア（60歳以上）ダブルス\n\n" +
      "参加申し込みは6月30日までにWebフォームからお願いします。初心者から上級者まで、幅広いレベルの方が楽しめる大会です。奮ってご参加ください。",
    isPublished: true,
  },
  {
    id: "info2",
    date: "2025-05-18",
    title: "ウェブサイト公開のお知らせ",
    summary: "長野県ピックルボール情報サイトを公開しました！",
    content:
      "この度、長野県内のピックルボール愛好家の皆様に向けて、「長野県ピックルボール情報サイト」を公開しました。\n\n" +
      "このサイトでは、県内各チームの練習スケジュールや大会情報、イベント告知などを一元的に確認することができます。\n\n" +
      "今後も情報を随時更新していきますので、ぜひブックマークしてご活用ください。\n" +
      "サイトに関するご意見・ご要望は、お問い合わせフォームからお寄せください。",
    isPublished: true,
  },
  {
    id: "info3",
    date: "2025-05-15",
    title: "ピックルボール初心者講習会のご案内",
    summary: "松本市で初心者向け講習会を開催します。参加費無料！",
    content:
      "ピックルボールに興味はあるけれど、始め方が分からない…そんな方のために、初心者向け講習会を開催します！\n\n" +
      "【開催日時】2025年6月10日（月）18:30〜20:30\n" +
      "【開催場所】松本市民体育館\n" +
      "【参加費】無料\n" +
      "【定員】20名（先着順）\n" +
      "【持ち物】運動できる服装、室内シューズ\n\n" +
      "ラケットやボールは貸し出しがありますので、手ぶらでお越しいただけます。\n" +
      "お申し込みは、松本ピックルズのLINE公式アカウントからお願いします。",
    isPublished: true,
  },
  {
    id: "info4",
    date: "2025-05-10",
    title: "長野県ピックルボール協会設立について",
    summary: "県内のピックルボール普及を目指して協会を設立しました。",
    content:
      "この度、長野県内のピックルボール普及と競技レベル向上を目指して、「長野県ピックルボール協会」を設立しました。\n\n" +
      "協会では、以下の活動を行っていきます：\n" +
      "・県内大会の企画・運営\n" +
      "・指導者育成プログラムの実施\n" +
      "・全国大会への選手派遣\n" +
      "・ピックルボール普及イベントの開催\n\n" +
      "協会への加入は随時受け付けております。詳細は協会事務局までお問い合わせください。",
    isPublished: true,
  },
]

// 最新のお知らせを取得する関数
export function getLatestAnnouncements(count = 3) {
  // 日付の新しい順に並べ替え
  return [...announcements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count)
}

// 直近のスケジュールを取得する関数
export function getUpcomingSchedules(count = 3) {
  // 日付順に並べ替え
  const sortedSchedules = [...schedules].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // チーム情報を付加
  return sortedSchedules.slice(0, count).map((schedule) => {
    const team = teams.find((t) => t.id === schedule.teamId)
    return {
      ...schedule,
      teamName: team?.name || "不明なチーム",
      teamColor: team?.color || "#CCCCCC",
    }
  })
}

// スケジュールをチームごとにグループ化する関数
export function getSchedulesByTeam() {
  const result: Record<string, any[]> = {}

  teams.forEach((team) => {
    result[team.id] = schedules
      .filter((schedule) => schedule.teamId === team.id)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((schedule) => ({
        ...schedule,
        teamName: team.name,
        teamColor: team.color,
      }))
  })

  return result
}

// お知らせの詳細を取得する関数
export function getAnnouncementById(id: string) {
  return announcements.find((announcement) => announcement.id === id)
}
