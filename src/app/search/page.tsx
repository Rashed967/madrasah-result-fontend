'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

import { ErrorMessage } from '@/components/ErrorMessage';
import { IndividualSearchForm } from '@/components/forms/IndividualSearchForm';
import { MadrasahSearchForm } from '@/components/forms/MadrasahSearchForm';
import { Header } from '@/components/Header';

import { SearchTypeToggle } from '@/components/SearchTypeToggle';
import { SubmitButton } from '@/components/SubmitButton';
import { MadrasahApiResponse, MadrasahResult } from '@/types/madrasah';
import { StudentResult, StudentApiResponse } from '@/types/student';
import StudentResultPdf from '@/components/resultPdf/studentResultPdf/StudentResultPdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResultDisplay } from '@/components/ResultDisplay';
import { getAllSheets } from '@/app/server_apis/get_all_sheets';
import { searchResult } from '@/app/server_apis/search_student_result';

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: StudentResult | MadrasahResult;
  error?: string;
}

export default function SearchPage() {
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
  const [examTypes, setExamTypes] = useState<string[]>([]);
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

  useEffect(() => {
    const fetchExamTypes = async () => {
      try {
        const response = await getAllSheets();

        if (response.success) {
          setExamTypes(response.data);
        }
      } catch (_error) {
        // Handle error if needed
      }
    };

    fetchExamTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
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

      const response = await searchResult(payload);
      console.log(response.data);

      if (response.success && response.data) {
        setResult(response.data);
        setShowResult(true);
        if (searchType === 'individual') {
          setStudents([response.data as StudentResult]);
        }
      } else {
        console.log(response.message);
        setErrorMessage(response.message || 'কোনো ফলাফল পাওয়া যায়নি');
      }
    } catch (_error: any) {
      setErrorMessage(_error.message || 'দুঃখিত, কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = () => {
    setShowResult(false);
    setResult(null);
  };

  return (
    <>
      <div className='min-h-screen bg-gray-100 py-8 font-kalpurush px-2'>
        <div className='mx-auto max-w-4xl rounded-lg bg-white p-3 md:p-6 shadow-lg'>
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
