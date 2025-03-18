'use client';

import { StudentResult } from '@/types/student';
import { toBengaliNumber } from '@/lib/utils';

export const generateStudentPdf = async (result: StudentResult, examType: string) => {
  console.log('PDF generation result:', result);
  try {
    const printContent = generatePrintContent(result, examType);

    // Dynamic import
    const printJS = (await import('print-js')).default;

    printJS({
      printable: printContent,
      type: 'raw-html',
      style: `
        @page { size: A4 portrait; margin: 10mm; }
        @font-face {
          font-family: 'Kalpurush';
          src: url('/fonts/kalpurush.ttf') format('truetype');
        }
        body { 
          font-family: 'Kalpurush', Arial, sans-serif;
          -webkit-print-color-adjust: exact;
        }
      `,
      documentTitle: 'Student Result'
    });

  } catch (error) {
    console.error('Print error:', error);
    throw error;
  }
};

// Helper function to generate print content
const generatePrintContent = (result: StudentResult, examType: string) => {
  // console.log(result)
  return `
    <div style=" font-family: 'Kalpurush', Arial, sans-serif;">
      <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #000;  position: relative ">
        <img src="/images/logo.jpg" alt="logo" style="width: 75px; height: 75px; position: absolute; left: 52px; top: 10px;" />
        <div style="text-align: center; flex: 1;">
          <h1 style="font-size: 25px; margin: 0; font-weight: bold;">জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
          <h3 style="font-size: 18px; margin: 0; font-weight: normal;">(বেফাকুল মাদারিসিদ্দীনিয়্যা বাংলাদেশ)</h3>
          <p style="font-size: 14px; margin: 0;">অস্থায়ী কার্যালয়: ৩৪১/৫ টি ভি রোড, পূর্ব রামপুরা, ঢাকা-১২১৯</p>
        </div>
      </div>

      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="font-size: 21px; margin: 0 0 5px; font-weight: bold; ">${examType}</h2>
        <p style="font-size: 18px; margin: 0; font-weight: bold;">মারহালা: ${result.class}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
        <tr style="border-bottom: 0.1px solid #d1d5db;">
          <td style="padding: 4px 0; width: 15%;"><span>রোল নং</span></td>
          <td style="padding: 4px 0; width: 2%;">:</td>
          <td style="padding: 4px 0; width: 33%;">${toBengaliNumber(result.rollNo)}</td>
          <td style="padding: 4px 0; width: 15%;"><span>নিবন্ধন নং</span></td>
          <td style="padding: 4px 0; width: 2%;">:</td>
          <td style="padding: 4px 0;">${toBengaliNumber(result.registrationNo)}</td>
        </tr>
        <tr style="border-bottom: 0.1px solid #d1d5db;">
          <td style="padding: 4px 0;"><span>নাম</span></td>
          <td style="padding: 4px 0;">:</td>
          <td style="padding: 4px 0;">${result.name}</td>
          <td style="padding: 4px 0;"><span>পিতার নাম</span></td>
          <td style="padding: 4px 0;">:</td>
          <td style="padding: 4px 0;">${result.fatherName}</td>
        </tr>
        <tr style="border-bottom: 0.1px solid #d1d5db;">
          <td style="padding: 4px 0;"><span>জন্ম তারিখ</span></td>
          <td style="padding: 4px 0;">:</td>
          <td style="padding: 4px 0;">${result.dateOfBirth || ''}</td>
          <td style="padding: 4px 0;"><span>প্রাপ্ত বিভাগ</span></td>
          <td style="padding: 4px 0;">:</td>
          <td style="padding: 4px 0;">${result.division}</td>
        </tr>
        <tr style="border-bottom: 0.1px solid #d1d5db;">
          <td style="padding: 4px 0;"><span> আবেদনের ধরন</span></td>
          <td style="padding: 4px 0;">:</td>
          <td style="padding: 4px 0;">${result.examineeType || 'নিয়মিত'}</td>
          <td style="padding: 4px 0;"><span>মেধাস্থান</span></td>
          <td style="padding: 4px 0;">:</td>
          <td style="padding: 4px 0;">${result.rank || ''}</td>
        </tr>
        <tr style="border-bottom: 0.1px solid #d1d5db;">
          <td style="padding: 4px 0;"><span>মাদরাসার নাম</span></td>
          <td style="padding: 4px 0;">:</td>
          <td colspan="4" style="padding: 4px 0;">${toBengaliNumber(result.madrasahName)}</td>
        </tr>
      </table>

      <div style="margin: 0 auto; text-align: center; margin-bottom: 10px; font-size: 14px; border-bottom: 0.5px solid rgba(0, 0, 0, 0.4); padding-bottom: 3px; width: 10%">
        <h3 style="margin: 0; ">নম্বরপত্র</h3>
      </div>

    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <thead>
        <tr style="background-color: #15803D; color: white; text-align: center;">
          <th style="border: 1px solid #d1d5db; padding: 8px; width: 10%;">ক্রমিক</th>
          <th style="border: 1px solid #d1d5db; padding: 8px;">বিষয়</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; width: 15%;">প্রাপ্ত নম্বর</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(result.marks).map(([subject, marks], index) => `
          <tr style="background-color: ${index % 2 === 0 ? '#f9fafb' : '#ffffff'};">
            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${toBengaliNumber(index + 1)}</td>
            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${subject}</td>
            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${toBengaliNumber(marks)}</td>
          </tr>
        `).join('')}
        <tr style="font-weight: bold; text-align: center;">
          <td style="border: 1px solid #d1d5db; padding: 8px;"></td>
          <td style="border: 1px solid #d1d5db; padding: 8px;">মোট নম্বর</td>
          <td style="border: 1px solid #d1d5db; padding: 8px;">${toBengaliNumber(result.totalMarks)}</td>
        </tr>
      </tbody>
    </table>

      <div style="text-align: center; width: 180px; position: absolute; right: 0; bottom: 16px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 2px;">
        <img src="/images/signature.jpg" alt="signature" style="width: 65px; margin-bottom: 2px; transform: rotate(-3deg);" />
        <p style="margin: 0; font-size: 14px;  text-align: center;">
          পরীক্ষা নিয়ন্ত্রক
        </p>
        <p style="margin-top: 1px; padding-top: 1px; border-top: 1px solid #000; font-size: 13px; text-align: center;">
          (মাওলানা ফয়সাল উমর ফারুক)
        </p>
      </div>
    </div>
  `;
}; 