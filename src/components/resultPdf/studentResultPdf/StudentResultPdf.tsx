'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { toBengaliNumber } from '@/lib/utils';
import { StudentResult } from '@/types/student';
import { Table, TR, TH, TD } from '@ag-media/react-pdf-table';


// Register the Kalpurush font
Font.register({
  family: 'Kalpurush',
  src: '/fonts/SolaimanLipi.ttf',
});

const result = {
  name: "মোঃ ইব্রাহীম খলিল",
  registrationNo: "১১৭৮৮",
  rollNo: "১৭০৪",
  fatherName: "আঃ হাই",
  dateOfBirth: "১৪/০৮/১৯৯৬",
  madrasahName: "জামি'আ ইকরা বাংলাদেশ, ঢাকা -10001",
  madrasahCode: "১০০০১",
  class: "আত তাখাসসুস ফিল ফিকহি ওয়াল ইফতা",
  marks: {
    "উসূলুল ইফতা/শরহু": 55,
    "মুকাদ্দামাতুদ দুর": 68,
    "কাও:/আল আশ": 77,
    "সিরাজী": 89,
    "তামরীনুল ইফতা": 96
  },
  totalMarks: 385,
  average: 77,
  division: "জায়্যিদ জিদ্দান",
  rank: "",
  examineeType: "নিয়মিত",
  examName: "বার্ষিক পরীক্ষা"
}

// Dynamic import for PDFViewer
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), {
  ssr: false,
});

// Styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    fontFamily: 'Kalpurush',
    padding: "20px",
  },
  header: {
    position: 'relative',
    marginBottom: 20,
    borderBottom: '1px solid #000',
    paddingBottom: 12,
    textAlign: 'center',
  },
  headerLogo: {
    position: 'absolute',
    left: 85,
    top: 16,
    width: 50,
    height: 50,
  },
  headerContent: {
    marginTop: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    width: '100%',
    marginTop: 10,
    borderColor: '#d1d5db',
    borderStyle: 'solid',
    borderWidth: 1,
    borderCollapse: 'collapse'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#d1d5db',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
  },
  tableHeader: {
    backgroundColor: '#15803d', // green-700
    color: 'white',
    padding: 8,
    fontSize: 11,
    textAlign: 'center',
  },
  tableCell: {
    borderLeftWidth: 1,
    borderLeftColor: '#d1d5db',
    borderLeftStyle: 'solid',
    padding: 8,
    fontSize: 11,
    textAlign: 'center',
  },
  serialCell: {
    flex: 0.5,
  },
  subjectCell: {
    flex: 2,
  },
  marksCell: {
    flex: 1,
  },
  footerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 800,
    fontSize: 18,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  smallText: {
    fontSize: 10,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 0,
    marginTop: 15,
    width: '100%',
  },
  infoRow: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: '1px solid #d1d5db',
    minHeight: 25,
    paddingVertical: 2,
    marginBottom: 5,
    paddingBottom: 5,
  },
  infoLabel: {
    width: 100,
    fontSize: 11,
    paddingLeft: 5,
  },
  infoValue: {
    flex: 1,
    fontSize: 11,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  markTitle: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 15,
    borderBottom: '1px solid #000',
    paddingBottom: 3,
    marginHorizontal: 'auto',
  },
});

