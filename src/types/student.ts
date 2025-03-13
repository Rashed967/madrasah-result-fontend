export interface StudentResult {
  name: string;
  registrationNo: string;
  rollNo: string;
  fatherName: string;
  dateOfBirth: string;
  madrasahName: string;
  madrasahCode: string;
  class: string;
  marks: {
    [key: string]: string;
  };
  totalMarks: string;
  average: string;
  division: string;
  rank: string;
  examineeType: string;
}

export interface StudentApiResponse {
  success: boolean;
  message: string;
  data?: StudentResult;
  error?: string;
}
