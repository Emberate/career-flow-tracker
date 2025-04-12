
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '../hooks/use-mobile';

const HeroSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-20 px-6 sm:px-10 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative">
        {/* Background gradient effect */}
        <div className="absolute top-[-150px] right-[-100px] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-[-150px] left-[-100px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] -z-10"></div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white animate-fade-in">
          Stay on Top of Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Job Hunt</span>
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in animate-delay-100">
          Track every application, interview, and offer – all in one place.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in animate-delay-200">
          <Link to="/signup">
            <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 dark:bg-white dark:text-black">
              Sign Up Free
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-600 text-white hover:bg-gray-800 dark:border-gray-600 dark:text-white">
              Login
            </Button>
          </Link>
        </div>
        
        <div className="mt-16 animate-fade-in animate-delay-300">
          <div className="relative mx-auto overflow-hidden rounded-xl shadow-2xl max-w-4xl">
            <div className="bg-gray-900 rounded-t-xl p-2">
              <div className="flex space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="glass-card p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <div className="h-8 bg-blue-500 rounded w-32 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <div className="h-8 bg-green-500 rounded w-32 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-4/6"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <div className="h-8 bg-yellow-500 rounded w-32 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
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
      </div>
    </section>
  );
};

export default HeroSection;
