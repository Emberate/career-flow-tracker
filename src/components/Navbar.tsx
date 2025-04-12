
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';
import { useIsMobile } from '../hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 dark:border-gray-800 bg-white dark:bg-black/90 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">
          CareerFlow
        </Link>
        
        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            
            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white dark:bg-black border-b dark:border-gray-800 py-4 px-4 md:hidden">
                <nav>
                  <ul className="flex flex-col space-y-4">
                    <li>
                      <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary block py-2"
                        onClick={() => setIsMenuOpen(false)}>
                        Home
                      </Link>
                    </li>
                    {isAuthenticated ? (
                      <>
                        <li>
                          <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-primary block py-2"
                            onClick={() => setIsMenuOpen(false)}>
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link to="/profile" className="text-gray-600 dark:text-gray-300 hover:text-primary block py-2"
                            onClick={() => setIsMenuOpen(false)}>
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Button onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }} variant="ghost" className="w-full justify-start px-0">
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                          </Button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                            <Button variant="outline" className="w-full">Log In</Button>
                          </Link>
                        </li>
                        <li>
                          <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                            <Button className="w-full">Sign Up</Button>
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
              </div>
            )}
          </>
        ) : (
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                  Home
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary dark:bg-gray-800 text-white">
                            {user?.name?.charAt(0).toUpperCase()}
                          </div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 dark:bg-gray-900">
                        <div className="flex items-center justify-start gap-2 p-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary dark:bg-gray-800 text-white">
                            {user?.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col space-y-1 leading-none">
                            <p className="font-medium dark:text-white">{user?.name}</p>
                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                          </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/profile" className="flex items-center cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            <span>My Profile</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/profile" className="flex items-center cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout} className="cursor-pointer">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">
                      <Button variant="outline" className="dark:bg-transparent dark:text-white dark:border-gray-700 dark:hover:bg-gray-800">Log In</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup">
                      <Button className="dark:bg-white dark:text-black dark:hover:bg-gray-200">Sign Up</Button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
