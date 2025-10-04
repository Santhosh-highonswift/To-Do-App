'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const [showBallDropdown, setShowBallDropdown] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
    
    // Trigger ball dropdown animation after component mounts
    const timer = setTimeout(() => {
      setShowBallDropdown(true)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error
      router.push('/auth/login?message=Check your email for verification')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className={`relative bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 border border-white/50 transform transition-all duration-700 ${
        isMounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        
        {/* Enhanced Decorative Elements */}
        <div className={`absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ${
          showBallDropdown ? 'animate-ball-dropdown' : 'animate-bounce'
        }`}></div>
        
        {/* Ball Dropdown Trail */}
        {showBallDropdown && (
          <>
            <div className="absolute -top-8 -right-2.5 w-1 h-4 bg-blue-400/50 animate-trail-extend"></div>
            <div className="absolute -top-12 -right-2.5 w-1 h-2 bg-blue-300/30 animate-trail-extend animation-delay-100"></div>
          </>
        )}
        
        <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-purple-500 rounded-full animate-bounce animation-delay-1000"></div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Join Us
          </h1>
          <p className="text-gray-500 mt-2">Create your account to get started</p>
        </div>
        
        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 transition-all duration-300 transform hover:translate-x-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 pl-11 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700 bg-white/50 backdrop-blur-sm"
                placeholder="Enter your email"
                required
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400 transition-colors duration-300 group-focus-within:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 bg-green-500 rounded-full opacity-0 transition-opacity duration-300" style={{ opacity: email ? 1 : 0 }}></div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 transition-all duration-300 transform hover:translate-x-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 pl-11 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700 bg-white/50 backdrop-blur-sm"
                placeholder="Create a password"
                required
                minLength={6}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400 transition-colors duration-300 group-focus-within:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        password.length >= dot * 2 ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {password.length > 0 && (
                <span className={password.length >= 6 ? 'text-green-600' : 'text-yellow-600'}>
                  {password.length >= 6 ? 'Strong password' : 'Should be at least 6 characters'}
                </span>
              )}
            </p>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-4 transform transition-all duration-300 animate-shake">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-700 text-sm font-medium">{error}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2  "></div>
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <a 
              href="/auth/login" 
              className="text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-300 hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes ball-dropdown {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(20px) scale(0.8);
            opacity: 0.7;
          }
          100% {
            transform: translateY(40px) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes trail-extend {
          0% {
            height: 0;
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            height: 16px;
            opacity: 0;
          }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-ball-dropdown {
          animation: ball-dropdown 1.5s ease-in-out forwards;
        }
        
        .animate-trail-extend {
          animation: trail-extend 1s ease-out forwards;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}