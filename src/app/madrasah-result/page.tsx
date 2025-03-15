'use client';
import { MadrasahResultPdf } from "@/components/resultPdf/madrasahResultPdf/MadrasahResultPdf";
import { MadrasahResult } from "@/types/madrasah";
import { useEffect, useState } from "react";

const page = () => {
  // get madrasah result from local storage and parse it, then save in state
  const [result, setResult] = useState<MadrasahResult | null>(null);
  const [examType, setExamType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const madrasahResult = localStorage.getItem('madrasahResult');
    const examType = localStorage.getItem('examType');
    if (madrasahResult) {
      setResult(JSON.parse(madrasahResult));
    }
    if (examType) {
      setExamType(examType);
    }
    setIsLoading(false);
  }, []);
  console.log(result);
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <MadrasahResultPdf result={result as MadrasahResult} examType={examType} />
      )}
    </div>
  );
};

export default page;
