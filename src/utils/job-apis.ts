
import { LinkedInJob, IndeedJob } from '../types/external-jobs';

// Mock data since we're in demo mode
const mockLinkedInJobs: LinkedInJob[] = [
  {
    id: 'li-1',
    title: 'Senior React Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    description: 'Looking for an experienced React developer to join our team...',
    postedDate: '2025-04-15',
    applicationUrl: 'https://linkedin.com/jobs/1',
    source: 'linkedin'
  },
  {
    id: 'li-2',
    title: 'Frontend Team Lead',
    company: 'Innovation Labs',
    location: 'New York, NY',
    description: 'Leading frontend development team in an innovative startup...',
    postedDate: '2025-04-14',
    applicationUrl: 'https://linkedin.com/jobs/2',
    source: 'linkedin'
  }
];

const mockIndeedJobs: IndeedJob[] = [
  {
    id: 'in-1',
    title: 'React Native Developer',
    company: 'Mobile Apps Co',
    location: 'Remote',
    description: 'Developing cross-platform mobile applications...',
    postedDate: '2025-04-15',
    applicationUrl: 'https://indeed.com/jobs/1',
    source: 'indeed'
  },
  {
    id: 'in-2',
    title: 'Full Stack Developer',
    company: 'Web Solutions Ltd',
    location: 'Austin, TX',
    description: 'Full stack development with React and Node.js...',
    postedDate: '2025-04-14',
    applicationUrl: 'https://indeed.com/jobs/2',
    source: 'indeed'
  }
];

export const fetchLinkedInJobs = async (): Promise<LinkedInJob[]> => {
  // In a real app, this would make an API call to LinkedIn
  return new Promise(resolve => {
    setTimeout(() => resolve(mockLinkedInJobs), 1000);
  });
};

export const fetchIndeedJobs = async (): Promise<IndeedJob[]> => {
  // In a real app, this would make an API call to Indeed
  return new Promise(resolve => {
    setTimeout(() => resolve(mockIndeedJobs), 1000);
  });
};
