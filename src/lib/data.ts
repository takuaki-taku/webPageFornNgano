// // 静的データ（実際の開発では、JSONファイルから読み込むか、APIから取得します）

// // チーム情報
// export const teams = [
//   {
//     id: "team1",
//     name: "長野市クラブ",
//     location: "長野市",
//     color: "#FF5733",
//     shortDescription:
//       "長野市を中心に活動する、県内最大規模のピックルボールクラブです。初心者から上級者まで幅広いレベルの方が参加しています。",
//     description:
//       "長野市クラブは、2020年に設立された長野県内最大規模のピックルボールクラブです。現在、約50名の会員が在籍しており、年齢層は20代から70代まで幅広く、男女比はほぼ半々となっています。\n\n当クラブでは、初心者から上級者まで、それぞれのレベルに合わせた練習メニューを用意しています。特に初心者の方には、経験者がマンツーマンで基本的な技術指導を行っています。\n\n定期的な練習会に加えて、月に一度の交流会や、年に数回の大会参加なども行っています。ピックルボールを通じて、健康増進はもちろん、地域の方々との交流も大切にしています。\n\n見学や体験参加も随時受け付けていますので、興味のある方はお気軽にお問い合わせください。",
//     memberCount: 50,
//     activityDays: "毎週水曜日・土曜日",
//     activityHours: "水曜日 19:00-21:00、土曜日 10:00-12:00",
//     activityLocation: "長野市総合体育館、長野市北部体育館",
//     fee: "入会金 2,000円、月会費 1,500円",
//     contactPerson: "山田太郎",
//     email: "nagano-club@example.com",
//     phone: "090-1234-5678",
//     website: "https://example.com/nagano-club",
//     imageUrl: "/placeholder.svg?height=300&width=300&text=長野市クラブ",
//     galleryImages: [
//       { url: "/placeholder.svg?height=200&width=300&text=活動写真1", alt: "練習風景" },
//       { url: "/placeholder.svg?height=200&width=300&text=活動写真2", alt: "大会参加" },
//       { url: "/placeholder.svg?height=200&width=300&text=活動写真3", alt: "交流会" },
//     ],
//   },
//   {
//     id: "team2",
//     name: "松本ピックルズ",
//     location: "松本市",
//     color: "#337DFF",
//     shortDescription:
//       "松本市を拠点に活動する、アットホームな雰囲気のクラブです。家族での参加も多く、和気あいあいとした練習が特徴です。",
//     description:
//       "松��ピックルズは、2021年に結成された松本市を拠点とするピックルボールクラブです。現在約30名の会員が在籍しており、家族での参加も多いのが特徴です。\n\n当クラブの最大の魅力は、アットホームな雰囲気です。競技としての上達を目指すだけでなく、スポーツを通じた交流を大切にしています。練習後には、しばしば懇親会を開催し、メンバー同士の親睦を深めています。\n\n毎月第一日曜日には、初心者向けの無料体験会を開催しています。ラケットやボールの貸し出しもありますので、手ぶらでお越しいただけます。ピックルボールに興味のある方は、ぜひ一度体験にいらしてください。",
//     memberCount: 30,
//     activityDays: "毎週日曜日・木曜日",
//     activityHours: "日曜日 13:00-15:00、木曜日 19:00-21:00",
//     activityLocation: "松本市民体育館、松本市総合体育館",
//     fee: "入会金 1,000円、月会費 1,000円",
//     contactPerson: "佐藤花子",
//     email: "matsumoto-pickles@example.com",
//     phone: "090-8765-4321",
//     website: "https://example.com/matsumoto-pickles",
//     imageUrl: "/placeholder.svg?height=300&width=300&text=松本ピックルズ",
//     galleryImages: [
//       { url: "/placeholder.svg?height=200&width=300&text=活動写真1", alt: "練習風景" },
//       { url: "/placeholder.svg?height=200&width=300&text=活動写真2", alt: "初心者講習会" },
//       { url: "/placeholder.svg?height=200&width=300&text=活動写真3", alt: "懇親会" },
//     ],
//   },
//   {
//     id: "team3",
//     name: "上田ピックルボールクラブ",
//     location: "上田市",
//     color: "#33FF57",
//     shortDescription:
//       "上田市を中心に活動する、競技志向のクラブです。県内外の大会に積極的に参加し、好成績を収めています。",
//     description:
//       "上田ピックルボールクラブは、2019年に設立された競技志向のクラブです。現在約25名の会員が在籍しており、県内外の大会に積極的に参加しています。\n\n当クラブは、競技としてのピックルボールの普及と競技レベルの向上を目指しています。練習では、基本技術の反復だけでなく、戦術的な要素も取り入れたメニューを実施しています。また、定期的に外部コーチを招いての特別練習会も開催しています。\n\n競技志向ではありますが、初心者の方も歓迎しています。経験豊富なメンバーが丁寧に指導しますので、短期間でのスキルアップが期待できます。ピックルボールを本格的に始めたい方は、ぜひ当クラブへお越しください。",
//     memberCount: 25,
//     activityDays: "毎週火曜日・金曜日・日曜日",
//     activityHours: "火曜日・金曜日 19:00-21:00、日曜日 9:00-12:00",
//     activityLocation: "上田市スポーツセンター、上田市民体育館",
//     fee: "入会金 3,000円、月会費 2,000円",
//     contactPerson: "鈴木一郎",
//     email: "ueda-pickleball@example.com",
//     phone: "090-2345-6789",
//     website: "https://example.com/ueda-pickleball",
//     imageUrl: "/placeholder.svg?height=300&width=300&text=上田ピックルボールクラブ",
//     galleryImages: [
//       { url: "/placeholder.svg?height=200&width=300&text=活動写真1", alt: "練習風景" },
//       { url: "/placeholder.svg?height=200&width=300&text=活動写真2", alt: "大会参加" },
//       { url: "/placeholder.svg?height=200&width=300&text=活動写真3", alt: "表彰式" },
//     ],
//   },
//   {
//     id: "team4",
//     name: "佐久ピックラーズ",
//     location: "佐久市",
//     color: "#F033FF",
//     shortDescription:
//       "佐久市を拠点に活動する、シニア世代中心のクラブです。健康維持と仲間づくりを目的に、楽しく活動しています。",
//     description:
//       "佐久ピックラーズは、2022年に結成されたシニア世代中心のピックルボールクラブです。現在約20名の会員が在籍しており、60代以上の方が中心となって活動しています。\n\n当クラブは、健康維持と仲間づくりを主な目的としています。激しい動きは少なく、それぞれのペースで楽しめる練習メニューを心がけています。また、月に一度は軽食を囲みながらの交流会も開催しています。\n\nピックルボールは、テニスなどに比べて体への負担が少なく、シニア世代でも始めやすいスポーツです。運動不足解消や新しい趣味をお探しの方は、ぜひ一度見学にいらしてください。",
//     memberCount: 20,
//     activityDays: "毎週月曜日・木曜日",
//     activityHours: "月曜日・木曜日 10:00-12:00",
//     activityLocation: "佐久市総合体育館、佐久市中央体育館",
//     fee: "入会金 1,000円、月会費 1,000円",
//     contactPerson: "高橋幸子",
//     email: "saku-picklers@example.com",
//     phone: "090-3456-7890",
//     website: null,
//     imageUrl: "/placeholder.svg?height=300&width=300&text=佐久ピックラーズ",
//     galleryImages: [
//       { url: "/placeholder.svg?height=200&width=300&text=活動写真1", alt: "練習風景" },
//       { url: "/placeholder.svg?height=200&width=300&text=活動写真2", alt: "交流会" },
//     ],
//   },
//   {
//     id: "team5",
//     name: "諏訪湖クラブ",
//     location: "諏訪市",
//     color: "#FFDD33",
//     shortDescription:
//       "諏訪市を中心に活動する、地域密着型のクラブです。地元の学校や公民館でのピックルボール普及活動も行っています。",
//     description:
//       "諏訪湖クラブは、2021年に設立された地域密着型のピックルボールクラブです。現在約15名の会員が在籍しており、地元諏訪市を中心に活動しています。\n\n当クラブの特徴は、地域へのピックルボール普及活動に力を入れていることです。地元の学校や公民館での体験会、高齢者施設での出張指導など、様々な形で地域に貢献しています。\n\n練習は週に2回行っていますが、それ以外にも会員同士で自主的に集まって練習することも多いです。和気あいあいとした雰囲気の中で、楽しくピックルボールを続けられる環境づくりを心がけています。\n\n地域の方々との交流を大切にしたい方、ピックルボールを通じて地域に貢献したい方は、ぜひ当クラブへご参加ください。",
//     memberCount: 15,
//     activityDays: "毎週水曜日・土曜日",
//     activityHours: "水曜日 18:00-20:00、土曜日 13:00-15:00",
//     activityLocation: "諏訪市民体育館、諏訪湖スポーツセンター",
//     fee: "入会金 1,000円、月会費 1,500円",
//     contactPerson: "田中誠",
//     email: "suwa-club@example.com",
//     phone: "090-4567-8901",
//     website: "https://example.com/suwa-club",
//     imageUrl: "/placeholder.svg?height=300&width=300&text=諏訪湖クラブ",
//     galleryImages: [
//       { url: "/placeholder.svg?height=200&width=300&text=活動写真1", alt: "練習風景" },
//       { url: "/placeholder.svg?height=200&width=300&text=活動写真2", alt: "地域イベント" },
//       { url: "/placeholder.svg?height=200&width=300&text=活動写真3", alt: "学校での体験会" },
//     ],
//   },
// ]

