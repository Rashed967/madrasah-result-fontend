import { toBengaliNumber } from "@/lib/utils";

interface MadrasahSearchFormProps {
  examType: string;
  setExamType: (value: string) => void;
  madrasahCode: string;
  setMadrasahCode: (value: string) => void;
  mobileNo: string;
  setMobileNo: (value: string) => void;
  examTypes: string[];
}

export function MadrasahSearchForm({
  examType,
  setExamType,
  madrasahCode,
  setMadrasahCode,
  mobileNo,
  setMobileNo,
  examTypes,
}: MadrasahSearchFormProps) {
  return (
    <>
      <div className='w-full'>
        <select
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm'
          required
          name='examType'
        >
          <option value=''>পরীক্ষা নির্বাচন করুন</option>
          {examTypes?.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className='w-full'>
        <input
          type='text'
          value={madrasahCode}
          onChange={(e) => setMadrasahCode(toBengaliNumber(e.target.value))}
          placeholder='মাদরাসা কোড'
          className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm'
          required
          name="madrasahCode"
        />
      </div>
      <div className='w-full md:col-span-2'>
        <input
          type='tel'
          value={mobileNo}
          onChange={(e) => setMobileNo(toBengaliNumber(e.target.value))}
          placeholder='মোবাইল নম্বর'
          className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm'
          required
          name="mobileNo"
        />
      </div>
    </>
  );
}
