
import React from 'react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle, FileText, HelpCircle, Mail, Phone, Video } from 'lucide-react';

const supportOptions = [
  {
    title: "Help Center",
    description: "Browse our comprehensive knowledge base with how-to guides and tutorials.",
    icon: <HelpCircle className="h-12 w-12 text-blue-400" />,
    buttonText: "Visit Help Center",
    link: "/help"
  },
  {
    title: "Contact Us",
    description: "Reach out to our support team for personalized assistance.",
    icon: <MessageCircle className="h-12 w-12 text-purple-400" />,
    buttonText: "Contact Support",
    link: "/contact"
  },
  {
    title: "FAQs",
    description: "Find answers to the most commonly asked questions about CareerFlow.",
    icon: <FileText className="h-12 w-12 text-green-400" />,
    buttonText: "View FAQs",
    link: "/faq"
  }
];

const Support = () => {
  return (
    <PageLayout title="Support">
      <PageHeader 
        title="We're Here to Help" 
        subtitle="Get the support you need to make the most of CareerFlow."
      />
      
      {/* Support Options */}
      <section className="py-12 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <div 
                key={option.title}
                className="glass-card rounded-xl border border-gray-800 hover:border-blue-500 p-8 text-center flex flex-col items-center transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-6">{option.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{option.title}</h3>
                <p className="text-gray-300 mb-6">{option.description}</p>
                <Link to={option.link} className="mt-auto">
                  <Button>{option.buttonText}</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Methods */}
      <section className="py-16 px-6 sm:px-10 bg-gray-900/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-12 animate-fade-in">
            Multiple Ways to Connect
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in animate-delay-100">
            <div className="bg-black/50 rounded-xl border border-gray-800 p-6 hover:border-blue-500 transition-all duration-300">
              <Mail className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Email Support</h3>
              <p className="text-gray-300 mb-4">Send us an email and we'll get back to you within 24 hours.</p>
              <a href="mailto:support@careerflow.com" className="text-blue-400 hover:text-blue-300">support@careerflow.com</a>
            </div>
            
            <div className="bg-black/50 rounded-xl border border-gray-800 p-6 hover:border-purple-500 transition-all duration-300">
              <Phone className="h-8 w-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Phone Support</h3>
              <p className="text-gray-300 mb-4">Available Monday through Friday, 9 AM to 5 PM EST.</p>
              <a href="tel:+18001234567" className="text-purple-400 hover:text-purple-300">+1 (800) 123-4567</a>
            </div>
            
            <div className="bg-black/50 rounded-xl border border-gray-800 p-6 hover:border-green-500 transition-all duration-300">
              <MessageCircle className="h-8 w-8 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Live Chat</h3>
              <p className="text-gray-300 mb-4">Chat with our support team in real-time during business hours.</p>
              <Button variant="outline" className="border-gray-700">Start Chat</Button>
            </div>
            
            <div className="bg-black/50 rounded-xl border border-gray-800 p-6 hover:border-yellow-500 transition-all duration-300">
              <Video className="h-8 w-8 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Video Tutorial</h3>
              <p className="text-gray-300 mb-4">Watch our tutorial videos to learn how to use CareerFlow.</p>
              <Link to="/help">
                <Button variant="outline" className="border-gray-700">View Tutorials</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-12 animate-fade-in">
            What Users Say About Our Support
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in animate-delay-100">
            {[
              {
                quote: "The support team responded within hours and resolved my issue immediately. Excellent service!",
                author: "Sarah J., Marketing Specialist"
              },
              {
                quote: "I was struggling with tracking my applications until I watched their tutorial videos. Now I'm a pro!",
                author: "Michael T., Software Engineer"
              },
              {
                quote: "Their knowledge base answered all my questions. Very thorough documentation.",
                author: "Rachel P., UX Designer"
              },
              {
                quote: "The live chat support helped me set up my account perfectly. Very friendly and patient.",
                author: "David K., Business Analyst"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-900/30 rounded-xl border border-gray-800 p-6">
                <svg className="h-8 w-8 text-gray-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
                </svg>
                <p className="text-gray-300 italic mb-4">{testimonial.quote}</p>
                <p className="text-blue-400 font-medium">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 px-6 sm:px-10 bg-gradient-to-t from-blue-900/20 to-transparent text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Still Need Help?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our dedicated support team is ready to assist you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto">Contact Support</Button>
            </Link>
            <Link to="/help">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-gray-700">
                Browse Help Center
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Support;