// // スケジュール情報
// export const schedules = [
//   {
//     id: "sched1",
//     teamId: "team1",
//     date: "2025-06-01",
//     time: "10:00 - 12:00",
//     location: "長野市総合体育館",
//     details: "基礎練習とミニゲームを行います。初心者歓迎！",
//     isPublic: true,
//   },
//   {
//     id: "sched2",
//     teamId: "team2",
//     date: "2025-06-05",
//     time: "19:00 - 21:00",
//     location: "松本市民体育館",
//     details: "交流会形式の練習です。他チームの方も参加可能です。",
//     isPublic: true,
//   },
//   {
//     id: "sched3",
//     teamId: "team3",
//     date: "2025-06-08",
//     time: "13:00 - 15:00",
//     location: "上田市スポーツセンター",
//     details: "ダブルス練習会を開催します。パートナーがいなくても参加できます。",
//     isPublic: true,
//   },
//   {
//     id: "sched4",
//     teamId: "team4",
//     date: "2025-06-10",
//     time: "18:30 - 20:30",
//     location: "佐久市総合体育館",
//     details: "技術向上のための練習会です。中級者以上向けです。",
//     isPublic: true,
//   },
//   {
//     id: "sched5",
//     teamId: "team5",
//     date: "2025-06-12",
//     time: "10:00 - 12:00",
//     location: "諏訪市民体育館",
//     details: "初心者向け講習会を開催します。道具の貸し出しあります。",
//     isPublic: true,
//   },
//   // 同じチームの複数スケジュール例
//   {
//     id: "sched6",
//     teamId: "team1",
//     date: "2025-06-03",
//     time: "19:00 - 21:00",
//     location: "長野市北部体育館",
//     details: "夜間練習会。仕事帰りの方も参加しやすい時間帯です。",
//     isPublic: true,
//   },
//   {
//     id: "sched7",
//     teamId: "team2",
//     date: "2025-06-15",
//     time: "10:00 - 12:00",
//     location: "松本市総合体育館",
//     details: "初心者向け基礎練習会。ラケットの貸し出しあります。",
//     isPublic: true,
//   },
//   {
//     id: "sched8",
//     teamId: "team1",
//     date: "2025-06-08",
//     time: "14:00 - 16:00",
//     location: "長野市南長野運動公園",
//     details: "屋外コートでの練習会。天候により中止の場合あり。",
//     isPublic: true,
//   },
//   {
//     id: "sched9",
//     teamId: "team3",
//     date: "2025-06-20",
//     time: "18:00 - 20:00",
//     location: "上田市民体育館",
//     details: "ゲーム形式の練習会。チーム対抗戦を行います。",
//     isPublic: true,
//   },
//   {
//     id: "sched10",
//     teamId: "team4",
//     date: "2025-06-25",
//     time: "10:00 - 12:00",
//     location: "佐久市中央体育館",
//     details: "シニア向け練習会。60歳以上の方を対象としています。",
//     isPublic: true,
//   },
// ]

