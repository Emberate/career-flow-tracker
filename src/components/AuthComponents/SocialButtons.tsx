
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const SocialButtons = () => {
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const { signInWithProvider } = useAuth();
  const { toast } = useToast();

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    if (socialLoading) return; // Prevent multiple clicks
    
    setSocialLoading(provider);
    try {
      console.log(`Attempting to sign in with ${provider}...`);
      await signInWithProvider(provider);
      // No need for toast here as it's handled in AuthContext
    } catch (error: any) {
      console.error(`${provider} login error:`, error);
      
      // Provide more helpful error message specifically for GitHub
      if (provider === 'github') {
        toast({
          title: "GitHub Authentication Failed",
          description: "Please ensure your GitHub OAuth app is correctly configured in Supabase with the proper Client ID and Client Secret from GitHub.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Authentication failed",
          description: `Could not authenticate with ${provider}. Please check your OAuth configuration in Supabase.`,
          variant: "destructive",
        });
      }
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="space-y-3 mb-6">
      <Button 
        type="button" 
        className="w-full bg-white hover:bg-gray-50 text-black border border-gray-300" 
        onClick={() => handleSocialLogin('google')}
        disabled={!!socialLoading}
      >
        {socialLoading === 'google' ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connecting...
          </span>
        ) : (
          <>
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            Continue with Google
          </>
        )}
      </Button>
      
      <Button 
        type="button" 
        className="w-full bg-[#24292F] hover:bg-[#24292F]/90 text-white" 
        onClick={() => handleSocialLogin('github')}
        disabled={!!socialLoading}
      >
        {socialLoading === 'github' ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connecting...
          </span>
        ) : (
          <>
            <Github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </>
        )}
      </Button>
    </div>
  );
};

export default SocialButtons;
