import { StudentResult } from '@/types/student';

interface StudentInfoProps {
  result: StudentResult;
}

export function StudentInfo({ result }: StudentInfoProps) {
  return (
    <table className='w-full border-collapse mb-6'>
      <tbody>
        <tr className='border-b border-gray-300'>
          <td className='px-4 py-2 text-sm'>
            <div className='w-full sm:w-24 border-gray-300 inline-block font-semibold'>
              রোল নম্বর
            </div>
            <span className='pr-4'>: </span>
            {result.rollNo}
          </td>
          <td className='px-4 py-2 text-sm'>
            <div className='font-semibold w-24 inline-block'>রেজি. নং</div>
            <span className='pr-4'>: </span>
            {result.registrationNo}
          </td>
        </tr>
        <tr className='border-b border-gray-300'>
          <td className='px-4 py-2 text-sm'>
            <div className='font-semibold w-24 inline-block'>নাম</div>
            <span className='pr-4'>: </span>
            {result.name}
          </td>
          <td className='px-4 py-2 text-sm'>
            <div className='font-semibold w-24 inline-block'>পিতার নাম</div>
            <span className='pr-4'>: </span>
            {result.fatherName}
          </td>
        </tr>
        <tr className='border-b border-gray-300'>
          <td className='px-4 py-2 text-sm'>
            <div className='font-semibold w-24 inline-block'>জন্ম তারিখ</div>
            <span className='pr-4'>: </span>
            {result.dateOfBirth}
          </td>
          <td className='px-4 py-2 text-sm'>
            <div className='font-semibold w-24 inline-block'>প্রাপ্ত বিভাগ</div>
            <span className='pr-4'>: </span>
            {result.division}
          </td>
        </tr>
        <tr className='border-b border-gray-300'>
          <td className='px-4 py-2 text-sm'>
            <div className='font-semibold w-24 inline-block'>
              পরীক্ষার্থীর ধরণ
            </div>
            <span className='pr-4'>: </span>
            {result.examineeType}
          </td>
          <td className='px-4 py-2 text-sm'>
            <div className='font-semibold w-24 inline-block'>মেধা স্থান</div>
            <span className='pr-4'>: </span>
            {result.rank || '-'}
          </td>
        </tr>
        <tr className='border-b border-gray-300'>
          <td colSpan={2} className='px-4 py-2 text-sm'>
            <div className='font-semibold w-24 inline-block'>মাদরাসার নাম</div>
            <span className='pr-4'>: </span>
            {result.madrasahName}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
