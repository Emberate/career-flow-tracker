
import React from 'react';
import { UserPlus, FileEdit, BarChart3 } from 'lucide-react';

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
  return (
    <section id="how-it-works" className="py-20 px-6 sm:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started is quick and easy. Be up and running in minutes.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-16">
          {steps.map((step, index) => (
            <div 
              key={step.title} 
              className="max-w-xs text-center animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <step.icon size={32} />
              </div>
              <div className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-[-30px] right-[-76px] w-12 border-t-2 border-dashed border-gray-300"></div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
