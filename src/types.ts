
export interface Job {
  id: string;
  title: string;
  company: string;
  dateApplied: string;
  status: string;
  notes: string;
  jobLink: string;
  resumeLink?: string;
  coverLetterLink?: string;
  companyNotes?: string;
  interviewDate?: string;
  interviewNotes?: string;
  reminderDate?: string;
  reminderNote?: string;
  tags: string[];
  questions?: InterviewQuestion[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface JobState {
  jobs: Job[];
  filteredJobs: Job[];
  filters: {
    status: string | null;
    search: string;
  };
}
