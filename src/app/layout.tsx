// 'use client';
import '@/app/globals.css';
import { Metadata } from 'next';

import React from 'react';
// import '@/styles/globals.css'; // Ensure this path is correct

export const metadata: Metadata = {
  title: 'জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ',
  description: 'জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ এর রেজাল্ট',
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'icon', url: '/icon.png' },
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='bn'>
      <head>
        <title>জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</title>
        <meta name="description" content="জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ এর রেজাল্ট" />
      </head>
      <body suppressHydrationWarning={true}>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>{children}</main>
      </body>
    </html>
  );
}
