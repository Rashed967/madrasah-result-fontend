'use client'
import { IoMdClose } from "react-icons/io";
import { useRouter } from 'next/navigation';
import GenerateStudentResultPdf from "./components/StudentResultPdf";
import handlePdfDownload from "@/utils/studentResultPdfDownloadn";

const Page = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-100 ">
      <div className="container mx-auto">
        {/* Close Button */}





        <GenerateStudentResultPdf />
      </div>
    </div>
  );
};

export default Page;

