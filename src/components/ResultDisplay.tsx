import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import '../app/globals.css';

import PrintButton from './PrintButton';
import { MarkSheet } from './result/MarkSheet';
import { StudentInfo } from './result/StudentInfo';
import { MadrasahResult } from '@/types/madrasah';
import { MadrasahResultDisplay } from './result/MadrasahResult';

import { StudentResult } from '@/types/student';
import StudentResultPdf from '@/components/resultPdf/studentResultPdf/StudentResultPdf';
import { Printer } from 'lucide-react';
import Link from 'next/link';
import { MadrasahResultPdf } from './resultPdf/madrasahResultPdf/MadrasahResultPdf';
import { generateMadrasahPdf } from '@/utils/generateMadrasahPdf';

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


  const handlePrintClick = async () => {
    router.push('/student-result');

  };


  const handleMadrasahPdfDownload = async () => {
    try {
      if (!result) {
        console.error('No result data found');
        return;
      }

      await generateMadrasahPdf(result as MadrasahResult, examType);

    } catch (error) {
      console.error('Error downloading PDF:', error);
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
      <div className='print-button mt-6 flex justify-center absolute -top-[75px] right-0'>
        <button
          onClick={handleMadrasahPdfDownload}
          className='rounded-lg bg-green-700 w-24 py-1 text-white text-sm hover:bg-green-600 transition-colors'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-3 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          ডাউনলোড
        </button>
      </div>
      <div className='mb-8 border-b pb-4'>
        <div className='flex items-center justify-center gap-6 md:gap-8'>
          <Image
            src='/images/logo.jpg'
            alt='logo'
            width={60}
            height={60}
            priority
            quality={100}
            className='object-contain'
          />
          <div className='text-center'>
            <h1 className='text-xl md:text-3xl font-bold '>জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
          </div>
        </div>
      </div>
      <div className='print-header hidden print:block'>
        <div className='print-header-logo'>
          <Image
            src='/images/logo.jpg'
            alt='logo'
            width={75}
            height={75}
            priority
          />
        </div>
        <div className='print-header-content'>
          <h1>জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
          <h3>(বেফাকুল মাদারিসিদ্দীনিয়্যা বাংলাদেশ)</h3>
          <p>অস্থায়ী কার্যালয়: ৩৪১/৫ টি ভি রোড, পূর্ব রামপুরা, ঢাকা-১২১৯</p>
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
          <div className='print-button mt-6 flex justify-center'>
            <button
              onClick={handlePrintClick}
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

          <MadrasahResultDisplay data={result as MadrasahResult} />

          {/* PDF Content - Hidden but not with display:none */}
          <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
            <MadrasahResultPdf result={result as MadrasahResult} examType={examType} />
          </div>
        </>
      )}
      {/* <div className='signature '>
        <Image
          src='/images/signature.jpg'
          alt='signature'
          width={80}
          height={60}
          priority
          className='-rotate-[4deg] '
        />
        <p className='signature-text border-b-[0.1px] mb-1 border-black'>
          পরীক্ষা নিয়ন্ত্রক
        </p>
        <p>(মাওলানা ফয়সাল উমর ফারুক)</p>
      </div> */}
    </div >
  );
}

ResultDisplay.displayName = 'ResultDisplay';
