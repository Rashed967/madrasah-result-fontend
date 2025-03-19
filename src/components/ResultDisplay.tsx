'use client';

import { useState } from 'react';
import { StudentResult } from '@/types/student';
import { MadrasahResult } from '@/types/madrasah';
import { StudentResultView } from './result/student/StudentResultView';
import { MadrasahResultView } from './result/madrasah/MadrasahResultView';


interface ResultDisplayProps {
  result: StudentResult | MadrasahResult;
  examType: string;
  searchType: 'individual' | 'madrasah';
}

export function ResultDisplay({ result, examType, searchType }: ResultDisplayProps) {
  const [isLoading, setIsLoading] = useState(false);
  const style = document.createElement("style");

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-700"></div>
      </div>
    );
  }

  return (
    <>

      {searchType === 'individual' ? (
        <div className={` bg-white p-4 text-sm relativ student-result w-full  print:w-full} `}>

          <StudentResultView
            result={result as StudentResult}
            examType={examType}
            isLoading={isLoading}

          />

        </div>
      ) : (
        <div className={` bg-white p-4 text-sm relative madrasah-result  }`}>
          <MadrasahResultView
            result={result as MadrasahResult}
            examType={examType}
            isLoading={isLoading}
          />
        </div>
      )}

    </>
  );
}

ResultDisplay.displayName = 'ResultDisplay';
