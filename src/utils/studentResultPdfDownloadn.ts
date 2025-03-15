const handlePdfDownload = async (studentName: string) => {
  const pdfRef = document.getElementById("pdf-content");
  const html2pdf = (await import('html2pdf.js')).default

  html2pdf()
    .set({
      filename: `${studentName}-result.pdf`,
      margin: 0,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        backgroundColor: null,
        height: 297 * 3.78, // A4 height in pixels
        windowHeight: 297 * 3.78
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
        putOnlyUsedFonts: true,
        compress: true
      }
    })
    .from(pdfRef)
    .save();
}

export default handlePdfDownload;
