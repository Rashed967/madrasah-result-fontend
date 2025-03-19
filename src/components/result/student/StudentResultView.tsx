'use client';

import { StudentResult } from '@/types/student';
import { StudentInfo } from '../StudentInfo';
import { MarkSheet } from '../MarkSheet';
import { PrintButton } from '../PrintButton';
import { currentBanglaDate } from '@/utils/currentBannglaDate';
import PrintHeaderForStudent from '@/components/printHeaderForStudent';
import Signature from '@/components/Signature';
import TopHeaderForStudentResultPage from '@/components/TopHeaderForStudentResultPage';

interface StudentResultViewProps {
  result: StudentResult;
  examType: string;
  isLoading: boolean;
  onPrint: () => void;
}

export function StudentResultView({ result, examType, isLoading, onPrint }: StudentResultViewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-full print:py-3">
      <TopHeaderForStudentResultPage />
      <PrintHeaderForStudent />

      <div className="text-center mt-6 mb-4">
        <h2 className="text-[22px] font-bold hidden print:block">{examType}</h2>
        <p className=" text-lg font-semibold">মারহালা: {result.class}</p>
      </div>

      <StudentInfo result={result} />
      <MarkSheet result={result} />

      <Signature />

      <div className="print-hidden">
        <PrintButton isLoading={isLoading} onClick={handlePrint} />
      </div>
    </div>
  );
} 