
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
    document.body.style.backgroundColor = '#111';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    return () => {
      // No need to remove dark mode as all pages use it
    };
  }, [title]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden transition-colors duration-200 ease-in-out bg-black text-white">
      <Navbar />
      <main className={`flex-grow ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
