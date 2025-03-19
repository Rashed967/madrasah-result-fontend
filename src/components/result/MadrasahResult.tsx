import React from 'react';
import { toBengaliNumber, toEnglishNumber } from '@/lib/utils';
import { MadrasahResult } from '@/types/madrasah';

export function MadrasahResultDisplay({ data }: { data: MadrasahResult, }) {


  return (
    <>
      <div className="space-y-6 mt-10">
        {/* মাদ্রাসার তথ্য */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold mb-2">{toBengaliNumber(data.madrasahName)}</h2>
          <p className="text-gray-600">{toBengaliNumber(data.markazName)}</p>
          <p className="text-gray-600">মাদ্রাসা কোড: {toBengaliNumber(data.madrasahCode)}</p>
          <p className="text-gray-600">মোট পরীক্ষার্থী: {toBengaliNumber(data.totalStudents)}</p>
        </div>

        {/* ক্লাস ভিত্তিক ফলাফল */}
        {Object.entries(data.resultsByClass).map(([className, students]: [string, Array<{
          name: string;
          registrationNo: string;
          rollNo: string;
          fatherName: string;
          dateOfBirth: string;
          marks: {
            [key: string]: string;
          };
          totalMarks: string;
          average: string;
          division: string;
          rank: string;
        }>]) => (
          <div key={className} className="mb-8">
            <h3 className="text-lg font-semibold mb-4 bg-gray-100 p-2">{className}</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2">ক্রমিক</th>
                    <th className="border p-2">নাম</th>
                    <th className="border p-2">রোল</th>
                    {/* Dynamically create headers for each subject */}
                    {Object.keys(students[0].marks).map((subject) => (
                      <th key={subject} className="border p-2">{toBengaliNumber(subject)}</th>
                    ))}
                    <th className="border p-2">মোট নম্বর</th>
                    <th className="border p-2">গড়</th>
                    <th className="border p-2">বিভাগ</th>
                    <th className="border p-2">মেধা স্থান</th>

                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => {
                    const totalSubjects = Object.keys(student.marks).length;
                    const avarageMarks = toBengaliNumber((Number(toEnglishNumber(student.totalMarks)) / totalSubjects).toFixed(2));

                    return (
                      <tr key={student.registrationNo} className="hover:bg-gray-50">
                        <td className="border p-2 text-center">{toBengaliNumber(index + 1)}</td>
                        <td className="border p-2">{toBengaliNumber(student.name)}</td>
                        <td className="border p-2">{toBengaliNumber(student.rollNo)}</td>
                        {/* Display marks for each subject in separate columns */}
                        {Object.entries(student.marks).map(([subject, mark]) => (
                          <td key={subject} className="border p-2 text-center">{toBengaliNumber(mark)}</td>
                        ))}
                        <td className="border p-2 text-center">{toBengaliNumber(student.totalMarks)}</td>
                        <td className="border p-2 text-center">{
                          avarageMarks
                        }</td>
                        <td className="border p-2">{toBengaliNumber(student.division)}</td>
                        <td className="border p-2">{toBengaliNumber(student.rank)}</td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </>
  );
} 