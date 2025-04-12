
import React, { useEffect, useRef } from 'react';
import { ClipboardList, Filter, FileText, Link as LinkIcon, Smartphone } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });
    
    const featureElements = document.querySelectorAll('.feature-card');
    featureElements.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-10');
      observer.observe(el);
    });
    
    return () => {
      featureElements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <section id="features" className="py-20 px-6 sm:px-10 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white animate-fade-in">
            Everything You Need to Land Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Dream Job</span>
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in animate-delay-100">
            Tools designed to streamline your job search and increase your chances of success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={featuresRef}>
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="feature-card glass-card p-6 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-500 ease-in-out"
              style={{ 
                transitionDelay: `${index * 100}ms`,
                transitionProperty: 'all',
                transform: 'translateY(10px)'
              }}
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
  );
};

export default FeaturesSection;
