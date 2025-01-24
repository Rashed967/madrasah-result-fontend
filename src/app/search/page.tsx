'use client';

import axios from 'axios';
import clsx from 'clsx';
import { Printer } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';

import { toBengaliNumber } from '@/lib/utils';

interface SubjectResult {
  [key: string]: string;
}

interface ResultData {
  sheetName: string;
  registrationNo: string;
  rollNo: string;
  name: string;
  fatherName: string;
  dateOfBirth: string;
  class: string;
  department: string;
  subjects: SubjectResult;
}

interface ApiResponse {
  success: boolean;
  data: ResultData;
  error?: string;
}

export default function SearchPage() {
  const [rollNo, setRollNo] = useState('');
  const [result, setResult] = useState<ResultData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post<ApiResponse>('/api/search', {
        rollNo: parseInt(rollNo),
      });

      if (response.data.success) {
        setResult(response.data.data);
      } else {
        setError(response.data.error || 'কোনো ফলাফল পাওয়া যায়নি');
      }
    } catch (err) {
      setError('দুঃখিত, কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 py-8'>
      <div className='mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg'>
        <div className='mb-8 text-center mt-5'>
          <Image
            src='/images/logo.jpg'
            width={80}
            height={80}
            alt='Madrasah Logo'
            className='mx-auto mb-6 h-20 rounded-full'
          />
          <h1 className='text-base md:text-xl font-bold text-green-800 font-noto-serif-bengali mt-2'>
            জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ
          </h1>
          <hr className='my-6 border-t border-gray-300 ' />

          <h3 className='text-base font-semibold text-black mt-2 font-noto-serif-bengali'>
            ব্যাক্তিগত ফলাফল
          </h3>
        </div>

        <form onSubmit={handleSubmit} className='mb-8 text-center '>
          <div className='md:flex md:justify-center md:gap-4 space-y-4 md:space-y-0 md:space-x-4 gap-x-4'>
            <input
              type='text'
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder='রেজিস্ট্রেশন নম্বর লিখুন'
              className='rounded-lg border border-gray-300 px-4 py-1 text-sm font-noto-serif-bengali'
            />
            <button
              type='submit'
              className='font-noto-serif-bengali rounded-lg bg-green-700 px-4 py-1 text-white hover:bg-green-800 text-sm'
              disabled={loading}
            >
              {loading ? 'অপেক্ষা করুন...' : 'ফলাফল দেখুন'}
            </button>
          </div>
        </form>

        {error && <div className='mb-4 text-center text-red-600'>{error}</div>}

        {result && (
          <div className='result-container text-sm font-noto-serif-bengali'>
            <div>
              <h2 className='text-xl font-bold text-green-800 text-center mb-4 font-noto-serif-bengali'>
                {result.department}
              </h2>
            </div>
            <table className='w-full border-collapse mb-6'>
              <tbody>
                <tr className=' border-b border-gray-300 '>
                  <td className=' px-4 py-2 text-sm '>
                    <div className='w-full sm:w-24  border-gray-300 inline-block font-semibold'>
                      রোল নম্বর
                    </div>
                    <span className='pr-4'>: </span>
                    {toBengaliNumber(result.rollNo)}
                  </td>
                  <td className='  px-4 py-2 text-sm'></td>
                  <td className='  px-4 py-2 text-sm'>
                    <div className='font-semibold w-24 inline-block'>
                      রেজি. নং
                    </div>
                    <span className='pr-4'>: </span>
                    {toBengaliNumber(result.registrationNo)}
                  </td>
                  <td className='   px-4 py-2 text-sm'></td>
                </tr>
                <tr className='border-b border-gray-300'>
                  <td className=' px-4 py-2 text-sm'>
                    <div className='font-semibold w-24 inline-block'>নাম</div>
                    <span className='pr-4'>: </span>
                    {result.name}
                  </td>
                  <td className=' px-4 py-2 text-sm'></td>
                  <td className=' px-4 py-2 text-sm'>
                    <div className='font-semibold w-24 inline-block'>
                      পিতার নাম:
                    </div>
                    <span className='pr-4'>: </span>
                    {result.fatherName}
                  </td>
                  <td className=' px-4 py-2 text-sm'></td>
                </tr>
                <tr className='border-b border-gray-300'>
                  <td className=' px-4 py-2 text-sm'>
                    <div className='font-semibold w-24 inline-block'>
                      জন্ম তারিখ:
                    </div>
                    <span className='pr-4'>: </span>
                    {toBengaliNumber(result.dateOfBirth)}
                  </td>
                  <td className=' px-4 py-2 text-sm'></td>
                  <td className=' px-4 py-2 text-sm'>
                    <div className='font-semibold w-24 inline-block'>
                      প্রাপ্ত বিভাগ:
                    </div>
                    <span className='pr-4'>: </span>
                    মুমতায
                  </td>
                  <td className=' px-4 py-2 text-sm'></td>
                </tr>
                <tr className='border-b border-gray-300'>
                  <td className=' px-4 py-2 text-sm'>
                    <div className='font-semibold w-24 inline-block'>
                      মাদরাসার নাম:
                    </div>
                    <span className='pr-4'>: </span>
                    জামিআ ইকরা বাংলাদেশ
                  </td>
                  <td className=' px-4 py-2 text-sm'></td>
                </tr>
              </tbody>
            </table>

            <div>
              <h2 className='text-xl font-bold text-green-800 text-center mb-4 font-noto-serif-bengali'>
                নম্বরপত্র
              </h2>
            </div>

            <div className='overflow-x-auto rounded-md font-noto-serif-bengali'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='bg-green-700 text-white'>
                    <th className='border border-gray-300 px-4 py-2 text-sm'>
                      বিষয়
                    </th>
                    <th className='border border-gray-300 px-4 py-2 text-sm'>
                      প্রাপ্ত নম্বর
                    </th>
                  </tr>
                </thead>
                <tbody className='text-sm'>
                  {Object.entries(result.subjects).map(
                    ([subject, marks], index) => (
                      <tr
                        key={subject}
                        className={clsx(
                          'text-center',
                          index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        )}
                      >
                        <td className='border border-gray-300 px-4 py-2'>
                          {subject}
                        </td>
                        <td className='border border-gray-300 px-4 py-2'>
                          {toBengaliNumber(marks)}
                        </td>
                      </tr>
                    )
                  )}
                  <tr className='font-bold'>
                    <td className='border border-gray-300 px-4 py-2 text-center'>
                      মোট নম্বর
                    </td>
                    <td className='border border-gray-300 px-4 py-2 text-center'>
                      {toBengaliNumber(
                        Object.values(result.subjects).reduce(
                          (sum, mark) => sum + parseInt(mark),
                          0
                        )
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='mt-8 text-center'>
              <button
                onClick={() => window.print()}
                className='rounded-lg bg-gray-600 w-64 py-1 text-white hover:bg-gray-700 text-sm'
              >
                <Printer className='inline-block w-3 h-4 mr-1' /> প্রিন্ট করুন
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
