'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showBallDropdown, setShowBallDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Trigger ball dropdown animation after component mounts
    const timer = setTimeout(() => {
      setShowBallDropdown(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      if (data.user) {
        console.log('Login successful, redirecting to dashboard.');
        router.push('/dashboard');
      }
    } catch (error: unknown) {
      console.error('Login catch error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.23, 1, 0.32, 1]
        }}
        className="bg-white p-10 rounded-3xl w-96 border border-gray-100 shadow-lg"
      >
        {/* Enhanced Decorative Ball with Dropdown Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            y: showBallDropdown ? 40 : 0,
            opacity: showBallDropdown ? 0 : 1
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut"
          }}
          className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg"
        />

        {/* Ball Dropdown Trail */}
        <AnimatePresence>
          {showBallDropdown && (
            <>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 20, opacity: 0.6 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute -top-1 -right-2.5 w-1 bg-blue-400/50 rounded-full"
              />
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 12, opacity: 0.3 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="absolute -top-1 -right-2.5 w-0.5 bg-blue-300/30 rounded-full"
              />
            </>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="text-4xl mb-4"
          >
            👋
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-gray-800 mb-2"
          >
            Welcome Back
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-500 text-sm"
          >
            Sign in to continue your journey
          </motion.p>
        </motion.div>

        <form onSubmit={handleLogin} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <div className="relative">
              <motion.input
                whileFocus={{
                  boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                  borderColor: "#3b82f6"
                }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-xl border border-gray-200 px-4 py-3 pl-11 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700 transition-all bg-white"
                placeholder="Enter your email"
                required
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <motion.svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{
                    color: email ? '#10b981' : '#9ca3af'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </motion.svg>
              </div>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: email ? 1 : 0,
                    opacity: email ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-2"
          >
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <div className="relative">
              <motion.input
                whileFocus={{
                  boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)",
                  borderColor: "#8b5cf6"
                }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-xl border border-gray-200 px-4 py-3 pl-11 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-gray-700 transition-all bg-white"
                placeholder="Enter your password"
                required
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <motion.svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{
                    color: password ? '#10b981' : '#9ca3af'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </motion.svg>
              </div>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3].map((dot) => (
                    <motion.div
                      key={dot}
                      initial={{ scale: 0 }}
                      animate={{
                        scale: password.length >= dot * 2 ? 1 : 0.5,
                        backgroundColor: password.length >= dot * 2 ? '#10b981' : '#d1d5db'
                      }}
                      transition={{ duration: 0.3, delay: dot * 0.1 }}
                      className="w-1.5 h-1.5 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: password.length > 0 ? 1 : 0 }}
              className="text-xs text-gray-500 mt-1 text-right"
            >
              {password.length > 0 && (
                <span className={password.length >= 6 ? 'text-green-600' : 'text-yellow-600'}>
                  {password.length >= 6 ? '' : '⚠ Should be at least 6 characters'}
                </span>
              )}
            </motion.p>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl border border-red-200"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{
              scale: 1.03,
              backgroundColor: "#4f46e5",
              boxShadow: "0 10px 30px -10px rgba(99, 102, 241, 0.5)"
            }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3.5 px-4 rounded-xl font-semibold disabled:opacity-50 transition-all relative overflow-hidden cursor-pointer"
          >
            <motion.span
              animate={loading ? { opacity: [1, 0.7, 1] } : { opacity: 1 }}
              transition={loading ? { duration: 1, repeat: Infinity } : {}}
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.span>
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <motion.p
            className="text-sm text-gray-600"
          >
           Don&apos;t have an account?{' '}
            <motion.a
              whileHover={{ color: "#7c3aed" }}
              href="/auth/signup"
              className="text-blue-600 font-semibold underline-offset-4 hover:underline transition-all"
            >
              Sign up
            </motion.a>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}