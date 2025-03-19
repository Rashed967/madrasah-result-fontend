'use client';

import { toBengaliNumber, toEnglishNumber } from '@/lib/utils';
import { MadrasahResult } from '@/types/madrasah';
import { currentBanglaDate } from '@/utils/currentBannglaDate';


export const generateMadrasahPdf = async (result: MadrasahResult, examType: string) => {

  try {
    const printContent = generateMadrasahPrintContent(result, examType);

    // Dynamic import
    const printJS = (await import('print-js')).default;

    printJS({
      printable: printContent,
      type: 'raw-html',
      style: `
        @page { size: A4 landscape; margin: 10mm; }
        @font-face {
          font-family: 'Kalpurush';
          src: url('/fonts/kalpurush.ttf') format('truetype');
        }
        @font-face {
          font-family: 'Kalpurush';
          src: url('/fonts/kalpurush.ttf') format('truetype');
        }
        body {
          font-family: 'Kalpurush', Arial, sans-serif;
          -webkit-print-color-adjust: exact;
        }
        #print-container {
          display: block !important;
        }
        th, td{
          text-align: center;
        }
      `,
      documentTitle: 'Madrasah Result'
    });

  } catch (error) {

    throw error;
  }
};



const generateMadrasahPrintContent = (result: MadrasahResult, examType: string) => {

  return `
    <div style="padding: 0px 0px; font-family: 'Kalpurush', Arial, sans-serif;">
     


        ${Object.entries(result.resultsByClass).map(([className, students], index) => `
          <div style="${index > 0 ? 'page-break-before: always;' : ''}">
          
              <div style=" border-bottom: 1px solid #000; padding-bottom: 2px; margin-bottom: 20px; position: relative;">

                <img src="/images/logo.jpg" alt="logo" style="width: 100px; height: 100px; position: absolute; left: 0; top: 22px;" />
                
                <div style="text-align: center;  margin: 0 20px;  ">
                  <h1 style="font-size: 24px; margin: 0; font-weight: bold;">জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
                  <h3 style="font-size: 18px; margin: 0; font-weight: normal;">[বেফাকুল মাদারিসিদ্দীনিয়্যা বাংলাদেশ]</h3>
                  <p style="font-size: 12px; margin: 0;">অস্থায়ী কার্যালয়: ৩৪১/৫ টি ভি রোড, পূর্ব রামপুরা, ঢাকা-১২১৯</p>
                  <h3 style="font-size: 18px; margin: 0; font-weight: normal;">${examType}</h3>
                  <h3 style="font-size: 15px; margin-top: 1px;">(প্রাথমিক ফলাফল)</h3>

                </div>

                <div style="border: 1px solid #000; padding: 2px 6px; font-size: 11px; position: absolute; right: 0; top: 15px; width: 180px;">
                  <div style="text-align: center; border-bottom: 1px solid #000; margin-bottom: 5px;">বিভাগ বিন্যাস</div>

                  <div ‍style="padding: 0px 4px;">
                  <p style="margin: 0; font-size: 11px;"> <span style="width: 115px; display: inline-block;">পূর্ণমান</span> <span style="margin-right: 10px;">:</span> ১০০</p>
                  <p style="margin: 0; font-size: 11px;"><span style="width: 115px; display: inline-block;">মুমতায(স্টারমার্ক)</span> <span style="margin-right: 10px;">:</span> ৮০</p>
                  <p style="margin: 0; font-size: 11px;"><span style="width: 115px; display: inline-block;">জায়্যিদ জিদ্দান(১ম বিভাগ)</span> <span style="margin-right: 10px;">:</span> ৬৫</p>
                  <p style="margin: 0; font-size: 11px;"><span style="width: 115px; display: inline-block;">জায়্যিদ(২য় বিভাগ)</span> <span style="margin-right: 10px;">:</span> ৫০</p>
                  <p style="margin: 0; font-size: 11px;"><span style="width: 115px; display: inline-block;">মাকবুল(৩য় বিভাগ)</span> <span style="margin-right: 10px;">:</span> ৩৩</p>
                  
                  </div>

                  
                </div>
              </div>
            

            <h2 style="text-align: center; margin-bottom: 10px; font-size: 18px; font-weight: bold;">${className}</h2>
            
            <div style="margin-bottom: 3px;">

              <p style="margin: 0;">
              <span style="width: 115px; display: inline-block;">মাদরাসা কোড</span> 
              <span style="margin-right: 10px;">:</span> ${toBengaliNumber(result.madrasahCode)}</p>
              <p style="margin: 0;">
              <span style="width: 115px; display: inline-block;">মাদরাসা</span> <span style="margin-right: 10px;">:</span > <span style="font-weight: bold;">${toBengaliNumber(result.madrasahName)}</span></p>
              <p style="margin: 0;">
              <span style="width: 115px; display: inline-block;">মারকায</span> <span style="margin-right: 10px;">:</span> ${toBengaliNumber(result.markazName)}</p>
             

            </div>

           
        

            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 40px;">ক্র.</th>
                  <th style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 60px;">রোল নং</th>
                  <th style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 160px;">পরীক্ষার্থীর নাম</th>
                  ${Object.keys(students[0].marks)
      .map(subject => `<th style="border: 1px solid #000; padding: 6px 4px; font-size: 14px;">${subject}</th>`)
      .join('')}
                  <th style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 50px;">মোট নম্বর</th>
                  <th style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 50px;">গড় নম্বর</th>
                  <th style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 50px;">বিভাগ</th>
                  <th style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 50px;">স্থান</th>
                </tr>
              </thead>
              <tbody>
                ${students.map((student, idx) => `
                  <tr>
                    <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 40px;">${toBengaliNumber(idx + 1)}</td>
                    <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 60px;">${student.rollNo}</td>
                    <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 160px;">${student.name}</td>
                    ${Object.values(student.marks)
          .map(mark => `<td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 50px;">${mark}</td>`)
          .join('')}
                    <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 50px;">${student.totalMarks}</td>
                    <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 50px;">
                      ${(toBengaliNumber(student.average))}
          
                    </td>
                    <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 50px;">${student.division}</td>
                    <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 36px;">${student.rank || ''}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
           
            <div style="position: relative; margin-top: 20px;">
            <div>
            <p style="font-size: 14px;">
           <span style="font-weight: bold; "> বি:দ্র:</span> এ ফলাফল পত্রে কোনো ত্রুটি-বিচ্যুত বা অসংগতি পরিলক্ষিত হলে অথবা কোনো আপত্তি থাকলে তা নিরসনের জন্য এবং নযরে সানীর প্রয়োজন মন করলে প্রতি বিষয়ে মারহালার সমপরিমাণ ফি-সহ যথাযথ কর্তৃপক্ষের মাধ্যমে আগামী ৩০ শাওয়াল এর মধ্যে যথা নিয়মে পরীক্ষা নিয়ন্ত্রণ বিভাগ বরাবর লিখিতভাবে আবেদন করতে হবে।
              </p>
              </div>

             
              <div style="position: absolute; right: 0; top: 56px; text-align: center; display: flex; flex-direction: column; align-items: center;">
              <img src="/images/signature.jpg" alt="signature" style="width: 65px; transform: rotate(-3deg);" />
              <p style=" padding-bottom: 1px; margin: 0;">
              পরীক্ষা নিয়ন্ত্রক
              </p>
              <p style="margin: 0; border-top: 1px solid #000; padding-top: 1px;">
              মাওলানা ফয়সাল উমর ফারুক
              </p>
              <p style="margin: 0; font-size: 12px;">
              তারিখ: ${currentBanglaDate()}ঈ.
              </p>

              </div>
            </div>
          </div>
        `).join('')}
      </div>
  `;
};

