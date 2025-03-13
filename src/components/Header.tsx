import Image from 'next/image';

export function Header() {
  return (
    <div className='mb-8 text-center mt-5 print:hidden font-kalpurush'>
      <Image
        src='/images/logo.jpg'
        width={80}
        height={80}
        alt='Madrasah Logo'
        className='mx-auto mb-6 h-20 rounded-full'
      />

      <h2 className='text-base md:text-2xl  font-bold text-green-800 mt-2 '>
        জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ
      </h2>
      <hr className='my-6 border-t border-gray-300' />
    </div>
  );
}
