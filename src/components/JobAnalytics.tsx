
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { Info, TrendingUp } from 'lucide-react';
import { Job } from '../types';

interface ChartData {
  name: string;
  count: number;
}

const JobAnalytics = () => {
  const { user } = useAuth();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [monthlyData, setMonthlyData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (user?.email) {
      // Load jobs
      const savedJobs = localStorage.getItem(`jobs_${user.email}`);
      if (savedJobs) {
        const jobs = JSON.parse(savedJobs) as Job[];
        
        // Prepare status distribution data
        const statusCounts: Record<string, number> = {};
        jobs.forEach(job => {
          statusCounts[job.status] = (statusCounts[job.status] || 0) + 1;
        });
        
        const statusData = Object.keys(statusCounts).map(status => ({
          name: status,
          count: statusCounts[status]
        }));
        
        setChartData(statusData);
        
        // Prepare monthly application data
        const monthCounts: Record<string, number> = {};
        const now = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(now.getMonth() - 5);
        
        // Initialize with last 6 months
        for (let i = 0; i < 6; i++) {
          const d = new Date(sixMonthsAgo);
          d.setMonth(sixMonthsAgo.getMonth() + i);
          const monthName = d.toLocaleString('default', { month: 'short' });
          monthCounts[monthName] = 0;
        }
        
        // Count jobs per month
        jobs.forEach(job => {
          const date = new Date(job.dateApplied);
          // Only include jobs from last 6 months
          if (date >= sixMonthsAgo) {
            const monthName = date.toLocaleString('default', { month: 'short' });
            monthCounts[monthName] = (monthCounts[monthName] || 0) + 1;
          }
        });
        
        const monthlyDataArray = Object.keys(monthCounts).map(month => ({
          name: month,
          count: monthCounts[month]
        }));
        
        setMonthlyData(monthlyDataArray);
      }
    }
  }, [user]);

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No data to analyze</h3>
        <p className="mt-2 text-gray-500">
          Add more job applications to see analytics here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Application Analytics</h3>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="ghost" size="sm">
              <Info size={16} />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">About your analytics</h4>
                <p className="text-sm">
                  These charts show your job application activity and status distribution.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium mb-2">Applications by Status</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Applications by Month</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAnalytics;
