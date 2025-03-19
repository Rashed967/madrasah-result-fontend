'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ResultViewPage() {
  const router = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem('studentResultData');
    if (!savedData) {
      window.location.href = '/search';
      return;
    }

    try {
      const data = JSON.parse(savedData);
      if (!data.searchType) {
        throw new Error('Invalid data');
      }

      // Redirect based on search type using window.location
      if (data.searchType === 'individual') {
        window.location.href = '/result-view/student';
      } else {
        window.location.href = '/result-view/madrasah';
      }
    } catch (error) {
      window.location.href = '/search';
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