import { Printer } from 'lucide-react';

export function PrintButton() {
  return (
    <div className='mt-8 text-center'>
      <button
        onClick={() => window.print()}
        className='rounded-lg bg-gray-600 w-64 py-1 text-white hover:bg-gray-700 text-sm'
      >
        <Printer className='inline-block w-3 h-4 mr-1' /> প্রিন্ট করুন
      </button>
    </div>
  );
}
