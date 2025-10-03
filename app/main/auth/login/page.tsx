'use client'

import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react' // Icons for password toggle
import { useRouter } from 'next/navigation'
import { toast } from 'sonner' // Assuming you use sonner for toasts
import {
    signInUser,
    signInWithGoogle,
    signInWithGitHub, 
} from '@/lib/supabase/auth/signin'
import { baseURL } from '@/lib/env'

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    //@ts-ignore
    const showToast = (message, description, type = 'success') => {
        if (type === 'success') {
            toast.success(message, { description: description })
        } else {
            toast.error(message, { description: description })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const result = await signInUser({ email, password })

            if (result.isErrorTrue) {
                showToast('Log In Failed', result.errorMessage || 'Invalid credentials.', 'error')
            } else {
                showToast('Welcome back!', 'Logged in successfully.', 'success')
                // Redirect user after login
                window.location.href = '/main/dashboard'
            }
        } catch (err) {
            console.error('Email sign-in error:', err)
            showToast('Log In Failed', 'Unexpected error occurred.', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setIsLoading(true)
        try {
            // Initiate Google OAuth redirect
            await signInWithGoogle({
                redirectURL: `${baseURL}/main/dashboard`,
            })
            showToast('Google Log-in Initiated', 'Redirecting to Google OAuth...', 'success')
        } catch (err) {
            console.error('Google sign-in error:', err)
            showToast('Google Log-in Failed', 'Please try again.', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    // GitHub login
    const handleGitHubSignIn = async () => {
        setIsLoading(true)
        try {
            // Initiate GitHub OAuth redirect
            await signInWithGitHub({
                // Call the new Supabase utility function
                redirectURL: `${baseURL}/main`,
            })
            showToast('GitHub Log-in Initiated', 'Redirecting to GitHub OAuth...', 'success')
        } catch (err) {
            console.error('GitHub sign-in error:', err)
            showToast('GitHub Log-in Failed', 'Please try again.', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    const isInputDisabled = isLoading // Centralized check

    return (
        <div className="min-h-screen flex">
            {/* Left Section - Form */}
            <div className="w-1/2 bg-white flex flex-col">
                {/* Logo */}
                <div className="p-6">
                    <div className="bg-gray-900 text-white px-4 py-2 inline-block text-sm font-medium">
                        Trust Bridge
                    </div>
                </div>

                {/* Form Container */}
                <div className="flex-1 flex items-center justify-center px-12">
                    <div className="w-full max-w-md">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">Log In</h1>
                        <p className="text-gray-600 mb-8">Access your account to continue.</p>

                        <form onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                                    Email*
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                    required
                                    disabled={isInputDisabled}
                                />
                            </div>

                            {/* Password Field */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                        Password*
                                    </label>
                                    <a
                                        href="/main/auth/forgot-password"
                                        className="text-sm text-gray-900 underline hover:text-gray-700"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>

                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                        required
                                        disabled={isInputDisabled}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        disabled={isInputDisabled}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isInputDisabled}
                                className={`w-full font-medium py-3 px-4 rounded mb-4 transition-colors flex items-center justify-center ${
                                    isInputDisabled
                                        ? 'bg-green-300 text-white cursor-not-allowed'
                                        : 'bg-green-600 hover:bg-green-700 text-white'
                                }`}
                            >
                                {isLoading ? (
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3 text-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ) : null}
                                {isLoading ? 'Logging In...' : 'Log in'}
                            </button>

                            {/* Google Sign In */}
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={isInputDisabled}
                                className={`w-full font-medium py-3 px-4 rounded border border-gray-300 mb-4 flex items-center justify-center transition-colors ${
                                    isInputDisabled
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'bg-white hover:bg-gray-50 text-gray-900'
                                }`}
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Log in with Google
                            </button>

                            {/* GitHub Sign In */}
                            <button
                                type="button"
                                onClick={handleGitHubSignIn}
                                disabled={isInputDisabled}
                                className={`w-full font-medium py-3 px-4 rounded flex items-center justify-center transition-colors ${
                                    isInputDisabled
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                                }`}
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Log in with GitHub
                            </button>
                        </form>

                        {/* Sign Up Link */}
                        <p className="text-center text-sm text-gray-600 mt-8">
                            Don't have an account?{' '}
                            <a
                                href="/main/auth/signup"
                                className="text-gray-900 underline font-medium hover:text-gray-700"
                            >
                                Sign Up
                            </a>
                        </p>

                        {/* Footer */}
                        <p className="text-center text-xs text-gray-600 mt-8">© 2025 Trust Bridge</p>
                    </div>
                </div>
            </div>

            {/* Right Section - Image Placeholder */}
            <div className="w-1/2 bg-gray-200 flex items-center justify-center">
                <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
