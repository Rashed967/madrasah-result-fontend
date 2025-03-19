'use client';

import { ResultDisplay } from '@/components/ResultDisplay';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResultViewPage() {
  const router = useRouter();
  const [resultData, setResultData] = useState<any>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('studentResultData');
    if (!savedData) {
      router.push('/search');
      return;
    }

    try {
      const data = JSON.parse(savedData);
      if (!data.result || !data.examType) {
        throw new Error('Invalid data');
      }
      setResultData(data);
    } catch (error) {
      router.push('/search');
    }
  }, [router]);

  if (!resultData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='min-h-screen bg-gray-100 py-8 font-kalpurush'>
      <div className='mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg'>
        <button
          onClick={() => router.push('/search')}
          className='mb-6 text-sm text-gray-600 hover:text-gray-800'
        >
          ← ফিরে যান
        </button>

        <ResultDisplay
          examType={resultData.examType}
          result={resultData.result}
          searchType={resultData.searchType}
        />
      </div>
    </div>
  );
}
