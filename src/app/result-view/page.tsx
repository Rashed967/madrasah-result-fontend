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
    <div className=' bg-gray-100 font-kalpurush w-11/12 md:w-3/4 max-w-screen-lg mx-auto mt-4  md:mt-24 border border-gray-300 print:w-full print:h-[297mm]
    print:border-none print:shadow-none  print:mt-0 print:px-0 '>
      <div className=' bg-white  px-4 md:px-8 '>
        <button
          onClick={() => router.push('/search')}
          className='mb-6 text-sm text-gray-600 hover:text-gray-800 print:hidden'
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
