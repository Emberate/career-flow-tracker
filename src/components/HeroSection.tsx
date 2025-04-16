
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '../hooks/use-mobile';
import { ChevronDown, Briefcase, Users2, BarChart3 } from 'lucide-react';

const HeroSection = () => {
  const isMobile = useIsMobile();
  
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section className="relative min-h-screen py-20 px-6 sm:px-10 bg-black text-white overflow-hidden flex items-center">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] bg-pink-500/10 rounded-full blur-[80px] animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 animate-fade-in">
            Your Career Journey <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse">
              Starts Here
            </span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-in animate-delay-100">
            Track applications, ace interviews, and land your dream job with our intelligent career management platform.
          </p>
          
          {/* Stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-12">
            <div className="glass-card p-6 rounded-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-blue-400 mb-2">
                <Briefcase className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="text-3xl font-bold mb-2">10k+</h3>
              <p className="text-gray-400">Active Job Seekers</p>
            </div>
            <div className="glass-card p-6 rounded-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-purple-400 mb-2">
                <Users2 className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="text-3xl font-bold mb-2">500+</h3>
              <p className="text-gray-400">Partner Companies</p>
            </div>
            <div className="glass-card p-6 rounded-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-pink-400 mb-2">
                <BarChart3 className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="text-3xl font-bold mb-2">85%</h3>
              <p className="text-gray-400">Success Rate</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in animate-delay-200">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Enhanced preview section */}
        <div className="mt-16 animate-fade-in animate-delay-300">
          <div className="relative mx-auto overflow-hidden rounded-xl shadow-2xl max-w-5xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]">
            <div className="bg-gray-900/80 backdrop-blur-md rounded-t-xl p-3">
              <div className="flex space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="glass-card p-6 bg-gray-900/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded w-32 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-700/50 rounded w-full"></div>
                    <div className="h-4 bg-gray-700/50 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-700/50 rounded w-4/6"></div>
                  </div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded w-32 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-700/50 rounded w-full"></div>
                    <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700/50 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div 
          className="hidden md:flex absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
          onClick={scrollToFeatures}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-400 mb-2">Explore Features</span>
            <ChevronDown className="text-blue-400 h-6 w-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
