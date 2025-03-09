'use client';

import axios from 'axios';
import clsx from 'clsx';
import { Printer } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface StudentResult {
  name: string;
  registrationNo: string;
  rollNo: string;
  fatherName: string;
  dateOfBirth: string;
  madrasahName: string;
  madrasahCode: string;
  class: string;
  marks: {
    [key: string]: string;
  };
  totalMarks: string;
  average: string;
  division: string;
  rank: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: StudentResult;
  error?: string;
}

export default function SearchPage() {
  const [searchType, setSearchType] = useState<'individual' | 'madrasah'>(
    'individual'
  );
  const [examType, setExamType] = useState('');
  const [marhalah, setMarhalah] = useState('');
  const [registrationNo, setRegistrationNo] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [madrasahCode, setMadrasahCode] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [result, setResult] = useState<StudentResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [examTypes, setExamTypes] = useState<string[]>([]);
  const marhalahTypes = [
    'আত তাখাসসুস ফিল ফিকহি ওয়াল ইফতা',
    'ফযীলত',
    'ফযীলত বালিকা',
    'সানাবিয়্যাহ',
    'সানাবিয়্যাহ বালিকা',
    'মুতাওয়াসসিতাহ',
    'মুতাওয়াসসতিাহ',
    'ইবতদোইয়্যাহ বালক',
    'ইবতেদাইয়্যাহ বালিকা',
    'তাহফিজুল কুরআন 30 পারা',
    'তাহফজিুল কুরআন ১০-২০ পারা',
    'নাযরো',
    'ইলমুত তাজবীদ ওয়াল কিরাআত',
  ];

  useEffect(() => {
    const fetchExamTypes = async () => {
      try {
        const response = await axios.get('/api/sheets');

        if (response.data.success) {
          setExamTypes(response.data.data);
        }
      } catch (error) {
        // console.error('Failed to fetch exam types:', error);
      }
    };

    fetchExamTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const payload =
        searchType === 'individual'
          ? {
              searchType,
              examType,
              marhalah,
              registrationNo,
              rollNo,
            }
          : {
              searchType,
              examType,
              madrasahCode,
              mobileNo,
            };

      const response = await axios.post<ApiResponse>('/api/search', payload);

      if (response.data.success && response.data.data) {
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
          <hr className='my-6 border-t border-gray-300' />
        </div>

        <div className='flex justify-center gap-4 mb-6'>
          <button
            onClick={() => setSearchType('individual')}
            className={clsx(
              'px-4 py-2 rounded-lg font-noto-serif-bengali text-sm',
              searchType === 'individual'
                ? 'bg-green-700 text-white'
                : 'bg-gray-200 text-gray-700'
            )}
          >
            ব্যক্তিগত ফলাফল
          </button>
          <button
            onClick={() => setSearchType('madrasah')}
            className={clsx(
              'px-4 py-2 rounded-lg font-noto-serif-bengali text-sm',
              searchType === 'madrasah'
                ? 'bg-green-700 text-white'
                : 'bg-gray-200 text-gray-700'
            )}
          >
            মাদরাসাওয়ারী ফলাফল
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4 mb-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='w-full'>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-noto-serif-bengali'
                required
              >
                <option value=''>পরীক্ষা নির্বাচন করুন</option>
                {examTypes?.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {searchType === 'individual' ? (
              <>
                <div className='w-full'>
                  <select
                    value={marhalah}
                    onChange={(e) => setMarhalah(e.target.value)}
                    className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-noto-serif-bengali'
                    required
                    disabled={!examType}
                  >
                    <option value=''>মারহালা নির্বাচন করুন</option>
                    {marhalahTypes?.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='w-full'>
                  <input
                    type='text'
                    value={registrationNo}
                    onChange={(e) => setRegistrationNo(e.target.value)}
                    placeholder='রেজিস্ট্রেশন নম্বর'
                    className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-noto-serif-bengali'
                    required
                  />
                </div>
                <div className='w-full'>
                  <input
                    type='text'
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder='রোল নম্বর'
                    className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-noto-serif-bengali'
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className='w-full'>
                  <input
                    type='text'
                    value={madrasahCode}
                    onChange={(e) => setMadrasahCode(e.target.value)}
                    placeholder='মাদরাসা কোড'
                    className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-noto-serif-bengali'
                    required
                  />
                </div>
                <div className='w-full md:col-span-2'>
                  <input
                    type='tel'
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    placeholder='মোবাইল নম্বর'
                    className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-noto-serif-bengali'
                    required
                  />
                </div>
              </>
            )}
          </div>

          <div className='text-center'>
            <button
              type='submit'
              className='font-noto-serif-bengali rounded-lg bg-green-700 px-8 py-2 text-white hover:bg-green-800 text-sm'
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
                {result.class}
              </h2>
            </div>
            <table className='w-full border-collapse mb-6'>
              <tbody>
                <tr className='border-b border-gray-300'>
                  <td className='px-4 py-2 text-sm'>
                    <div className='w-full sm:w-24 border-gray-300 inline-block font-semibold'>
                      রোল নম্বর
                    </div>
                    <span className='pr-4'>: </span>
                    {result.rollNo}
                  </td>
                  <td className='px-4 py-2 text-sm'>
                    <div className='font-semibold w-24 inline-block'>
                      রেজি. নং
                    </div>
                    <span className='pr-4'>: </span>
                    {result.registrationNo}
                  </td>
                </tr>
                <tr className='border-b border-gray-300'>
                  <td className='px-4 py-2 text-sm'>
                    <div className='font-semibold w-24 inline-block'>নাম</div>
                    <span className='pr-4'>: </span>
                    {result.name}
                  </td>
                  <td className='px-4 py-2 text-sm'>
                    <div className='font-semibold w-24 inline-block'>
                      পিতার নাম
                    </div>
                    <span className='pr-4'>: </span>
                    {result.fatherName}
                  </td>
                </tr>
                <tr className='border-b border-gray-300'>
                  <td className='px-4 py-2 text-sm'>
                    <div className='font-semibold w-24 inline-block'>
                      জন্ম তারিখ
                    </div>
                    <span className='pr-4'>: </span>
                    {result.dateOfBirth}
                  </td>
                  <td className='px-4 py-2 text-sm'>
                    <div className='font-semibold w-24 inline-block'>
                      প্রাপ্ত বিভাগ
                    </div>
                    <span className='pr-4'>: </span>
                    {result.division}
                  </td>
                </tr>
                <tr className='border-b border-gray-300'>
                  <td colSpan={2} className='px-4 py-2 text-sm'>
                    <div className='font-semibold w-24 inline-block'>
                      মাদরাসার নাম
                    </div>
                    <span className='pr-4'>: </span>
                    {result.madrasahName}
                  </td>
                </tr>
              </tbody>
            </table>

            <div>
              <h2 className='text-xl font-bold text-green-800 text-center mb-4 font-noto-serif-bengali'>
                নম্বরপত্র
              </h2>
            </div>

            <div className='overflow-x-auto rounded-md'>
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
                <tbody>
                  {Object.entries(result.marks).map(
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
                          {marks}
                        </td>
                      </tr>
                    )
                  )}
                  <tr className='font-bold text-center'>
                    <td className='border border-gray-300 px-4 py-2'>
                      মোট নম্বর
                    </td>
                    <td className='border border-gray-300 px-4 py-2'>
                      {result.totalMarks}
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
