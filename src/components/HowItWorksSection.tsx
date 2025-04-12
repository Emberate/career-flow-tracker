
import React, { useEffect, useRef } from 'react';
import { UserPlus, FileEdit, BarChart3 } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const steps = [
  {
    title: 'Sign Up',
    description: 'Create your free account in seconds. No credit card required.',
    icon: UserPlus,
  },
  {
    title: 'Add Jobs',
    description: "Add the positions you've applied for with all the important details.",
    icon: FileEdit,
  },
  {
    title: 'Track Progress',
    description: 'Monitor status changes and keep your job search organized.',
    icon: BarChart3,
  },
];

const HowItWorksSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });
    
    const stepElements = document.querySelectorAll('.step-item');
    stepElements.forEach(el => observer.observe(el));
    
    return () => {
      stepElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="how-it-works" className="py-20 px-6 sm:px-10 bg-black" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            How It <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Works</span>
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Getting started is quick and easy. Be up and running in minutes.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-16">
          {steps.map((step, index) => (
            <div 
              key={step.title} 
              className={`step-item max-w-xs text-center transform transition-all duration-700 opacity-0 translate-y-8`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="w-16 h-16 bg-gray-800 hover:bg-blue-900 rounded-full flex items-center justify-center text-blue-400 hover:text-white mx-auto mb-6 transition-all duration-500 transform hover:scale-110">
                <step.icon size={32} />
              </div>
              <div className="relative">
                {index < steps.length - 1 && !isMobile && (
                  <div className="hidden md:block absolute top-[-30px] right-[-76px] w-12 border-t-2 border-dashed border-gray-700 animate-pulse"></div>
                )}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
