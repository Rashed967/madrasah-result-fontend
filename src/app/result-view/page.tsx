'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ResultViewPage() {
  const router = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem('studentResultData');
    if (!savedData) {
      router.replace('/search');
      return;
    }

    try {
      const data = JSON.parse(savedData);
      if (!data.searchType) {
        throw new Error('Invalid data');
      }

      // Redirect based on search type using router.replace()
      if (data.searchType === 'individual') {
        router.replace('/result-view/student');
      } else {
        router.replace('/result-view/madrasah');
      }
    } catch (error) {
      router.replace('/search');
    }
  }, [router]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-700"></div>
      </div>
    </>
  );
} 