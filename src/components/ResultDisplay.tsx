import { PrintButton } from './PrintButton';
import { MarkSheet } from './result/MarkSheet';
import { StudentInfo } from './result/StudentInfo';

import { StudentResult } from '@/types/student';

interface ResultDisplayProps {
  result: StudentResult;
  examType: string;
}

export function ResultDisplay({ result, examType }: ResultDisplayProps) {
  return (
    <>
      <div id='print-content' className='result-container text-sm'>
        <div>
          <h3
            style={{ fontFamily: 'Kalpurush' }}
            className='exam-name hidden text-xl font-bold text-center mb-4 exam-name'
          >
            {examType}
          </h3>
          <h3
            style={{ fontFamily: 'Kalpurush' }}
            className='text-xl text-green-800 text-center mb-4 marhala-name'
          >
            <span className='hidden'>মারহালা:</span> {result.class}
          </h3>
        </div>
        <StudentInfo result={result} />
        <MarkSheet result={result} />
      </div>
      <PrintButton />
    </>
  );
}
