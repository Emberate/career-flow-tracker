
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

const PageLayout = ({ children, title, className = '' }: PageLayoutProps) => {
  useEffect(() => {
    // Set page title
    document.title = `${title} | CareerFlow`;
    
    // Apply dark mode class to body
    document.documentElement.classList.add('dark');
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    return () => {
      // No need to remove dark mode as all pages use it
    };
  }, [title]);

  return (
    <div className="min-h-screen flex flex-col bg-black overflow-x-hidden">
      <Navbar />
      <main className={`flex-grow ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
