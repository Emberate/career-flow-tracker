
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Apply dark mode class to body for homepage
    document.documentElement.classList.add('dark');
    
    // Welcome toast for first-time visitors
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (!hasVisited) {
      setTimeout(() => {
        toast({
          title: "Welcome to ProspectPath",
          description: "Explore our platform designed to boost your career journey!",
          duration: 5000,
        });
        localStorage.setItem('hasVisitedBefore', 'true');
      }, 1500);
    }
    
    // Initialize animations
    const initAnimations = () => {
      document.body.classList.add('animations-ready');
    };
    
    initAnimations();
    
    return () => {
      // Remove dark mode when leaving homepage
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('animations-ready');
    };
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col bg-black overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
