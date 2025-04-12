
import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, FileText, Settings, Calendar, Briefcase, BarChart3, HelpCircle, Video, BookOpen } from 'lucide-react';

const categories = [
  {
    title: "Getting Started",
    icon: <BookOpen className="h-6 w-6" />,
    articles: [
      "Creating your account",
      "Setting up your profile",
      "Adding your first job application",
      "Understanding the dashboard",
      "Mobile app setup"
    ]
  },
  {
    title: "Using the Job Tracker",
    icon: <Briefcase className="h-6 w-6" />,
    articles: [
      "Adding a new job application",
      "Updating application status",
      "Adding notes and details",
      "Attaching documents",
      "Setting reminders"
    ]
  },
  {
    title: "Analytics & Reporting",
    icon: <BarChart3 className="h-6 w-6" />,
    articles: [
      "Understanding your analytics dashboard",
      "Generating reports",
      "Tracking application success rate",
      "Visualizing your job search",
      "Exporting your data"
    ]
  },
  {
    title: "Interview Management",
    icon: <Calendar className="h-6 w-6" />,
    articles: [
      "Scheduling interviews",
      "Interview preparation guides",
      "Recording interview feedback",
      "Thank you note templates",
      "Handling multiple interview rounds"
    ]
  },
  {
    title: "Account Settings",
    icon: <Settings className="h-6 w-6" />,
    articles: [
      "Updating your profile",
      "Changing your password",
      "Notification preferences",
      "Privacy settings",
      "Subscription management"
    ]
  },
  {
    title: "Troubleshooting",
    icon: <HelpCircle className="h-6 w-6" />,
    articles: [
      "Login issues",
      "Data not saving",
      "Missing applications",
      "Notification problems",
      "Mobile sync issues"
    ]
  }
];

const videoTutorials = [
  {
    title: "Getting Started with CareerFlow",
    duration: "5:23",
    thumbnail: "dashboard-thumb.jpg"
  },
  {
    title: "Tracking Your Applications Effectively",
    duration: "7:15",
    thumbnail: "tracking-thumb.jpg"
  },
  {
    title: "Using Analytics to Improve Your Job Search",
    duration: "6:42",
    thumbnail: "analytics-thumb.jpg"
  },
  {
    title: "Interview Preparation with CareerFlow",
    duration: "8:10",
    thumbnail: "interview-thumb.jpg"
  }
];

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <PageLayout title="Help Center">
      <PageHeader 
        title="Help Center" 
        subtitle="Find answers, guides, and resources to help you get the most out of CareerFlow."
      />
      
      {/* Search Section */}
      <section className="py-8 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full bg-gray-900 border border-gray-700 rounded-md py-3 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>
      
      {/* Featured Video */}
      <section className="py-8 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto animate-fade-in animate-delay-100">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
            Featured Tutorial
          </h2>
          <div className="rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
            <div className="aspect-video bg-black flex items-center justify-center relative">
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white font-medium">Complete Guide to CareerFlow</h3>
                <p className="text-gray-300 text-sm">12:34 • Updated 2 weeks ago</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Help Categories */}
      <section className="py-12 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-8 animate-fade-in animate-delay-150">
            Browse by Category
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div 
                key={category.title}
                className="bg-gray-900/30 rounded-xl border border-gray-800 p-6 hover:border-blue-500 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${150 + index * 50}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-blue-400 mr-3">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                </div>
                <ul className="space-y-2 mb-4">
                  {category.articles.map((article, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-300 hover:text-blue-400 flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{article}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">
                  View all articles →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Video Tutorials */}
      <section className="py-12 px-6 sm:px-10 bg-gray-900/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-8 flex items-center animate-fade-in">
            <Video className="h-6 w-6 mr-2 text-blue-400" />
            Video Tutorials
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in animate-delay-100">
            {videoTutorials.map((video, index) => (
              <div key={index} className="bg-gray-900/30 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500 transition-all duration-300">
                <div className="aspect-video bg-black flex items-center justify-center relative">
                  <div className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium mb-1">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 animate-fade-in animate-delay-200">
            <Button variant="outline" className="border-gray-700">
              View All Tutorials
            </Button>
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-16 px-6 sm:px-10 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-2xl font-bold text-white mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-300 mb-8">
            Our support team is ready to assist you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto">
                Contact Support
              </Button>
            </Link>
            <Link to="/faq">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-gray-700">
                Browse FAQs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HelpCenter;
