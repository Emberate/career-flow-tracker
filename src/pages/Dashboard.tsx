
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
  Bell
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ExternalJobs from '../components/ExternalJobs';

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
  
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate, authLoading]);
  
  useEffect(() => {
    if (user?.id) {
      fetchJobApplications();
    }
  }, [user]);
  
  const fetchJobApplications = async () => {
    try {
      setIsLoading(true);
      
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
    if (!jobToDelete || !user?.id) return;
    
    try {
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
    if (!user?.id) return;
    
    try {
      // Convert the Job interface to JobApplication format
      const jobApplication: Partial<JobApplication> = {
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
        user_id: user.id,
      };
      
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
          .insert([jobApplication]);
        
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
  
  return (
    <PageLayout title="Dashboard" className="bg-gray-50">
      <PageHeader 
        title="Job Tracker Dashboard" 
        subtitle="Track, manage, and analyze your job applications" 
        centered={false} 
      />
      
      <div id="dashboard-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-8 bg-gray-50">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dashboard-text">My Job Tracker</h2>
            <p className="text-gray-600 mt-1 dashboard-text">
              {user?.email ? `Welcome, ${user.email.split('@')[0]}` : 'Track and manage your job applications'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ThemeSwitcher />
            <Button onClick={handleUpgrade} variant="outline" className="w-full sm:w-auto">
              <CreditCard size={18} className="mr-2" />
              Upgrade to Premium
            </Button>
            <Button onClick={handleAddJob} className="w-full sm:w-auto">
              <Plus size={18} className="mr-2" />
              Add Job
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="dashboard-card bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-600 text-sm">Total</p>
            <p className="text-2xl font-bold">{totalJobs}</p>
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
          <div className="overflow-x-auto">
            <TabsList className="dashboard-card bg-white border inline-flex min-w-max">
              <TabsTrigger value="jobs" className="text-xs sm:text-sm">
                <ListChecks size={16} className="mr-2 hidden sm:inline-block" />
                Jobs
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm">
                <BarChart size={16} className="mr-2 hidden sm:inline-block" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="calendar" className="text-xs sm:text-sm">
                <Calendar size={16} className="mr-2 hidden sm:inline-block" />
                Interviews
              </TabsTrigger>
              <TabsTrigger value="reminders" className="text-xs sm:text-sm">
                <Bell size={16} className="mr-2 hidden sm:inline-block" />
                Reminders
              </TabsTrigger>
              <TabsTrigger value="research" className="text-xs sm:text-sm">
                <Building size={16} className="mr-2 hidden sm:inline-block" />
                Research
              </TabsTrigger>
              <TabsTrigger value="metrics" className="text-xs sm:text-sm">
                <TrendingUp size={16} className="mr-2 hidden sm:inline-block" />
                Metrics
              </TabsTrigger>
              <TabsTrigger value="interview-qa" className="text-xs sm:text-sm">
                <MessageSquare size={16} className="mr-2 hidden sm:inline-block" />
                Q&A
              </TabsTrigger>
              <TabsTrigger value="premium" className="text-xs sm:text-sm">
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
                  className="pl-10"
                  value={filters.search}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="w-full sm:w-48">
                <Select
                  value={filters.status || 'All'}
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
            
            {isLoading ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <svg className="animate-spin h-12 w-12 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-4 text-gray-600">Loading your job applications...</p>
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
              <div className="text-center py-12 bg-white rounded-lg">
                <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No jobs found</h3>
                <p className="mt-2 text-gray-500">
                  {jobApplications.length === 0
                    ? "You haven't added any jobs yet. Click 'Add Job' to get started."
                    : "No jobs match your current filters. Try adjusting your search."}
                </p>
                {jobApplications.length === 0 && (
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
