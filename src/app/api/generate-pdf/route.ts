import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';
import { MadrasahResult } from '@/types/madrasah';
import { toBengaliNumber } from '@/lib/utils';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const result = await request.json() as MadrasahResult;

    // Read font file
    const fontPath = path.join(process.cwd(), 'public', 'fonts', 'kalpurush.ttf');
    const fontBase64 = fs.readFileSync(fontPath, { encoding: 'base64' });

    // Read logo
    const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.jpg');
    const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });

    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,  // Changed from 'new' to true
      args: ['--no-sandbox']
    });

    const page = await browser.newPage();

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
            }
            .header {
              position: relative;
              margin-bottom: 20px;
              padding-bottom: 25px;
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
              margin-bottom: 2px;
            }
            .header h2 {
              font-size: 18px;
              margin-bottom: 1px;
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
        <body>
          <div class="header">
            <img src="data:image/jpeg;base64,${logoBase64}" class="logo">
            <div class="header-content">
              <h1>জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ</h1>
              <h2>[বেফাকুল মাদারিসিদ্দীনিয়্যা বাংলাদেশ]</h2>
              <p>অস্থায়ী কার্যালয়: ৩৪১/৫ টিভি রোড পূব রামপুরা ঢাকা-১২১৯</p>
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

          ${Object.entries(result.resultsByClass).map(([className, students]) => `
            <div class="class-section">
              <h3 style="text-align: center; margin: 15px 0;">${className}</h3>
              <div>
                <p><span style="display: inline-block; width: 80px;">মাদরাসা কোড</span> <span style="margin-left: 15px; margin-right: 10px;">:</span> ${result.madrasahCode}</p>
                <p><span style="display: inline-block; width: 80px;">মাদরাসা</span> <span style="margin-left: 15px; margin-right: 10px;">:</span> <span style="font-weight: bold;">${result.madrasahName}</span></p>
                <p><span style="display: inline-block; width: 80px;">মারকায</span> <span style="margin-left: 15px; margin-right: 10px;">:</span> ${result.markazName}</p>
              </div>
              <table>
                <thead>
                  <tr>
                    <th style="width: 35px; font-size: 14px; font-weight: normal;">ক্র.</th>
                    <th style="width: 50px; font-size: 14px; font-weight: normal;">রোল নং</th>
                    <th style="width: 150px; font-size: 14px; font-weight: normal;">পরীক্ষার্থীর নাম</th>
                    ${Object.keys(students[0].marks).map(subject =>
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
                  ${students.map((student, idx) => `
                    <tr>
                      <td>${toBengaliNumber(idx + 1)}</td>
                      <td>${toBengaliNumber(student.rollNo)}</td>
                      <td>${student.name}</td>
                      ${Object.values(student.marks).map(mark =>
      `<td>${toBengaliNumber(mark)}</td>`
    ).join('')}
                      <td>${toBengaliNumber(student.totalMarks)}</td>
                      <td>${toBengaliNumber(student.average)}</td>
                      <td>${student.division}</td>
                      <td>${student.rank}</td>
                      <td>${''}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `).join('')}
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

    // Return PDF buffer with correct headers
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(result.madrasahName)}.pdf"`,
        'Cache-Control': 'public, max-age=0, must-revalidate',
        'Content-Length': pdfBuffer.length.toString(),
        'X-Content-Type-Options': 'nosniff',
        'Accept-Ranges': 'bytes'
      }
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return Response.json({ error: 'PDF generation failed' }, { status: 500 });
  }
} 