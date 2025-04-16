
export interface LinkedInJob {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  postedDate: string;
  applicationUrl: string;
  source: 'linkedin';
}

export interface IndeedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  postedDate: string;
  applicationUrl: string;
  source: 'indeed';
}

export type ExternalJob = LinkedInJob | IndeedJob;
