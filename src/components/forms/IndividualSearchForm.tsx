import { toBengaliNumber } from '@/lib/utils';

interface IndividualSearchFormProps {
  examType: string;
  setExamType: (value: string) => void;
  marhalah: string;
  setMarhalah: (value: string) => void;
  registrationNo: string;
  setRegistrationNo: (value: string) => void;
  rollNo: string;
  setRollNo: (value: string) => void;
  examTypes: string[];
  marhalahTypes: string[];
}

export function IndividualSearchForm({
  examType,
  setExamType,
  marhalah,
  setMarhalah,
  registrationNo,
  setRegistrationNo,
  rollNo,
  setRollNo,
  examTypes,
  marhalahTypes,
}: IndividualSearchFormProps) {
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
        <select
          value={marhalah}
          onChange={(e) => setMarhalah(e.target.value)}
          className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm'
          required
          disabled={!examType}
          name='marhalah'
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
          onChange={(e) => setRegistrationNo(toBengaliNumber(e.target.value))}
          placeholder='রেজিস্ট্রেশন নম্বর'
          className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm'
          required
          name='registrationNo'
        />
      </div>
      <div className='w-full'>
        <input
          type='text'
          value={rollNo}
          onChange={(e) => setRollNo(toBengaliNumber(e.target.value))}
          placeholder='রোল নম্বর'
          className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm'
          required
          name='rollNo'
        />
      </div>
    </>
  );
}
