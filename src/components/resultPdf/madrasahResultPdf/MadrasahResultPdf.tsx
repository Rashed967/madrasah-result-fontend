import Image from 'next/image';
import { MadrasahResult } from '@/types/madrasah';
import { toBengaliNumber } from '@/lib/utils';

interface MadrasahResultPdfProps {
  result: MadrasahResult;
  examType: string;
}

export function MadrasahResultPdf({ result, examType }: MadrasahResultPdfProps) {
  return (
    <div id="madrasah-pdf-content" className="w-[297mm] min-h-[210mm] bg-white font-kalpurush box-border">
      <div className="px-8 pt-6 pb-4 break-inside-avoid box-border">
        <div className="relative border-b border-gray-400 pb-2 mb-4">
          <Image
            src='/images/logo.jpg'
            alt='logo'
            width={75}
            height={75}
            priority
            quality={100}
            unoptimized
            className='absolute left-24 top-4'
          />
          <div className='text-center pt-2'>
            <h1 className='text-2xl font-bold mb-2'>জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
            <h3 className='text-lg mb-1'>(বেফাকুল মাদারিসিদ্দীনিয়্যা বাংলাদেশ)</h3>
            <p className='text-sm'>অস্থায়ী কার্যালয়: ৩৪১/৫ টি ভি রোড, পূর্ব রামপুরা, ঢাকা-১২১৯</p>
          </div>

          <div className="absolute right-0 top-0 border border-gray-400 p-2 text-sm">
            <h4 className="font-bold mb-1">বিভাগ বিন্যাস</h4>
            <div className="grid grid-cols-2 gap-x-4 text-xs">
              <p>মুমতায (৮০+) : ৮০</p>
              <p>জায়্যিদ (৭০+) : ৬০</p>
              <p>জায়্যিদ জিদ্দান (৬০+) : ৪০</p>
              <p>মাকবুল (৪০+) : ৩০</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <h2 className='text-xl font-bold mb-2'>{examType}</h2>
          <h3 className='text-lg mb-1'>মারকাযী পরীক্ষার ফলাফল</h3>
        </div>

        <div className="flex items-start mb-4">
          <div className="text-sm">
            <p>মাদরাসার নাম: {toBengaliNumber(result.madrasahName)}</p>
            <p>মাদরাসা কোড: {toBengaliNumber(result.madrasahCode)}</p>
          </div>
        </div>
      </div>

      <div className="px-8 box-border">
        {Object.entries(result.resultsByClass).map(([className, students], index) => (
          <div
            key={className}
            className={`mb-12 ${index > 0 ? 'break-before-page' : ''} box-border`}
          >
            <h3 className="text-center font-semibold text-lg mb-3">
              {className}
            </h3>

            <table className="w-full border-collapse border border-gray-400 text-sm box-border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 p-1.5 w-12 align-middle">ক্র.নং</th>
                  <th className="border border-gray-400 p-1.5 align-middle">নাম</th>
                  <th className="border border-gray-400 p-1.5 w-16 align-middle">রোল</th>
                  {Object.keys(students[0].marks).map(subject => (
                    <th key={subject} className="border border-gray-400 p-1.5 w-16 align-middle">{subject}</th>
                  ))}
                  <th className="border border-gray-400 p-1.5 w-16 align-middle">মোট</th>
                  <th className="border border-gray-400 p-1.5 align-middle">বিভাগ</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={student.registrationNo} className="h-9">
                    <td className="border border-gray-400 p-1.5 text-center align-middle">{toBengaliNumber(idx + 1)}</td>
                    <td className="border border-gray-400 p-1.5 align-middle">{student.name}</td>
                    <td className="border border-gray-400 p-1.5 text-center align-middle">{toBengaliNumber(student.rollNo)}</td>
                    {Object.values(student.marks).map((mark, idx) => (
                      <td key={idx} className="border border-gray-400 p-1.5 text-center align-middle">{toBengaliNumber(mark)}</td>
                    ))}
                    <td className="border border-gray-400 p-1.5 text-center align-middle">{toBengaliNumber(student.totalMarks)}</td>
                    <td className="border border-gray-400 p-1.5 align-middle">{student.division}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div className="px-8 pb-6 break-inside-avoid mt-auto box-border">
        <div className="text-sm mt-4 mb-16">
          <p>বি.দ্র.: ফলাফলের মধ্যে কোন ভুল-ত্রুটি পরিলক্ষিত হলে অথবা কোন বিষয়ে জানতে চাইলে ৩০ দিনের মধ্যে বোর্ড অফিসে যোগাযোগ করুন।</p>
          <p>* পরীক্ষার্থীর ফলাফল বিষয়ে কোন অভিযোগ থাকলে ৭ দিনের মধ্যে লিখিতভাবে বোর্ড অফিসে জানাতে হবে।</p>
        </div>

        <div className='text-center mt-4'>
          <div className='inline-block'>
            <Image
              src='/images/signature.jpg'
              alt='signature'
              width={80}
              height={60}
              priority
              quality={100}
              unoptimized
              className='-rotate-[4deg]'
            />
            <p className='border-b border-black mb-1'>পরীক্ষা নিয়ন্ত্রক</p>
            <p>(মাওলানা ফয়সাল উমর ফারুক)</p>
          </div>
        </div>
      </div>
    </div>
  );
} 