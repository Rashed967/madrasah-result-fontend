'use client';

import React, { useEffect, useState } from 'react';
import { DownloadIcon, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { ErrorMessage } from '@/components/ErrorMessage';
import { IndividualSearchForm } from '@/components/forms/IndividualSearchForm';
import { MadrasahSearchForm } from '@/components/forms/MadrasahSearchForm';
import { Header } from '@/components/Header';

import { SearchTypeToggle } from '@/components/SearchTypeToggle';
import { SubmitButton } from '@/components/SubmitButton';
import { MadrasahApiResponse, MadrasahResult } from '@/types/madrasah';
import { StudentResult, StudentApiResponse } from '@/types/student';
import { ResultDisplay } from '@/components/ResultDisplay';
import { getAllSheets } from '@/server_apis/get_all_sheets';
import { searchResult } from '@/server_apis/search_student_result';
import clsx from 'clsx';

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: StudentResult | MadrasahResult;
  error?: string;
}

export default function SearchPage() {
  const router = useRouter();
  const [searchType, setSearchType] = useState<'individual' | 'madrasah'>(
    'individual',
  );
  const [examType, setExamType] = useState('');
  const [marhalah, setMarhalah] = useState('');
  const [registrationNo, setRegistrationNo] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [madrasahCode, setMadrasahCode] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [result, setResult] = useState<StudentResult | MadrasahResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [students, setStudents] = useState<StudentResult[]>([]);
  const marhalahTypes = [
    'আত তাখাসসুস ফিল ফিকহি ওয়াল ইফতা',
    'ফযীলত (স্নাতক)',
    'সানাবিয়্যাহ উলইয়া (উচ্চ মাধ্যমিক)',
    'সানাবিয়্যাহ আম্মাহ (মাধ্যমিক)',
    'মুতাওয়াসসিতাহ (৮ম শ্রেণি)',
    'ইবতেদাইয়্যাহ (প্রাথমিক)',
    'হিফজুল কুরআন (৩০ পারা গ্রুপ)',
    'হিফজুল কুরআন (১০-২০ পারা গ্রুপ)',
    'নাযেরা',
    'ইলমুত তাজবীদ ওয়াল কিরাআত',
  ];

  const examTypes = [
    "৯ম মারকাযী পরীক্ষা-১৪৪৬ হিজরী/২০২৫ঈসায়ী",
    "৮ম মারকাযী পরীক্ষা-১৪৪৫হিজরী/২০২৪ঈসায়ী",
    "৭ম মারকাযী পরীক্ষা-১৪৪৪হিজরী/২০২৩ঈসায়ী",
    "৬ষ্ঠ মারকাযী পরীক্ষা-১৪৪৩হিজরী/২০২২ঈসায়ী",
    "৫ম মারকাযী পরীক্ষা-১৪৪২হিজরী/২০২১ঈসায়ী",
    "৪র্থ মারকাযী পরীক্ষা-১৪৪১হিজরী/২০২০ঈসায়ী",
    "৩য় মারকাযী পরীক্ষা-১৪৪০ হিজরী/২০১৯ঈসায়ী",
    "২য় মারকাযী পরীক্ষা-১৪৩৯হিজরী/২০১৮ঈসায়ী",
    "১ম মারকাযী পরীক্ষা-১৪৩৮হিজরী/২০১৭ঈসায়ী"
  ];


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const payload = searchType === 'individual'
        ? { searchType, examType, marhalah, registrationNo, rollNo }
        : { searchType, examType, madrasahCode, mobileNo };

      const response = await searchResult(payload);

      if (response.success && response.data) {
        // Save data and redirect instead of showing result
        localStorage.setItem('studentResultData', JSON.stringify({
          result: response.data,
          examType,
          searchType
        }));
        router.push('/result-view');
      } else {
        setErrorMessage(response.message || 'কোনো ফলাফল পাওয়া যায়নি');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'দুঃখিত, কোনো সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = () => {
    setShowResult(false);
    setResult(null);
  };


  const handleDownlaodPdf = () => {
    const downloadUrl = "https://drive.google.com/uc?export=download&id=1VxYE5r5-mWjZBsxXMHNsdpSq43n5Yuba";
    window.location.href = downloadUrl;
  }

  return (
    <>
      <div className='min-h-screen bg-gray-100 py-8 print:py-0 font-kalpurush px-2'>

        <div className='mx-auto max-w-4xl print:max-w-full rounded-lg bg-white p-3 print:p-0 md:p-6  shadow-lg'>
          <button
            onClick={handleDownlaodPdf}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm relative mb-4 right-0; top-0; flex items-center justify-center gap-2 bg-yellow-800 text-white ',

            )}
          >
            <DownloadIcon className='w-4 h-4' />
            মেধা তালিকা
          </button>
          {showResult ? (
            <>
              <button
                onClick={handleReturn}
                className="mb-6 flex items-center w-24 text-xs bg-gray-400 text-white px-2 py-2 rounded-lg hover:text-gray-800"
              >
                <Search className="w-3 h-3 mr-2" />
                রেসাল্ট সার্চ
              </button>

              <ResultDisplay
                examType={examType}
                result={result as StudentResult | MadrasahResult}
                searchType={searchType}
              />
            </>
          ) : (
            <>
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

              {errorMessage && <ErrorMessage message={errorMessage} />}


            </>
          )}
        </div>
      </div>

    </>
  );
}
