import Image from 'next/image';
import { useRef } from 'react';

import '../app/globals.css';

import PrintButton from './PrintButton';
import { MarkSheet } from './result/MarkSheet';
import { StudentInfo } from './result/StudentInfo';

import { StudentResult } from '@/types/student';

interface ResultDisplayProps {
  result: StudentResult;
  examType: string;
}

export function ResultDisplay({ result, examType }: ResultDisplayProps) {
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={printRef} className='result-container text-sm relative'>
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
        <h3 className='text-lg font-normal text-center mb-4 '>
          {result.class}
        </h3>
      </div>
      <StudentInfo result={result} />
      <MarkSheet result={result} />
      <div className='signature '>
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
      </div>
      <PrintButton printRef={printRef} />
    </div>
  );
}

ResultDisplay.displayName = 'ResultDisplay';
