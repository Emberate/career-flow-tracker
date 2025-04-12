
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const testimonials = [
  {
    quote: "This app has completely transformed my job search. I'm more organized and confident than ever.",
    name: "Sarah Johnson",
    title: "Marketing Specialist",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    quote: "I landed my dream job by staying organized with this tracker. It's simple yet powerful.",
    name: "Michael Chen",
    title: "Software Engineer",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    quote: "The best job tracking tool I've found. It helped me manage multiple applications without stress.",
    name: "Alex Rodriguez",
    title: "Product Manager",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  }
];

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, { threshold: 0.1 });
    
    const testimonialElements = document.querySelectorAll('.testimonial-card');
    testimonialElements.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-8');
      observer.observe(el);
    });
    
    return () => {
      testimonialElements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <section className="py-20 px-6 sm:px-10 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Animated background elements */}
        <div className="absolute right-0 top-1/2 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute left-1/4 bottom-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            What Users Are <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Saying</span>
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of job seekers who have streamlined their job search process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={testimonialsRef}>
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="testimonial-card glass-card p-6 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-500"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full ring-2 ring-gray-800 hover:ring-blue-500 transition-all duration-300"
                />
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.title}</p>
                </div>
              </div>
              <p className="italic text-gray-300">"{testimonial.quote}"</p>
              
              {/* Animated quote icons */}
              <div className="absolute top-4 right-4 text-gray-700 opacity-30 text-4xl">"</div>
              <div className="absolute bottom-4 left-4 text-gray-700 opacity-30 text-4xl">"</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
