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
