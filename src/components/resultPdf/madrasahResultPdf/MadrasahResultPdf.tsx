import Image from 'next/image';
import { MadrasahResult } from '@/types/madrasah';
import { toBengaliNumber } from '@/lib/utils';
import { useEffect } from 'react';

interface MadrasahResultPdfProps {
  result: MadrasahResult;
  examType: string;
}

export function MadrasahResultPdf({ result, examType }: MadrasahResultPdfProps) {
  console.log({ examType });
  // save madrasah result in local storage
  useEffect(() => {
    localStorage.setItem('madrasahResult', JSON.stringify(result));
  }, [result]);

  return (
    <div
      id="madrasah-pdf-content"
      className="bg-white font-kalpurush"
      style={{
        width: '1123px',
        margin: '0 auto',
        minHeight: '794px',
        padding: '1rem'
      }}
    >
      <div className="px-8 pt-2 pb-2 break-inside-avoid box-border">
        <div className="relative border-b border-gray-400 pb-2 mb-1">
          <Image
            src='/images/logo.jpg'
            alt='logo'
            width={75}
            height={75}
            priority
            quality={100}
            unoptimized
            className='absolute left-24 top-4'
          />
          <div className='text-center pt-2'>
            <h1 className='text-2xl font-bold mb-2'>জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
            <h3 className='text-lg '>[বেফাকুল মাদারিসিদ্দীনিয়্যা বাংলাদেশ]</h3>
            <h4 className='text-sm '>অস্থায়ী কার্যালয়: ৩৪১/৫ টিভি রোড পূব রামপুরা ঢাকা-১২১৯</h4>
            <h3 className='text-lg'>{examType || ''}</h3>
          </div>

          <div className="absolute right-0 top-0 border-2 border-gray-400 p-1.5 text-sm ">
            <h4 className="font-bold mb-0.5 text-sm">বিভাগ বিন্যাস</h4>
            <div className="text-[11px] leading-tight">
              <div className='grid grid-cols-2 gap-x-6'>
                <p>মুমতায (৮০+) : ৮০</p>
                <p>জায়্যিদ (৭০+) : ৬০</p>
              </div>
              <div className='grid grid-cols-2 gap-x-6'>
                <p>জায়্যিদ জিদ্দান (৬০+) : ৪০</p>
                <p>মাকবুল (৪০+) : ৩০</p>
              </div>
              <div className='grid grid-cols-2 gap-x-6'>
                <p>মুমতায (৮০+) : ৮০</p>
                <p>জায়্যিদ (৭০+) : ৬০</p>
              </div>
              <div className='grid grid-cols-2 gap-x-6'>
                <p>জায়্যিদ জিদ্দান (৬০+) : ৪০</p>
                <p>মাকবুল (৪০+) : ৩০</p>
              </div>
              <div className='grid grid-cols-2 gap-x-6'>
                <p>জায়্যিদ জিদ্দান (৬০+) : ৪০</p>
                <p>মাকবুল (৪০+) : ৩০</p>
              </div>
            </div>
          </div>
        </div>


      </div>

      <div className="px-8 box-border">
        {Object.entries(result.resultsByClass).map(([className, students], index) => (
          <div key={className} className="box-border mb-6">
            <div className='mt-1 mb-1'>
              <h3 className="text-center font-semibold text-lg mb-2">
                {className}
              </h3>

              <div className="flex items-start mb-2 mt-1">
                <div className="text-sm">
                  <p>মাদরাসা কোড <span className='ml-6 mr-1'>:</span> <span className='font-bold'>{toBengaliNumber(result.madrasahCode)}</span></p>
                  <p>মাদরাসার নাম <span className='ml-6 mr-1'>:</span> <span className='font-bold'>{toBengaliNumber(result.madrasahName)}</span></p>
                </div>
              </div>
            </div>

            <table className="w-full border-collapse border border-gray-400 text-sm box-border">
              <thead>
                <tr className="bg-gray-100 h-8">
                  <th className="border border-gray-400 p-1.5 w-12 align-middle">ক্র.নং</th>
                  <th className="border border-gray-400 p-1.5 align-middle">নাম</th>
                  <th className="border border-gray-400 p-1.5 w-16 align-middle">রোল</th>
                  {Object.keys(students[0].marks).map(subject => (
                    <th key={subject} className="border border-gray-400 p-1.5 w-16 align-middle">{subject}</th>
                  ))}
                  <th className="border border-gray-400 p-1.5 w-16 align-middle">মোট</th>
                  <th className="border border-gray-400 p-1.5 align-middle">বিভাগ</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => {
                  return (
                    <tr key={student.registrationNo} className="h-8">
                      <td className="border border-gray-400 p-1.5 text-center align-middle">{toBengaliNumber(idx + 1)}</td>
                      <td className="border border-gray-400 p-1.5 align-middle">{student.name}</td>
                      <td className="border border-gray-400 p-1.5 text-center align-middle">{toBengaliNumber(student.rollNo)}</td>
                      {Object.values(student.marks).map((mark, idx) => (
                        <td key={idx} className="border border-gray-400 p-1.5 text-center align-middle">{toBengaliNumber(mark)}</td>
                      ))}
                      <td className="border border-gray-400 p-1.5 text-center align-middle">{toBengaliNumber(student.totalMarks)}</td>
                      <td className="border border-gray-400 p-1.5 align-middle">{student.division}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* <div className="html2pdf__page-break" /> */}

      <div className="px-8 pb-4 box-border">
        <div className="text-sm mb-4">
          <p>বি.দ্র.: ফলাফলের মধ্যে কোন ভুল-ত্রুটি পরিলক্ষিত হলে অথবা কোন বিষয়ে জানতে চাইলে ৩০ দিনের মধ্যে বোর্ড অফিসে যোগাযোগ করুন।</p>
          <p>* পরীক্ষার্থীর ফলাফল বিষয়ে কোন অভিযোগ থাকলে ৭ দিনের মধ্যে লিখিতভাবে বোর্ড অফিসে জানাতে হবে।</p>
        </div>

        <div className='text-center'>
          <div className='inline-block'>
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
            <p className='border-b border-black mb-1'>পরীক্ষা নিয়ন্ত্রক</p>
            <p>(মাওলানা ফয়সাল উমর ফারুক)</p>
          </div>
        </div>
      </div>
    </div>
  );
} 