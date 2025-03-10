import { toBengaliNumber } from '@/lib/utils';

import { StudentResult } from '@/types/student';

interface StudentInfoProps {
  result: StudentResult;
}

export function StudentInfo({ result }: StudentInfoProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 mb-6 student-info-container'>
      <div className='border-b border-gray-300 student-info-item'>
        <div className='grid grid-cols-[100px,1fr] items-center py-2 student-info-row'>
          <div className='font-semibold student-info-label'>রোল</div>
          <div className='student-info-value'>
            {' '}
            <span className='mr-2'>:</span> {toBengaliNumber(result.rollNo)}
          </div>
        </div>
      </div>

      <div className='border-b border-gray-300 student-info-item'>
        <div className='grid grid-cols-[100px,1fr] items-center py-2 student-info-row'>
          <div className='font-semibold student-info-label'>নিবন্ধন নং</div>
          <div className='student-info-value'>
            {' '}
            <span className='mr-2'>:</span>{' '}
            {toBengaliNumber(result.registrationNo)}
          </div>
        </div>
      </div>

      <div className='border-b border-gray-300 student-info-item'>
        <div className='grid grid-cols-[100px,1fr] items-center py-2 student-info-row'>
          <div className='font-semibold student-info-label'>নাম</div>
          <div className='student-info-value'>
            {' '}
            <span className='mr-2'>:</span> {result.name}
          </div>
        </div>
      </div>

      <div className='border-b border-gray-300 student-info-item'>
        <div className='grid grid-cols-[100px,1fr] items-center py-2 student-info-row'>
          <div className='font-semibold student-info-label'>পিতার নাম</div>
          <div className='student-info-value'>
            {' '}
            <span className='mr-2'>:</span> {result.fatherName}
          </div>
        </div>
      </div>

      <div className='border-b border-gray-300 student-info-item'>
        <div className='grid grid-cols-[100px,1fr] items-center py-2 student-info-row'>
          <div className='font-semibold student-info-label'>জন্ম তারিখ</div>
          <div className='student-info-value'>
            {' '}
            <span className='mr-2'>:</span> {result.dateOfBirth}
          </div>
        </div>
      </div>

      <div className='border-b border-gray-300 student-info-item'>
        <div className='grid grid-cols-[100px,1fr] items-center py-2 student-info-row'>
          <div className='font-semibold student-info-label'>প্রাপ্ত বিভাগ</div>
          <div className='student-info-value'>
            {' '}
            <span className='mr-2'>:</span> {result.division}
          </div>
        </div>
      </div>

      <div className='border-b border-gray-300 student-info-item    '>
        <div className='grid grid-cols-[100px,1fr] items-center py-2 student-info-row'>
          <div className='font-semibold student-info-label'>
            পরীক্ষার্থীর ধরণ
          </div>
          <div className='student-info-value'>
            {' '}
            <span className='mr-2'>:</span> {result.examineeType}
          </div>
        </div>
      </div>

      <div className='border-b border-gray-300 student-info-item'>
        <div className='grid grid-cols-[100px,1fr] items-center py-2 student-info-row'>
          <div className='font-semibold student-info-label'>মেধা স্থান</div>
          <div className='student-info-value'>
            {' '}
            <span className='mr-2'>:</span>{' '}
            {toBengaliNumber(result.rank || '-')}
          </div>
        </div>
      </div>

      <div className='border-b border-gray-300 md:col-span-2 student-info-item'>
        <div className='grid grid-cols-[100px,1fr] items-center py-2 student-info-row'>
          <div className='font-semibold student-info-label'>মাদরাসার নাম</div>
          <div className='student-info-value'>
            {' '}
            <span className='mr-2'>:</span> {result.madrasahName}
          </div>
        </div>
      </div>
    </div>
  );
}
