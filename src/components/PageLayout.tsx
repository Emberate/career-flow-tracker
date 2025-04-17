
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

const PageLayout = ({ children, title, description, className = '' }: PageLayoutProps) => {
  useEffect(() => {
    // Update meta tags
    document.title = `${title} | ProspectPath`;
    
    // Update meta description if provided
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    
    if (ogTitle) {
      ogTitle.setAttribute('content', `${title} | ProspectPath`);
    }
    if (ogDescription && description) {
      ogDescription.setAttribute('content', description);
    }
    
    // Apply dark mode class to body
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#111';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    return () => {
      // No need to remove dark mode as all pages use it
    };
  }, [title, description]);

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

