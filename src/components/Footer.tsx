import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">長野県ピックルボール協会</h3>
            <p className="text-sm text-muted-foreground">
              長野県内のピックルボール愛好家に向けた公式サイトです。
              県内チームの活動スケジュールと大会・イベント情報を集約しています。
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">リンク</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                ホーム
              </Link>
              <Link href="/clubs" className="text-sm text-muted-foreground hover:text-foreground">
                クラブ一覧
              </Link>
              <Link href="/schedule" className="text-sm text-muted-foreground hover:text-foreground">
                スケジュール
              </Link>
              <Link href="/announcement" className="text-sm text-muted-foreground hover:text-foreground">
                お知らせ
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">お問い合わせ</h3>
            <p className="text-sm text-muted-foreground">
              お問い合わせは以下のメールアドレスまでお願いします。
              <br />
              <a href="mailto:info@example.com" className="text-primary hover:underline">
                info@example.com
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} 長野県ピックルボール協会. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
