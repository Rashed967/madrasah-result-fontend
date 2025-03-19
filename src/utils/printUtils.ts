

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

