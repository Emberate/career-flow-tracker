
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '../hooks/use-mobile';
import { Briefcase, Users2, BarChart3, Star, ArrowRight, Shield } from 'lucide-react';

const HeroSection = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="relative min-h-screen py-20 px-6 sm:px-10 bg-black text-white overflow-hidden flex items-center">
      {/* Enhanced background effects with more distinctive gradients */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/30 to-pink-500/30 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full blur-[100px] animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-gradient-to-l from-pink-500/20 to-rose-500/20 rounded-full blur-[80px] animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Elegant heading with animated gradient */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8">
            Your <span className="italic">Career</span> Journey <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-shift">
              Starts Here
            </span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Track applications, ace interviews, and land your dream job with our
            <span className="text-blue-400"> intelligent </span>
            career management platform.
          </p>
          
          {/* Fancy badge with stars */}
          <div className="inline-flex items-center px-4 py-1.5 bg-blue-900/30 rounded-full backdrop-blur-sm border border-blue-500/20 mt-6 animate-fade-in animate-delay-300">
            <Star className="h-4 w-4 text-yellow-400 mr-2" />
            <span className="text-sm font-medium text-blue-200">Trusted by over 10,000 job seekers</span>
            <Star className="h-4 w-4 text-yellow-400 ml-2" />
          </div>
          
          {/* Stats section with improved design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 mb-12">
            <div className="glass-card p-6 rounded-xl transform hover:scale-105 transition-all duration-300 border border-white/5 hover:border-blue-500/30 group">
              <div className="text-blue-400 mb-4 transform group-hover:scale-110 transition-all duration-300">
                <Briefcase className="w-10 h-10 mx-auto" />
              </div>
              <h3 className="text-3xl font-bold mb-2 group-hover:text-blue-300 transition-colors">10k+</h3>
              <p className="text-gray-400">Active Job Seekers</p>
            </div>
            <div className="glass-card p-6 rounded-xl transform hover:scale-105 transition-all duration-300 border border-white/5 hover:border-purple-500/30 group">
              <div className="text-purple-400 mb-4 transform group-hover:scale-110 transition-all duration-300">
                <Users2 className="w-10 h-10 mx-auto" />
              </div>
              <h3 className="text-3xl font-bold mb-2 group-hover:text-purple-300 transition-colors">500+</h3>
              <p className="text-gray-400">Partner Companies</p>
            </div>
            <div className="glass-card p-6 rounded-xl transform hover:scale-105 transition-all duration-300 border border-white/5 hover:border-pink-500/30 group">
              <div className="text-pink-400 mb-4 transform group-hover:scale-110 transition-all duration-300">
                <BarChart3 className="w-10 h-10 mx-auto" />
              </div>
              <h3 className="text-3xl font-bold mb-2 group-hover:text-pink-300 transition-colors">85%</h3>
              <p className="text-gray-400">Success Rate</p>
            </div>
          </div>

          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 animate-fade-in animate-delay-200">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_8px_30px_rgb(59,130,246,0.3)] h-14 px-8 rounded-xl group">
                <span className="mr-2">Get Started Free</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 h-14 px-8 rounded-xl">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Elegant preview section with improved styling - Removed "Explore Features" and down arrow */}
        <div className={`mt-16 relative transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative mx-auto overflow-hidden rounded-2xl shadow-2xl max-w-5xl transition-all duration-500 hover:shadow-[0_20px_80px_rgba(59,130,246,0.3)] border border-white/10">
            <div className="bg-gray-900/90 backdrop-blur-md rounded-t-2xl p-3 border-b border-white/10">
              <div className="flex space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="glass-card p-8 bg-gray-900/70 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/60 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 group">
                  <div className="flex items-center mb-4">
                    <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-3 flex items-center justify-center">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <div className="h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded w-32"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-700/60 rounded w-full"></div>
                    <div className="h-4 bg-gray-700/60 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-700/60 rounded w-4/6"></div>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-500/20 mr-2"></div>
                    <div className="h-3 bg-gray-700/60 rounded w-20"></div>
                  </div>
                </div>
                <div className="bg-gray-800/60 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 group">
                  <div className="flex items-center mb-4">
                    <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-3 flex items-center justify-center">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <div className="h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded w-32"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-700/60 rounded w-full"></div>
                    <div className="h-4 bg-gray-700/60 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700/60 rounded w-5/6"></div>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="h-8 w-8 rounded-full bg-purple-500/20 mr-2"></div>
                    <div className="h-3 bg-gray-700/60 rounded w-20"></div>
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
