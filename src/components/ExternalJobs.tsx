
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLinkedInJobs, fetchIndeedJobs } from '../utils/job-apis';
import { ExternalJob } from '../types/external-jobs';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Linkedin, Briefcase, ExternalLink } from 'lucide-react';
import { useToast } from './ui/use-toast';

const ExternalJobs = () => {
  const { toast } = useToast();

  const linkedInQuery = useQuery({
    queryKey: ['linkedinJobs'],
    queryFn: fetchLinkedInJobs,
  });

  const indeedQuery = useQuery({
    queryKey: ['indeedJobs'],
    queryFn: fetchIndeedJobs,
  });

  const handleApply = (job: ExternalJob) => {
    window.open(job.applicationUrl, '_blank');
    toast({
      title: "Application Started",
      description: `Opening application for ${job.title} at ${job.company}`,
    });
  };

  if (linkedInQuery.isLoading || indeedQuery.isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-[100px] bg-muted animate-pulse rounded-lg" />
        <div className="h-[100px] bg-muted animate-pulse rounded-lg" />
      </div>
    );
  }

  const allJobs = [
    ...(linkedInQuery.data || []),
    ...(indeedQuery.data || [])
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recommended Jobs</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allJobs.map((job) => (
          <Card key={job.id} className="p-4 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{job.title}</h4>
                <p className="text-sm text-muted-foreground">{job.company}</p>
                <p className="text-sm text-muted-foreground">{job.location}</p>
              </div>
              {job.source === 'linkedin' ? (
                <Linkedin className="h-5 w-5 text-[#0077b5]" />
              ) : (
                <Briefcase className="h-5 w-5 text-[#003A9B]" />
              )}
            </div>
            <p className="text-sm line-clamp-2">{job.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                Posted: {new Date(job.postedDate).toLocaleDateString()}
              </span>
              <Button size="sm" variant="outline" onClick={() => handleApply(job)}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Apply
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExternalJobs;
