export interface Job {
  id: string;
  title: string;
  company: string;
  location?: string;
  status: string;
  dateApplied: string;
  notes: string;
  jobLink?: string;
  salary?: string;
  contactName?: string;
  contactEmail?: string;
  tags: string[];
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

export interface UserProfile {
  id: string;
  full_name?: string;
  avatar_url?: string;
}

export interface JobApplication {
  id: string;
  user_id: string;
  title: string;
  company: string;
  location?: string;
  status: string;
  application_date: string;
  notes?: string;
  url?: string;
  salary?: string;
  contact_name?: string;
  contact_email?: string;
  tags?: string[];
  updated_at?: string;
}
