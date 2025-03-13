import { Printer } from 'lucide-react';
import React from 'react';
import { useReactToPrint } from 'react-to-print';

interface PrintButtonProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const PrintButton = ({ contentRef }: PrintButtonProps) => {
  const reactToPrintFn = useReactToPrint({
    contentRef: contentRef as React.RefObject<HTMLDivElement>,
    // content: (): HTMLElement | null => contentRef?.current, // 👈 টাইপ স্পষ্ট করে দাও

    onBeforePrint: () => {
      // console.log('Printing...', contentRef.current);
      return Promise.resolve();
    },
    onAfterPrint: () => alert('Print successful!'),
  });

  return (
    <div className='mt-8 text-center print:hidden '>
      <button

        className='rounded-lg bg-gray-700 w-64 py-1 text-white text-sm'
      >
        <Printer className='inline-block w-3 h-4 mr-1' /> প্রিন্ট করুন
      </button>
    </div>
  );
};

export default PrintButton;
