
import React from 'react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import PricingCard from '../components/PricingCard';
import FaqItem from '../components/FaqItem';
import { Check, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const pricingFaqs = [
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. When upgrading, you'll receive immediate access to premium features. If you downgrade, you'll retain premium features until the end of your current billing cycle."
  },
  {
    question: "Is there a free trial for premium plans?",
    answer: "Yes, both our Pro and Enterprise plans come with a 14-day free trial, so you can test all features before committing. No credit card is required to start a trial."
  },
  {
    question: "How does billing work?",
    answer: "We offer both monthly and annual billing options. Annual plans come with a significant discount. You can pay using major credit cards or PayPal."
  },
  {
    question: "Can I request a refund?",
    answer: "If you're not satisfied with your purchase, you can request a refund within 30 days of your initial purchase. Please contact our support team for assistance."
  },
  {
    question: "Do you offer special pricing for students?",
    answer: "Yes, we offer a 50% discount for students with a valid .edu email address or student ID. Contact our support team to apply for the student discount."
  }
];

const Pricing = () => {
  return (
    <PageLayout title="Pricing">
      <PageHeader 
        title="Simple, Transparent Pricing" 
        subtitle="Choose the plan that's right for your job search journey."
      />
      
      {/* Pricing Cards */}
      <section className="py-12 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              name="Free"
              price="Free"
              description="Perfect for those just starting their job search."
              features={[
                "Track up to 10 job applications",
                "Basic status tracking",
                "Email notifications",
                "Mobile access",
                "7-day data retention"
              ]}
              buttonText="Get Started"
            />
            
            <PricingCard
              name="Pro"
              price="$9.99"
              description="For serious job seekers who need more tools and insights."
              features={[
                "Unlimited job applications",
                "Advanced status tracking",
                "Resume & cover letter storage",
                "Interview preparation tools",
                "Analytics dashboard",
                "30-day data retention",
                "Priority support"
              ]}
              isPopular={true}
              buttonText="Start Free Trial"
            />
            
            <PricingCard
              name="Enterprise"
              price="$19.99"
              description="Complete solution for power users and career changers."
              features={[
                "Everything in Pro",
                "Team collaboration",
                "AI-powered job recommendations",
                "Salary insights and comparisons",
                "Advanced analytics",
                "Unlimited data retention",
                "Dedicated account manager",
                "Custom integrations"
              ]}
              buttonText="Contact Sales"
              buttonLink="/contact"
            />
          </div>
          
          {/* Feature Comparison */}
          <div className="mt-20 overflow-x-auto animate-fade-in animate-delay-200">
            <h3 className="text-xl font-bold text-white mb-8 text-center">Feature Comparison</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4 text-gray-300">Feature</th>
                  <th className="py-4 px-4 text-center text-gray-300">Free</th>
                  <th className="py-4 px-4 text-center text-blue-400">Pro</th>
                  <th className="py-4 px-4 text-center text-purple-400">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Job Application Tracking", free: "10 jobs", pro: "Unlimited", enterprise: "Unlimited" },
                  { name: "Resume Storage", free: "1 resume", pro: "10 resumes", enterprise: "Unlimited" },
                  { name: "Cover Letter Storage", free: "1 cover letter", pro: "10 cover letters", enterprise: "Unlimited" },
                  { name: "Interview Preparation", free: false, pro: true, enterprise: true },
                  { name: "Analytics Dashboard", free: "Basic", pro: "Advanced", enterprise: "Custom" },
                  { name: "Mobile Access", free: true, pro: true, enterprise: true },
                  { name: "Email Notifications", free: true, pro: true, enterprise: true },
                  { name: "Data Retention", free: "7 days", pro: "30 days", enterprise: "Unlimited" },
                  { name: "Support", free: "Community", pro: "Priority", enterprise: "Dedicated" },
                  { name: "AI Job Recommendations", free: false, pro: false, enterprise: true },
                  { name: "Team Collaboration", free: false, pro: false, enterprise: true },
                  { name: "Custom Integrations", free: false, pro: false, enterprise: true }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30">
                    <td className="py-3 px-4 text-white">{row.name}</td>
                    <td className="py-3 px-4 text-center text-gray-300">
                      {typeof row.free === 'boolean' ? 
                        (row.free ? <Check className="mx-auto text-green-400 h-5 w-5" /> : 
                        <span className="text-red-400">—</span>) : 
                        row.free}
                    </td>
                    <td className="py-3 px-4 text-center text-gray-300">
                      {typeof row.pro === 'boolean' ? 
                        (row.pro ? <Check className="mx-auto text-green-400 h-5 w-5" /> : 
                        <span className="text-red-400">—</span>) : 
                        row.pro}
                    </td>
                    <td className="py-3 px-4 text-center text-gray-300">
                      {typeof row.enterprise === 'boolean' ? 
                        (row.enterprise ? <Check className="mx-auto text-green-400 h-5 w-5" /> : 
                        <span className="text-red-400">—</span>) : 
                        row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* Pricing FAQs */}
      <section className="py-16 px-6 sm:px-10 bg-gray-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-300">
              Got questions about our pricing? Find answers to common questions below.
            </p>
          </div>
          
          <div className="bg-black/50 rounded-xl border border-gray-800 overflow-hidden animate-fade-in animate-delay-100">
            {pricingFaqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          
          <div className="mt-10 text-center animate-fade-in animate-delay-200">
            <p className="text-gray-300 mb-4">Still have questions?</p>
            <Link to="/contact">
              <Button variant="outline" className="border-gray-700">
                <HelpCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Enterprise CTA */}
      <section className="py-16 px-6 sm:px-10 bg-gradient-to-b from-black to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Need a custom solution?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We offer tailored packages for career centers, recruiting agencies, and large organizations.
          </p>
          <Link to="/contact">
            <Button size="lg">Contact Our Sales Team</Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default Pricing;
