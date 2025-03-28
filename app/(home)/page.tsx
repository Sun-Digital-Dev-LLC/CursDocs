import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-md mb-8 text-center">
      <Image 
        src="/CursHosting_banner.png" 
        alt="CursHosting Banner" 
        className="mx-auto"
        width={500}
        height={300}
        priority
      />
      </div>
      <div className="text-center max-w-md">
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
      </div>
    </main>
  );
}
