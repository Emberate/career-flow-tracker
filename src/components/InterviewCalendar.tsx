
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Job } from '../types';

const InterviewCalendar = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [jobs, setJobs] = useState<Job[]>([]);
  const [interviewsOnSelectedDate, setInterviewsOnSelectedDate] = useState<Job[]>([]);

  useEffect(() => {
    if (user?.email) {
      const savedJobs = localStorage.getItem(`jobs_${user.email}`);
      if (savedJobs) {
        const parsedJobs = JSON.parse(savedJobs) as Job[];
        // Filter only jobs with interview dates
        const jobsWithInterviews = parsedJobs.filter(job => job.interviewDate);
        setJobs(jobsWithInterviews);
      }
    }
  }, [user]);

  useEffect(() => {
    if (date && jobs.length > 0) {
      const selectedDateStr = date.toISOString().split('T')[0];
      const relevantJobs = jobs.filter(job => {
        if (!job.interviewDate) return false;
        const interviewDateStr = new Date(job.interviewDate).toISOString().split('T')[0];
        return interviewDateStr === selectedDateStr;
      });
      setInterviewsOnSelectedDate(relevantJobs);
    } else {
      setInterviewsOnSelectedDate([]);
    }
  }, [date, jobs]);

  // Function to highlight dates that have interviews
  const interviewDates = jobs.map(job => 
    job.interviewDate ? new Date(job.interviewDate) : null
  ).filter(Boolean) as Date[];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium mb-4">Interview Calendar</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border rounded-md"
          />
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'No date selected'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {interviewsOnSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {interviewsOnSelectedDate.map(job => (
                    <div key={job.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-gray-600">{job.company}</p>
                          {job.interviewDate && (
                            <p className="text-sm mt-1">
                              {new Date(job.interviewDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          )}
                        </div>
                        <Badge variant="outline" className="bg-blue-50">Interview</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-6">No interviews scheduled for this date</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterviewCalendar;
