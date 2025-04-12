
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const PageHeader = ({ title, subtitle, centered = true }: PageHeaderProps) => {
  return (
    <div className={`py-16 px-6 sm:px-10 ${centered ? 'text-center' : ''}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in animate-delay-100">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
