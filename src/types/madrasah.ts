export interface MadrasahStudent {
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
}

export interface MadrasahResult {
  madrasahCode: string;
  madrasahName: string;
  markazName: string;
  totalStudents: number;
  resultsByClass: {
    [key: string]: MadrasahStudent[];
  };
}

export interface MadrasahApiResponse {
  success: boolean;
  message: string;
  data?: MadrasahResult;
  error?: string;
} 