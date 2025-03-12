import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sheetName = searchParams.get('sheetName');

    if (!sheetName) {
      return NextResponse.json(
        { success: false, error: 'Sheet name is required' },
        { status: 400 },
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MAIN_URL}/classes?sheetName=${encodeURIComponent(sheetName)}`,
    );

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'মারহালার তালিকা লোড করতে সমস্যা হয়েছে' },
      { status: 500 },
    );
  }
}
