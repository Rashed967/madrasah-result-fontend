import { Printer } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export function PrintButton() {
  const [signatureBase64, setSignatureBase64] = useState('');

  // Load and convert signature image to base64
  useEffect(() => {
    fetch('/images/sign.jpg')
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSignatureBase64(reader.result as string);
        };
        reader.readAsDataURL(blob);
      });
  }, []);

  const handlePrint = useCallback(() => {
    const printContent = document.getElementById('print-content');
    if (!printContent) return;

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const iframeWindow = iframe.contentWindow;
    const iframeDoc = iframeWindow?.document;
    if (!iframeDoc || !iframeWindow) return;

    // Add base tag to handle relative URLs
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <base href="${window.location.origin}">
          <title>Print Result</title>
          <style>
            @media screen {
              body { display: none; }
            }
            
            @media print {
              body { 
                display: block;
                margin: 0; 
                padding: 40px; 
                font-family: 'Kalpurush';
                -webkit-print-color-adjust: exact;
              }

              /* Hide any print dialogs */
              #print-dialog {
                display: none !important;
              }

              /* Force page settings */
              @page {
                size: A4 portrait;
                margin: 0;
              }

              @font-face {
                font-family: 'Kalpurush';
                src: url('/fonts/kalpurush.ttf') format('truetype');
                font-weight: normal;
                font-style: normal;
                -webkit-font-smoothing: antialiased;
              }

              body { 
                margin: 0; 
                padding: 40px; 
                font-family: 'Kalpurush';
                -webkit-print-color-adjust: exact;
              }

              /* Wrapper for all content */
              .page-wrapper {
                position: relative;
                height: auto;
                min-height: auto;
              }

              /* Print Header Styles */
              .print-header {
                position: relative;
                margin-bottom: 2rem;
                border-bottom: 1px solid #000;
                padding-bottom: 4px;
              }

              .print-header-logo {
                position: absolute;
                left: 83px;  /* Default for desktop */
                top: 0;
                display: flex;
                align-items: flex-start;
              }

              // /* Chrome on mobile specific fix */
              // @media screen and (-webkit-min-device-pixel-ratio: 0) and (max-width: 767px) {
              //   .print-header-logo {
              //     left: 40px;  /* Adjusted for Chrome mobile */
              //   }
              // }

              .print-header-logo img {
                width: 75px;
                height: 75px;
              }

              .print-header-content {
                text-align: center;
                padding-left: 120px;
                padding-right: 100px;
              }

              .print-header h1 {
                font-size: 24px;
                font-weight: bold;
                margin: 1px 0;
                color: #000;
                font-family: 'Kalpurush';
              }

              .print-header h3 {
                font-size: 18px;
                font-weight: normal;
                margin: 0px 0;
                color: #000;
                font-family: 'Kalpurush';
              }

              .print-header p {
                font-size: 14px;
                margin: 0px 0;
                color: #000;
                font-family: 'Kalpurush';
              }

              /* Title Styles */
              .marhala-name {
                font-size: 18px;
                font-weight: normal;
                text-align: center;
                margin-bottom: 1.5rem;
              }

              .exam-name {
                font-size: 18px;
                font-weight: bold;
                text-align: center;
                margin-bottom: 1rem;
              }
              /* Student Info Styles */
              .student-info-container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                margin-bottom: 2rem;
                border-collapse: collapse;
                margin-top: 1rem;
                // border: 1px solid gray;
              }

              .student-info-item {
                border-bottom: .5px solid #000;
              }

              .student-info-row {
                display: grid;
                grid-template-columns: 120px 1fr;
                min-height: 35px;
                align-items: center;
              }

              .student-info-label {
                font-weight: 500;
                padding-left: 5px;
              }

              .student-info-value {
                display: flex;
                align-items: center;
              }

              .student-info-value span {
                margin-right: 8px;
              }

              /* Mark Sheet Styles */
              .mark-sheet-title {
                font-size: 18px;
                font-weight: normal;
                text-align: center;
                margin: 1.5rem 0 1rem;
              }

              .mark-sheet-container {
                margin-bottom: 2rem;
              }

              .mark-sheet-table {
                width: 100%;
                border-collapse: collapse;
                border: 1px solid #000;
              }
                .mark-sheet-table tr{
                // background-color: blue;
                }

              .mark-sheet-header {
                background-color: transparent;
              }

              .mark-sheet-header th {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                background-color: #15803d !important;
                color: white !important;
                font-weight: 600;
                padding: 10px;
                text-align: center;
                border: 1px solid #D1D5DB;
              }

              .mark-sheet-row-even {
                background-color: rgb(128 128 128 / 8%);
              }

              .mark-sheet-row-odd {
                background-color: white;
              }

              .mark-sheet-cel {
                border: 1px solid #D1D5DB;
                padding: 8px;
                text-align: center;
              }

              .mark-sheet-footer {
                font-weight: bold;
              }

              /* Last item should span full width */
              .md\\:col-span-2 {
                grid-column: span 2;
              }

              /* Hide print button */
              .print\\:hidden {
                display: none;
              }

              /* Sign Image Styles */
              .signature-container {
                position: fixed;
                bottom: 80px;
                right: 40px;
                width: 150px;
                height: 100px;
                z-index: 999;
              }

              .signature-image {
                width: 150px;
                height: auto;
              }

              #print-content {
                position: relative;
                z-index: 1;
              }

              /* Print/No Print Classes */
              .print-only {
                display: block !important;
              }

              .marhala-name, .exam-name {
                margin: 0px; 
                padding: 0px;
              }

              /* Prevent page break */
              .page-wrapper {
                page-break-after: avoid;
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="page-wrapper">
            <div class="print-header">
              <div class="print-header-logo">
                <img src="/images/logo.jpg" alt="logo" />
              </div>
              <div class="print-header-content">
                <h1>জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
                <h3>(বেফাকুল মাদারিসিদ্দীনিয়্যা বাংলাদেশ)</h3>
                <p>অস্থায়ী কার্যালয়: ৩৪১/৫ টি ভি রোড, পূর্ব রামপুরা, ঢাকা-১২১৯</p>
              </div>
            </div>
            ${printContent.innerHTML}
            <div class="signature-container">
              <img src="${signatureBase64}" alt="signature" class="signature-image" />
            </div>
          </div>
        </body>
      </html>
    `);

    iframeDoc.close();

    // Small delay to ensure content is loaded
    setTimeout(() => {
      iframeWindow.focus();
      try {
        iframeWindow.print();
      } catch (e) {
        // Silent fail - we don't need to log the error
      }

      // Remove iframe after printing
      iframeWindow.onafterprint = () => {
        document.body.removeChild(iframe);
      };
    }, 100);
  }, [signatureBase64]);

  return (
    <div className='mt-8 text-center print:hidden'>
      <button
        onClick={handlePrint}
        className='rounded-lg bg-gray-600 w-64 py-1 text-white hover:bg-gray-700 text-sm'
      >
        <Printer className='inline-block w-3 h-4 mr-1' /> প্রিন্ট করুন
      </button>
    </div>
  );
}
