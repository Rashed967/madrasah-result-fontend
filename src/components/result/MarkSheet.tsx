import { toBengaliNumber } from '@/lib/utils';

import { StudentResult } from '@/types/student';

export function MarkSheet({ result }: { result: StudentResult }) {
  return (
    <>
      <h6 className='text-center text-xl font-bold text-green-800 mb-4'>
        প্রাপ্ত নম্বর
      </h6>
      <div className='overflow-x-auto rounded-md'>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='bg-green-700 text-white text-center'>
              {/* serial number column will be small, not big like other columns */}
              <th className='border border-gray-300 px-4 py-2 text-sm text-center'>
                ক্রমিক
              </th>
              <th className='border border-gray-300 px-4 py-2 text-sm text-center'>
                বিষয়
              </th>
              <th className='border border-gray-300 px-4 py-2 text-sm text-center'>
                প্রাপ্ত নম্বর
              </th>
            </tr>
          </thead>
          <tbody>
            {/* add serial number before each subject as saparate column, not in the same row */}
            {Object.entries(result.marks).map(([subject, marks], index) => (
              <tr
                key={subject}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className='border border-gray-300 px-4 py-2 text-center w-14 md:w-24'>
                  {toBengaliNumber(index + 1)}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-center'>
                  {subject}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-center w-22'>
                  {toBengaliNumber(marks)}
                </td>
              </tr>
            ))}
            <tr className='font-bold text-center'>
              <td className='border border-gray-300 px-4 py-2'></td>
              <td className='border border-gray-300 px-4 py-2'>মোট নম্বর</td>
              <td className='border border-gray-300 px-4 py-2'>
                {toBengaliNumber(result.totalMarks)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
