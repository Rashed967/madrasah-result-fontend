import clsx from 'clsx';

interface SearchTypeToggleProps {
  searchType: 'individual' | 'madrasah';
  setSearchType: (type: 'individual' | 'madrasah') => void;
}

export function SearchTypeToggle({
  searchType,
  setSearchType,
}: SearchTypeToggleProps) {
  return (
    <div className='flex justify-center gap-4 mb-6 print:hidden'>
      <button
        onClick={() => setSearchType('individual')}
        className={clsx(
          'px-4 py-2 rounded-lg text-sm',
          searchType === 'individual'
            ? 'bg-green-700 text-white'
            : 'bg-gray-200 text-gray-700'
        )}
      >
        ব্যক্তিগত ফলাফল
      </button>
      <button
        onClick={() => setSearchType('madrasah')}
        className={clsx(
          'px-4 py-2 rounded-lg text-sm',
          searchType === 'madrasah'
            ? 'bg-green-700 text-white'
            : 'bg-gray-200 text-gray-700'
        )}
      >
        মাদরাসাওয়ারী ফলাফল
      </button>
    </div>
  );
}
