
import React from 'react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import { UserPlus, FileEdit, BarChart3, Briefcase, CheckCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const steps = [
  {
    title: 'Sign Up',
    description: 'Create your free account in seconds. No credit card required.',
    icon: UserPlus,
    details: 'Start by creating a free account with your email or sign in with Google or LinkedIn. The setup process takes less than a minute so you can get started right away.'
  },
  {
    title: 'Add Jobs',
    description: "Add the positions you've applied for with all the important details.",
    icon: FileEdit,
    details: 'Every time you apply for a job, add it to CareerFlow. Include the company name, position, application date, job description, and any notes you want to remember.'
  },
  {
    title: 'Track Progress',
    description: 'Monitor status changes and keep your job search organized.',
    icon: BarChart3,
    details: 'Update the status of each application as you progress through the hiring process. From "Applied" to "Interview" to "Offer" or "Rejected" - you\'ll have a complete history of your journey.'
  },
  {
    title: 'Prepare For Interviews',
    description: 'Use our tools to prepare for upcoming interviews and track feedback.',
    icon: Calendar,
    details: 'When you get an interview, CareerFlow helps you prepare with company research, common questions, and scheduling tools. After interviews, log feedback and takeaways for future reference.'
  },
  {
    title: 'Accept Offers',
    description: 'Compare offers and make informed decisions about your next role.',
    icon: Briefcase,
    details: 'When you receive job offers, compare them side by side with our built-in tools. Track salary, benefits, location, and other factors to make the best choice for your career.'
  },
  {
    title: 'Achieve Success',
    description: 'Land your dream job with a well-organized job search strategy.',
    icon: CheckCircle,
    details: 'With CareerFlow, you\'ll increase your chances of landing the right job by staying organized, prepared, and strategic throughout your job search journey.'
  }
];

const HowItWorks = () => {
  return (
    <PageLayout title="How It Works">
      <PageHeader 
        title="How CareerFlow Works" 
        subtitle="Our simple yet powerful process helps you manage your entire job search journey."
      />
      
      <section className="py-12 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center">
            {steps.map((step, index) => (
              <div 
                key={step.title}
                className="relative flex flex-col md:flex-row w-full max-w-4xl mb-20 last:mb-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Step number and connecting line */}
                <div className="md:w-16 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-blue-400 text-lg font-bold">
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block h-full w-0.5 bg-gray-700 mt-2"></div>
                  )}
                </div>
                
                {/* Step content */}
                <div className="md:ml-8 glass-card p-6 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-500 md:w-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-blue-400 mr-4">
                      <step.icon size={20} />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-4">{step.description}</p>
                  <p className="text-gray-400 text-sm">{step.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Demo Section */}
      <section className="py-16 px-6 sm:px-10 bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              See CareerFlow in Action
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Watch how easy it is to get started and organize your job applications.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto animate-fade-in animate-delay-100">
            <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-video bg-gray-800 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white text-lg">CareerFlow Demo Video</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Preview */}
      <section className="py-16 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-12 animate-fade-in">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4 animate-fade-in animate-delay-100">
            {[
              {
                question: "Is CareerFlow really free to use?",
                answer: "Yes! CareerFlow offers a free plan that includes all the basic features you need to track your job applications. We also offer premium plans with advanced features for power users."
              },
              {
                question: "Can I import my existing job applications?",
                answer: "Absolutely. CareerFlow allows you to import data from spreadsheets and other tracking tools so you don't have to start from scratch."
              },
              {
                question: "How secure is my data?",
                answer: "Your privacy and data security are our top priorities. All data is encrypted, and we never share your information with third parties without your explicit consent."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-900/30 rounded-lg overflow-hidden border border-gray-800">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer p-4 text-white">
                    <span>{faq.question}</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="text-gray-300 p-4 pt-0 border-t border-gray-800">{faq.answer}</p>
                </details>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10 animate-fade-in animate-delay-200">
            <Link to="/faq">
              <Button variant="outline" className="border-gray-700">
                View All FAQs
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 px-6 sm:px-10 bg-gradient-to-t from-blue-900/20 to-transparent text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of job seekers who've simplified their application process with CareerFlow.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default HowItWorks;
