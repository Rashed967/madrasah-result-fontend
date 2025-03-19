'use client'

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { toBengaliNumber } from '@/lib/utils';
import { InfoRow, StudentInfo } from '@/components/result/StudentInfo';
import { MarkSheet } from '@/components/result/MarkSheet';
import '../../globals.css';
import { useRouter } from 'next/navigation';
import handlePdfDownload from '@/utils/studentResultPdfDownloadn';
import { IoMdClose } from 'react-icons/io';



const GenerateStudentResultPdf = () => {
  const [resultData, setResultData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const dataLoaded = useRef(false);


  useEffect(() => {
    const loadData = () => {
      if (dataLoaded.current) return;

      const savedData = localStorage.getItem('studentResultData');

      if (!savedData) {

        router.back();
        return;
      }

      try {
        const parsedData = JSON.parse(savedData);


        if (!parsedData.result || !parsedData.examType) {
          throw new Error('Invalid data structure');
        }

        setResultData(parsedData);
        setIsLoading(false);
        dataLoaded.current = true;
      } catch (error) {

        router.back();
      }
    };

    loadData();

    return () => {
      if (dataLoaded.current) {
        localStorage.removeItem('studentResultData');
      }
    };
  }, []);



  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!resultData?.result || !resultData?.examType) return null;

  const { result, examType, searchType } = resultData;



  return (
    <div className="flex flex-col items-center justify-center overflow-hidden relative p-10">

      <div className="w-full flex flex-col items-center">
        <div className="min-w-fit">

          <div className="mt-2 absolute top-4 right-4 font-kalpurush">
            <button
              onClick={() => router.back()}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <IoMdClose className="text-sm" />
              <span>বন্ধ করুন</span>
            </button>
          </div>
          <div className="mt-2 absolute top-16 right-4 font-kalpurush">
            <button
              onClick={() => handlePdfDownload(result?.name)}
              className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>ডাউনলোড</span>
            </button>
          </div>
          <div className="w-[210mm] md:mt-20 transform scale-[0.45] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 origin-top mt-32">
            <div id="pdf-content" className="w-[210mm] h-[297mm] bg-white px-8 py-4 font-kalpurush">
              <div className="relative border-b border-black pb-2 mb-4 mt-2">
                <Image
                  src='/images/logo.jpg'
                  alt='logo'
                  width={75}
                  height={75}
                  priority
                  quality={100}
                  unoptimized
                  className='absolute left-20 top-4'
                />
                <div className='text-center pt-2'>
                  <h1 className='text-[24px] font-bold '>জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
                  <h3 className='text-lg '>(বেফাকুল মাদারিসিদ্দীনিয়্যা বাংলাদেশ)</h3>
                  <p className='text-sm'>অস্থায়ী কার্যালয়: ৩৪১/৫ টি ভি রোড, পূর্ব রামপুরা, ঢাকা-১২১৯</p>
                </div>
              </div>

              <div className='text-center mb-4 mt-2'>
                <h2 className='text-xl font-bold mb-1'>{examType}</h2>
                <p className='text-[18px] font-semibold'>মারহালা: {result.class}</p>
              </div>

              <div className='grid grid-cols-2  gap-0 mb-6 student-info-container'>
                <InfoRow label='রোল নং' value={toBengaliNumber(result.rollNo)} />
                <InfoRow
                  label='নিবন্ধন নং'
                  value={toBengaliNumber(result.registrationNo)}
                />
                <InfoRow label='পরীক্ষার্থীর নাম' value={result.name} />
                <InfoRow label='পিতার নাম' value={result.fatherName} />
                <InfoRow label='জন্ম তারিখ' value={result.dateOfBirth} />
                <InfoRow label='প্রাপ্ত বিভাগ' value={result.division} />
                <InfoRow label='আবেদনের ধরণ' value={result.examineeType || 'নিয়মিত'} />
                <InfoRow
                  label='মেধা স্থান'
                  value={toBengaliNumber(result.rank || '-')}
                />

                <div className='col-span-2'>
                  <InfoRow
                    label='মাদরাসার নাম'
                    value={toBengaliNumber(result.madrasahName)}
                  />
                </div>

              </div>

              <div className='flex justify-center items-center mb-3 mt-4'>
                <h6 className='text-center text-xl font-normal mb-1 mark-sheet-title border-black border-b-2'>
                  নম্বরপত্র
                </h6>
              </div>
              <div className='overflow-x-auto rounded-md mark-sheet-container '>
                <table className='w-full border-collapse mark-sheet-table'>
                  <thead>
                    <tr className='bg-green-700 text-white text-center mark-sheet-header'>
                      <th className='border border-gray-300 px-4 py-2 text-base text-center mark-sheet-cel'>
                        ক্রমিক
                      </th>
                      <th className='border border-gray-300 px-4 py-2 text-base text-center mark-sheet-cel'>
                        বিষয়
                      </th>
                      <th className='border border-gray-300 px-4 py-2 text-base text-center mark-sheet-cel'>
                        প্রাপ্ত নম্বর
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(result.marks).map(([subject, marks], index) => (
                      <tr
                        key={subject}
                        className={
                          index % 2 === 0
                            ? 'bg-gray-50 mark-sheet-row-even'
                            : 'bg-white mark-sheet-row-odd'
                        }
                      >
                        <td className='border border-gray-300 text-base px-4 py-2 text-center w-14 md:w-24 mark-sheet-cel'>
                          {toBengaliNumber(index + 1)}
                        </td>
                        <td className='border border-gray-300 px-4 text-base py-2 text-center mark-sheet-cel'>
                          {subject}
                        </td>
                        <td className='border border-gray-300 px-4 py-2 text-base text-center w-22 mark-sheet-cel mark-sheet-marks'>
                          {toBengaliNumber(marks as string)}
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

              <div className='signature absolute bottom-10 right-10 text-center'>
                <Image
                  src='/images/signature.jpg'
                  alt='signature'
                  width={80}
                  height={60}
                  priority
                  quality={100}
                  unoptimized
                  className='-rotate-[4deg]'
                />
                <p className='signature-text border-b-[0.1px] mb-1 border-black'>
                  পরীক্ষা নিয়ন্ত্রক
                </p>
                <p>(মাওলানা ফয়সাল উমর ফারুক)</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GenerateStudentResultPdf;
