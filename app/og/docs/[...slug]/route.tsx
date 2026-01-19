import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  // 移除最後的 'image.png' 來獲取實際的頁面 slug
  const page = source.getPage(slug.slice(0, -1));

  if (!page) notFound();

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #1a1a1a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1a1a 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '60px 80px',
        }}
      >
        {/* Logo / Site Name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.curshosting.net/Curs_docs_banner.svg"
            alt="CursHosting Docs"
            width={320}
            height={76}
            style={{
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
              margin: 0,
              maxWidth: '900px',
            }}
          >
            {page.data.title}
          </h1>

          {page.data.description && (
            <p
              style={{
                fontSize: '28px',
                color: '#a1a1aa',
                marginTop: '24px',
                lineHeight: 1.5,
                maxWidth: '800px',
              }}
            >
              {page.data.description}
            </p>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '40px',
          }}
        >
          <span
            style={{
              fontSize: '20px',
              color: '#71717a',
            }}
          >
            docs.curshosting.com
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
              }}
            />
            <span
              style={{
                fontSize: '18px',
                color: '#71717a',
              }}
            >
              教學文檔
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}
