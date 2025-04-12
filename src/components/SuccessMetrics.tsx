
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../context/AuthContext';
import { Job } from '../types';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Briefcase,
  PieChart as PieChartIcon,
  BarChart2
} from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const SuccessMetrics = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
    totalApplications: 0,
    interviewRate: 0,
    offerRate: 0,
    rejectionRate: 0,
    responseRate: 0
  });

  useEffect(() => {
    if (user?.email) {
      const savedJobs = localStorage.getItem(`jobs_${user.email}`);
      if (savedJobs) {
        const parsedJobs = JSON.parse(savedJobs) as Job[];
        setJobs(parsedJobs);
        
        // Prepare status distribution data
        const statusCounts: Record<string, number> = {};
        parsedJobs.forEach(job => {
          statusCounts[job.status] = (statusCounts[job.status] || 0) + 1;
        });
        
        const statusDataArray = Object.keys(statusCounts).map(status => ({
          name: status,
          value: statusCounts[status]
        }));
        
        setStatusData(statusDataArray);
        
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
        parsedJobs.forEach(job => {
          const date = new Date(job.dateApplied);
          if (date >= sixMonthsAgo) {
            const monthName = date.toLocaleString('default', { month: 'short' });
            monthCounts[monthName] = (monthCounts[monthName] || 0) + 1;
          }
        });
        
        const monthlyDataArray = Object.keys(monthCounts).map(month => ({
          name: month,
          applications: monthCounts[month]
        }));
        
        setMonthlyData(monthlyDataArray);
        
        // Calculate metrics
        const totalJobs = parsedJobs.length;
        const interviewJobs = parsedJobs.filter(job => job.status === 'Interview' || job.status === 'Offer').length;
        const offerJobs = parsedJobs.filter(job => job.status === 'Offer').length;
        const rejectedJobs = parsedJobs.filter(job => job.status === 'Rejected').length;
        const respondedJobs = interviewJobs + rejectedJobs;
        
        setMetrics({
          totalApplications: totalJobs,
          interviewRate: totalJobs ? Math.round((interviewJobs / totalJobs) * 100) : 0,
          offerRate: totalJobs ? Math.round((offerJobs / totalJobs) * 100) : 0,
          rejectionRate: totalJobs ? Math.round((rejectedJobs / totalJobs) * 100) : 0,
          responseRate: totalJobs ? Math.round((respondedJobs / totalJobs) * 100) : 0
        });
      }
    }
  }, [user]);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Success Metrics</h3>
        <Badge variant="outline" className="flex items-center">
          <TrendingUp size={14} className="mr-1" />
          Job Search Progress
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="py-4 px-6">
            <CardTitle className="text-sm font-medium text-gray-500">Interview Rate</CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-6">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">{metrics.interviewRate}%</span>
              <span className="text-sm text-gray-500 mb-1">of applications</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4 px-6">
            <CardTitle className="text-sm font-medium text-gray-500">Offer Rate</CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-6">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">{metrics.offerRate}%</span>
              <span className="text-sm text-gray-500 mb-1">of applications</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4 px-6">
            <CardTitle className="text-sm font-medium text-gray-500">Response Rate</CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-6">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">{metrics.responseRate}%</span>
              <span className="text-sm text-gray-500 mb-1">of applications</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="charts">
        <TabsList className="mb-4">
          <TabsTrigger value="charts">
            <BarChart2 size={14} className="mr-2" />
            Charts
          </TabsTrigger>
          <TabsTrigger value="stats">
            <PieChartIcon size={14} className="mr-2" />
            Detailed Stats
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Monthly Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="applications" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="stats">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Total Applications</h4>
                    <p className="text-xl font-bold">{metrics.totalApplications}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Applications Per Month (Avg)</h4>
                    <p className="text-xl font-bold">
                      {monthlyData.length ? 
                        Math.round(monthlyData.reduce((sum, month) => sum + month.applications, 0) / monthlyData.length) : 
                        0}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Rejection Rate</h4>
                    <p className="text-xl font-bold">{metrics.rejectionRate}%</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Applications Pending Response</h4>
                    <p className="text-xl font-bold">
                      {metrics.totalApplications - (metrics.totalApplications * metrics.responseRate / 100)}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Interview to Offer Conversion</h4>
                    <p className="text-xl font-bold">
                      {metrics.interviewRate ? Math.round((metrics.offerRate / metrics.interviewRate) * 100) : 0}%
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Most Applied Job Type</h4>
                    <p className="text-xl font-bold">
                      {jobs.length > 0 ? 
                        (() => {
                          const titleCounts: Record<string, number> = {};
                          jobs.forEach(job => {
                            const title = job.title.toLowerCase();
                            titleCounts[title] = (titleCounts[title] || 0) + 1;
                          });
                          
                          let maxCount = 0;
                          let maxTitle = '';
                          
                          Object.entries(titleCounts).forEach(([title, count]) => {
                            if (count > maxCount) {
                              maxCount = count;
                              maxTitle = title;
                            }
                          });
                          
                          return maxTitle.charAt(0).toUpperCase() + maxTitle.slice(1);
                        })() : 
                        'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuccessMetrics;
