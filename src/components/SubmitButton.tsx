interface SubmitButtonProps {
  loading: boolean;
}

export function SubmitButton({ loading }: SubmitButtonProps) {
  return (
    <div className='text-center'>
      <button
        type='submit'
        className='rounded-lg bg-green-700 px-8 py-2 text-white hover:bg-green-800 text-sm'
        disabled={loading}
      >
        {loading ? 'অপেক্ষা করুন...' : 'ফলাফল দেখুন'}
      </button>
    </div>
  );
}
