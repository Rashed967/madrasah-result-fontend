import { Printer } from 'lucide-react';
import Image from 'next/image';
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

      return Promise.resolve();
    },
    onAfterPrint: () => alert('Print successful!'),
  });

  return (
    <div className='mt-8 text-center print:hidden '>
      <div className='print-header hidden print:block'>
        <div className='print-header-logo'>
          <Image
            src='/images/logo.jpg'
            alt='logo'
            width={75}
            height={75}
            priority
          />
        </div>
        <div className='print-header-content'>
          <h1>জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
          <h3>(বেফাকুল মাদারিসিদ্দীনিয়্যা বাংলাদেশ)</h3>
          <p>অস্থায়ী কার্যালয়: ৩৪১/৫ টি ভি রোড, পূর্ব রামপুরা, ঢাকা-১২১৯</p>
        </div>
      </div>
      <button

        className='rounded-lg bg-gray-700 w-64 py-1 text-white text-sm'
      >
        <Printer className='inline-block w-3 h-4 mr-1' /> প্রিন্ট করুন
      </button>
    </div>
  );
};

export default PrintButton;
