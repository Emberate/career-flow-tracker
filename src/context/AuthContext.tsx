
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Linkedin } from 'lucide-react';

interface User {
  email: string;
  name: string;
  provider?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  loginWithLinkedIn: () => Promise<void>;
  loginWithIndeed: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, we would validate with a server
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const userData = { 
      email: foundUser.email, 
      name: foundUser.name,
      provider: 'email'
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const signup = async (email: string, name: string, password: string) => {
    // In a real app, we would send this to a server
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      throw new Error('User already exists');
    }
    
    const newUser = { email, name, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Log the user in after signup
    const userData = { email, name, provider: 'email' };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const loginWithLinkedIn = async () => {
    // In a real app, this would initiate OAuth flow with LinkedIn
    // For demo purposes, we'll create a mock user
    
    // Generate a random email for the demo
    const randomId = Math.floor(Math.random() * 10000);
    const email = `linkedin_user_${randomId}@example.com`;
    const name = `LinkedIn User ${randomId}`;
    
    // Add user to the users array if they don't exist
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (!users.find((u: any) => u.email === email)) {
      const newUser = { email, name, password: 'linkedin_auth' };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    const userData = { email, name, provider: 'linkedin' };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const loginWithIndeed = async () => {
    // In a real app, this would initiate OAuth flow with Indeed
    // For demo purposes, we'll create a mock user
    
    // Generate a random email for the demo
    const randomId = Math.floor(Math.random() * 10000);
    const email = `indeed_user_${randomId}@example.com`;
    const name = `Indeed User ${randomId}`;
    
    // Add user to the users array if they don't exist
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (!users.find((u: any) => u.email === email)) {
      const newUser = { email, name, password: 'indeed_auth' };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    const userData = { email, name, provider: 'indeed' };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      loginWithLinkedIn, 
      loginWithIndeed, 
      logout, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
