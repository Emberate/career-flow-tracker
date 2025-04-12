
import React from 'react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import { ArrowRight, CheckCircle, BarChart, Calendar, FileText, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Product = () => {
  return (
    <PageLayout title="Product">
      <PageHeader 
        title="Meet CareerFlow" 
        subtitle="Our comprehensive job application tracking solution that helps you land your dream job faster."
      />
      
      {/* Key Benefits Section */}
      <section className="py-16 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-16">
            Why <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">CareerFlow</span> Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart className="h-10 w-10 text-blue-400" />,
                title: "Organized Tracking",
                description: "Never lose track of applications again. Keep everything in one place with status updates."
              },
              {
                icon: <Calendar className="h-10 w-10 text-purple-400" />,
                title: "Interview Preparation",
                description: "Get reminders for upcoming interviews and keep notes on each conversation."
              },
              {
                icon: <FileText className="h-10 w-10 text-green-400" />,
                title: "Document Management",
                description: "Store versions of your resumes and cover letters for each application."
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="glass-card p-6 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Product Showcase Section */}
      <section className="py-16 px-6 sm:px-10 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Designed for Modern Job Seekers
              </h2>
              <p className="text-gray-300 mb-6">
                CareerFlow was created with today's competitive job market in mind. Whether you're 
                applying to 5 jobs or 500, we help you stay organized and on top of your search.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Track jobs from multiple sources in one place",
                  "Monitor your application progress visually",
                  "Set reminders for follow-ups and deadlines",
                  "Analyze your job search patterns for better results"
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <CheckCircle className="text-green-400 h-5 w-5 mr-2 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4">
                <Link to="/features">
                  <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
                    See All Features <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 animate-fade-in animate-delay-200">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-gray-900 rounded-t-xl p-2">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="bg-gray-800 p-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="h-8 bg-blue-500 rounded w-32 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-600 rounded w-full"></div>
                        <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                      </div>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="h-8 bg-green-500 rounded w-32 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-600 rounded w-full"></div>
                        <div className="h-4 bg-gray-600 rounded w-4/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Preview */}
      <section className="py-16 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Trusted by Job Seekers Everywhere
          </h2>
          <div className="mb-6 animate-fade-in">
            <div className="flex justify-center mb-4">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <blockquote className="text-xl text-gray-300 italic mb-6">
              "CareerFlow completely transformed my job search. I went from feeling overwhelmed to organized and in control of my applications."
            </blockquote>
            <p className="text-blue-400 font-medium">— Alex Johnson, Software Engineer</p>
          </div>
          <Link to="/signup">
            <Button size="lg" className="mt-8 animate-fade-in animate-delay-200">
              Start Tracking Your Applications
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default Product;
