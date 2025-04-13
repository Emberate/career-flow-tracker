
import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Code, Database, Bot, Zap, Lightbulb } from 'lucide-react';

const Documentation = () => {
  return (
    <PageLayout title="Documentation" className="px-4 py-8">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-6 flex items-center">
          <Link to="/">
            <Button variant="outline" size="sm" className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Documentation</h1>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="ai">AI Integration</TabsTrigger>
            <TabsTrigger value="backend">Backend Setup</TabsTrigger>
            <TabsTrigger value="customization">Customization</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-black/30 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Job Tracker Application</CardTitle>
                <CardDescription className="text-gray-400">
                  A comprehensive system to manage your job application process
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  CareerFlow is a complete job tracking system that helps users manage their 
                  job application process effectively. The application offers various features 
                  such as job application tracking, interview scheduling, analytics, and more.
                </p>
                
                <h3 className="text-xl font-semibold text-white mt-6">Pages Overview</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Dashboard:</strong> Main page for managing job applications and tracking statuses</li>
                  <li><strong>Login/Signup:</strong> Authentication pages for user management</li>
                  <li><strong>Profile:</strong> User profile management page</li>
                  <li><strong>Product/Features:</strong> Information about the application</li>
                  <li><strong>How It Works:</strong> Explanation of the application workflow</li>
                  <li><strong>Pricing:</strong> Subscription plans and information</li>
                  <li><strong>Support/Help Center:</strong> Resources for application assistance</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <Card className="bg-black/30 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Key Features</CardTitle>
                <CardDescription className="text-gray-400">
                  Comprehensive tools to enhance your job search
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="mr-3 p-2 bg-blue-500/20 rounded-md">
                        <Zap className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Job Tracking</h3>
                        <p className="text-sm text-gray-400">Add, edit, and delete job applications, track status, add notes and company details</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="mr-3 p-2 bg-purple-500/20 rounded-md">
                        <Zap className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Status Filters</h3>
                        <p className="text-sm text-gray-400">Filter jobs by status (Applied, Interview, Offer, Rejected), search by titles and companies</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="mr-3 p-2 bg-green-500/20 rounded-md">
                        <Zap className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Analytics Dashboard</h3>
                        <p className="text-sm text-gray-400">Visual representations of application status distribution and monthly trends</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="mr-3 p-2 bg-yellow-500/20 rounded-md">
                        <Zap className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Interview Calendar</h3>
                        <p className="text-sm text-gray-400">Schedule and track interview dates, view upcoming interviews</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="mr-3 p-2 bg-red-500/20 rounded-md">
                        <Zap className="h-5 w-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Reminders</h3>
                        <p className="text-sm text-gray-400">Set reminders for follow-ups and deadlines, get notifications</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="mr-3 p-2 bg-teal-500/20 rounded-md">
                        <Zap className="h-5 w-5 text-teal-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Company Research</h3>
                        <p className="text-sm text-gray-400">Access company information, add notes about culture and values</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="mr-3 p-2 bg-pink-500/20 rounded-md">
                        <Zap className="h-5 w-5 text-pink-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Success Metrics</h3>
                        <p className="text-sm text-gray-400">Track application success rate, identify improvement areas</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="mr-3 p-2 bg-indigo-500/20 rounded-md">
                        <Zap className="h-5 w-5 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Interview Q&A</h3>
                        <p className="text-sm text-gray-400">Access common interview questions, save your own Q&A templates</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Integration Tab */}
          <TabsContent value="ai" className="space-y-6">
            <Card className="bg-black/30 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">AI Integration</CardTitle>
                <CardDescription className="text-gray-400">
                  Enhance your job search with artificial intelligence
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  CareerFlow can be enhanced with AI capabilities to provide intelligent insights 
                  and automate various aspects of your job search. Here's how AI can be integrated:
                </p>
                
                <div className="mt-6 space-y-6">
                  <div className="p-4 border border-gray-800 rounded-lg bg-black/40">
                    <div className="flex items-center mb-3">
                      <Bot className="h-5 w-5 text-blue-400 mr-2" />
                      <h3 className="text-lg font-semibold text-white">Resume Analysis</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      Upload resumes and let AI extract key skills and experiences. Match these with job requirements to 
                      get a match percentage and suggestions for improvement. This helps tailor your application 
                      for each specific job posting.
                    </p>
                    <div className="mt-3 text-xs text-gray-500">
                      <strong>Implementation:</strong> Uses OpenAI API via Supabase Edge Functions for document parsing and analysis.
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-800 rounded-lg bg-black/40">
                    <div className="flex items-center mb-3">
                      <Bot className="h-5 w-5 text-purple-400 mr-2" />
                      <h3 className="text-lg font-semibold text-white">Interview Question Generator</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      Generate custom interview questions based on job descriptions. Get tailored responses based on your experience 
                      and practice with AI-driven feedback to improve your interview performance.
                    </p>
                    <div className="mt-3 text-xs text-gray-500">
                      <strong>Implementation:</strong> Uses OpenAI's GPT models to analyze job descriptions and generate relevant questions.
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-800 rounded-lg bg-black/40">
                    <div className="flex items-center mb-3">
                      <Bot className="h-5 w-5 text-green-400 mr-2" />
                      <h3 className="text-lg font-semibold text-white">Job Description Analyzer</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      Identify key requirements from job descriptions, get suggestions for skills to highlight in applications, 
                      and detect culture fit indicators to better position yourself as the ideal candidate.
                    </p>
                    <div className="mt-3 text-xs text-gray-500">
                      <strong>Implementation:</strong> Uses natural language processing to extract and prioritize requirements.
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-800 rounded-lg bg-black/40">
                    <div className="flex items-center mb-3">
                      <Bot className="h-5 w-5 text-yellow-400 mr-2" />
                      <h3 className="text-lg font-semibold text-white">Application Performance Insights</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      Track success rates across different job types, identify patterns in successful applications, 
                      and get AI-powered suggestions for improvements in your future applications.
                    </p>
                    <div className="mt-3 text-xs text-gray-500">
                      <strong>Implementation:</strong> Uses machine learning to analyze successful vs. unsuccessful applications.
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 border border-gray-800 rounded-lg bg-black/40">
                  <h3 className="text-lg font-semibold text-white mb-3">Recommended AI Services</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>OpenAI API:</strong> Best for natural language tasks and interview question generation</li>
                    <li><strong>Hugging Face Models:</strong> Good for specialized NLP tasks, often more cost-effective</li>
                    <li><strong>Custom ML Models:</strong> For specialized resume parsing and matching, can be trained on specific data</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backend Setup Tab */}
          <TabsContent value="backend" className="space-y-6">
            <Card className="bg-black/30 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Backend Setup</CardTitle>
                <CardDescription className="text-gray-400">
                  Integrate with Supabase for authentication and data persistence
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  CareerFlow's backend capabilities are powered by Supabase, providing a 
                  secure and scalable infrastructure for authentication, database, and file storage.
                </p>
                
                <div className="p-5 border border-gray-800 rounded-lg bg-black/40 mt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Setting Up Supabase</h3>
                  <ol className="list-decimal pl-6 space-y-3">
                    <li>Click the green Supabase button in the top right corner of Lovable</li>
                    <li>Follow the prompts to create or connect to a Supabase project</li>
                    <li>Set up authentication providers (email/password, social logins)</li>
                    <li>Create database tables according to the schema below</li>
                    <li>Configure storage buckets for resumes and documents</li>
                  </ol>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Database Schema</h3>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-300">
{`
users
  - id
  - email
  - created_at
  - profile_data

jobs
  - id
  - user_id (foreign key)
  - company
  - position
  - description
  - status
  - applied_date
  - notes

interviews
  - id
  - job_id (foreign key)
  - date
  - type (phone, video, in-person)
  - notes
  - feedback

documents
  - id
  - user_id (foreign key)
  - job_id (foreign key, optional)
  - type (resume, cover letter)
  - filename
  - storage_path
  - created_at

ai_feedback
  - id
  - user_id (foreign key)
  - job_id (foreign key, optional)
  - document_id (foreign key, optional)
  - feedback_type
  - content
  - created_at
`}
                    </pre>
                  </div>
                </div>
                
                <div className="mt-6 space-y-6">
                  <div className="p-4 border border-gray-800 rounded-lg bg-black/40">
                    <div className="flex items-center mb-3">
                      <Database className="h-5 w-5 text-blue-400 mr-2" />
                      <h3 className="text-lg font-semibold text-white">Authentication</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      Supabase provides secure user authentication with multiple providers. User sessions 
                      are automatically managed and can be customized with additional profile data.
                    </p>
                  </div>
                  
                  <div className="p-4 border border-gray-800 rounded-lg bg-black/40">
                    <div className="flex items-center mb-3">
                      <Database className="h-5 w-5 text-purple-400 mr-2" />
                      <h3 className="text-lg font-semibold text-white">Database</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      PostgreSQL database with row-level security for data protection. All job applications, 
                      interviews, and user data are stored securely with appropriate access controls.
                    </p>
                  </div>
                  
                  <div className="p-4 border border-gray-800 rounded-lg bg-black/40">
                    <div className="flex items-center mb-3">
                      <Database className="h-5 w-5 text-green-400 mr-2" />
                      <h3 className="text-lg font-semibold text-white">Storage</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      File storage for resumes, cover letters, and other documents. Files are linked to user accounts 
                      and specific job applications with appropriate permissions.
                    </p>
                  </div>
                  
                  <div className="p-4 border border-gray-800 rounded-lg bg-black/40">
                    <div className="flex items-center mb-3">
                      <Database className="h-5 w-5 text-yellow-400 mr-2" />
                      <h3 className="text-lg font-semibold text-white">Edge Functions</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      Serverless functions for custom backend logic, AI integrations, and advanced operations. 
                      These can be used to interact with third-party services and APIs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customization Tab */}
          <TabsContent value="customization" className="space-y-6">
            <Card className="bg-black/30 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Customization</CardTitle>
                <CardDescription className="text-gray-400">
                  Personalize the application to suit your preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  CareerFlow offers various customization options to enhance your user experience 
                  and make the application work better for your specific needs.
                </p>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border border-gray-800 rounded-lg bg-black/40">
                    <div className="flex items-center mb-3">
                      <Lightbulb className="h-5 w-5 text-yellow-400 mr-2" />
                      <h3 className="text-lg font-semibold text-white">Theme Customization</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      Switch between different color themes including light, dark, purple, green, blue, and black. 
                      Theme preferences are saved between sessions using localStorage.
                    </p>
                  </div>
                  
                  <div className="p-4 border border-gray-800 rounded-lg bg-black/40">
                    <div className="flex items-center mb-3">
                      <Lightbulb className="h-5 w-5 text-blue-400 mr-2" />
                      <h3 className="text-lg font-semibold text-white">Dashboard Widgets</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      Customize your dashboard with widgets for different metrics. Rearrange them to focus 
                      on what matters most to your job search process.
                    </p>
                  </div>
                  
                  <div className="p-4 border border-gray-800 rounded-lg bg-black/40">
                    <div className="flex items-center mb-3">
                      <Lightbulb className="h-5 w-5 text-green-400 mr-2" />
                      <h3 className="text-lg font-semibold text-white">Status Customization</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      Add custom status types beyond the default (Applied, Interview, Offer, Rejected) 
                      to better match your job search workflow.
                    </p>
                  </div>
                  
                  <div className="p-4 border border-gray-800 rounded-lg bg-black/40">
                    <div className="flex items-center mb-3">
                      <Lightbulb className="h-5 w-5 text-purple-400 mr-2" />
                      <h3 className="text-lg font-semibold text-white">Notification Settings</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      Configure notification preferences for reminders, upcoming interviews, and application deadlines 
                      to stay on top of your job search.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Implementation Guide</h3>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-3">
                      To implement these customization features, you'll need to:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-400">
                      <li>Store user preferences in localStorage (for theme, widgets) or in the Supabase database (for more complex settings)</li>
                      <li>Create UI components for each customization option</li>
                      <li>Implement context providers to share customization settings across components</li>
                      <li>Add event handlers to update preferences when users make changes</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 bg-black/30 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Getting Started</h2>
          <p className="text-gray-300 mb-4">
            Ready to enhance your job search with CareerFlow? Follow these steps to get started:
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-gray-300">
            <li>Create an account using the signup page</li>
            <li>Set up your profile with relevant skills and experience</li>
            <li>Add your first job application from the dashboard</li>
            <li>Explore the analytics and tracking features</li>
            <li>Customize the application to suit your preferences</li>
          </ol>
          <div className="mt-6">
            <Button className="mr-4">
              <Link to="/signup" className="flex items-center">
                Get Started
                <ArrowLeft className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline">
              <Link to="/help" className="flex items-center">
                Learn More
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Documentation;
