const PrintHeaderForStudent = () => {
  return (
    <div className="print:block hidden">
      <div className="flex justify-center items-center relative border-b border-black/60 pb-2 ">
        <img src="/images/logo.jpg" alt="logo" className="w-[70px] h-[70px] absolute left-20 top-2 " />
        <div className="text-center">
          <h1 className="text-2xl font-bold">জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
          <h3 className="text-lg">[বেফাকুল মাদারিসিদ্দীনিয়্যা বাংলাদেশ]</h3>
          <p className="text-base">অস্থায়ী কার্যালয়: ৩৪১/৫ টি ভি রোড, পূর্ব রামপুরা, ঢাকা-১২১৯</p>
        </div>
      </div>
    </div>
  )
}

export default PrintHeaderForStudent;
