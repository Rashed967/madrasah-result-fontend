import puppeteer from 'puppeteer';
import chromium from '@sparticuz/chromium-min';
import { NextResponse } from 'next/server';
import { MadrasahResult } from '@/types/madrasah';
import { toBengaliNumber, toEnglishNumber } from '@/lib/utils';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  // console.log('Generating PDF for madrasah result:', req);
  try {
    const data = await req.json();


    // Debug data structure


    // Check if resultsByClass exists
    if (!data.result?.resultsByClass) {
      throw new Error('মাদ্রাসার ফলাফল ডেটা পাওয়া যায়নি');
    }


    // Launch puppeteer with platform-specific configuration
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Read font file
    const fontPath = path.join(process.cwd(), 'public', 'fonts', 'kalpurush.ttf');
    const fontBase64 = fs.readFileSync(fontPath, { encoding: 'base64' });

    // Read logo
    const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.jpg');
    const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });

    // Read signature
    const signaturePath = path.join(process.cwd(), 'public', 'images', 'signature.jpg');
    const signatureBase64 = fs.readFileSync(signaturePath, { encoding: 'base64' });

    // Set content with embedded styles
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            @font-face {
              font-family: 'Kalpurush';
              src: url(data:font/truetype;base64,${fontBase64}) format('truetype');
            }
            * {
              font-family: 'Kalpurush', sans-serif;
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              padding: 20px;
              margin: 10px 10px;
            }
            .header {
              position: relative;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 1px solid #000;
              display: flex;
              align-items: center;
            }
            .logo {
              position: absolute;
              left: 20px;
              top: 50%;
              transform: translateY(-50%);
              width: 90px;
            }
            .header-content {
              flex: 1;
              text-align: center;
              margin: 0 100px;
            }
            .header h1 {
              font-size: 24px;
              margin-bottom: 1px;
            }
            .header h2 {
              font-size: 18px;
              margin-bottom: 1px;
              font-weight: normal;
            }
            .header p {
              font-size: 14px;
            }
            .marks-distribution {
              position: absolute;
              right: 0;
              top: 0;
              border: 1px solid #000;
              padding: 2px 4px;
              font-size: 10px;
              background: #f9f9f9;
            }
            .marks-distribution table {
              width: 100%;
              border-collapse: collapse;
            }
            .marks-distribution td {
              padding: 0px 8px;
              text-align: right;
            }
            .marks-distribution td:first-child {
              text-align: left;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid #000;
              padding: 1px 2px;
              text-align: center;
            }
            th {
              // background: #f0f0f0;
            }
          </style>
        </head>
        <body style="position: relative; top: 0; left: 0; right: 0; ">
          <div class="header">
            <img src="data:image/jpeg;base64,${logoBase64}" class="logo">
            <div class="header-content">
              <h1>জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
              <h2>[বেফাকুল মাদারিসিদ্দীনিয়্যা বাংলাদেশ]</h2>
              <p>অস্থায়ী কার্যালয়: ৩৪১/৫ টিভি রোড পূব রামপুরা ঢাকা-১২১৯</p>
              <h2 style="font-size: 18px; font-weight: normal;">${data.examType}</h2>
            </div>
            <div class="marks-distribution">
              <div style="text-align: center; border-bottom: 0.3px solid #000; margin-bottom: 5px;">
                 বিভাগ বিন্যাস
              </div>
              <table style="margin-bottom: 1px;">
                <tr>
                  <td style="border: none">মোট কিতাব</td>
                  <td style="border: none">: ৪০০ × ৮ = ৩২০০</td>
                </tr>
                <tr>
                  <td style="border: none">মুখস্থ (৩য় খন্ড)</td>
                  <td style="border: none">: ৮০ × ৮ = ৬৪০</td>
                </tr>
                <tr>
                  <td style="border: none">জরুরি বিষয় (১ম খন্ড)</td>
                  <td style="border: none">: ৫৫ × ৮ = ৪৪০</td>
                </tr>
                <tr>
                  <td style="border: none">জরুরি (২য় খন্ড)</td>
                  <td style="border: none">: ৪০ × ৮ = ৩২০</td>
                </tr>
                <tr>
                  <td style="border: none">অনুশীলন (৩য় খন্ড)</td>
                  <td style="border: none">: ৫৫ × ৮ = ৪৪০</td>
                </tr>
              </table>
            </div>
          </div>

          ${Object.entries(data.result.resultsByClass).map(([className, students], classIndex) => `
            <div class="class-section">
              <h3 style="text-align: center; margin: 15px 0;">${className}</h3>
              ${classIndex === 0 ? `
              <div>
                <p><span style="display: inline-block; width: 80px;">মাদরাসা কোড</span> <span style="margin-left: 15px; margin-right: 10px;">:</span> ${data.result.madrasahCode}</p>
                <p><span style="display: inline-block; width: 80px;">মাদরাসা</span> <span style="margin-left: 15px; margin-right: 10px;">:</span> <span style="font-weight: bold;">${toBengaliNumber(data.result.madrasahName)}</span></p>
                <p><span style="display: inline-block; width: 80px;">মারকায</span> <span style="margin-left: 15px; margin-right: 10px;">:</span> ${data.result.markazName}</p>
              </div>
              ` : ''}
              <table>
                <thead>
                  <tr>
                    <th style="width: 35px; font-size: 14px; font-weight: normal;">ক্র.</th>
                    <th style="width: 50px; font-size: 14px; font-weight: normal;">রোল নং</th>
                    <th style="width: 150px; font-size: 14px; font-weight: normal;">পরীক্ষার্থীর নাম</th>
                    ${Object.keys((students as any[])[0].marks).map(subject =>
      `<th style="width: 50px; font-size: 14px; font-weight: normal;">${subject}</th>`
    ).join('')}
                    <th style="width: 50px; font-size: 14px; font-weight: normal;">মোট নম্বর</th>
                    <th style="width: 50px; font-size: 14px; font-weight: normal;">গড় নম্বর</th>
                    <th style="width: 80px; font-size: 14px; font-weight: normal;">বিভাগ</th>
                    <th style="width: 40px; font-size: 14px; font-weight: normal;">স্থান</th>
                    <th style="width: 40px; font-size: 14px; font-weight: normal;">মান</th>
                  </tr>
                </thead>
                <tbody>
                  ${(students as any[]).map((student, idx) => `
                    <tr>
                      <td>${toBengaliNumber(idx + 1)}</td>
                      <td>${toBengaliNumber(student.rollNo)}</td>
                      <td>${student.name}</td>
                      ${Object.values(student.marks).map((mark) =>
      `<td>${toBengaliNumber(mark as number)}</td>`
    ).join('')}
                      <td>${toBengaliNumber(student.totalMarks)}</td>
                   
                      <td>${toBengaliNumber(
      (Number(toEnglishNumber(student.totalMarks)) / Object.keys(student.marks).length).toFixed(2)
    )}</td>
                      <td>${student.division}</td>
                      <td>${student.rank}</td>
                      <td>${''}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `).join('')}

          <div style="position: relative; min-height: 200px; margin-top: 30px;">
            <div style="font-size: 14px; margin-bottom: 16px; text-align: left;">
              <p>বি.দ্র.: ফলাফলের মধ্যে কোন ভুল-ত্রুটি পরিলক্ষিত হলে অথবা কোন বিষয়ে জানতে চাইলে ৩০ দিনের মধ্যে বোর্ড অফিসে যোগাযোগ করুন।</p>
              <p>* পরীক্ষার্থীর ফলাফল বিষয়ে কোন অভিযোগ থাকলে ৭ দিনের মধ্যে লিখিতভাবে বোর্ড অফিসে জানাতে হবে।</p>
            </div>

            <div style="position: absolute; top: 100px; right: 40px; text-align: center;">
              <div>
                <img
                  src="data:image/jpeg;base64,${signatureBase64}"
                  alt="signature"
                  style="width: 80px; height: 60px; transform: rotate(-4deg);"
                />
                <p style="border-bottom: 1px solid black; margin-bottom: 4px;">পরীক্ষা নিয়ন্ত্রক</p>
                <p>(মাওলানা ফয়সাল উমর ফারুক)</p>
              </div>
            </div>
          </div>

        </body>
      </html>
    `;

    await page.setContent(content, {
      waitUntil: 'networkidle0'
    });

    // Generate PDF buffer
    const pdfBuffer = await page.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=result.pdf',
      },
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      {
        error: 'PDF generation failed',
        message: 'PDF জেনারেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 