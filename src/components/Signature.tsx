import { currentBanglaDate } from "@/utils/currentBannglaDate";

const Signature = () => {
  return (
    <div className="text-center mt-4 absolute bottom-8 right-8 hidden print:block">
      <img src="/images/signature.jpg" alt="signature" className="w-20" />
      <p className="">
        পরীক্ষা নিয়ন্ত্রক<br />
        <span className="border-t border-black/60 ">মাওলানা ফয়সাল উমর ফারুক</span><br />
        <span className="text-sm">তারিখ: {currentBanglaDate()}ঈ.</span>
      </p>
    </div>
  )
}

export default Signature;
