
import React, { useEffect, useRef, useState } from 'react';
import { 
  BarChart3, 
  BellRing, 
  Calendar, 
  FileText, 
  Filter, 
  LinkIcon, 
  MailCheck, 
  PenTool, 
  Smartphone,
  Star,
  CheckCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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

const highlights = [
  'Streamlined job application process',
  'Customizable reminder system',
  'Real-time status updates',
  'Advanced analytics dashboard',
  'Resume version control'
];

const FeaturesSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>(Array(features.length).fill(false));
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index') || 0);
          setVisibleFeatures(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    const featureElements = document.querySelectorAll('.feature-card');
    featureElements.forEach((el, index) => {
      el.setAttribute('data-index', index.toString());
      observer.observe(el);
    });
    
    return () => {
      featureElements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <section id="features" className="relative py-20 px-6 sm:px-10 bg-black text-white overflow-hidden">
      {/* Enhanced background gradients */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced heading with floating stars */}
        <div className="text-center mb-20 relative">
          <div className="absolute -top-10 left-1/4 text-yellow-400 animate-float" style={{animationDelay: '0.2s'}}>
            <Star size={16} />
          </div>
          <div className="absolute top-5 right-1/4 text-yellow-400 animate-float" style={{animationDelay: '1.2s'}}>
            <Star size={20} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white inline-block animate-fade-in">
            Powerful Features for Your{' '}
            <span className="relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient-shift">
                Career Growth
              </span>
              <div className="absolute h-1 w-full bottom-0 left-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-70"></div>
            </span>
          </h2>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in animate-delay-100">
            Everything you need to streamline your job search and boost your career prospects.
          </p>
        </div>

        {/* Enhanced feature cards with better animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={featuresRef}>
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`feature-card glass-card p-8 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 ease-out group transform ${
                visibleFeatures[index] 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-20 scale-95'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-6">
                {feature.description}
              </p>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-20 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* New highlight section */}
        <div className="mt-24 glass-card p-10 rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg animate-fade-in animate-delay-400">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-white">
                Why Choose <span className="text-blue-400">ProspectPath</span>?
              </h3>
              <p className="text-gray-300 mb-6">
                Our platform is designed by career experts to give you the best tools for your job search journey. With ProspectPath, you'll have everything you need in one place.
              </p>
              <ul className="space-y-3 mb-8">
                {highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{highlight}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 rounded-xl h-auto btn-hover-effect">
                  Start Your Journey
                </Button>
              </Link>
            </div>
            <div className="relative hidden md:block">
              {/* Decorative elements */}
              <div className="absolute w-64 h-64 rounded-full bg-blue-500/10 blur-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-center items-center">
                <div className="w-64 h-64 border-2 border-dashed border-blue-500/30 rounded-full flex items-center justify-center p-1 animate-spin-slow">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm flex items-center justify-center">
                    <Star className="h-16 w-16 text-yellow-400" />
                  </div>
                </div>
                <div className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mt-6">
                  5-Star Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
