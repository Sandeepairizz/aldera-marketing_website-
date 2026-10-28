import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const sans = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aldera /studio — Independent Design and Marketing Studio',
  description:
    'Aldera is an independent design and marketing studio for ambitious brands. Identity, packaging, campaigns, web and content.',
  metadataBase: new URL('https://aldera.studio'),
  icons: {
    icon: "data:image/svg+xml,%3Csvg viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='48' height='48' rx='10' fill='%230A0A0A'/%3E%3Ccircle cx='34' cy='34' r='12' fill='%23F5F5F0'/%3E%3C/svg%3E",
    shortcut: "data:image/svg+xml,%3Csvg viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='48' height='48' rx='10' fill='%230A0A0A'/%3E%3Ccircle cx='34' cy='34' r='12' fill='%23F5F5F0'/%3E%3C/svg%3E",
  },
  openGraph: {
    title: 'Aldera /studio — Independent Design and Marketing Studio',
    description: 'Brands, campaigns and products people remember.',
    url: 'https://aldera.studio',
    siteName: 'Aldera',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aldera /studio — Independent Design and Marketing Studio',
    description: 'Brands, campaigns and products people remember.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#F5F5F0',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('aldera_loader_played') === 'true') {
                  document.documentElement.classList.add('aldera-loader-done');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="bg-porcelain text-onyx selection:bg-electric-red selection:text-onyx antialiased">
        {children}
      </body>
    </html>
  );
}
