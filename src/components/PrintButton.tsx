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
              body { margin: 0; padding: 40px; font-family: 'Kalpurush';}
              @page { size: A4; margin: 0; }
            }

            .student-info-container {
    display: grid;
    grid-template-columns: 1fr; /* Default to one column for screen */
    margin-bottom: 1.5rem; /* Margin bottom */
}

      @media print {
      .student-info-container {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Single column for mobile */
    margin-bottom: 1.5rem; /* Margin bottom */
}

.student-info-item {
    border-bottom: 1px solid #000; /* Light gray border */
    padding: 0.5rem 0; /* Padding for top and bottom */
}

.student-info-row {
    display: grid;
    grid-template-columns: 100px 1fr; /* Two columns */
    align-items: center; /* Center items vertically */
    padding: 0.5rem 0; /* Padding for top and bottom */
}

.student-info-label {
    font-weight: 600; /* Bold text */
    color: #000; /* Dark gray color */
}

.student-info-value {
    margin-left: 0.5rem; /* Space between label and value */
    color: #000; /* Darker gray for value */
}

.md:col-span-2 {
        grid-column: span 2; /* Span two columns */
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
