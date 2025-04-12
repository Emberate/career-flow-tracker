
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '../hooks/use-mobile';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const isMobile = useIsMobile();
  
  // Smooth scroll function for the "Learn more" button
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section className="py-20 px-6 sm:px-10 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative">
        {/* Animated background gradient effects */}
        <div className="absolute top-[-150px] right-[-100px] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-[-150px] left-[-100px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[50%] left-[30%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '0.7s' }}></div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white animate-fade-in">
          Stay on Top of Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse">Job Hunt</span>
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in animate-delay-100">
          Track every application, interview, and offer – all in one place.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in animate-delay-200">
          <Link to="/signup">
            <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 dark:bg-white dark:text-black transition-transform hover:scale-105">
              Sign Up Free
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-600 text-white hover:bg-gray-800 dark:border-gray-600 dark:text-white transition-transform hover:scale-105">
              Login
            </Button>
          </Link>
        </div>
        
        <div className="mt-16 animate-fade-in animate-delay-300">
          <div className="relative mx-auto overflow-hidden rounded-xl shadow-2xl max-w-4xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <div className="bg-gray-900 rounded-t-xl p-2">
              <div className="flex space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="glass-card p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-750 transition-all duration-300 hover:translate-y-[-2px]">
                  <div className="h-8 bg-blue-500 rounded w-32 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-750 transition-all duration-300 hover:translate-y-[-2px]" style={{ transitionDelay: '0.1s' }}>
                  <div className="h-8 bg-green-500 rounded w-32 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-4/6"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-750 transition-all duration-300 hover:translate-y-[-2px]" style={{ transitionDelay: '0.2s' }}>
                  <div className="h-8 bg-yellow-500 rounded w-32 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-750 transition-all duration-300 hover:translate-y-[-2px]" style={{ transitionDelay: '0.3s' }}>
                  <div className="h-8 bg-red-500 rounded w-32 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating scroll indicator */}
        <div 
          className="hidden md:flex absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
          onClick={scrollToFeatures}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-400 mb-2">Learn more</span>
            <ChevronDown className="text-blue-400 h-6 w-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
