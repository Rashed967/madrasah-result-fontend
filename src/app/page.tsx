'use client';

import Image from 'next/image';
import * as React from 'react';
import '@/lib/env';

import ButtonLink from '@/components/links/ButtonLink';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <main>
      {/* just logo name and reuslt page link with button */}
      <section className='bg-white '>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <Image
            src='/images/logo.jpg'
            alt='Madrasah Logo'
            className='mx-auto mb-2 h-20 rounded-full'
          />
          <h1 className='mt-4 mb-4 text-base '>
            {' '}
            জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ
          </h1>
          <p className='text-sm font'>রেসাল্ট দেখতে নীচের বাটনে ক্লিক করুন</p>
          <ButtonLink
            size='sm'
            variant='outline'
            className='mt-4'
            href='/search'
          >
            রেসাল্ট পেজ
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
