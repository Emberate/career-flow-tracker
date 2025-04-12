
import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import FaqItem from '../components/FaqItem';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, MessageCircle } from 'lucide-react';

// FAQ categories and questions
const faqCategories = [
  {
    name: "Getting Started",
    faqs: [
      {
        question: "What is CareerFlow?",
        answer: "CareerFlow is a comprehensive job application tracking platform designed to help job seekers organize and optimize their job search process. It provides tools for tracking applications, managing interviews, analyzing your job search patterns, and more."
      },
      {
        question: "How do I create an account?",
        answer: "Creating an account is simple! Click the 'Sign Up' button in the top right corner of the homepage, enter your email address and create a password, or sign up with your Google or LinkedIn account. Verification of your email address is required to complete the registration process."
      },
      {
        question: "Is CareerFlow free to use?",
        answer: "Yes, CareerFlow offers a free plan that allows you to track up to 10 job applications with basic features. We also offer premium plans with advanced features for users who need more functionality. Check our Pricing page for more details on our plans and features."
      },
      {
        question: "Can I use CareerFlow on mobile devices?",
        answer: "Absolutely! CareerFlow is fully responsive and works on all devices, including smartphones and tablets. We also offer dedicated mobile apps for iOS and Android for an optimized mobile experience."
      },
      {
        question: "How secure is my data?",
        answer: "We take security very seriously. All data is encrypted both in transit and at rest. We use industry-standard security measures to protect your information and never share your personal data with third parties without your explicit consent. You can review our Privacy Policy for more details."
      }
    ]
  },
  {
    name: "Account Management",
    faqs: [
      {
        question: "How do I reset my password?",
        answer: "To reset your password, click on the 'Log In' button, then select 'Forgot Password?' Enter your email address, and we'll send you instructions to reset your password. If you don't receive the email, please check your spam folder or contact support."
      },
      {
        question: "Can I change my email address?",
        answer: "Yes, you can change your email address in your Account Settings. Log in to your account, go to Settings, and update your email address. You'll need to verify your new email address before the change takes effect."
      },
      {
        question: "How do I delete my account?",
        answer: "To delete your account, go to Account Settings, scroll to the bottom, and click on 'Delete Account'. Please note that this action is permanent and all your data will be permanently deleted from our servers. If you're having issues with the platform, we encourage you to contact support first to see if we can help resolve them."
      },
      {
        question: "What happens to my data if I cancel my subscription?",
        answer: "If you cancel your premium subscription, your account will be downgraded to the free plan at the end of your billing cycle. You'll retain access to your data, but will be limited to the features available in the free plan. If you have more than 10 job applications, you'll still be able to view them but won't be able to add new ones until you're below the limit."
      }
    ]
  },
  {
    name: "Using CareerFlow",
    faqs: [
      {
        question: "How do I add a new job application?",
        answer: "To add a new job application, log in to your account and click the '+ Add Job' button on your dashboard. Fill in the details about the position, company, application date, and other relevant information. You can also add notes, upload documents, and set reminders for follow-ups."
      },
      {
        question: "Can I import my existing job applications?",
        answer: "Yes, CareerFlow allows you to import job applications from spreadsheets (CSV or Excel format). Go to the Import/Export section in your dashboard and follow the instructions to upload your file. We provide a template that you can use to format your data correctly."
      },
      {
        question: "How do I update the status of my application?",
        answer: "To update the status of an application, open the job details page and click on the status dropdown. Select the new status (Applied, Interview Scheduled, Offer, Rejected, etc.) and save your changes. You can also add notes about the status change."
      },
      {
        question: "Can I set reminders for follow-ups?",
        answer: "Yes, you can set reminders for follow-ups, interviews, and other important dates. When viewing a job application, click on 'Add Reminder' and select the date, time, and type of reminder. You'll receive notifications via email and/or push notifications (if enabled)."
      },
      {
        question: "How do I track interviews?",
        answer: "CareerFlow has a dedicated interview tracking feature. When you have an interview scheduled, update the job status to 'Interview Scheduled' and add the interview details, including date, time, format (phone, video, in-person), and interviewer names. After the interview, you can add notes about how it went and set reminders for thank-you notes or follow-ups."
      }
    ]
  },
  {
    name: "Premium Features",
    faqs: [
      {
        question: "What features are included in premium plans?",
        answer: "Premium plans include unlimited job tracking, advanced analytics and reports, resume and cover letter storage, interview preparation tools, priority support, and more. Please visit our Pricing page for a detailed comparison of our plans."
      },
      {
        question: "How do I upgrade to a premium plan?",
        answer: "To upgrade to a premium plan, go to the Pricing page, select the plan that best suits your needs, and follow the instructions to complete your purchase. You can pay with credit/debit cards or PayPal."
      },
      {
        question: "Do you offer discounts for annual subscriptions?",
        answer: "Yes, we offer a significant discount for annual subscriptions compared to monthly billing. You can save up to 20% by choosing annual billing. The exact discount is displayed on our Pricing page."
      },
      {
        question: "Is there a free trial for premium features?",
        answer: "Yes, we offer a 14-day free trial of our Pro plan. You can try all premium features during the trial period without any commitment. No credit card is required to start the trial."
      },
      {
        question: "Can I cancel my premium subscription at any time?",
        answer: "Yes, you can cancel your premium subscription at any time from your Account Settings. Your plan will remain active until the end of your current billing period. We don't offer refunds for partial billing periods."
      }
    ]
  },
  {
    name: "Troubleshooting",
    faqs: [
      {
        question: "I can't log in to my account. What should I do?",
        answer: "If you're having trouble logging in, first check that you're using the correct email address and password. If you've forgotten your password, use the 'Forgot Password' link to reset it. Make sure your internet connection is stable and try clearing your browser cache. If the problem persists, please contact our support team."
      },
      {
        question: "My application data isn't saving. What's wrong?",
        answer: "This could be due to a temporary connection issue or a browser problem. Make sure you have a stable internet connection and try refreshing the page. If the problem continues, try using a different browser or clearing your browser cache. If these steps don't help, please contact support with details about the issue."
      },
      {
        question: "I'm not receiving email notifications. How can I fix this?",
        answer: "First, check your spam or junk folder as our emails might have been filtered. Make sure you've verified your email address and that notifications are enabled in your account settings. Add our email domain to your safe senders list. If you still don't receive emails, contact our support team for assistance."
      },
      {
        question: "The website is loading slowly or not working properly. What can I do?",
        answer: "Slow loading could be due to your internet connection, browser issues, or temporary server problems. Try refreshing the page, clearing your browser cache, or using a different browser. If the problem persists, please let us know so we can investigate."
      }
    ]
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filter FAQs based on search query and active category
  const filteredFaqs = faqCategories.flatMap(category => {
    return category.faqs.filter(faq => {
      const matchesSearch = searchQuery === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === 'all' || activeCategory === category.name;
      
      return matchesSearch && matchesCategory;
    }).map(faq => ({
      ...faq,
      category: category.name
    }));
  });
  
  return (
    <PageLayout title="Frequently Asked Questions">
      <PageHeader 
        title="Frequently Asked Questions" 
        subtitle="Find answers to common questions about CareerFlow."
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
              placeholder="Search for questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>
      
      {/* FAQ Categories */}
      <section className="py-4 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto animate-fade-in animate-delay-100">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {faqCategories.map(category => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.name 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ List */}
      <section className="py-8 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto animate-fade-in animate-delay-200">
          {filteredFaqs.length > 0 ? (
            <div className="bg-black/50 rounded-xl border border-gray-800 overflow-hidden">
              {filteredFaqs.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-300 mb-4">No results found for "{searchQuery}"</p>
              <p className="text-gray-400">Try different keywords or browse all categories</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Still Have Questions */}
      <section className="py-16 px-6 sm:px-10 text-center bg-gradient-to-t from-blue-900/20 to-transparent">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-2xl font-bold text-white mb-6">
            Still Have Questions?
          </h2>
          <p className="text-gray-300 mb-8">
            If you can't find the answer you're looking for, please reach out to our support team.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              <MessageCircle className="mr-2 h-5 w-5" />
              Contact Support
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default FAQ;
