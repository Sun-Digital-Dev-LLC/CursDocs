import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 text-2xl font-bold">歡迎使用 CursHosting 教學文檔</h1>
      <p className="text-fd-muted-foreground">
        您可以點選{' '}
        <Link
          href="/docs"
          className="text-fd-foreground font-semibold underline"
        >
          開始教學
        </Link>{' '}
        來了解您想要查詢的功能。
      </p>
    </main>
  );
}
