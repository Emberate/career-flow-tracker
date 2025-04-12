
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { User, Settings, Shield, CreditCard } from 'lucide-react';

const Profile = () => {
  const { user, isAuthenticated, updateUserProfile, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isEditing, setIsEditing] = useState(false);

  // If user is not authenticated, redirect to login
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSaveProfile = () => {
    updateUserProfile({ name, email });
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
  };

  const handleDeleteAccount = () => {
    // In a real app, we would make a server request
    // For demo purposes, just log the user out
    toast({
      title: "Account deleted",
      description: "Your account has been deleted successfully.",
    });
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Account</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Manage your personal information and how it appears on your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Enter your name" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter your email" 
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-gray-500">Name</Label>
                        <p className="text-lg">{user.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Email</Label>
                        <p className="text-lg">{user.email}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Account Type</Label>
                      <p className="text-lg capitalize">{user.provider || 'Email'}</p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">Notifications</h3>
                  <div className="text-sm text-gray-500 mb-4">
                    Configure how you receive notifications and updates.
                  </div>
                  <Button variant="outline">Manage Notifications</Button>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">Connected Accounts</h3>
                  <div className="text-sm text-gray-500 mb-4">
                    Connect your account with social networks and job platforms.
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="text-xs">Connect LinkedIn</Button>
                    <Button variant="outline" className="text-xs">Connect Indeed</Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                  <div className="text-sm text-gray-500 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </div>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and account security.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">Change Password</h3>
                  <div className="text-sm text-gray-500 mb-4">
                    Update your password to keep your account secure.
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                  <div className="text-sm text-gray-500 mb-4">
                    Add an extra layer of security to your account.
                  </div>
                  <Button variant="outline">Set Up 2FA</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Manage your subscription and payment methods.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">Current Plan</h3>
                  <p className="text-lg font-semibold">Free Plan</p>
                  <div className="text-sm text-gray-500 mb-4">
                    You are currently on the free plan.
                  </div>
                  <Button>Upgrade to Premium</Button>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Payment Methods</h3>
                  <div className="text-sm text-gray-500 mb-4">
                    Add or update your payment information.
                  </div>
                  <Button variant="outline">Add Payment Method</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
