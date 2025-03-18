'use client';

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
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #000; padding-bottom: 20px; margin-bottom: 20px;">
          <img src="/images/logo.jpg" alt="logo" style="width: 75px; height: 75px;" />
          
          <div style="text-align: center; flex: 1; margin: 0 20px;">
            <h1 style="font-size: 22px; margin: 0 0 5px;">জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
            <h3 style="font-size: 18px; margin: 0 0 5px;">[বেফাকুল মাদারিসিদ্দীনিয়্যা বাংলাদেশ]</h3>
            <p style="font-size: 12px; margin: 0 0 5px;">অস্থায়ী কার্যালয়: ৩৪১/৫ টি ভি রোড, পূর্ব রামপুরা, ঢাকা-১২১৯</p>
            <h2 style="font-size: 20px; margin: 10px 0 0;">${examType}</h2>
          </div>

          <div style="border: 1px solid #000; padding: 8px; font-size: 11px;">
            <div style="text-align: center; border-bottom: 1px solid #000; margin-bottom: 5px;">বিভাগ বিন্যাস</div>
            <table style="border-collapse: collapse;">
              <tr><td style="padding: 1px 4px;">মোট কিতাব</td><td>: ৪০০ × ৮ = ৩২০০</td></tr>
              <tr><td style="padding: 1px 4px;">মুখস্থ (৩য় খন্ড)</td><td>: ৮০ × ৮ = ৬৪০</td></tr>
              <tr><td style="padding: 1px 4px;">জরুরি বিষয় (১ম খন্ড)</td><td>: ৫৫ × ৮ = ৪৪০</td></tr>
              <tr><td style="padding: 1px 4px;">জরুরি (২য় খন্ড)</td><td>: ৪০ × ৮ = ৩২০</td></tr>
              <tr><td style="padding: 1px 4px;">অনুশীলন (৩য় খন্ড)</td><td>: ৫৫ × ৮ = ৪৪০</td></tr>
            </table>
          </div>
        </div>

        <div style="margin: 20px 0;">
          <p><span style="display: inline-block; width: 100px;">মাদরাসা কোড</span> : ${result.madrasahCode}</p>
          <p><span style="display: inline-block; width: 100px;">মাদরাসা</span> : ${result.madrasahName}</p>
          <p><span style="display: inline-block; width: 100px;">মারকায</span> : ${result.markazName}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 6px 4px; font-size: 14px;">ক্র.</th>
              <th style="border: 1px solid #000; padding: 6px 4px; font-size: 14px;">রোল নং</th>
              <th style="border: 1px solid #000; padding: 6px 4px; font-size: 14px;">পরীক্ষার্থীর নাম</th>
              ${Object.keys(result.resultsByClass[Object.keys(result.resultsByClass)[0]][0].marks)
        .map(subject => `<th style="border: 1px solid #000; padding: 6px 4px; font-size: 14px;">${subject}</th>`).join('')}
              <th style="border: 1px solid #000; padding: 6px 4px; font-size: 14px;">মোট নম্বর</th>
              <th style="border: 1px solid #000; padding: 6px 4px; font-size: 14px;">গড় নম্বর</th>
              <th style="border: 1px solid #000; padding: 6px 4px; font-size: 14px;">বিভাগ</th>
              <th style="border: 1px solid #000; padding: 6px 4px; font-size: 14px;">স্থান</th>
              <th style="border: 1px solid #000; padding: 6px 4px; font-size: 14px;">মান</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(result.resultsByClass).map(([className, students]) =>
          students.map((student, idx) => `
                <tr>
                  <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px;">${idx + 1}</td>
                  <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px;">${student.rollNo}</td>
                  <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px;">${student.name}</td>
                  ${Object.values(student.marks).map(mark =>
            `<td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px;">${mark}</td>`).join('')}
                  <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px;">${student.totalMarks}</td>
                  <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px;">
                    ${(Number(student.totalMarks) / Object.keys(student.marks).length).toFixed(2)}
                  </td>
                  <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px;">${student.division}</td>
                  <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px;">${student.rank || ''}</td>
                  <td style="border: 1px solid #000; padding: 6px 4px; font-size: 14px;"></td>
                </tr>
              `).join('')
        ).join('')}
          </tbody>
        </table>
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
          margin: 15mm;
        }
        body {
          margin: 0;
          padding: 0;
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

