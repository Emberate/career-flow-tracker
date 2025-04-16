
import React, { useEffect, useRef } from 'react';
import { 
  BarChart3, 
  BellRing, 
  Calendar, 
  FileText, 
  Filter, 
  LinkIcon, 
  MailCheck, 
  PenTool, 
  Smartphone 
} from 'lucide-react';

const features = [
  {
    title: 'Smart Job Tracking',
    description: 'Organize your applications with our intelligent tracking system.',
    icon: BarChart3,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Application Insights',
    description: 'Get real-time analytics and insights on your job search progress.',
    icon: PenTool,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Interview Scheduler',
    description: 'Manage your interviews and never miss an opportunity.',
    icon: Calendar,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    title: 'Smart Notifications',
    description: 'Stay updated with timely reminders and alerts.',
    icon: BellRing,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Resume Manager',
    description: 'Keep track of different versions of your professional documents.',
    icon: FileText,
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    title: 'Mobile Access',
    description: 'Access your career dashboard anytime, anywhere.',
    icon: Smartphone,
    gradient: 'from-violet-500 to-purple-500'
  }
];

const FeaturesSection = () => {
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
    <section id="features" className="relative py-20 px-6 sm:px-10 bg-black text-white overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white inline-block animate-fade-in">
            Powerful Features for Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Career Growth
            </span>
          </h2>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in animate-delay-100">
            Everything you need to streamline your job search and boost your career prospects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={featuresRef}>
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="feature-card glass-card p-8 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 ease-out group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-4 mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
