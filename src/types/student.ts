export interface StudentResult {
  name: string;
  registrationNo: string;
  rollNo: string;
  fatherName: string;
  dateOfBirth?: string;
  madrasahName: string;
  madrasahCode: string;
  class: string;
  division: string;
  examineeType?: string;
  marks: {
    [key: string]: number;
  };
  totalMarks: number;
  average: string;
  rank: string;
}

export interface StudentApiResponse {
  success: boolean;
  message: string;
  data?: StudentResult;
  error?: string;
}
