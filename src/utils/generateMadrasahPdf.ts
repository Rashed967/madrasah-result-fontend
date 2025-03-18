'use client';

import { toBengaliNumber, toEnglishNumber } from '@/lib/utils';
import { MadrasahResult } from '@/types/madrasah';

export const generateMadrasahPdf = async (result: MadrasahResult, examType: string) => {
  try {
    // Create print container
    const printContainer = document.createElement('div');
    printContainer.id = 'print-container';
    document.body.appendChild(printContainer);

    // Create print content with inline styles
    printContainer.innerHTML = `
      <div style="padding: 20px; font-family: 'Kalpurush', Arial, sans-serif;">
     


        ${Object.entries(result.resultsByClass).map(([className, students], index) => `
          <div style="${index > 0 ? 'page-break-before: always;' : ''}">
          
              <div style=" border-bottom: 1px solid #000; padding-bottom: 7px; margin-bottom: 20px; position: relative;">

                <img src="/images/logo.jpg" alt="logo" style="width: 100px; height: 100px; position: absolute; left: 0; top: 22px;" />
                
                <div style="text-align: center;  margin: 0 20px;">
                  <h1 style="font-size: 24px; margin: 0 0 5px; font-weight: bold;">জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
                  <h3 style="font-size: 18px; margin: 0 0 5px;">[বেফাকুল মাদারিসিদ্দীনিয়্যা বাংলাদেশ]</h3>
                  <p style="font-size: 12px; margin: 0 0 5px;">অস্থায়ী কার্যালয়: ৩৪১/৫ টি ভি রোড, পূর্ব রামপুরা, ঢাকা-১২১৯</p>
                  <h2 style="font-size: 20px; ">${examType}</h2>
                  <h5 style="font-size: 18px; margin-top: 5px; font-weight: bold;">(প্রাথমিক ফলাফল)</h5>
                </div>

                <div style="border: 1px solid #000; padding: 2px 6px; font-size: 11px; position: absolute; right: 0; top: 15px; width: 150px;">
                  <div style="text-align: center; border-bottom: 1px solid #000; margin-bottom: 5px;">বিভাগ বিন্যাস</div>
                  <table style="border-collapse: collapse;">
                    <tr><td style="text-align: left; width: 80px;">পূর্ণমান</td><td><span style="margin-right: 10px;">:</span> ১০০</td></tr>
                    <tr><td style="text-align: left; width: 80px;">মুমতায</td><td><span style="margin-right: 10px;">:</span> ৮০</td></tr>
                    <tr><td style=" text-align: left; width: 80px;">জায়্যিদ জিদ্দান</td><td><span style="margin-right: 10px;">:</span> ৬৫</td></tr>
                    <tr><td style=" text-align: left; width: 80px;">জায়্যিদ</td><td><span style="margin-right: 10px;">:</span> ৫০</td></tr>
                    <tr><td style=" text-align: left; width: 80px;">মাকবুল</td><td><span style="margin-right: 10px;">:</span> ৩৩</td></tr>
                  </table>
                </div>
              </div>
            

            <h2 style="text-align: center; margin-bottom: 10px; font-size: 18px; font-weight: bold;">${className}</h2>
            
       
            <div style="margin-bottom: 3px;">
              <p><span style="display: inline-block; width: 100px;">মাদরাসা কোড</span> <span style="margin-right: 10px;">:</span> ${toBengaliNumber(result.madrasahCode)}</p>
              <p><span style="display: inline-block; width: 100px; ">মাদরাসা</span> <span style="margin-right: 10px;">:</span> <span style="font-weight: bold;">${toBengaliNumber(result.madrasahName)}</span></p>
              <p><span style="display: inline-block; width: 100px;">মারকায়া</span> <span style="margin-right: 10px;">:</span> ${toBengaliNumber(result.markazName)}</p>
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
                  <th style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 50px;">মান</th>
                </tr>
              </thead>
              <tbody>
                ${students.map((student, idx) => `
                  <tr>
                    <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 50px;">${toBengaliNumber(idx + 1)}</td>
                    <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 50px;">${student.rollNo}</td>
                    <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 50px;">${student.name}</td>
                    ${Object.values(student.marks)
            .map(mark => `<td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 50px;">${mark}</td>`)
            .join('')}
                    <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 50px;">${student.totalMarks}</td>
                    <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 50px;">
                      ${(toBengaliNumber(student.average))}
          
                    </td>
                    <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 50px;">${student.division}</td>
                    <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 36px;">${student.rank || ''}</td>
                    <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px; width: 36px;">${''}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
           
            <div style="position: relative; margin-top: 20px;">
            <div>
            <p>
            বি:দ্র: এ ফলাফল পত্রে কোনো ত্রুটি-বিচ্যুত বা অসংতি পরিলক্ষিত হলে অথবা কোনো আপত্তি থাকলে তা নিরসনের জন্য এবং নযরে সানীর প্রয়োজন মন করলে প্রতি বিষয়ে মারহালার সমপরিমাণ ফি-সহ যথাযথ কর্তৃপক্ষের মাধ্যমে ৩০ শাওয়াল ১৪৪৩ হিজরীর মধ্যে যথা নিয়মে পরীক্ষা নিয়ন্ত্রণ বিভাগ বরাবর লিখিতভাবে আবেদন করতে হবে।
              </p>
              </div>

             
              <div style="position: absolute; right: 0; top: 50; text-align: center;">
              <img src="/images/signature.jpg" alt="signature" style="width: 65px; " />
              <p style="border-bottom: 1px solid #000; padding-bottom: 1px;">
              পরীক্ষা নিয়ন্ত্রক
              </p>
              <p>
              মাওলানা ফয়সাল উমর ফারুক
              </p>

              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Add print styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @media print {
        body > *:not(#print-container) {
          display: none !important;
        }
        #print-container {
          display: block !important;
        }
        @page {
          size: landscape;
          margin: 10mm;
        }
        body {
          margin: 0;
          padding: 0;
        }
        th, td{
          text-align: center;
        }
      }
    `;
    document.head.appendChild(styleSheet);

    // Print with delay
    setTimeout(() => {
      window.print();
      // Cleanup
      document.body.removeChild(printContainer);
      document.head.removeChild(styleSheet);
    }, 500);

  } catch (error) {
    console.error('Print error:', error);
    throw error;
  }
};

