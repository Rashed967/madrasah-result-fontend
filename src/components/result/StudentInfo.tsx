import { toBengaliNumber } from '@/lib/utils';

import { StudentResult } from '@/types/student';

interface StudentInfoProps {
  result: StudentResult;
}

export function StudentInfo({ result }: StudentInfoProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 mb-6'>
      <div className='border-b border-gray-300'>
        <div className='grid grid-cols-[100px,1fr] items-center py-2'>
          <div className='font-semibold'>রোল</div>
          <div>
            {' '}
            <span className='mr-2'>:</span> {toBengaliNumber(result.rollNo)}
          </div>
        </div>
      </div>

      <div className='border-b border-gray-300'>
        <div className='grid grid-cols-[100px,1fr] items-center py-2 md:pl-4'>
          <div className='font-semibold'>নিবন্ধন নং</div>
          <div>
            {' '}
            <span className='mr-2'>:</span>{' '}
            {toBengaliNumber(result.registrationNo)}
          </div>
        </div>
      </div>

      <div className='border-b border-gray-300'>
        <div className='grid grid-cols-[100px,1fr] items-center py-2'>
          <div className='font-semibold'>নাম</div>
          <div>
            {' '}
            <span className='mr-2'>:</span> {result.name}
          </div>
        </div>
      </div>

      <div className='border-b border-gray-300'>
        <div className='grid grid-cols-[100px,1fr] items-center py-2 md:pl-4'>
          <div className='font-semibold'>পিতার নাম</div>
          <div>
            {' '}
            <span className='mr-2'>:</span> {result.fatherName}
          </div>
        </div>
      </div>

      <div className='border-b border-gray-300'>
        <div className='grid grid-cols-[100px,1fr] items-center py-2'>
          <div className='font-semibold'>জন্ম তারিখ</div>
          <div>
            {' '}
            <span className='mr-2'>:</span> {result.dateOfBirth}
          </div>
        </div>
      </div>

      <div className='border-b border-gray-300'>
        <div className='grid grid-cols-[100px,1fr] items-center py-2 md:pl-4'>
          <div className='font-semibold'>প্রাপ্ত বিভাগ</div>
          <div>
            {' '}
            <span className='mr-2'>:</span> {result.division}
          </div>
        </div>
      </div>

      <div className='border-b border-gray-300'>
        <div className='grid grid-cols-[100px,1fr] items-center py-2'>
          <div className='font-semibold'>পরীক্ষার্থীর ধরণ</div>
          <div>
            {' '}
            <span className='mr-2'>:</span> {result.examineeType}
          </div>
        </div>
      </div>

      <div className='border-b border-gray-300'>
        <div className='grid grid-cols-[100px,1fr] items-center py-2 md:pl-4'>
          <div className='font-semibold'>মেধা স্থান</div>
          <div>
            {' '}
            <span className='mr-2'>:</span>{' '}
            {toBengaliNumber(result.rank || '-')}
          </div>
        </div>
      </div>

      <div className='border-b border-gray-300 md:col-span-2'>
        <div className='grid grid-cols-[100px,1fr] items-center py-2'>
          <div className='font-semibold'>মাদরাসার নাম</div>
          <div>
            {' '}
            <span className='mr-2'>:</span> {result.madrasahName}
          </div>
        </div>
      </div>
    </div>
  );
}
