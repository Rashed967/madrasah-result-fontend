'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { ErrorMessage } from '@/components/ErrorMessage';
import { IndividualSearchForm } from '@/components/forms/IndividualSearchForm';
import { MadrasahSearchForm } from '@/components/forms/MadrasahSearchForm';
import { Header } from '@/components/Header';
import { ResultDisplay } from '@/components/ResultDisplay';
import { SearchTypeToggle } from '@/components/SearchTypeToggle';
import { SubmitButton } from '@/components/SubmitButton';

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
  examineeType: string;
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
    'ফযীলত (স্নাতক)',
    'সানাবিয়্যাহ উলইয়া (উচ্চ মাধ্যমিক)',
    'সানাবিয়্যাহ আম্মাহ (মাধ্যমিক)',
    'মুতাওয়াসসিতাহ (৮ম শ্রেণি)',
    'ইবতেদাইয়্যাহ (প্রাথমিক)',
    'হিফজুল কুরআন (৩০ পারা গ্রুপ)',
    'হিফজুল কুরআন (১০-২০ পারা গ্রুপ)',
    'ইলমুত তাজবীদ ওয়াল কিরাআত',
    'নাযেরা',
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
      <div className='mx-auto max-w-4xl rounded-lg bg-white p-3 md:p-6 shadow-lg'>
        <Header />
        <SearchTypeToggle
          searchType={searchType}
          setSearchType={setSearchType}
        />

        <form onSubmit={handleSubmit} className='space-y-4 mb-8 print:hidden'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {searchType === 'individual' ? (
              <IndividualSearchForm
                examType={examType}
                setExamType={setExamType}
                marhalah={marhalah}
                setMarhalah={setMarhalah}
                registrationNo={registrationNo}
                setRegistrationNo={setRegistrationNo}
                rollNo={rollNo}
                setRollNo={setRollNo}
                examTypes={examTypes}
                marhalahTypes={marhalahTypes}
              />
            ) : (
              <MadrasahSearchForm
                examType={examType}
                setExamType={setExamType}
                madrasahCode={madrasahCode}
                setMadrasahCode={setMadrasahCode}
                mobileNo={mobileNo}
                setMobileNo={setMobileNo}
                examTypes={examTypes}
              />
            )}
          </div>
          <SubmitButton loading={loading} />
        </form>

        {error && <ErrorMessage message={error} />}
        {result && <ResultDisplay examType={examType} result={result} />}
      </div>
    </div>
  );
}
