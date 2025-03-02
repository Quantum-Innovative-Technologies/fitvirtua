"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";

const Login: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<"user" | "tailor">("tailor");
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Check if coming from Tailor's Corner
    const from = searchParams.get('from');
    if (from === 'tailors-corner') {
      setActiveTab('tailor');
    }
  }, [searchParams, mounted]);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          userType: activeTab === 'tailor' ? 'tailor' : 'customer'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect based on user type
      if (activeTab === 'tailor') {
        router.push('/dashboard/tailor');
      } else {
        router.push('/dashboard/customer');
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, activeTab, router]);

  const handleGoogleLogin = useCallback(() => {
    // Implement Google authentication
    console.log("Google login clicked");
  }, []);

  const handleSignUp = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          userType: activeTab === 'tailor' ? 'tailor' : 'customer'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Switch to login mode after successful registration
      setIsSignUp(false);
      setErrorMessage("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, confirmPassword, firstName, lastName, activeTab]);

  // Prevent hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl w-full space-y-8 flex gap-8">
        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="fixed top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <i className="fas fa-sun text-yellow-500"></i>
          ) : (
            <i className="fas fa-moon text-gray-700"></i>
          )}
        </button>
        {/* Background Image */}
        <div className="hidden lg:block w-1/2">
          <img
            src="../LoginTailor.jpg"
            alt="Fashion Studio"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        {/* Login Container */}
        <div className="w-full lg:w-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-lg transition-colors">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              FitVirtua
            </h1>
            <p className="text-gray-600 dark:text-gray-300 transition-colors">Your Virtual Fitting Room</p>
          </div>
          {/* Tab Switcher */}
          <div className="flex mb-8 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg transition-colors">
            <button
              onClick={() => setActiveTab("tailor")}
              className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                activeTab === "tailor"
                  ? "bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              } !rounded-button whitespace-nowrap`}
            >
              Tailor Login
            </button>
            <button
              onClick={() => setActiveTab("user")}
              className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                activeTab === "user"
                  ? "bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              } !rounded-button whitespace-nowrap`}
            >
              Customer Login
            </button>
          </div>
          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {errorMessage && (
              <div className="bg-red-50 dark:bg-red-900/50 text-red-500 dark:text-red-300 p-3 rounded-lg text-sm transition-colors">
                {errorMessage}
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
              >
                Email Address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm bg-white/50 dark:bg-gray-700/50 dark:text-white transition-colors"
                  placeholder="Enter your email"
                />
                <i className="fas fa-envelope absolute right-3 top-2.5 text-gray-400 dark:text-gray-500 transition-colors"></i>
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm bg-white/50 dark:bg-gray-700/50 dark:text-white transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors !rounded-button whitespace-nowrap"
                >
                  <i
                    className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded transition-colors"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-200 transition-colors"
                >
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors !rounded-button whitespace-nowrap"
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 !rounded-button whitespace-nowrap transition-all duration-300"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                `Sign in as ${activeTab === "user" ? "Customer" : "Tailor"}`
              )}
            </button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600 transition-colors"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">
                  Or continue with
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors !rounded-button whitespace-nowrap"
            >
              <i className="fab fa-google mr-2"></i>
              Sign in with Google
            </button>
            <div className="text-center text-sm">
              <span className="text-gray-600 dark:text-gray-300 transition-colors">Don't have an account? </span>
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors !rounded-button whitespace-nowrap"
              >
                Sign up
              </button>
            </div>
          </form>
          {/* Sign Up Modal */}
          {isSignUp && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto transition-colors">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Create {activeTab === "tailor" ? "Tailor" : "Customer"}{" "}
                    Account
                  </h2>
                  <button
                    onClick={() => setIsSignUp(false)}
                    className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors !rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <form
                  onSubmit={handleSignUp}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm bg-white/50 dark:bg-gray-700/50 dark:text-white transition-colors"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm bg-white/50 dark:bg-gray-700/50 dark:text-white transition-colors"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="signupEmail"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
                    >
                      Email Address
                    </label>
                    <input
                      id="signupEmail"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm bg-white/50 dark:bg-gray-700/50 dark:text-white transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="signupPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
                    >
                      Password
                    </label>
                    <input
                      id="signupPassword"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm bg-white/50 dark:bg-gray-700/50 dark:text-white transition-colors"
                      placeholder="Create password"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm bg-white/50 dark:bg-gray-700/50 dark:text-white transition-colors"
                      placeholder="Confirm password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 !rounded-button whitespace-nowrap transition-all duration-300"
                  >
                    Create Account
                  </button>
                  <div className="text-center text-sm text-gray-600 dark:text-gray-300 transition-colors">
                    Already have an account?{" "}
                    <button
                      onClick={() => setIsSignUp(false)}
                      className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors !rounded-button whitespace-nowrap"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
