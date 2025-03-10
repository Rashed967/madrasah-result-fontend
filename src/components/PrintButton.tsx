import { Printer } from 'lucide-react';
import { useCallback } from 'react';

export function PrintButton() {
  const handlePrint = useCallback(() => {
    const printContent = document.getElementById('print-content');
    if (!printContent) return;

    // Create a hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // Write content to iframe
    const iframeWindow = iframe.contentWindow;
    const iframeDoc = iframeWindow?.document;
    if (!iframeDoc || !iframeWindow) return;

    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Result</title>
          <style>
            @media print {
           
              body { 
                margin: 0; 
                padding: 40px; 
                font-family: 'Kalpurush';
              }
              @page { 
                size: A4; 
                margin: 0; 
              }

              /* Title Styles */
              .text-xl {
                font-size: 20px;
                font-weight: bold;
                text-align: center;
                margin-bottom: 1.5rem;
                color: #166534;
              }

              /* Student Info Styles */
              .student-info-container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                margin-bottom: 2rem;
                border-collapse: collapse;
              }

              .student-info-item {
                border-bottom: 1px solid #000;
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
                font-weight: bold;
                text-align: center;
                color: #166534;
                margin: 2rem 0 1rem;
              }

              .mark-sheet-container {
                margin-bottom: 2rem;
              }

              .mark-sheet-table {
                width: 100%;
                border-collapse: collapse;
                border: 1px solid #000;
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
                border: 1px solid #000;
              }

              .mark-sheet-row-even {
                background-color: transparent;
              }

              .mark-sheet-cel {
                border: 1px solid #000;
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
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    iframeDoc.close();

    // Print the iframe
    iframeWindow.focus();
    iframeWindow.print();

    // Remove iframe after printing
    iframeWindow.onafterprint = () => {
      document.body.removeChild(iframe);
    };
  }, []);

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
