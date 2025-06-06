'use client';

import { ResultDisplay } from '@/components/ResultDisplay';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function StudentResultViewPage() {
  const router = useRouter();
  const [resultData, setResultData] = useState<any>(null);

  const handleBack = () => {
    router.push('/search');
  };

  useEffect(() => {
    const savedData = localStorage.getItem('studentResultData');
    if (!savedData) {
      router.push('/search');
      return;
    }

    try {
      const data = JSON.parse(savedData);
      if (!data.result || !data.examType || data.searchType !== 'individual') {
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
    <div className='bg-gray-100 font-kalpurush mx-auto mt-4 md:mt-24 border border-gray-300 max-w-4xl 
    print:border-none print:shadow-none print:mt-0 print:px-0 print:max-w-none'>
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
          searchType="individual"
        />
      </div>
    </div>
  );
} 