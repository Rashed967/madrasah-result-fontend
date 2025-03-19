import { Printer } from 'lucide-react';

interface PrintButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export function PrintButton({ isLoading, onClick }: PrintButtonProps) {
  return (
    <div className='print-button mt-6 flex justify-center'>
      <button
        onClick={onClick}
        disabled={isLoading}
        className='rounded-lg bg-gray-700 w-64 py-1 text-white text-sm hover:bg-gray-600 transition-colors disabled:opacity-50'
      >
        {isLoading ? (
          <span>অপেক্ষা করুন...</span>
        ) : (
          <>
            <Printer className='inline-block w-3 h-4 mr-1' /> প্রিন্ট করুন
          </>
        )}
      </button>
    </div>
  );
} 