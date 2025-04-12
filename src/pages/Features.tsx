
import React from 'react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import { 
  ClipboardList, Filter, FileText, Link as LinkIcon, Smartphone, 
  BarChart3, Bell, Calendar, MessageSquare, PieChart, Search, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Job Tracker',
    description: 'Log and organize all your job applications in one centralized dashboard.',
    icon: ClipboardList,
  },
  {
    title: 'Status Filters',
    description: 'Easily filter jobs by status: Applied, Interview, Offer, or Rejected.',
    icon: Filter,
  },
  {
    title: 'Smart Notes',
    description: 'Add detailed notes about each position and interview experience.',
    icon: FileText,
  },
  {
    title: 'Resume Links',
    description: 'Store links to the resume and cover letter you used for each application.',
    icon: LinkIcon,
  },
  {
    title: 'Mobile Friendly',
    description: 'Update your job search progress from any device, anytime.',
    icon: Smartphone,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Visualize your job search progress with insightful charts and metrics.',
    icon: BarChart3,
  },
  {
    title: 'Reminders',
    description: 'Set notifications for follow-ups, interviews, and important deadlines.',
    icon: Bell,
  },
  {
    title: 'Interview Calendar',
    description: 'Schedule and manage all your interviews in an integrated calendar.',
    icon: Calendar,
  },
  {
    title: 'Company Research',
    description: 'Find important information about companies right within the platform.',
    icon: Search,
  },
  {
    title: 'Success Metrics',
    description: 'Track your application success rate and identify improvement areas.',
    icon: PieChart,
  },
  {
    title: 'Interview Q&A',
    description: 'Prepare for interviews with common questions and answer templates.',
    icon: MessageSquare,
  },
  {
    title: 'Data Security',
    description: 'All your job search data is encrypted and securely stored.',
    icon: Shield,
  },
];

const Features = () => {
  return (
    <PageLayout title="Features">
      <PageHeader 
        title="Powerful Features" 
        subtitle="Everything you need to organize, track, and optimize your job search."
      />
      
      <section className="py-12 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="feature-card glass-card p-6 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-500 ease-in-out animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-blue-400 mb-4 transform transition-transform duration-500 hover:scale-110 hover:bg-blue-900 hover:text-white">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Feature Comparison */}
      <section className="py-16 px-6 sm:px-10 bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
            How CareerFlow <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Compares</span>
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse animate-fade-in">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4 text-gray-300">Feature</th>
                  <th className="py-4 px-4 text-blue-400">CareerFlow</th>
                  <th className="py-4 px-4 text-gray-300">Spreadsheets</th>
                  <th className="py-4 px-4 text-gray-300">Other Tools</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Application Tracking", careerFlow: true, spreadsheets: true, others: true },
                  { name: "Status Updates", careerFlow: true, spreadsheets: true, others: true },
                  { name: "Visual Dashboard", careerFlow: true, spreadsheets: false, others: true },
                  { name: "Mobile Experience", careerFlow: true, spreadsheets: false, others: false },
                  { name: "Automatic Reminders", careerFlow: true, spreadsheets: false, others: false },
                  { name: "Interview Preparation", careerFlow: true, spreadsheets: false, others: false },
                  { name: "Document Storage", careerFlow: true, spreadsheets: false, others: true },
                  { name: "Analytics & Insights", careerFlow: true, spreadsheets: false, others: false }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30">
                    <td className="py-3 px-4 text-white">{row.name}</td>
                    <td className="py-3 px-4 text-center">
                      {row.careerFlow ? 
                        <span className="text-green-400">✓</span> : 
                        <span className="text-red-400">✕</span>}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.spreadsheets ? 
                        <span className="text-green-400">✓</span> : 
                        <span className="text-red-400">✕</span>}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.others ? 
                        <span className="text-green-400">✓</span> : 
                        <span className="text-red-400">✕</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 px-6 sm:px-10 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Ready to transform your job search?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of job seekers who've simplified their application process with CareerFlow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">Get Started Free</Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-gray-700">
                See How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Features;
