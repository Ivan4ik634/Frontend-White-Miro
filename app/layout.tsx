import { GlobalSearch } from '@/components/shared/Header/GlobalSearch';
import { TopBarMobile } from '@/components/shared/TopBarMobile';
import { ClientOnlyProvider } from '@/providers/ClientOnlyProvider';
import { I18nProvider } from '@/providers/I18nProvider';
import { QueryProviderClient } from '@/providers/QueryProviderClient';
import { ThemeProvider } from '@/providers/ThemeProvider';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'cyrillic', 'vietnamese'],
});

export const metadata: Metadata = {
  title: 'White Miro',
  description: 'Create board and tasks',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${montserrat.variable} antialiased`} lang="en">
      <head>
        <meta property="og:title" content="White Miro" />
        <meta property="og:description" content="Create board and tasks, work team!" />
        <meta property="og:image" content="https://white-miro.vercel.app/White-Miro.png" />
        <meta property="og:url" content="https://white-miro.vercel.app/" />
        <meta property="og:type" content="website" />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/White-Miro.png" />
      </head>
      <body style={{ fontFamily: 'var(--font-montserrat)' }}>
        <ClientOnlyProvider>
          <QueryProviderClient>
            <I18nProvider>
              <ThemeProvider>
                <TopBarMobile />

                {children}
              </ThemeProvider>
            </I18nProvider>
          </QueryProviderClient>
          <GlobalSearch />
        </ClientOnlyProvider>
        <Toaster />

        <Script
          id={'onesignal'}
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          defer
        ></Script>
        <Script id={'onesignal'}>
          {` window.OneSignalDeferred = window.OneSignalDeferred || [];
  OneSignalDeferred.push(async function(OneSignal) {
    await OneSignal.init({
      appId: "${process.env.NEXT_PUBLIC_ONESIGNAL_ID!}"
    });
  });`}
        </Script>
      </body>
    </html>
  );
}
