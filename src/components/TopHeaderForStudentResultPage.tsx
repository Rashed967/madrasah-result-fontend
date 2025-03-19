const TopHeaderForStudentResultPage = () => {
  return (
    <div className='mb-8 border-b pb-4 print:hidden'>
      <div className='flex items-center justify-center gap-6 md:gap-8'>
        <img
          src='/images/logo.jpg'
          alt='logo'
          width={60}
          height={60}
          className='object-contain'
        />
        <div className='text-center'>
          <h1 className='text-xl md:text-3xl font-bold '>জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
        </div>
      </div>
    </div>
  )
}

export default TopHeaderForStudentResultPage;
