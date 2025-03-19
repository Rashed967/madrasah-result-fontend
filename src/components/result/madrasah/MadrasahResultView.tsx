'use client';

import { MadrasahResult } from '@/types/madrasah';
import { MadrasahResultDisplay } from '../MadrasahResult';
import { PrintButton } from '../PrintButton';

interface MadrasahResultViewProps {
  result: MadrasahResult;
  examType: string;
  isLoading: boolean;
  onPrint: () => void;
}

export function MadrasahResultView({ result, examType, isLoading, onPrint }: MadrasahResultViewProps) {
  return (
    <>
      <PrintButton isLoading={isLoading} onClick={onPrint} />
      <MadrasahResultDisplay data={result} />
    </>
  );
} 