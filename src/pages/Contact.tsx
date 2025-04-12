
import React from 'react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import { Mail, MapPin, Phone, Clock, Linkedin, Twitter, Facebook } from 'lucide-react';

const Contact = () => {
  return (
    <PageLayout title="Contact Us">
      <PageHeader 
        title="Contact Us" 
        subtitle="We're here to help. Reach out to our team with any questions or feedback."
      />
      
      {/* Contact Information and Form */}
      <section className="py-12 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              <p className="text-gray-300 mb-8">
                Have questions about CareerFlow? Our team is ready to assist you with any inquiries or issues you may have.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 text-blue-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Email</h3>
                    <p className="text-gray-300">support@careerflow.com</p>
                    <p className="text-gray-300">sales@careerflow.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-4 text-purple-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Phone</h3>
                    <p className="text-gray-300">Support: +1 (800) 123-4567</p>
                    <p className="text-gray-300">Sales: +1 (800) 987-6543</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4 text-green-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Address</h3>
                    <p className="text-gray-300">
                      CareerFlow Inc.<br />
                      123 Innovation Way<br />
                      San Francisco, CA 94103<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-4 text-yellow-400">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Hours</h3>
                    <p className="text-gray-300">
                      Monday - Friday: 9:00 AM - 5:00 PM EST<br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-white font-medium mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-900 flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-300">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-900 flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-300">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-900 flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-300">
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="animate-fade-in animate-delay-100">
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-12 px-6 sm:px-10 bg-gray-900/20">
        <div className="max-w-7xl mx-auto animate-fade-in">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Location</h2>
          <div className="rounded-xl overflow-hidden h-96 border border-gray-800">
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <p className="text-gray-400">Interactive map would be displayed here</p>
              {/* In a real implementation, you would embed a Google Maps or similar map here */}
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Preview */}
      <section className="py-16 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-300 mb-8">
            Find quick answers to common questions before reaching out.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10">
            {[
              {
                question: "What is CareerFlow?",
                answer: "CareerFlow is a job application tracking platform that helps job seekers organize and optimize their job search process."
              },
              {
                question: "Is there a free version?",
                answer: "Yes, CareerFlow offers a free plan that allows you to track up to 10 job applications with basic features."
              },
              {
                question: "How can I upgrade my plan?",
                answer: "You can upgrade your plan anytime from your account settings page. We offer monthly and annual billing options."
              },
              {
                question: "How do I cancel my subscription?",
                answer: "You can cancel your subscription at any time from your account settings. Your plan will remain active until the end of your billing period."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                <p className="text-gray-300 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
          <a href="/faq" className="text-blue-400 hover:text-blue-300 font-medium">
            View all FAQs →
          </a>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
