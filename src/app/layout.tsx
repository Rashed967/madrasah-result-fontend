import localFont from 'next/font/local';
import * as React from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

const kalpurush = localFont({
  src: '../../public/fonts/Kalpurush.ttf',
  variable: '--font-kalpurush',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={kalpurush.variable}>
      <body>{children}</body>
    </html>
  );
}
