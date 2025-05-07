
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Palette } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface ThemeOption {
  name: string;
  primary: string;
  background: string;
  card: string;
  text: string;
  gradient?: string;
}

const themes: ThemeOption[] = [
  {
    name: 'Light',
    primary: 'bg-blue-500',
    background: 'bg-gray-100',
    card: 'bg-white',
    text: 'text-gray-900',
    gradient: 'from-blue-50 to-indigo-50'
  },
  {
    name: 'Dark',
    primary: 'bg-blue-600',
    background: 'bg-gray-900',
    card: 'bg-gray-800',
    text: 'text-white',
    gradient: 'from-gray-800 to-gray-900'
  },
  {
    name: 'Black',
    primary: 'bg-gray-800',
    background: 'bg-black',
    card: 'bg-gray-900',
    text: 'text-white',
    gradient: 'from-black to-gray-900'
  },
  {
    name: 'Purple',
    primary: 'bg-purple-600',
    background: 'bg-purple-50',
    card: 'bg-white',
    text: 'text-gray-900',
    gradient: 'from-purple-50 to-indigo-50'
  },
  {
    name: 'Green',
    primary: 'bg-emerald-600',
    background: 'bg-emerald-50',
    card: 'bg-white',
    text: 'text-gray-900',
    gradient: 'from-emerald-50 to-teal-50'
  },
  {
    name: 'Blue',
    primary: 'bg-indigo-600',
    background: 'bg-indigo-50',
    card: 'bg-white',
    text: 'text-gray-900',
    gradient: 'from-blue-50 to-indigo-50'
  }
];

const ThemeSwitcher = () => {
  const { toast } = useToast();
  const [currentTheme, setCurrentTheme] = useState<string>('Black');
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Load saved theme preference from localStorage
    const savedTheme = localStorage.getItem('dashboardTheme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Default to Black theme if no preference is saved
      setCurrentTheme('Black');
      applyTheme('Black');
    }
  }, []);
  
  const applyTheme = (themeName: string) => {
    const theme = themes.find(t => t.name === themeName);
    if (!theme) return;
    
    const root = document.documentElement;
    const dashboardElement = document.getElementById('dashboard-container');
    
    if (dashboardElement) {
      // Remove all theme classes first
      dashboardElement.classList.remove(
        'bg-gray-50', 'bg-gray-900', 'bg-black', 
        'bg-purple-50', 'bg-emerald-50', 'bg-indigo-50',
        'bg-gradient-to-br'
      );
      
      if (themeName === 'Black') {
        dashboardElement.classList.add('bg-black', 'bg-gradient-to-br', 'from-black', 'to-gray-900');
        document.querySelectorAll('.dashboard-card').forEach(card => {
          card.classList.remove('bg-white', 'bg-gray-800');
          card.classList.add('bg-gray-900', 'text-white', 'border-gray-800');
        });
        document.querySelectorAll('.dashboard-text').forEach(text => {
          text.classList.remove('text-gray-900', 'text-gray-600');
          text.classList.add('text-white', 'text-gray-300');
        });
        document.querySelectorAll('.calendar-day').forEach(day => {
          day.classList.add('text-white');
        });
      } else if (themeName === 'Dark') {
        dashboardElement.classList.add('bg-gray-900', 'bg-gradient-to-br', 'from-gray-800', 'to-gray-900');
        document.querySelectorAll('.dashboard-card').forEach(card => {
          card.classList.remove('bg-white', 'bg-gray-900');
          card.classList.add('bg-gray-800', 'text-white', 'border-gray-700');
        });
        document.querySelectorAll('.dashboard-text').forEach(text => {
          text.classList.remove('text-gray-900', 'text-gray-600');
          text.classList.add('text-white', 'text-gray-300');
        });
      } else {
        // Remove dark theme classes
        dashboardElement.classList.remove('bg-gray-900', 'bg-black');
        
        // Apply gradient background based on theme
        if (theme.gradient) {
          dashboardElement.classList.add('bg-gradient-to-br', theme.gradient);
        }
        
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
          card.classList.remove('bg-gray-800', 'bg-gray-900', 'text-white', 'border-gray-700', 'border-gray-800');
          card.classList.add('bg-white', 'backdrop-blur-sm', 'bg-white/80');
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
    setIsOpen(false);
    toast({
      title: "Theme updated",
      description: `Dashboard theme has been changed to ${themeName}.`,
    });
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 opacity-70 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative flex items-center gap-2 text-white">
            <Palette size={16} />
            <span className="hidden sm:inline">Theme</span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0 backdrop-blur-md border border-white/20 bg-gray-900/90">
        <div className="p-4 space-y-3">
          <h4 className="font-medium text-sm text-gray-200 border-b border-white/10 pb-2 mb-2">Select Theme</h4>
          <div className="grid grid-cols-2 gap-2">
            {themes.map((theme) => (
              <button
                key={theme.name}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md transition-all hover:bg-white/10",
                  currentTheme === theme.name ? "bg-white/20 ring-1 ring-white/30" : ""
                )}
                onClick={() => changeTheme(theme.name)}
              >
                <div className={`w-4 h-4 rounded-full ${theme.primary}`}></div>
                <span className="text-sm font-medium text-gray-200">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeSwitcher;