// // お知らせ情報
// export const announcements = [
//   {
//     id: "info1",
//     date: "2025-05-20",
//     title: "第1回 長野県ピックルボール大会開催のお知らせ",
//     summary: "長野市で初の公式大会を開催します。参加者募集中！",
//     content:
//       "2025年7月15日（土）、長野市総合体育館にて「第1回 長野県ピックルボール大会」を開催します。\n\n" +
//       "【開催日時】2025年7月15日（土）9:00〜17:00\n" +
//       "【開催場所】長野市総合体育館\n" +
//       "【参加費】一般 3,000円、学生 1,500円\n" +
//       "【種目】一般男女ダブルス、ミックスダブルス、シニア（60歳以上）ダブルス\n\n" +
//       "参加申し込みは6月30日までにWebフォームからお願いします。初心者から上級者まで、幅広いレベルの方が楽しめる大会です。奮ってご参加ください。",
//     isPublished: true,
//   },
//   {
//     id: "info2",
//     date: "2025-05-18",
//     title: "ウェブサイト公開のお知らせ",
//     summary: "長野県ピックルボール情報サイトを公開しました！",
//     content:
//       "この度、長野県内のピックルボール愛好家の皆様に向けて、「長野県ピックルボール情報サイト」を公開しました。\n\n" +
//       "このサイトでは、県内各チームの練習スケジュールや大会情報、イベント告知などを一元的に確認することができます。\n\n" +
//       "今後も情報を随時更新していきますので、ぜひブックマークしてご活用ください。\n" +
//       "サイトに関するご意見・ご要望は、お問い合わせフォームからお寄せください。",
//     isPublished: true,
//   },
//   {
//     id: "info3",
//     date: "2025-05-15",
//     title: "ピックルボール初心者講習会のご案内",
//     summary: "松本市で初心者向け講習会を開催します。参加費無料！",
//     content:
//       "ピックルボールに興味はあるけれど、始め方が分からない…そんな方のために、初心者向け講習会を開催します！\n\n" +
//       "【開催日時】2025年6月10日（月）18:30〜20:30\n" +
//       "【開催場所】松本市民体育館\n" +
//       "【参加費】無料\n" +
//       "【定員】20名（先着順）\n" +
//       "【持ち物】運動できる服装、室内シューズ\n\n" +
//       "ラケットやボールは貸し出しがありますので、手ぶらでお越しいただけます。\n" +
//       "お申し込みは、松本ピックルズのLINE公式アカウントからお願いします。",
//     isPublished: true,
//   },
//   {
//     id: "info4",
//     date: "2025-05-10",
//     title: "長野県ピックルボール協会設立について",
//     summary: "県内のピックルボール普及を目指して協会を設立しました。",
//     content:
//       "この度、長野県内のピックルボール普及と競技レベル向上を目指して、「長野県ピックルボール協会」を設立しました。\n\n" +
//       "協会では、以下の活動を行っていきます：\n" +
//       "・県内大会の企画・運営\n" +
//       "・指導者育成プログラムの実施\n" +
//       "・全国大会への選手派遣\n" +
//       "・ピックルボール普及イベントの開催\n\n" +
//       "協会への加入は随時受け付けております。詳細は協会事務局までお問い合わせください。",
//     isPublished: true,
//   },
// ]

