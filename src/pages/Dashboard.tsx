import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Job, JobState } from '../types';
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
import { supabase } from '../lib/supabase';
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
  Bell
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [state, setState] = useState<JobState>({
    jobs: [],
    filteredJobs: [],
    filters: {
      status: null,
      search: '',
    },
  });
  
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("jobs");
  const [isLoading, setIsLoading] = useState(true);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Load jobs from Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      if (!user?.id) return;
      
      try {
        setIsLoading(true);
        
        // Check if jobs table exists and create it if it doesn't
        const { error: tableCheckError } = await supabase
          .from('jobs')
          .select('id', { count: 'exact', head: true });
        
        if (tableCheckError && tableCheckError.code === '42P01') {
          // Table doesn't exist, try to get jobs from localStorage as fallback
          const savedJobs = localStorage.getItem(`jobs_${user.email}`);
          if (savedJobs) {
            const jobs = JSON.parse(savedJobs);
            // Migrate jobs to Supabase
            const jobsWithUser = jobs.map((job: Job) => ({
              ...job,
              user_id: user.id
            }));
            
            // Insert jobs into Supabase
            const { error: insertError } = await supabase
              .from('jobs')
              .insert(jobsWithUser);
            
            if (insertError) {
              console.error('Error migrating jobs to Supabase:', insertError);
            } else {
              setState(prev => ({
                ...prev,
                jobs,
                filteredJobs: jobs,
              }));
            }
          }
        } else {
          // Table exists, fetch jobs
          const { data, error } = await supabase
            .from('jobs')
            .select('*')
            .eq('user_id', user.id);
          
          if (error) {
            throw error;
          }
          
          if (data) {
            setState(prev => ({
              ...prev,
              jobs: data,
              filteredJobs: data,
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast({
          title: "Error loading jobs",
          description: "Failed to load your job applications. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJobs();
  }, [user, toast]);
  
  // Apply filters when jobs or filters change
  useEffect(() => {
    let filtered = [...state.jobs];
    
    if (state.filters.status) {
      filtered = filtered.filter(job => job.status === state.filters.status);
    }
    
    if (state.filters.search) {
      const searchTerm = state.filters.search.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.notes.toLowerCase().includes(searchTerm) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    setState(prev => ({
      ...prev,
      filteredJobs: filtered,
    }));
  }, [state.jobs, state.filters]);
  
  const handleAddJob = () => {
    setEditingJob(null);
    setIsJobFormOpen(true);
  };
  
  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsJobFormOpen(true);
  };
  
  const handleDeleteJob = (jobId: string) => {
    setJobToDelete(jobId);
  };
  
  const confirmDelete = async () => {
    if (!jobToDelete || !user?.id) return;
    
    try {
      // Delete from Supabase
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobToDelete)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      // Update local state
      const updatedJobs = state.jobs.filter(job => job.id !== jobToDelete);
      
      setState(prev => ({
        ...prev,
        jobs: updatedJobs,
      }));
      
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
  
  const saveJob = async (job: Job) => {
    if (!user?.id) return;
    
    try {
      let updatedJobs: Job[];
      
      if (editingJob) {
        // Update existing job in Supabase
        const { error } = await supabase
          .from('jobs')
          .update({
            ...job,
            user_id: user.id,
            updated_at: new Date().toISOString()
          })
          .eq('id', job.id)
          .eq('user_id', user.id);
        
        if (error) throw error;
        
        // Update local state
        updatedJobs = state.jobs.map(j => j.id === job.id ? job : j);
        
        toast({
          title: "Job updated",
          description: "The job details have been updated successfully.",
        });
      } else {
        // Add new job to Supabase
        const newJob = {
          ...job,
          user_id: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        const { error } = await supabase
          .from('jobs')
          .insert([newJob]);
        
        if (error) throw error;
        
        // Update local state
        updatedJobs = [...state.jobs, job];
        
        toast({
          title: "Job added",
          description: "The new job has been added to your list.",
        });
      }
      
      setState(prev => ({
        ...prev,
        jobs: updatedJobs,
      }));
      
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
    setState(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        search: e.target.value,
      },
    }));
  };
  
  const handleStatusChange = (value: string) => {
    setState(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        status: value === 'All' ? null : value,
      },
    }));
  };
  
  const handleUpgrade = () => {
    setIsPaymentModalOpen(true);
  };
  
  const totalJobs = state.jobs.length;
  const appliedJobs = state.jobs.filter(j => j.status === 'Applied').length;
  const interviewJobs = state.jobs.filter(j => j.status === 'Interview').length;
  const offerJobs = state.jobs.filter(j => j.status === 'Offer').length;
  const rejectedJobs = state.jobs.filter(j => j.status === 'Rejected').length;
  
  return (
    <PageLayout title="Dashboard" className="bg-gray-50">
      <PageHeader 
        title="Job Tracker Dashboard" 
        subtitle="Track, manage, and analyze your job applications" 
        centered={false} 
      />
      
      <div id="dashboard-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-8 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dashboard-text">My Job Tracker</h2>
            <p className="text-gray-600 mt-1 dashboard-text">
              {user?.name ? `Welcome, ${user.name}` : 'Track and manage your job applications'}
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <ThemeSwitcher />
            <Button onClick={handleUpgrade} variant="outline">
              <CreditCard size={18} className="mr-2" />
              Upgrade to Premium
            </Button>
            <Button onClick={handleAddJob}>
              <Plus size={18} className="mr-2" />
              Add Job
            </Button>
          </div>
        </div>
        
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="dashboard-card bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-600 text-sm dashboard-text">Total</p>
            <p className="text-2xl font-bold dashboard-text">{totalJobs}</p>
          </div>
          <div className="dashboard-card bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <p className="text-blue-700 text-sm">Applied</p>
            <p className="text-2xl font-bold text-blue-700">{appliedJobs}</p>
          </div>
          <div className="dashboard-card bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-100">
            <p className="text-yellow-700 text-sm">Interviewing</p>
            <p className="text-2xl font-bold text-yellow-700">{interviewJobs}</p>
          </div>
          <div className="dashboard-card bg-green-50 p-4 rounded-lg shadow-sm border border-green-100">
            <p className="text-green-700 text-sm">Offers</p>
            <p className="text-2xl font-bold text-green-700">{offerJobs}</p>
          </div>
          <div className="dashboard-card bg-red-50 p-4 rounded-lg shadow-sm border border-red-100">
            <p className="text-red-700 text-sm">Rejected</p>
            <p className="text-2xl font-bold text-red-700">{rejectedJobs}</p>
          </div>
        </div>
        
        <Tabs defaultValue="jobs" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="dashboard-card bg-white border">
            <TabsTrigger value="jobs">
              <ListChecks size={16} className="mr-2" />
              Job Applications
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart size={16} className="mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <Calendar size={16} className="mr-2" />
              Interviews
            </TabsTrigger>
            <TabsTrigger value="reminders">
              <Bell size={16} className="mr-2" />
              Reminders
            </TabsTrigger>
            <TabsTrigger value="research">
              <Building size={16} className="mr-2" />
              Research
            </TabsTrigger>
            <TabsTrigger value="metrics">
              <TrendingUp size={16} className="mr-2" />
              Success Metrics
            </TabsTrigger>
            <TabsTrigger value="interview-qa">
              <MessageSquare size={16} className="mr-2" />
              Interview Q&A
            </TabsTrigger>
            <TabsTrigger value="premium">
              <CreditCard size={16} className="mr-2" />
              Premium
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="jobs" className="space-y-4">
            {/* Filters and search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search jobs by title, company, or tags..."
                  className="pl-10"
                  value={state.filters.search}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="w-full md:w-48">
                <Select
                  value={state.filters.status || 'All'}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter size={16} className="mr-2" />
                      <SelectValue placeholder="All Statuses" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Applied">Applied</SelectItem>
                    <SelectItem value="Interview">Interview</SelectItem>
                    <SelectItem value="Offer">Offer</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Job list */}
            {isLoading ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <svg className="animate-spin h-12 w-12 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-4 text-gray-600">Loading your job applications...</p>
              </div>
            ) : state.filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.filteredJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onEdit={handleEditJob}
                    onDelete={handleDeleteJob}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No jobs found</h3>
                <p className="mt-2 text-gray-500">
                  {state.jobs.length === 0
                    ? "You haven't added any jobs yet. Click 'Add Job' to get started."
                    : "No jobs match your current filters. Try adjusting your search."}
                </p>
                {state.jobs.length === 0 && (
                  <Button onClick={handleAddJob} className="mt-4">
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
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4">Upgrade to Premium</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 border rounded-lg p-6">
                    <h4 className="text-lg font-bold">Free Plan</h4>
                    <p className="text-2xl font-bold mt-2">$0<span className="text-sm text-gray-500 font-normal">/month</span></p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Track up to 10 jobs
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Basic job status tracking
                      </li>
                      <li className="flex items-center text-gray-500">
                        <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Advanced analytics
                      </li>
                      <li className="flex items-center text-gray-500">
                        <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Email reminders
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Button disabled variant="outline" className="w-full">Current Plan</Button>
                    </div>
                  </div>
                  
                  <div className="flex-1 border rounded-lg p-6 bg-primary/5 border-primary/20 relative">
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                      RECOMMENDED
                    </div>
                    <h4 className="text-lg font-bold">Premium Plan</h4>
                    <p className="text-2xl font-bold mt-2">$19.99<span className="text-sm text-gray-500 font-normal">/month</span></p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Unlimited job tracking
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Advanced analytics
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Email reminders
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Priority support
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Button onClick={handleUpgrade} className="w-full">Upgrade Now</Button>
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
        editingJob={editingJob}
      />
      
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
      
      <AlertDialog open={!!jobToDelete} onOpenChange={() => setJobToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this job application from your list.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
};

export default Dashboard;
