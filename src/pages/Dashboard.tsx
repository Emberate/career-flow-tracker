import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { JobApplication } from '../types';
import { supabase } from '@/integrations/supabase/client';
import JobCard from '../components/JobCard';
import JobForm from '../components/JobForm';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import JobAnalytics from '../components/JobAnalytics';
import InterviewCalendar from '../components/InterviewCalendar';
import CompanyResearch from '../components/CompanyResearch';
import SuccessMetrics from '../components/SuccessMetrics';
import InterviewQA from '../components/InterviewQA';
import Reminders from '../components/Reminders';
import PaymentHistory from '../components/PaymentHistory';
import PaymentModal from '../components/PaymentModal';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Filter, 
  Briefcase, 
  CreditCard,
  BarChart,
  ListChecks,
  Calendar,
  Building,
  TrendingUp,
  MessageSquare,
  Bell,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ExternalJobs from '../components/ExternalJobs';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobApplication[]>([]);
  const [filters, setFilters] = useState({
    status: null as string | null,
    search: '',
  });
  
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobApplication | null>(null);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("jobs");
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  useEffect(() => {
    // Check if the user came from the demo login
    const demoMode = sessionStorage.getItem('demoMode') === 'true';
    setIsDemoMode(demoMode);
    
    // Only redirect if not in demo mode and not authenticated
    if (!authLoading && !isAuthenticated && !demoMode) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate, authLoading]);
  
  useEffect(() => {
    // Load job applications regardless of auth status in demo mode
    if (user?.id || isDemoMode) {
      fetchJobApplications();
    }
  }, [user, isDemoMode]);
  
  const fetchJobApplications = async () => {
    try {
      setIsLoading(true);
      
      // In demo mode, use sample data instead of fetching from Supabase
      if (isDemoMode) {
        // Sample job application data
        const sampleData: JobApplication[] = [
          {
            id: '1',
            title: 'Frontend Developer',
            company: 'Tech Solutions Inc.',
            location: 'San Francisco, CA',
            status: 'Applied',
            notes: 'Submitted application on company website',
            url: 'https://example.com/jobs',
            salary: '$120,000 - $140,000',
            contact_name: 'Jane Smith',
            contact_email: 'jane@techsolutions.com',
            tags: ['React', 'TypeScript'],
            application_date: '2025-04-15',
            user_id: 'demo',
          },
          {
            id: '2',
            title: 'Full Stack Engineer',
            company: 'Innovate Labs',
            location: 'Remote',
            status: 'Interview',
            notes: 'Technical interview scheduled for next week',
            url: 'https://example.com/jobs',
            salary: '$130,000 - $150,000',
            contact_name: 'John Doe',
            contact_email: 'john@innovatelabs.com',
            tags: ['Node.js', 'React', 'MongoDB'],
            application_date: '2025-04-10',
            user_id: 'demo',
            interviewDate: '2025-05-10',
          },
          {
            id: '3',
            title: 'Product Manager',
            company: 'Growth Startup',
            location: 'New York, NY',
            status: 'Offer',
            notes: 'Received offer, negotiating salary',
            url: 'https://example.com/jobs',
            salary: '$140,000 - $160,000',
            contact_name: 'Lisa Johnson',
            contact_email: 'lisa@growthstartup.com',
            tags: ['Product', 'Agile', 'SaaS'],
            application_date: '2025-04-05',
            user_id: 'demo',
          }
        ];
        setJobApplications(sampleData);
        setFilteredJobs(sampleData);
        setIsLoading(false);
        return;
      }
      
      // Regular flow for authenticated users
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('application_date', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setJobApplications(data || []);
      setFilteredJobs(data || []);
    } catch (error) {
      console.error('Error fetching job applications:', error);
      toast({
        title: "Error loading jobs",
        description: "Failed to load your job applications. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    let filtered = [...jobApplications];
    
    if (filters.status) {
      filtered = filtered.filter(job => job.status === filters.status);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        (job.notes && job.notes.toLowerCase().includes(searchTerm)) ||
        (job.tags && job.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
      );
    }
    
    setFilteredJobs(filtered);
  }, [jobApplications, filters]);
  
  const handleAddJob = () => {
    setEditingJob(null);
    setIsJobFormOpen(true);
  };
  
  const handleEditJob = (job: JobApplication) => {
    setEditingJob(job);
    setIsJobFormOpen(true);
  };
  
  const handleDeleteJob = (jobId: string) => {
    setJobToDelete(jobId);
  };
  
  const confirmDelete = async () => {
    if (!jobToDelete || (!user?.id && !isDemoMode)) return;
    
    try {
      if (isDemoMode) {
        // Just update state for demo mode
        setJobApplications(prevJobs => prevJobs.filter(job => job.id !== jobToDelete));
        toast({
          title: "Job deleted",
          description: "The job has been removed from your list.",
        });
        setJobToDelete(null);
        return;
      }
      
      // Regular flow for authenticated users
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', jobToDelete);
      
      if (error) throw error;
      
      // Update state to remove the deleted job
      setJobApplications(prevJobs => prevJobs.filter(job => job.id !== jobToDelete));
      
      toast({
        title: "Job deleted",
        description: "The job has been removed from your list.",
      });
    } catch (error) {
      console.error('Error deleting job:', error);
      toast({
        title: "Error",
        description: "Failed to delete the job. Please try again.",
        variant: "destructive",
      });
    } finally {
      setJobToDelete(null);
    }
  };
  
  const saveJob = async (job: any) => {
    if (!user?.id && !isDemoMode) return;
    
    try {
      // Convert the Job interface to JobApplication format
      const jobApplication = {
        title: job.title,
        company: job.company,
        location: job.location,
        status: job.status,
        notes: job.notes,
        url: job.jobLink,
        salary: job.salary,
        contact_name: job.contactName,
        contact_email: job.contactEmail,
        tags: job.tags,
        user_id: user?.id || 'demo',
        application_date: job.dateApplied,
        interviewDate: job.interviewDate
      };
      
      if (isDemoMode) {
        // Handle job saving in demo mode
        if (editingJob) {
          // Update existing job in demo mode
          setJobApplications(prevJobs => 
            prevJobs.map(j => j.id === editingJob.id 
              ? { ...jobApplication, id: editingJob.id } 
              : j
            )
          );
          toast({
            title: "Job updated",
            description: "The job details have been updated successfully.",
          });
        } else {
          // Add new job in demo mode
          const newJob = {
            ...jobApplication,
            id: `demo-${Date.now()}`,
          };
          setJobApplications(prevJobs => [newJob, ...prevJobs]);
          toast({
            title: "Job added",
            description: "The new job has been added to your list.",
          });
        }
        setIsJobFormOpen(false);
        return;
      }
      
      // Regular flow for authenticated users
      if (editingJob) {
        // Update existing job
        const { error } = await supabase
          .from('job_applications')
          .update(jobApplication)
          .eq('id', editingJob.id);
        
        if (error) throw error;
        
        toast({
          title: "Job updated",
          description: "The job details have been updated successfully.",
        });
        
        // Refresh job list
        fetchJobApplications();
      } else {
        // Insert new job
        const { error } = await supabase
          .from('job_applications')
          .insert(jobApplication);
        
        if (error) throw error;
        
        toast({
          title: "Job added",
          description: "The new job has been added to your list.",
        });
        
        // Refresh job list
        fetchJobApplications();
      }
      
      setIsJobFormOpen(false);
    } catch (error) {
      console.error('Error saving job:', error);
      toast({
        title: "Error",
        description: "Failed to save the job. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value,
    }));
  };
  
  const handleStatusChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      status: value === 'All' ? null : value,
    }));
  };
  
  const handleUpgrade = () => {
    setIsPaymentModalOpen(true);
  };
  
  const totalJobs = jobApplications.length;
  const appliedJobs = jobApplications.filter(j => j.status === 'Applied').length;
  const interviewJobs = jobApplications.filter(j => j.status === 'Interview').length;
  const offerJobs = jobApplications.filter(j => j.status === 'Offer').length;
  const rejectedJobs = jobApplications.filter(j => j.status === 'Rejected').length;
  
  // Determine which icon to show in the dashboard header
  const getDashboardIcon = () => {
    switch (activeTab) {
      case 'jobs': return <ListChecks className="h-6 w-6 text-primary" />;
      case 'analytics': return <BarChart className="h-6 w-6 text-blue-400" />;
      case 'calendar': return <Calendar className="h-6 w-6 text-violet-400" />;
      case 'reminders': return <Bell className="h-6 w-6 text-yellow-400" />;
      case 'research': return <Building className="h-6 w-6 text-green-400" />;
      case 'metrics': return <TrendingUp className="h-6 w-6 text-cyan-400" />;
      case 'interview-qa': return <MessageSquare className="h-6 w-6 text-pink-400" />;
      case 'premium': return <CreditCard className="h-6 w-6 text-orange-400" />;
      default: return <Briefcase className="h-6 w-6 text-primary" />;
    }
  };
  
  return (
    <PageLayout title="Dashboard" className="bg-gray-50">
      <PageHeader 
        title="Job Tracker Dashboard" 
        subtitle="Track, manage, and analyze your job applications" 
        centered={false} 
      />
      
      <div id="dashboard-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-8 bg-gradient-to-br from-black to-gray-900">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-96 overflow-hidden -z-10 opacity-50 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 mb-8 pt-6">
          <div className="flex items-center">
            {getDashboardIcon()}
            <div className="ml-3">
              <h2 className="text-xl font-bold text-white dashboard-text flex items-center">
                My Job Tracker
                <span className="inline-flex ml-2 items-center">
                  <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse-slow" />
                </span>
              </h2>
              <p className="text-gray-300 mt-1 dashboard-text">
                {isDemoMode ? 'Demo Mode - Welcome!' : 
                  user?.email ? `Welcome, ${user.email.split('@')[0]}` : 
                  'Track and manage your job applications'}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <ThemeSwitcher />
            
            <Button 
              onClick={handleUpgrade} 
              variant="outline" 
              className="w-full sm:w-auto backdrop-blur-sm bg-white/5 border-white/20 hover:bg-white/10 transition-all duration-300"
            >
              <CreditCard size={18} className="mr-2 text-yellow-400" />
              Upgrade to Premium
            </Button>
            
            <Button 
              onClick={handleAddJob} 
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 border-0 transition-all duration-300"
            >
              <Plus size={18} className="mr-2" />
              Add Job
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="dashboard-card p-4 rounded-lg shadow-lg border border-white/5 backdrop-blur-md bg-gray-900/70 overflow-hidden relative group transition-all duration-300 hover:translate-y-[-2px]">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <p className="text-gray-400 text-sm">Total</p>
            <p className="text-2xl font-bold text-white">{totalJobs}</p>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          </div>
          
          <div className="dashboard-card p-4 rounded-lg shadow-lg border border-blue-500/20 backdrop-blur-md bg-gray-900/70 overflow-hidden relative group transition-all duration-300 hover:translate-y-[-2px]">
            <span className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <p className="text-blue-400 text-sm">Applied</p>
            <p className="text-2xl font-bold text-blue-300">{appliedJobs}</p>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-blue-500"></div>
          </div>
          
          <div className="dashboard-card p-4 rounded-lg shadow-lg border border-yellow-500/20 backdrop-blur-md bg-gray-900/70 overflow-hidden relative group transition-all duration-300 hover:translate-y-[-2px]">
            <span className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <p className="text-yellow-300 text-sm">Interviewing</p>
            <p className="text-2xl font-bold text-yellow-300">{interviewJobs}</p>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-yellow-500"></div>
          </div>
          
          <div className="dashboard-card p-4 rounded-lg shadow-lg border border-green-500/20 backdrop-blur-md bg-gray-900/70 overflow-hidden relative group transition-all duration-300 hover:translate-y-[-2px]">
            <span className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <p className="text-green-400 text-sm">Offers</p>
            <p className="text-2xl font-bold text-green-300">{offerJobs}</p>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-green-500"></div>
          </div>
          
          <div className="dashboard-card p-4 rounded-lg shadow-lg border border-red-500/20 backdrop-blur-md bg-gray-900/70 overflow-hidden relative group transition-all duration-300 hover:translate-y-[-2px]">
            <span className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <p className="text-red-400 text-sm">Rejected</p>
            <p className="text-2xl font-bold text-red-300">{rejectedJobs}</p>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-red-500"></div>
          </div>
        </div>
        
        <Tabs defaultValue="jobs" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="overflow-x-auto">
            <TabsList className="dashboard-card bg-gray-900/70 backdrop-blur-md border border-white/10 inline-flex min-w-max">
              <TabsTrigger value="jobs" className="text-xs sm:text-sm data-[state=active]:bg-white/10">
                <ListChecks size={16} className="mr-2 hidden sm:inline-block" />
                Jobs
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm data-[state=active]:bg-white/10">
                <BarChart size={16} className="mr-2 hidden sm:inline-block" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="calendar" className="text-xs sm:text-sm data-[state=active]:bg-white/10">
                <Calendar size={16} className="mr-2 hidden sm:inline-block" />
                Interviews
              </TabsTrigger>
              <TabsTrigger value="reminders" className="text-xs sm:text-sm data-[state=active]:bg-white/10">
                <Bell size={16} className="mr-2 hidden sm:inline-block" />
                Reminders
              </TabsTrigger>
              <TabsTrigger value="research" className="text-xs sm:text-sm data-[state=active]:bg-white/10">
                <Building size={16} className="mr-2 hidden sm:inline-block" />
                Research
              </TabsTrigger>
              <TabsTrigger value="metrics" className="text-xs sm:text-sm data-[state=active]:bg-white/10">
                <TrendingUp size={16} className="mr-2 hidden sm:inline-block" />
                Metrics
              </TabsTrigger>
              <TabsTrigger value="interview-qa" className="text-xs sm:text-sm data-[state=active]:bg-white/10">
                <MessageSquare size={16} className="mr-2 hidden sm:inline-block" />
                Q&A
              </TabsTrigger>
              <TabsTrigger value="premium" className="text-xs sm:text-sm data-[state=active]:bg-white/10">
                <CreditCard size={16} className="mr-2 hidden sm:inline-block" />
                Premium
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="jobs" className="space-y-4">
            <ExternalJobs />
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search jobs..."
                  className="pl-10 bg-gray-800/50 backdrop-blur-sm border-gray-700 text-gray-200 focus:ring-1 focus:ring-blue-500"
                  value={filters.search}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="w-full sm:w-48">
                <Select
                  value={filters.status || 'All'}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="bg-gray-800/50 backdrop-blur-sm border-gray-700 text-gray-200">
                    <div className="flex items-center">
                      <Filter size={16} className="mr-2" />
                      <SelectValue placeholder="All Statuses" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Applied">Applied</SelectItem>
                    <SelectItem value="Interview">Interview</SelectItem>
                    <SelectItem value="Offer">Offer</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {isLoading ? (
              <div className="text-center py-12 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-white/10">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin"></div>
                  <div className="absolute inset-[3px] rounded-full border-t-2 border-purple-500 animate-spin" style={{ animationDuration: '1.5s' }}></div>
                  <div className="absolute inset-[6px] rounded-full border-t-2 border-pink-500 animate-spin" style={{ animationDuration: '2s' }}></div>
                </div>
                <p className="mt-4 text-gray-400">Loading your job applications...</p>
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onEdit={handleEditJob}
                    onDelete={handleDeleteJob}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-white/10">
                <Briefcase className="mx-auto h-12 w-12 text-gray-600" />
                <h3 className="mt-4 text-lg font-medium text-gray-300">No jobs found</h3>
                <p className="mt-2 text-gray-400">
                  {jobApplications.length === 0
                    ? "You haven't added any jobs yet. Click 'Add Job' to get started."
                    : "No jobs match your current filters. Try adjusting your search."}
                </p>
                {jobApplications.length === 0 && (
                  <Button onClick={handleAddJob} className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 border-0">
                    <Plus size={16} className="mr-2" />
                    Add Your First Job
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="analytics">
            <JobAnalytics />
          </TabsContent>
          
          <TabsContent value="calendar">
            <InterviewCalendar />
          </TabsContent>
          
          <TabsContent value="reminders">
            <Reminders />
          </TabsContent>
          
          <TabsContent value="research">
            <CompanyResearch />
          </TabsContent>
          
          <TabsContent value="metrics">
            <SuccessMetrics />
          </TabsContent>
          
          <TabsContent value="interview-qa">
            <InterviewQA />
          </TabsContent>
          
          <TabsContent value="premium">
            <div className="space-y-6">
              <div className="dashboard-card bg-gray-900/70 backdrop-blur-md rounded-lg shadow-lg p-6 border border-white/10">
                <h3 className="text-lg font-medium mb-6 text-white flex items-center">
                  <Sparkles className="h-5 w-5 text-yellow-400 mr-2" />
                  Upgrade to Premium
                </h3>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 border border-white/10 rounded-lg p-6 bg-gray-800/50 backdrop-blur-md transition-all duration-300 hover:border-white/20">
                    <h4 className="text-lg font-bold text-white">Free Plan</h4>
                    <p className="text-2xl font-bold mt-2 text-white">$0<span className="text-sm text-gray-400 font-normal">/month</span></p>
                    <ul className="mt-6 space-y-3">
                      <li className="flex items-center text-gray-300">
                        <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Track up to 10 jobs
                      </li>
                      <li className="flex items-center text-gray-300">
                        <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Basic job status tracking
                      </li>
                      <li className="flex items-center text-gray-500">
                        <svg className="h-5 w-5 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Advanced analytics
                      </li>
                      <li className="flex items-center text-gray-500">
                        <svg className="h-5 w-5 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Email reminders
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Button disabled variant="outline" className="w-full border-white/20 text-gray-400">Current Plan</Button>
                    </div>
                  </div>
                  
                  <div className="flex-1 rounded-lg p-6 relative bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-md border border-blue-500/20 transition-all duration-300 hover:border-blue-500/40">
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                      RECOMMENDED
                    </div>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-shimmer-gradient animate-shimmer opacity-20"></div>
                    
                    <h4 className="text-lg font-bold text-white">Premium Plan</h4>
                    <p className="text-2xl font-bold mt-2 text-white">$19.99<span className="text-sm text-blue-300 font-normal">/month</span></p>
                    <ul className="mt-6 space-y-3">
                      <li className="flex items-center text-blue-100">
                        <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Unlimited job tracking
                      </li>
                      <li className="flex items-center text-blue-100">
                        <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Advanced analytics
                      </li>
                      <li className="flex items-center text-blue-100">
                        <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Email reminders
                      </li>
                      <li className="flex items-center text-blue-100">
                        <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Priority support
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Button onClick={handleUpgrade} className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 border-0 shadow-lg">
                        Upgrade Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <PaymentHistory />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <JobForm
        isOpen={isJobFormOpen}
        onClose={() => setIsJobFormOpen(false)}
        onSave={saveJob}
        editingJob={editingJob ? {
          id: editingJob.id,
          title: editingJob.title,
          company: editingJob.company,
          location: editingJob.location || '',
          status: editingJob.status,
          dateApplied: editingJob.application_date,
          notes: editingJob.notes || '',
          jobLink: editingJob.url,
          salary: editingJob.salary,
          contactName: editingJob.contact_name,
          contactEmail: editingJob.contact_email,
          tags: editingJob.tags || []
        } : null}
      />
      
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
      
      <AlertDialog open={!!jobToDelete} onOpenChange={() => setJobToDelete(null)}>
        <AlertDialogContent className="bg-gray-900 border border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This will permanently delete this job application from your list.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-800">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
};

export default Dashboard;
