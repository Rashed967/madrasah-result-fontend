import { toBengaliNumber } from '@/lib/utils';

import { StudentResult } from '@/types/student';

interface StudentInfoProps {
  result: StudentResult;
}

export function StudentInfo({ result }: StudentInfoProps) {
  console.log('StudentInfo result:', result);
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-0 mb-6 student-info-container'>
      {/* First Column */}

      <InfoRow label='রোল নং' value={toBengaliNumber(result.rollNo)} />
      <InfoRow
        label='নিবন্ধন নং'
        value={toBengaliNumber(result.registrationNo)}
      />
      <InfoRow label='পরীক্ষার্থীর নাম' value={result.name} />
      <InfoRow label='পিতার নাম' value={result.fatherName} />
      <InfoRow label='জন্ম তারিখ' value={result.dateOfBirth} />
      <InfoRow label='প্রাপ্ত বিভাগ' value={result.division} />
      <InfoRow label='আবেদনের ধরণ' value={result?.applicationType || 'নিয়মিত'} />
      <InfoRow
        label='মেধা স্থান'
        value={toBengaliNumber(result.rank || '-')}
      />

      <div className='md:col-span-2 print:col-span-2'>
        <InfoRow
          label='মাদরাসার নাম'
          value={toBengaliNumber(result.madrasahName)}
        />
      </div>

    </div>
  );
}

// Helper component for info rows
export function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className='border-b border-gray-300 student-info-item'>
      <div className='grid grid-cols-[100px,1fr] justify-start items-center py-2 student-info-row'>
        <div className='font-semibold student-info-label'>{label}</div>
        <div className='student-info-value'>
          <span className='mr-2'>:</span> {value}
        </div>
      </div>
    </div>
  );
}
