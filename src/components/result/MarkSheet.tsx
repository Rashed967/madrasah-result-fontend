import { toBengaliNumber } from '@/lib/utils';

import { StudentResult } from '@/types/student';

export function MarkSheet({ result }: { result: StudentResult }) {
  return (
    <>
      <div className='flex justify-center items-center mb-3 mt-4 '>
        <h6 className='text-center text-xl font-normal mb-1  border-black border-b-[1.5px]'>
          প্রাপ্ত নম্বর
        </h6>
      </div>
      <div className='overflow-x-auto rounded-md mark-sheet-container '>
        <table className='w-full border-collapse mark-sheet-table'>
          <thead>
            <tr className='bg-green-700 text-white text-center mark-sheet-header'>
              {/* serial number column will be small, not big like other columns */}
              <th className='border border-gray-300 px-4 py-2 text-sm text-center mark-sheet-cel'>
                ক্রমিক
              </th>
              <th className='border border-gray-300 px-4 py-2 text-sm text-center mark-sheet-cel'>
                বিষয়
              </th>
              <th className='border border-gray-300 px-4 py-2 text-sm text-center mark-sheet-cel'>
                প্রাপ্ত নম্বর
              </th>
            </tr>
          </thead>
          <tbody>
            {/* add serial number before each subject as saparate column, not in the same row */}
            {Object.entries(result.marks).map(([subject, marks], index) => (
              <tr
                key={subject}
                className={
                  index % 2 === 0
                    ? 'bg-gray-50 mark-sheet-row-even'
                    : 'bg-white mark-sheet-row-odd'
                }
              >
                <td className='border border-gray-300 px-4 py-2 text-center w-14 md:w-24 mark-sheet-cel'>
                  {toBengaliNumber(index + 1)}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-center mark-sheet-cel'>
                  {subject}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-center w-22 mark-sheet-cel mark-sheet-marks'>
                  {toBengaliNumber(marks)}
                </td>
              </tr>
            ))}
            <tr className='font-bold text-center mark-sheet-footer'>
              <td className='border border-gray-300 px-4 py-2 mark-sheet-cel '></td>
              <td className='border border-gray-300 px-4 py-2 mark-sheet-cel'>
                মোট নম্বর
              </td>
              <td className='border border-gray-300 px-4 py-2 mark-sheet-cel'>
                {toBengaliNumber(result.totalMarks)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
