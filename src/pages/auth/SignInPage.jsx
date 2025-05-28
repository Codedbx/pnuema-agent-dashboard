import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, Plane } from 'lucide-react';

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear validation errors for this field when user types
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear general error when user types
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});
    
    // Basic client-side validation
    let hasErrors = false;
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      hasErrors = true;
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
      hasErrors = true;
    }
    
    if (hasErrors) {
      setValidationErrors(errors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      console.log('Login attempt:', formData.email);
      setIsLoading(false);
      // Handle success/error states here
    }, 2000);
  };

  const handleGoogleLogin = () => {
    // Google OAuth implementation would go here
    console.log('Google login clicked');
  };

  const handleFacebookLogin = () => {
    // Facebook OAuth implementation would go here
    console.log('Facebook login clicked');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <img src="/icons/logo.png" className='absolute top-[66px] left-[80px] w-[143.02879333496094px] h-[143.02879333496094px] z-50' alt="logo" />
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/auth-bg.jpg')`
        }}
      /> 
      
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-white/70" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div 
          className="w-full max-w-[590px] h-[588px] rounded-3xl"
          style={{
            animation: 'fadeInUp 0.6s ease-out forwards'
          }}
        >
          {/* Form Container */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h2 className="text-4xl font-bold leading-[46px] text-gray-900 text-center mb-8">
              Sign in with email
            </h2>

            {/* General Error */}
            {error && (
              <div className="mb-6 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <div className="relative">
                  <img src="/icons/user.svg" className='absolute left-3 top-1/2 transform -translate-y-1/2 h-8 w-8' alt="user" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className={`w-full pl-13 h-12 placeholder:text-[#1C1C1C99] placeholder:font-normal placeholder:text-base leading-[18px] border border-gray-300 bg-[#1C1C1C0D] rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${validationErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-orange-500 focus:ring-orange-500'}`}
                    required
                  />
                </div>
                {validationErrors.email && (
                  <p className="text-sm text-red-500">{validationErrors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="relative">
                  <img src="/icons/key.svg" className='absolute left-3 top-1/2 transform -translate-y-1/2 h-8 w-8' alt="user" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`w-full pl-13 h-12 placeholder:text-[#1C1C1C99] placeholder:font-normal placeholder:text-base leading-[18px] border border-gray-300 bg-[#1C1C1C0D] rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${validationErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-orange-500 focus:ring-orange-500'}`}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1C1C1C99] hover:text-[#1C1C1C99]/80"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff className="w-8 h-8" /> : <Eye className=" w-8 h-8" />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-sm text-red-500">{validationErrors.password}</p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a 
                  href="/forgot-password" 
                  className="text-base leading-[18px] text-[#1C1C1C] hover:text-[#1C1C1C]/80 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                onClick={handleSubmit}
                className="w-full h-12 bg-[#FF7400] hover:bg-[#FF7400]/80 disabled:opacity-50 text-white font-medium rounded-md transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent text-lg font-semibold leading-[24px] rounded-full animate-spin mr-2" />
                    Signing in...
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </div>

            {/* Signup Link */}
            <div className="text-center mt-6">
              <span className="text-gray-600 text-sm">Don't have an Account? </span>
              <a href="/signup" className="text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors">
                Signup
              </a>
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                aria-label="Sign in with Google"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
              
              <button
                type="button"
                onClick={handleFacebookLogin}
                className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                aria-label="Sign in with Facebook"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;