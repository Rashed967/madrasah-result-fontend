import { MadrasahResult } from "@/types/madrasah";

export const generateMadrasahPdf = async (result: MadrasahResult, examType: string) => {

  try {
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ result, examType }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'PDF জেনারেট করতে সমস্যা হয়েছে');
    }

    const blob = await response.blob();

    // Check if blob is empty or invalid
    if (blob.size === 0) {
      throw new Error('জেনারেট করা PDF খালি');
    }

    const url = window.URL.createObjectURL(blob);

    // Create temporary link and trigger download
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${result.madrasahName || 'result'}.pdf`;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(error instanceof Error ? error.message : 'PDF ডাউনলোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
  }
}; 