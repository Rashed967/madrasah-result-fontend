import { Printer } from 'lucide-react';
import { RefObject } from 'react';
import { useReactToPrint } from 'react-to-print';

interface PrintButtonProps {
  printRef: RefObject<HTMLDivElement>;
}

export function PrintButton({ printRef }: PrintButtonProps) {
  const printHandler = useReactToPrint({
    documentTitle: 'Result',
    contentRef: printRef,
    pageStyle: `
      @font-face {
        font-family: 'Kalpurush';
        src: url('/fonts/kalpurush.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }

      @page {
        size: A4;
        margin: 0;
      }

      @media print {
        html, body {
          margin: 40px;
          font-family: 'Kalpurush', sans-serif;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        /* Student Info Grid Layout */
        .student-info-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
        }

        .student-info-item {
          border-bottom: 1px solid #000;
        }

        .student-info-item:last-child {
          grid-column: span 2;
        }

        .student-info-row {
          display: grid;
          grid-template-columns: 100px 1fr;
          align-items: center;
          padding: 8px 0;
        }

        .print-header {
          margin-bottom: 2rem;
          border-bottom: 1px solid #000;
          padding-bottom: 4px;
          position: relative;
        }

        .print-header-logo {
          position: absolute;
          left: 83px;
          top: 0;
        }

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
        }

        .print-header h3 {
          font-size: 18px;
          font-weight: normal;
          margin: 0;
        }

        .print-header p {
          font-size: 14px;
          margin: 0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        th {
          background-color: #15803d !important;
          color: white !important;
          padding: 8px;
          text-align: center;
          border: 1px solid #000;
        }

        td {
          padding: 8px;
          text-align: center;
          border: 1px solid #000;
        }

        .no-print {
          display: none !important;
        }

        .print-only {
          display: block !important;
        }

        /* Signature styles */
        .signature {
          position: absolute;
          bottom: 80px;
          right: 40px;
          text-align: center;
        }

        .signature img {
          width: 120px;
          height: auto;
          margin-bottom: 5px;
        }

        .signature-text {
          font-size: 14px;
          margin: 0;
        }
      }
    `,
    fonts: [
      {
        family: 'Kalpurush',
        source: 'url(/fonts/kalpurush.ttf)',
      },
    ],
  });

  return (
    <div className='mt-8 text-center print:hidden'>
      <button
        onClick={() => printHandler()}
        className='rounded-lg bg-gray-600 w-64 py-1 text-white hover:bg-gray-700 text-sm'
      >
        <Printer className='inline-block w-3 h-4 mr-1' /> প্রিন্ট করুন
      </button>
    </div>
  );
}
