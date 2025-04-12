
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    // Apply dark mode class to body for homepage
    document.documentElement.classList.add('dark');
    
    // Initialize animations
    const initAnimations = () => {
      // Add any global animation initialization here if needed
      document.body.classList.add('animations-ready');
    };
    
    initAnimations();
    
    return () => {
      // Remove dark mode when leaving homepage
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('animations-ready');
    };
  }, [isAuthenticated, navigate]);

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
