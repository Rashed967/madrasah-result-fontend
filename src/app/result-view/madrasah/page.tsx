'use client';

import { ResultDisplay } from '@/components/ResultDisplay';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MadrasahResultViewPage() {
  const router = useRouter();
  const [resultData, setResultData] = useState<any>(null);

  const handleBack = () => {
    try {
      const previousPage = document.referrer;
      if (previousPage && previousPage.includes('/search')) {
        window.history.back();
      } else {
        router.push('/search');
      }
    } catch (error) {
      router.push('/search');
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem('studentResultData');
    if (!savedData) {
      router.push('/search');
      return;
    }

    try {
      const data = JSON.parse(savedData);
      if (!data.result || !data.examType || data.searchType !== 'madrasah') {
        throw new Error('Invalid data');
      }
      setResultData(data);
    } catch (error) {
      router.push('/search');
    }
  }, [router]);

  if (!resultData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-700"></div>
      </div>
    );
  }

  return (
    <div className='bg-gray-100 font-kalpurush mx-auto mt-4 pb-4 mb-4 md:mt-24 border border-gray-300 print:w-full 
    print:border-none print:shadow-none print:mt-0 print:px-0 print:mb-0 print:bg-white'>
      <div className='bg-white px-4 md:px-8 print:px-0'>
        <button
          onClick={handleBack}
          className='mb-6 text-sm hover:text-gray-800 print:hidden flex items-center gap-2 px-2 py-1 rounded-md text-white bg-gray-600'
        >
          <Search className='w-4 h-4' />
          ফিরে যান
        </button>

        <ResultDisplay
          examType={resultData.examType}
          result={resultData.result}
          searchType="madrasah"
        />
      </div>
    </div>
  );
} 