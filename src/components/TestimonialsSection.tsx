
import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { Star, Quote, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    quote: "This app has completely transformed my job search. I'm more organized and confident than ever. The interview preparation tools helped me land my dream position.",
    name: "Sarah Johnson",
    title: "Marketing Specialist",
    company: "TechGrowth Inc.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    quote: "I landed my dream job by staying organized with this tracker. It's simple yet powerful. The analytics helped me understand where to focus my efforts.",
    name: "Michael Chen",
    title: "Software Engineer",
    company: "CodeWorks",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    quote: "The best job tracking tool I've found. It helped me manage multiple applications without stress. I particularly loved the notification system.",
    name: "Alex Rodriguez",
    title: "Product Manager",
    company: "InnovationLabs",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    quote: "The dashboard analytics gave me insights I never had before about my job search. Within weeks I was getting more interviews and better responses.",
    name: "Priya Sharma",
    title: "Financial Analyst",
    company: "Global Finance",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setVisibleIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setVisibleIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(intervalId);
  }, [isAnimating]);
  
  return (
    <section className="py-20 px-6 sm:px-10 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Animated background elements */}
        <div className="absolute right-0 top-1/2 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute left-1/4 bottom-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-4 py-1 rounded-full mb-4">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">Client Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            What Users Are <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient-shift">Saying</span>
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of job seekers who have streamlined their job search process.
          </p>
        </div>

        {/* Enhanced testimonial carousel */}
        <div className="relative max-w-5xl mx-auto" ref={testimonialsRef}>
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden relative">
            {/* Large quote icon background */}
            <div className="absolute top-4 left-4 text-gray-700/20 z-0">
              <Quote size={120} strokeWidth={1} />
            </div>
            
            <div className="p-8 md:p-12 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-8 flex flex-col justify-center">
                  <div className="relative h-40">
                    {testimonials.map((testimonial, index) => (
                      <div 
                        key={index} 
                        className={`absolute w-full transition-all duration-500 ${
                          index === visibleIndex 
                            ? 'opacity-100 translate-x-0' 
                            : index < visibleIndex 
                              ? 'opacity-0 -translate-x-12' 
                              : 'opacity-0 translate-x-12'
                        }`}
                      >
                        <p className="text-xl italic text-gray-200">"{testimonial.quote}"</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          size={16} 
                          className={`${star <= testimonials[visibleIndex].rating ? 'text-yellow-400' : 'text-gray-600'} fill-current`} 
                        />
                      ))}
                    </div>
                  </div>

                  <div className="relative h-20 mt-4">
                    {testimonials.map((testimonial, index) => (
                      <div 
                        key={index} 
                        className={`absolute w-full transition-all duration-500 ${
                          index === visibleIndex 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-8'
                        }`}
                      >
                        <h4 className="font-semibold text-lg text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">{testimonial.title} • {testimonial.company}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Navigation controls */}
                  <div className="flex space-x-2 mt-6">
                    <button 
                      onClick={prevTestimonial} 
                      disabled={isAnimating}
                      className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors disabled:opacity-50"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={nextTestimonial} 
                      disabled={isAnimating}
                      className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors disabled:opacity-50"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="hidden md:block md:col-span-4">
                  <div className="relative h-full flex items-center justify-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full absolute blur-2xl"></div>
                    
                    <div className="relative">
                      {testimonials.map((testimonial, index) => (
                        <div 
                          key={index} 
                          className={`transition-all duration-500 rounded-xl overflow-hidden ${
                            index === visibleIndex 
                              ? 'opacity-100 scale-100 rotate-0' 
                              : 'opacity-0 scale-95 rotate-6'
                          }`}
                        >
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-32 h-32 object-cover rounded-xl ring-4 ring-white/10"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={`h-2 rounded-full transition-all ${
                  index === visibleIndex ? 'w-8 bg-blue-500' : 'w-2 bg-gray-700'
                }`}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setVisibleIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-16">
          <h3 className="text-xl text-gray-300 mb-6">Ready to join our community of successful job seekers?</h3>
          <Link to="/signup">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 h-auto rounded-xl btn-hover-effect">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
