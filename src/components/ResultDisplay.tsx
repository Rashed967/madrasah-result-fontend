import { PrintButton } from './PrintButton';
import { MarkSheet } from './result/MarkSheet';
import { StudentInfo } from './result/StudentInfo';

import { StudentResult } from '@/types/student';

interface ResultDisplayProps {
  result: StudentResult;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  return (
    <div id='print-content' className='result-container text-sm'>
      <div>
        <h3
          style={{ fontFamily: 'Kalpurush' }}
          className='text-xl font-bold text-green-800 text-center mb-4'
        >
          {result.class}
        </h3>
      </div>
      <StudentInfo result={result} />
      <MarkSheet result={result} />
      <PrintButton />
    </div>
  );
}
