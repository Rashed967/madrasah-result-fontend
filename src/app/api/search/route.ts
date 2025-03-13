import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.searchType === 'individual') {
      const payload = {
        sheetName: body.examType,
        registrationNo: body.registrationNo,
        rollNo: body.rollNo,
        className: body.marhalah,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/search/student-result`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error(`Backend responded with status: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data);
      return NextResponse.json(data);
    }

    // Handle madrasah search
    if (body.searchType === 'madrasah') {
      const payload = {
        sheetName: body.examType,
        madrasahCode: body.madrasahCode,
        mobileNumber: body.mobileNo,
      };



      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/search/madrasah-result`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error(`Backend responded with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      console.log(data);
      return NextResponse.json(data);
    }

    throw new Error('Invalid search type');
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'দুঃখিত, কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।',
      },
      { status: 500 },
    );
  }
}
