const handlePdfDownload = async (studentName: string) => {
  const pdfRef = document.getElementById("pdf-content");
  const html2pdf = (await import('html2pdf.js')).default

  html2pdf()
    .set({
      filename: `${studentName}-result.pdf`,
      margin: 0,
      image: {
        type: 'jpeg',
        quality: 1.0
      },
      html2canvas: {
        scale: 4,
        useCORS: true,
        logging: false,
        letterRendering: true,
        backgroundColor: '#ffffff',
        height: 297 * 3.78,
        windowHeight: 297 * 3.78
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
        putOnlyUsedFonts: true,
        compress: true,
        precision: 16,
        userUnit: 1.0
      }
    })
    .from(pdfRef)
    .save();
}

export default handlePdfDownload;
