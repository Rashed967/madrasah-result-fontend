import { StudentResult } from '@/types/student';
import { toBengaliNumber } from '@/lib/utils';
import { currentBanglaDate } from './currentBannglaDate';

export const printStudentResult = (result: StudentResult, examType: string) => {
  // Create a temporary container
  const printContainer = document.createElement('div');
  printContainer.style.display = 'none';
  document.body.appendChild(printContainer);

  // Create print content
  const printContent = `
    <div style="font-family: 'Kalpurush', Arial, sans-serif; padding: 20px;">
      <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #000; position: relative;">
        <img src="/images/logo.jpg" alt="logo" style="width: 75px; height: 75px; position: absolute; left: 52px; top: 10px;" />
        <div style="text-align: center;">
          <h1 style="font-size: 25px; margin: 0; font-weight: bold;">জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
          <h3 style="font-size: 18px; margin: 0;">[বেফাকুল মাদারিসিদ্দীনিয়্যা বাংলাদেশ]</h3>
          <p style="font-size: 14px; margin: 0;">অস্থায়ী কার্যালয়: ৩৪১/৫ টি ভি রোড, পূর্ব রামপুরা, ঢাকা-১২১৯</p>
        </div>
      </div>

      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="font-size: 21px; margin: 0 0 5px; font-weight: bold;">${examType}</h2>
        <p style="font-size: 18px; margin: 0; font-weight: bold;">মারহালা: ${result.class}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
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
          <td style="padding: 4px 0;"><span>মাদরাসার নাম</span></td>
          <td style="padding: 4px 0;">:</td>
          <td colspan="4" style="padding: 4px 0;">${toBengaliNumber(result.madrasahName)}</td>
        </tr>
      </table>

      <div style="text-align: center; margin-bottom: 10px;">
        <h3 style="margin: 0; display: inline-block; border-bottom: 1px solid #000; padding: 0 10px;">নম্বরপত্র</h3>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
        <thead>
          <tr style="background-color: #15803D; color: white;">
            <th style="border: 1px solid #d1d5db; padding: 8px; width: 10%;">ক্রমিক</th>
            <th style="border: 1px solid #d1d5db; padding: 8px;">বিষয়</th>
            <th style="border: 1px solid #d1d5db; padding: 8px; width: 15%;">প্রাপ্ত নম্বর</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(result.marks)
            .map(([subject, marks], index) => `
              <tr style="background-color: ${index % 2 === 0 ? '#f9fafb' : '#ffffff'};">
                <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${toBengaliNumber(
                  index + 1
                )}</td>
                <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${subject}</td>
                <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${toBengaliNumber(
                  marks
                )}</td>
              </tr>
            `)
            .join('')}
          <tr style="font-weight: bold;">
            <td style="border: 1px solid #d1d5db; padding: 8px;"></td>
            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">মোট নম্বর</td>
            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${toBengaliNumber(
              result.totalMarks
            )}</td>
          </tr>
        </tbody>
      </table>

      <div style="text-align: right; margin-top: 20px;">
        <img src="/images/signature.jpg" alt="signature" style="width: 65px; margin-bottom: 5px;" />
        <p style="margin: 0; border-top: 1px solid #000; display: inline-block; padding-top: 5px;">
          পরীক্ষা নিয়ন্ত্রক<br/>
          মাওলানা ফয়সাল উমর ফারুক<br/>
          <span style="font-size: 12px;">তারিখ: ${currentBanglaDate()}ঈ.</span>
        </p>
      </div>
    </div>
  `;

  // Set print content to temporary container
  printContainer.innerHTML = printContent;

  // Store original styles
  const originalStyles = document.head.getElementsByTagName('style');
  const styles = Array.from(originalStyles).map(style => style.outerHTML).join('');

  // Create a new style element for print
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    @media print {
      body > *:not(#print-container) {
        display: none;
      }
      #print-container {
        display: block !important;
      }
    }
  `;
  printContainer.id = 'print-container';
  document.head.appendChild(styleElement);

  // Print
  window.print();

  // Cleanup
  document.head.removeChild(styleElement);
  document.body.removeChild(printContainer);
};

// function generateAddressesContent(madrasahs: IMadrasah[]) {
//   // Helper function to handle null/undefined values
//   const getValue = (value: string | null | undefined) => value || ''

//   return `
//     <style>
//       @media print {
//         .courier-address {
//           -webkit-print-color-adjust: exact !important;
//           print-color-adjust: exact !important;
//           color: white !important;
//           background-color: gray !important;
//         }
//       }
//     </style>
//     <div style="width: 100%; max-width: 210mm; margin: 0 auto; padding: 0.5mm; display: grid; grid-template-columns: repeat(2, 1fr); gap: 3mm; page-break-inside: auto;">
//       ${madrasahs
//         .map(
//           (madrasah) => `
//         <div style="padding: 2mm; border: 2px solid black; break-inside: avoid; box-sizing: border-box; font-size: 11pt; page-break-inside: avoid;">
//           <div style="display: flex; justify-content: space-between; margin-bottom: 2mm;">
//             <span style="font-size: 11pt;">মুহতামিম,</span>
//             <div class="courier-address" style="font-size: 8pt; margin-top: 0.5mm; background-color: gray; display: inline; padding: 1mm 2mm; color: white; opacity: 0.5">
//           (${getValue(madrasah.address.courierAddress)})
//           </div>
//             <span style="font-size: 11pt;">কোড নং- ${convertToBengali(getValue(madrasah.code))}</span>
//           </div>
//           <div style="font-size: 11pt; margin-bottom: 1mm; ">${getValue(madrasah?.muhtamim?.name)}</div>
//           <div style="font-size: 12pt; font-weight: bold; margin: 1mm 0px;">${getValue(madrasah.madrasahNames.bengaliName)}
//           </div>
//           <div style="">
//             <span style="font-size: 11pt;">গ্রাম/মহল্লা: ${ convertToBengali(getValue(madrasah.address.holdingNumber))}</span>
//             <span style="font-size: 11pt;"> ${ getValue(madrasah.address.village)}</span>

//           </div>
//           <div style="display: flex; justify-content: space-between; margin: 1mm 0px;">
//               <span style="font-size: 11pt;">পোস্ট অফিস: ${getValue(madrasah.address.postOffice)}</span>
//             <span style="font-size: 11pt;">উপজেলা/থানা: ${getValue(madrasah.address.subDistrict_policeStation)}</span>
             
//           </div>
//           <div style="display: flex; justify-content: space-between; margin: 1mm 0px;">
//                      <span style="font-size: 11pt;">জেলা: ${getValue(madrasah.address.district)}</span>
//                       <div>
//                       <span style="font-size: 11pt;">মোবা: ${convertToBengali(getValue(madrasah.contactNo1))}</span>
//                       <span style="font-size: 11pt;">${getValue(madrasah.contactNo2)?`- ${convertToBengali(getValue(madrasah.contactNo2))}` : ''}</span>
//                       </div>
//           </div>
//         </div>      
//       `
//         )
//         .join('')}
//     </div>
//   `
// }

