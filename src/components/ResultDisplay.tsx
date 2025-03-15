import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import '../app/globals.css';

import PrintButton from './PrintButton';
import { MarkSheet } from './result/MarkSheet';
import { StudentInfo } from './result/StudentInfo';
import { MadrasahResult } from '@/types/madrasah';
import { MadrasahResultDisplay } from './result/MadrasahResult';

import { StudentResult } from '@/types/student';
import StudentResultPdf from '@/components/resultPdf/studentResultPdf/StudentResultPdf';
import { Printer } from 'lucide-react';
import Link from 'next/link';

interface ResultDisplayProps {
  result: StudentResult | MadrasahResult;
  examType: string;
  searchType: 'individual' | 'madrasah';
}

export function ResultDisplay({ result, examType, searchType }: ResultDisplayProps) {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const dataToSave = {
      result,
      examType,
      searchType
    };
    localStorage.setItem('studentResultData', JSON.stringify(dataToSave));
  }, [result, examType, searchType]);

  const handlePrintClick = async () => {
    router.push('/student-result');

  };

  return (
    <div ref={contentRef} className='result-container text-sm relative'>
      <div className='print-header hidden print:block'>
        <div className='print-header-logo'>
          <Image
            src='/images/logo.jpg'
            alt='logo'
            width={75}
            height={75}
            priority
          />
        </div>
        <div className='print-header-content'>
          <h1>জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
          <h3>(বেফাকুল মাদারিসিদ্দীনিয়্যা বাংলাদেশ)</h3>
          <p>অস্থায়ী কার্যালয়: ৩৪১/৫ টি ভি রোড, পূর্ব রামপুরা, ঢাকা-১২১৯</p>
        </div>
      </div>
      <div>
        <h1 className='exam-name hidden print:block text-xl font-bold text-center mb-3'>
          {examType}
        </h1>
        {searchType === 'individual' && (
          <h3 className='text-lg font-normal text-center mb-4'>
            {(result as StudentResult).class}
          </h3>
        )}
      </div>
      {searchType === 'individual' ? (
        <>
          <StudentInfo result={result as StudentResult} />
          <MarkSheet result={result as StudentResult} />
        </>
      ) : (
        <MadrasahResultDisplay data={result as MadrasahResult} />
      )}
      {/* <div className='signature '>
        <Image
          src='/images/signature.jpg'
          alt='signature'
          width={80}
          height={60}
          priority
          className='-rotate-[4deg] '
        />
        <p className='signature-text border-b-[0.1px] mb-1 border-black'>
          পরীক্ষা নিয়ন্ত্রক
        </p>
        <p>(মাওলানা ফয়সাল উমর ফারুক)</p>
      </div> */}
      <div className='print-button mt-6 flex justify-center'>
        <button
          onClick={handlePrintClick}
          disabled={isLoading}
          className='rounded-lg bg-gray-700 w-64 py-1 text-white text-sm hover:bg-gray-600 transition-colors disabled:opacity-50'
        >
          {isLoading ? (
            <span>অপেক্ষা করুন...</span>
          ) : (
            <>
              <Printer className='inline-block w-3 h-4 mr-1' /> প্রিন্ট করুন
            </>
          )}
        </button>

      </div>
      {/* <StudentResultPdf result={result} /> */}
    </div >
  );
}

ResultDisplay.displayName = 'ResultDisplay';
