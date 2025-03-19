export async function getAllClasses(sheetName: string) {
  if (!sheetName) {
    return {
      success: false,
      error: 'Sheet name is required',
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/classes?sheetName=${encodeURIComponent(
      sheetName,
    )}`,
  );

  if (!response.ok) {
    throw new Error(`Backend responded with status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

