

import { Metadata } from 'next';
import Link from 'next/link';
import * as React from 'react';
export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-kalpurush">
      <h2 className="text-2xl font-bold mb-4">পেজটি পাওয়া যায়নি!</h2>
      <p className="text-gray-600 mb-4">দুঃখিত, আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি।</p>
      <Link
        href="/search"
        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
