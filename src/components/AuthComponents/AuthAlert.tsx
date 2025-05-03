
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const AuthAlert = () => {
  return (
    <Alert className="mb-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Demo Mode</AlertTitle>
      <AlertDescription>
        Click the button below to access the dashboard with demo credentials.
        No real authentication required!
      </AlertDescription>
    </Alert>
  );
};

export default AuthAlert;