// // 最新のお知らせを取得する関数
// export function getLatestAnnouncements(count = 3) {
//   // 日付の新しい順に並べ替え
//   return [...announcements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count)
// }

// // 直近のスケジュールを取得する関数
// export function getUpcomingSchedules(count = 3) {
//   // 日付順に並べ替え
//   const sortedSchedules = [...schedules].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

//   // チーム情報を付加
//   return sortedSchedules.slice(0, count).map((schedule) => {
//     const team = teams.find((t) => t.id === schedule.teamId)
//     return {
//       ...schedule,
//       teamName: team?.name || "不明なチーム",
//       teamColor: team?.color || "#CCCCCC",
//     }
//   })
// }

// // スケジュールをチームごとにグループ化する関数
// export function getSchedulesByTeam() {
//   const result: Record<string, any[]> = {}

//   teams.forEach((team) => {
//     result[team.id] = schedules
//       .filter((schedule) => schedule.teamId === team.id)
//       .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
//       .map((schedule) => ({
//         ...schedule,
//         teamName: team.name,
//         teamColor: team.color,
//       }))
//   })

//   return result
// }

// // お知らせの詳細を取得する関数
// export function getAnnouncementById(id: string) {
//   return announcements.find((announcement) => announcement.id === id)
// }

// // チーム一覧を取得する関数
// export function getAllTeams() {
//   return teams
// }

// // チームの詳細を取得する関数
// export function getTeamById(id: string) {
//   return teams.find((team) => team.id === id)
// }

// // チームのスケジュールを取得する関数
// export function getTeamSchedules(teamId: string, count?: number) {
//   const teamSchedules = schedules
//     .filter((schedule) => schedule.teamId === teamId)
//     .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
//     .map((schedule) => {
//       const team = teams.find((t) => t.id === schedule.teamId)
//       return {
//         ...schedule,
//         teamName: team?.name || "不明なチーム",
//         teamColor: team?.color || "#CCCCCC",
//       }
//     })

//   if (count) {
//     return teamSchedules.slice(0, count)
//   }

//   return teamSchedules
// }