// PDF Document Component
export const MyDocument = () => (
  console.log(result),
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.headerLogo} src={'/images/logo.jpg'} />
        <View style={styles.headerContent}>
          <Text style={styles.title}>{toBengaliNumber("জাতীয় দ্বীনি মাদরাসা শিক্ষাবোর্ড বাংলাদেশ")}</Text>
          <Text style={styles.subtitle}>(বেফাকুল মাদারিসিদ্দীনিয়্যা বাংলাদেশ)</Text>
          <Text style={styles.smallText}>অস্থায়ী কার্যালয়: ৩৪১/৫ টি ভি রোড, পূর্ব রামপুরা, ঢাকা-১২১৯</Text>
        </View>
      </View>

      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: 5, marginBottom: 10 }}>
        <Text style={{ fontSize: 14, fontWeight: 900 }}>{result.examName}</Text>
        <Text style={{ fontSize: 11 }}>মারহালা: {result.class}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>রোল নং</Text>
          <View style={styles.infoValue}>
            <Text>: {toBengaliNumber(result.rollNo.trim())}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>নিবন্ধন নং</Text>
          <View style={styles.infoValue}>
            <Text>: {toBengaliNumber(result.registrationNo.trim())}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>পরীক্ষার্থীর নাম</Text>
          <View style={styles.infoValue}>
            <Text>: {toBengaliNumber(result.name.trim())}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>পিতার নাম</Text>
          <View style={styles.infoValue}>
            <Text>: {result.fatherName}</Text>
          </View>
        </View>

        <View style={[styles.infoRow]}>
          <Text style={styles.infoLabel}>জন্ম তারিখ</Text>
          <View style={styles.infoValue}>
            <Text>: {toBengaliNumber(result.dateOfBirth.trim())}</Text>
          </View>
        </View>

        <View style={[styles.infoRow]}>
          <Text style={styles.infoLabel}>প্রাপ্ত বিভাগ</Text>
          <View style={styles.infoValue}>
            <Text>: {toBengaliNumber(result.division.trim())}</Text>
          </View>
        </View>

        <View style={[styles.infoRow]}>
          <Text style={styles.infoLabel}>পরীক্ষার্থীর ধরন</Text>
          <View style={styles.infoValue}>
            <Text>: {toBengaliNumber(result.examineeType.trim())}</Text>
          </View>
        </View>
        <View style={[styles.infoRow]}>
          <Text style={styles.infoLabel}>মেধা স্থান:</Text>
          <View style={styles.infoValue}>
            <Text>: {toBengaliNumber(result.rank.trim())}</Text>
          </View>
        </View>
        <View style={[styles.infoRow, styles.fullWidth]}>
          <Text style={styles.infoLabel}>মাদরাসার নাম</Text>
          <View style={styles.infoValue}>
            <Text>: {toBengaliNumber(result.madrasahName.trim())}</Text>
          </View>
        </View>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 5, marginTop: 15, }}>
        <Text style={{ fontSize: 14, fontWeight: 900, borderBottom: '1px solid #000', paddingBottom: 2 }}>প্রাপ্ত নম্বর</Text>
      </View>

      <Table style={styles.table}>
        <TH>
          <TD style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, padding: 8, backgroundColor: '#15803d', color: 'white', borderRight: '1px solid #000' }}>ক্রমিক</TD>
          <TD style={{ flex: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, padding: 8, backgroundColor: '#15803d', color: 'white', borderRight: '1px solid #000' }}>বিষয়</TD>
          <TD style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, padding: 8, backgroundColor: '#15803d', color: 'white' }}>প্রাপ্ত নম্বর</TD>
        </TH>
        {Object.entries(result.marks).map(([subject, mark], index) => (
          <TR key={index} style={{
            backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb'
          }}>
            <TD style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, padding: 8, borderRight: '1px solid #000', borderBottom: '1px solid #000' }}>{toBengaliNumber(index + 1)}</TD>
            <TD style={{ flex: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, padding: 8, borderRight: '1px solid #000', borderBottom: '1px solid #000' }}>{subject}</TD>
            <TD style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, padding: 8, borderBottom: '1px solid #000' }}>{toBengaliNumber(mark)}</TD>
          </TR>
        ))}
        <TR>
          <TD style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, padding: 8, borderRight: '1px solid #000' }}></TD>
          <TD style={{ flex: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, padding: 8, borderRight: '1px solid #000', fontWeight: 'bold' }}>মোট নম্বর</TD>
          <TD style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, padding: 8, fontWeight: 'bold' }}>{toBengaliNumber(result.totalMarks)}</TD>
        </TR>
      </Table>

      <View style={{ position: 'absolute', bottom: 35, right: 35, }}>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
          <Image style={{ width: '60x', }} src={'/images/signature.jpg'} />
          <Text style={{ fontSize: 10, borderBottom: '1px solid #000', paddingBottom: 2 }}>পরীক্ষা নিয়ন্ত্রক</Text>
          <Text style={{ fontSize: 10 }}>(মাওলানা ফয়সাল উমর ফারুক)</Text>
        </View>
      </View>
    </Page>
  </Document>
);

// Final Component
const StudentResultPdf = ({ result }: { result: any }) => {
  return (
    <div style={{ width: '100%', height: '600px', marginBottom: '20px' }}>
      <PDFViewer style={{ width: "100%", height: "600px" }}>
        <MyDocument />
      </PDFViewer>
    </div>
  );
};

export default StudentResultPdf;
