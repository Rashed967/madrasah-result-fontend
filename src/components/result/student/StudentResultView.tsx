'use client';

import { StudentResult } from '@/types/student';
import { StudentInfo } from '../StudentInfo';
import { MarkSheet } from '../MarkSheet';
import { PrintButton } from '../PrintButton';

interface StudentResultViewProps {
  result: StudentResult;
  examType: string;
  isLoading: boolean;
  onPrint: () => void;
}

export function StudentResultView({ result, examType, isLoading, onPrint }: StudentResultViewProps) {
  return (
    <>
      <StudentInfo result={result} />
      <MarkSheet result={result} />
      <PrintButton isLoading={isLoading} onClick={onPrint} />
    </>
  );
} 