'use client';

import { MadrasahResult } from '@/types/madrasah';
import { MadrasahResultDisplay } from '../MadrasahResult';
import { PrintButton } from '../PrintButton';
import { currentBanglaDate } from '@/utils/currentBannglaDate';
import { toBengaliNumber } from '@/lib/utils';
import { useEffect } from 'react';

interface MadrasahResultViewProps {
  result: MadrasahResult;
  examType: string;
  isLoading: boolean;
}

export function MadrasahResultView({ result, examType, isLoading }: MadrasahResultViewProps) {

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
        @page { size: A4 landscape !important; margin: 12mm 10mm !important; }
      `;
    document.head.appendChild(style);
  }, []);
  const handlePrint = () => {

    window.print();
  };

  return (
    <div className="h-full">
      {/* Screen view */}
      <div className="print:hidden">
        <PrintButton isLoading={isLoading} onClick={handlePrint} />
        <MadrasahResultDisplay data={result} />
      </div>

      {/* Print view */}
      <div className="hidden print:block print:landscape">
        {Object.entries(result.resultsByClass).map(([className, students], index) => (
          <div key={index} className={`print-view ${index < Object.entries(result.resultsByClass).length - 1 ? 'print:break-after-page' : ''
            }`}>
            {/* Header */}
            <div className="border-b border-black pb-2 mb-4 relative">
              <img src="/images/logo.jpg" alt="logo" className="w-[100px] h-[100px] absolute left-0 top-[20px]" />
              <div className="text-center">
                <h1 className="text-2xl font-bold m-0">জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
                <h3 className="text-xl m-0">[বেফাকুল মাদারিসিদ্দীনিয়্যা বাংলাদেশ]</h3>
                <p className="text-base m-0">অস্থায়ী কার্যালয়: ৩৪১/৫ টি ভি রোড, পূর্ব রামপুরা, ঢাকা-১২১৯</p>
                <h3 className="text-[20px] mt-1 ">{examType}</h3>
                <h3 className="text-[18px]  font-semibold mt-2">(প্রাথমিক ফলাফল)</h3>
              </div>

              {/* Division Layout */}
              <div className=" border border-black p-[2px] px-1.5 text-[14px] absolute right-0 bottom-[20px] w-[210px] ">
                <div className="text-center border-b border-black mb-1.5">বিভাগ বিন্যাস</div>

                <div className="px-1">
                  <p className="m-0">
                    <span className="w-[135px] inline-block">পূর্ণমান</span>
                    <span className="mr-2.5">:</span> ১০০
                  </p>
                  <p className="m-0">
                    <span className="w-[135px] inline-block">মুমতায(স্টারমার্ক)</span>
                    <span className="mr-2.5">:</span> ৮০
                  </p>
                  <p className="m-0">
                    <span className="w-[135px] inline-block">জায়্যিদ জিদ্দান(১ম বিভাগ)</span>
                    <span className="mr-2.5">:</span> ৬৫
                  </p>
                  <p className="m-0">
                    <span className="w-[135px] inline-block">জায়্যিদ(২য় বিভাগ)</span>
                    <span className="mr-2.5">:</span> ৫০
                  </p>
                  <p className="m-0">
                    <span className="w-[135px] inline-block">মাকবুল(৩য় বিভাগ)</span>
                    <span className="mr-2.5">:</span> ৩৩
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-lg mb-2 mt-1 font-bold text-center ">{className}</h3>

            {/* Madrasah Info */}
            <div className="mb-1">
              <p className="m-0 text-sm">
                <span className="inline-block w-[115px]">মাদরাসা কোড</span>
                <span className="mr-2.5">:</span>
                {toBengaliNumber(result.madrasahCode)}
              </p>
              <p className="m-0">
                <span className="inline-block w-[115px]">মাদরাসা</span>
                <span className="mr-2.5">:</span>
                <span className="font-bold">{toBengaliNumber(result.madrasahName)}</span>
              </p>
              <p className="m-0">
                <span className="inline-block w-[115px]">মারকায</span>
                <span className="mr-2.5">:</span>
                {toBengaliNumber(result.markazName)}
              </p>
            </div>

            {/* Results Table */}
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-black">
                  <th className="border border-black p-1.5 text-sm w-10">ক্র.</th>
                  <th className="border border-black p-1.5 text-sm w-16">রোল নং</th>
                  <th className="border border-black p-1.5 text-sm w-44">পরীক্ষার্থীর নাম</th>
                  {Object.keys(students[0].marks).map((subject, idx) => (
                    <th key={idx} className="border border-black p-1.5 text-sm w-16">{subject}</th>
                  ))}
                  <th className="border border-black p-1.5 text-sm w-12">মোট নম্বর</th>
                  <th className="border border-black p-1.5 text-sm w-12">গড় নম্বর</th>
                  <th className="border border-black p-1.5 text-sm w-12">বিভাগ</th>
                  <th className="border border-black p-1.5 text-sm w-9">স্থান</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={idx}>
                    <td className="border border-black p-1.5 text-sm text-center">{toBengaliNumber(idx + 1)}</td>
                    <td className="border border-black p-1.5 text-sm text-center">{student.rollNo}</td>
                    <td className="border border-black p-1.5 text-sm">{student.name}</td>
                    {Object.values(student.marks).map((mark, markIdx) => (
                      <td key={markIdx} className="border border-black p-1.5 text-sm text-center">{mark}</td>
                    ))}
                    <td className="border border-black p-1.5 text-sm text-center">{student.totalMarks}</td>
                    <td className="border border-black p-1.5 text-sm text-center">{toBengaliNumber(student.average)}</td>
                    <td className="border border-black p-1.5 text-sm text-center">{student.division}</td>
                    <td className="border border-black p-1.5 text-sm text-center">{student.rank || ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer */}
            <div className="relative mt-5">
              <div className="max-w-[80%]">
                <p className="text-sm">
                  <span className="font-bold">বি:দ্র:</span> এ ফলাফল পত্রে কোনো ত্রুটি-বিচ্যুত বা অসংগতি পরিলক্ষিত হলে অথবা কোনো আপত্তি থাকলে তা নিরসনের জন্য এবং নযরে সানীর প্রয়োজন মন করলে প্রতি বিষয়ে মারহালার সমপরিমাণ ফি-সহ যথাযথ কর্তৃপক্ষের মাধ্যমে আগামী ৩০ শাওয়াল এর মধ্যে যথা নিয়মে পরীক্ষা নিয়ন্ত্রণ বিভাগ বরাবর লিখিতভাবে আবেদন করতে হবে।
                </p>
              </div>
              <div className="absolute right-0 top-14 text-center">
                <img src="/images/signature.jpg" alt="signature" className="w-16 -rotate-3 mx-auto" />
                <p className="m-0 pb-px">পরীক্ষা নিয়ন্ত্রক</p>
                <p className="m-0 border-t border-black pt-px">মাওলানা ফয়সাল উমর ফারুক</p>
                <p className="m-0 text-xs">তারিখ: {currentBanglaDate()}ঈ.</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 