
import React from 'react';
import { ClipboardList, Filter, FileText, Link as LinkIcon, Smartphone } from 'lucide-react';

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
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-6 sm:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Tools designed to streamline your job search and increase your chances of success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary mb-4">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
