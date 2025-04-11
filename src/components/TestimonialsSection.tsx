
import React from 'react';

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
  return (
    <section className="py-20 px-6 sm:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Users Are Saying
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of job seekers who have streamlined their job search process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="bg-gray-50 p-6 rounded-xl border border-gray-100 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                </div>
              </div>
              <p className="italic text-gray-700">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
