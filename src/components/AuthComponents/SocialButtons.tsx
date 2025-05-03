
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Linkedin, Briefcase } from 'lucide-react';

const SocialButtons = () => {
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  return (
    <div className="space-y-3 mb-6">
      <Button 
        type="button" 
        className="w-full bg-[#0077b5] hover:bg-[#0077b5]/90" 
        onClick={() => setSocialLoading('LinkedIn')}
        disabled={!!socialLoading}
      >
        {socialLoading === 'LinkedIn' ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connecting...
          </span>
        ) : (
          <>
            <Linkedin className="mr-2 h-4 w-4" />
            Continue with LinkedIn
          </>
        )}
      </Button>
      
      <Button 
        type="button" 
        className="w-full bg-[#003A9B] hover:bg-[#003A9B]/90" 
        onClick={() => setSocialLoading('Google')}
        disabled={!!socialLoading}
      >
        {socialLoading === 'Google' ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connecting...
          </span>
        ) : (
          <>
            <Briefcase className="mr-2 h-4 w-4" />
            Continue with Google
          </>
        )}
      </Button>
    </div>
  );
};

export default SocialButtons;
