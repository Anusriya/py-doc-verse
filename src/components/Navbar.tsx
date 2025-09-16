import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import IconPng from '../../images/Icon.png';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: 'Help', path: '/help' },
    { name: 'Docs', path: '/docs' },
    { name: 'Community', path: '/community' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Try Now', path: '/try-now' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav 
      className="sticky top-0 z-50 glass border-b border-glass-border/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src={IconPng}
              alt="PyAIStatus logo"
              className="h-8 w-8 rounded-xl object-cover"
            />
            <span className="text-xl font-bold text-gradient">PyAIStatus</span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-glass-light/20"
              >
                <span className={`relative z-10 ${
                  isActive(item.path) 
                    ? 'text-primary font-medium' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}>
                  {item.name}
                </span>
                {isActive(item.path) && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-primary rounded-lg opacity-10"
                    layoutId="activeTab"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side - Theme toggle and auth buttons */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 rounded-xl glass-button"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </motion.div>
            </Button>

            {/* Auth Buttons */}
            <Link to="/login">
              <Button variant="ghost" size="sm" className="glass-button">
                Log In
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="gradient-primary text-primary-foreground font-medium hover:scale-105 transition-transform duration-300">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;