import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate form fields
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      alert('Login successful! Welcome back!');
      
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="mx-auto w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <UserIcon className="h-8 w-8 text-primary-foreground" />
            </motion.div>
            
            <h1 className="text-3xl font-bold text-gradient">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">Sign in to your PyLibHub account</p>
          </div>

          {/* Form */}
          <motion.div
            className="glass-card backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* General Error */}
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl text-sm"
                >
                  {errors.general}
                </motion.div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 glass ${errors.email ? 'border-destructive' : ''}`}
                    placeholder="Enter your email"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                {errors.email && (
                  <motion.p
                    id="email-error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 glass ${errors.password ? 'border-destructive' : ''}`}
                    placeholder="Enter your password"
                    aria-describedby={errors.password ? 'password-error' : undefined}
                  />
                  <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    id="password-error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full gradient-primary text-primary-foreground font-medium h-12 glass-button"
              >
                {isLoading ? (
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </motion.div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-primary hover:text-primary-light font-medium transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;