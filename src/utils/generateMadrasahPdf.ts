import { MadrasahResult } from "@/types/madrasah";

export const generateMadrasahPdf = async (result: MadrasahResult) => {
  try {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/generate-pdf', true);
      xhr.responseType = 'blob';
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = function () {
        if (this.status === 200) {
          const blob = new Blob([this.response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = `${result.madrasahName}.pdf`;
          document.body.appendChild(a);
          a.click();

          // Clean up
          setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 100);

          resolve(true);
        } else {
          reject(new Error('PDF generation failed'));
        }
      };

      xhr.onerror = function () {
        reject(new Error('Network error'));
      };

      xhr.send(JSON.stringify(result));
    });

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}; 