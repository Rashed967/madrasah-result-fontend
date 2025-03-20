interface SearchRequest {
  searchType: 'individual' | 'madrasah';
  examType: string;
  registrationNo?: string;
  rollNo?: string;
  marhalah?: string;
  madrasahCode?: string;
  mobileNo?: string;
}

export async function searchResult(request: SearchRequest) {

  try {
    const { searchType, examType, registrationNo, rollNo, marhalah, madrasahCode, mobileNo } = request;


    if (searchType === 'individual') {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/search/student-result`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sheetName: examType,
            registrationNo,
            rollNo,
            className: marhalah,
          }),
        },
      );


      if (!response.ok) {
        throw new Error(`Backend responded with status: ${response.status}`);
      }

      const data = await response.json();

      return { ...data, success: true };
    }

    if (searchType === 'madrasah') {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/search/madrasah-result`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sheetName: examType,
            madrasahCode,
            mobileNumber: mobileNo,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Backend responded with status: ${response.status}`);
      }

      const data = await response.json();
      return { ...data, success: true };
    }

    throw new Error('Invalid search type');
  } catch (error) {

    return {
      success: false,
      error: 'দুঃখিত, কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।',
    };
  }
}

