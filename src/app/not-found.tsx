

import ButtonLink from '@/components/links/ButtonLink';
import { Metadata } from 'next';
import Link from 'next/link';
import * as React from 'react';
export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <section style={{ fontFamily: 'kalpurush', width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} className='bg-white flex justify-center items-center font-kalpurush'>
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        gap: '-2px'
      }} className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
        <img
          src='/images/logo.jpg'
          alt='জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ লোগো'
          className='mx-auto mb-2 h-20 rounded-full'
          width={80}
          height={80}
        />
        <h3 style={{ marginBottom: '-10px', }} className='mb-8 text-xl font-bold'>
          {' '}
          জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ
        </h3>
        <p style={{ marginBottom: '5px', }} className='text-sm font mt-4'>রেসাল্ট দেখতে নীচের বাটনে ক্লিক করুন</p>
        <ButtonLink
          size='sm'
          variant='outline'
          className='text-blue-500'
          href='/search'
        >
          রেসাল্ট পেজ
        </ButtonLink>
      </div>
    </section>
  );
}
