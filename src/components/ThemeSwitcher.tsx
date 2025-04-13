
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Palette } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ThemeOption {
  name: string;
  primary: string;
  background: string;
  card: string;
  text: string;
}

const themes: ThemeOption[] = [
  {
    name: 'Light',
    primary: 'bg-blue-500',
    background: 'bg-gray-100',
    card: 'bg-white',
    text: 'text-gray-900'
  },
  {
    name: 'Dark',
    primary: 'bg-blue-600',
    background: 'bg-gray-900',
    card: 'bg-gray-800',
    text: 'text-white'
  },
  {
    name: 'Purple',
    primary: 'bg-purple-600',
    background: 'bg-purple-50',
    card: 'bg-white',
    text: 'text-gray-900'
  },
  {
    name: 'Green',
    primary: 'bg-emerald-600',
    background: 'bg-emerald-50',
    card: 'bg-white',
    text: 'text-gray-900'
  },
  {
    name: 'Blue',
    primary: 'bg-indigo-600',
    background: 'bg-indigo-50',
    card: 'bg-white',
    text: 'text-gray-900'
  }
];

const ThemeSwitcher = () => {
  const { toast } = useToast();
  const [currentTheme, setCurrentTheme] = useState<string>('Light');
  
  useEffect(() => {
    // Load saved theme preference from localStorage
    const savedTheme = localStorage.getItem('dashboardTheme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);
  
  const applyTheme = (themeName: string) => {
    const theme = themes.find(t => t.name === themeName);
    if (!theme) return;
    
    const root = document.documentElement;
    const dashboardElement = document.getElementById('dashboard-container');
    
    if (dashboardElement) {
      if (themeName === 'Dark') {
        dashboardElement.classList.remove('bg-gray-50', 'bg-purple-50', 'bg-emerald-50', 'bg-indigo-50');
        dashboardElement.classList.add('bg-gray-900');
        document.querySelectorAll('.dashboard-card').forEach(card => {
          card.classList.remove('bg-white');
          card.classList.add('bg-gray-800', 'text-white', 'border-gray-700');
        });
        document.querySelectorAll('.dashboard-text').forEach(text => {
          text.classList.remove('text-gray-900', 'text-gray-600');
          text.classList.add('text-white', 'text-gray-300');
        });
      } else {
        // Remove dark theme classes
        dashboardElement.classList.remove('bg-gray-900');
        if (themeName === 'Purple') {
          dashboardElement.classList.remove('bg-gray-50', 'bg-emerald-50', 'bg-indigo-50');
          dashboardElement.classList.add('bg-purple-50');
        } else if (themeName === 'Green') {
          dashboardElement.classList.remove('bg-gray-50', 'bg-purple-50', 'bg-indigo-50');
          dashboardElement.classList.add('bg-emerald-50');
        } else if (themeName === 'Blue') {
          dashboardElement.classList.remove('bg-gray-50', 'bg-purple-50', 'bg-emerald-50');
          dashboardElement.classList.add('bg-indigo-50');
        } else {
          dashboardElement.classList.remove('bg-purple-50', 'bg-emerald-50', 'bg-indigo-50');
          dashboardElement.classList.add('bg-gray-50');
        }
        
        document.querySelectorAll('.dashboard-card').forEach(card => {
          card.classList.remove('bg-gray-800', 'text-white', 'border-gray-700');
          card.classList.add('bg-white');
        });
        
        document.querySelectorAll('.dashboard-text').forEach(text => {
          text.classList.remove('text-white', 'text-gray-300');
          text.classList.add('text-gray-900');
        });
      }
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('dashboardTheme', themeName);
  };
  
  const changeTheme = (themeName: string) => {
    setCurrentTheme(themeName);
    applyTheme(themeName);
    toast({
      title: "Theme updated",
      description: `Dashboard theme has been changed to ${themeName}.`,
    });
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          <Palette size={16} className="mr-2" />
          Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Select Theme</h4>
          <div className="grid grid-cols-2 gap-2">
            {themes.map((theme) => (
              <Button
                key={theme.name}
                variant={currentTheme === theme.name ? "default" : "outline"}
                className="h-8 justify-start"
                onClick={() => changeTheme(theme.name)}
              >
                <div className={`w-4 h-4 rounded-full mr-2 ${theme.primary}`}></div>
                {theme.name}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeSwitcher;
