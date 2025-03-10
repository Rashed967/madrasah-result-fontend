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
            body { padding: 40px; }
            table { border-collapse: collapse; width: 100%; }
            td, th { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #15803d; color: white; }
            .text-center { text-align: center; }
            @media print {
              body { margin: 0; padding: 40px; }
              @page { size: A4; margin: 0; }
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
