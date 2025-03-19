'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';


import '../app/globals.css';

import { MarkSheet } from './result/MarkSheet';
import { StudentInfo } from './result/StudentInfo';
import { MadrasahResult } from '@/types/madrasah';
import { MadrasahResultDisplay } from './result/MadrasahResult';

import { StudentResult } from '@/types/student';

import { Printer } from 'lucide-react';
import { generateMadrasahPdf } from '@/utils/generateMadrasahPdf';
import { generateStudentPdf } from '@/utils/generateStudentPdf';


interface ResultDisplayProps {
  result: StudentResult | MadrasahResult;
  examType: string;
  searchType: 'individual' | 'madrasah';
}



export function ResultDisplay({ result, examType, searchType }: ResultDisplayProps) {

  const router = useRouter();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const dataToSave = {
      result,
      examType,
      searchType
    };
    localStorage.setItem('studentResultData', JSON.stringify(dataToSave));
  }, [result, examType, searchType]);


  const handleStudentPdfDownload = async () => {
    if ('resultsByClass' in result) {

      return;
    }

    setIsLoading(true);
    try {

      await generateStudentPdf(result, examType);
    } catch (error) {

    }
    setIsLoading(false);
  };


  const handleMadrasahPdfDownload = async () => {
    try {
      setIsLoading(true);
      await generateMadrasahPdf(result as MadrasahResult, examType);
    } catch (error) {

      alert('প্রিন্ট করতে সমস্যা হয়েছে');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to convert image URL to base64
  const getBase64FromUrl = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div ref={contentRef} className='result-container text-sm relative'>

      <div className='mb-8 border-b pb-4 print:hidden'>
        <div className='flex items-center justify-center gap-6 md:gap-8'>
          <img
            src='/images/logo.jpg'
            alt='logo'
            width={60}
            height={60}
            className='object-contain'
          />
          <div className='text-center'>
            <h1 className='text-xl md:text-3xl font-bold '>জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
          </div>
        </div>
      </div>

      <div>
        <h1 className='exam-name hidden print:block text-xl font-bold text-center mb-3'>
          {examType}
        </h1>
        {searchType === 'individual' && (
          <h3 className='text-lg font-normal text-center mb-4'>
            {(result as StudentResult).class}
          </h3>
        )}
      </div>
      {searchType === 'individual' ? (
        <>
          <StudentInfo result={result as StudentResult} />
          <MarkSheet result={result as StudentResult} />
          <div className='print-button mt-6 flex justify-center print:hidden'>
            <button
              onClick={handleStudentPdfDownload}
              disabled={isLoading}
              className='rounded-lg bg-gray-700 w-64 py-1 text-white text-sm hover:bg-gray-600 transition-colors disabled:opacity-50'
            >
              {isLoading ? (
                <span>অপেক্ষা করুন...</span>
              ) : (
                <>
                  <Printer className='inline-block w-3 h-4 mr-1' /> প্রিন্ট করুন
                </>
              )}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className='print-button mt-6 flex justify-center absolute -top-[75px] right-0'>
            <button
              onClick={handleMadrasahPdfDownload}
              disabled={isLoading}
              className='rounded-lg bg-green-700 w-24 py-1 text-white text-sm hover:bg-green-600 transition-colors disabled:opacity-50'
            >
              {isLoading ? (
                <span>লোড হচ্ছে...</span>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-3 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  ডাউনলোড
                </>
              )}
            </button>
          </div>

          <MadrasahResultDisplay data={result as MadrasahResult} />

          {/* Print Content */}
          <div id="madrasah-result-pdf" style={{ display: 'none' }}>
            <div className='print-header'>
              <div className='logo-title'>
                <img
                  src='/images/logo.jpg'
                  alt='logo'
                  width={75}
                  height={75}
                />
                <h1>জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
                <h3>[বেফাকুল মাদারিসিদ্দীনিয়্যা বাংলাদেশ]</h3>
                <p>অস্থায়ী কার্যালয়: ৩৪১/৫ টি ভি রোড, পূর্ব রামপুরা, ঢাকা-১২১৯</p>
                <h2>{examType}</h2>
              </div>

              <div className='marks-distribution'>
                <div className='distribution-title'>বিভাগ বিন্যাস</div>
                <table>
                  <tbody>
                    <tr><td>মোট কিতাব</td><td>: ৪০০ × ৮ = ৩২০০</td></tr>
                    <tr><td>মুখস্থ (৩য় খন্ড)</td><td>: ৮০ × ৮ = ৬৪০</td></tr>
                    <tr><td>জরুরি বিষয় (১ম খন্ড)</td><td>: ৫৫ × ৮ = ৪৪০</td></tr>
                    <tr><td>জরুরি (২য় খন্ড)</td><td>: ৪০ × ৮ = ৩২০</td></tr>
                    <tr><td>অনুশীলন (৩য় খন্ড)</td><td>: ৫৫ × ৮ = ৪৪০</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className='madrasah-info'>
              <p><span>মাদরাসা কোড</span> : {(result as MadrasahResult).madrasahCode}</p>
              <p><span>মাদরাসা</span> : {(result as MadrasahResult).madrasahName}</p>
              <p><span>মারকায</span> : {(result as MadrasahResult).markazName}</p>
            </div>

            <div className='print-content'>
              <MadrasahResultDisplay data={result as MadrasahResult} />
            </div>
          </div>
        </>
      )}
    </div >
  );
}

ResultDisplay.displayName = 'ResultDisplay';
