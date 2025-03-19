'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ResultViewPage() {
  const router = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem('studentResultData');
    if (!savedData) {
      router.push('/search');
      return;
    }

    try {
      const data = JSON.parse(savedData);
      if (!data.searchType) {
        throw new Error('Invalid data');
      }

      // Redirect based on search type
      if (data.searchType === 'individual') {
        router.push('/result-view/student');
      } else {
        router.push('/result-view/madrasah');
      }
    } catch (error) {
      router.push('/search');
    }
  }, [router]);

  return <div>Loading...</div>;
} 