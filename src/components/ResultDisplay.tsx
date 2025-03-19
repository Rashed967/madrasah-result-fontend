'use client';

import { useState } from 'react';
import { StudentResult } from '@/types/student';
import { MadrasahResult } from '@/types/madrasah';
import { StudentResultView } from './result/student/StudentResultView';
import { MadrasahResultView } from './result/madrasah/MadrasahResultView';
import { generateStudentPdf } from '@/utils/generateStudentPdf';
import { generateMadrasahPdf } from '@/utils/generateMadrasahPdf';

interface ResultDisplayProps {
  result: StudentResult | MadrasahResult;
  examType: string;
  searchType: 'individual' | 'madrasah';
}

export function ResultDisplay({ result, examType, searchType }: ResultDisplayProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleStudentPrint = async () => {
    setIsLoading(true);
    try {
      await generateStudentPdf(result as StudentResult, examType);
    } catch (error) {
      console.error('Print error:', error);
    }
    setIsLoading(false);
  };

  const handleMadrasahPrint = async () => {
    setIsLoading(true);
    try {
      await generateMadrasahPdf(result as MadrasahResult, examType);
    } catch (error) {
      console.error('Print error:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className='result-container text-sm relative'>
      {searchType === 'individual' ? (
        <StudentResultView
          result={result as StudentResult}
          examType={examType}
          isLoading={isLoading}
          onPrint={handleStudentPrint}
        />
      ) : (
        <MadrasahResultView
          result={result as MadrasahResult}
          examType={examType}
          isLoading={isLoading}
          onPrint={handleMadrasahPrint}
        />
      )}
    </div>
  );
}

ResultDisplay.displayName = 'ResultDisplay';
