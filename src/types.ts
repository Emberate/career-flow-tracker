
export interface Job {
  id: string;
  title: string;
  company: string;
  dateApplied: string;
  status: string;
  notes: string;
  jobLink: string;
  tags: string[];
}

export interface JobState {
  jobs: Job[];
  filteredJobs: Job[];
  filters: {
    status: string | null;
    search: string;
  };
}
