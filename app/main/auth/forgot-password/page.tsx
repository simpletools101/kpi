'use client'

import React, { useState } from 'react'
import { supabaseClient } from '@/lib/supabase/client' // <-- make sure you have this

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async () => {
        if (!email) return

        setLoading(true)
        setError(null)

        try {
            const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
                // ^ this should be the page where the user sets their new password
            })

            if (error) {
                setError(error.message)
            } else {
                setIsSubmitted(true)
            }
        } catch (err: any) {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Section - Form */}
            <div className="w-1/2 bg-white flex flex-col">
                {/* Logo */}
                <div className="p-6">
                    <div className="bg-gray-900 text-white px-4 py-2 inline-block text-sm font-medium">trust</div>
                </div>

                {/* Form Container */}
                <div className="flex-1 flex items-center justify-center px-12">
                    <div className="w-full max-w-md">
                        {!isSubmitted ? (
                            <>
                                <h1 className="text-4xl font-bold text-gray-900 mb-3">Forgot Password</h1>
                                <p className="text-gray-600 mb-8">
                                    Enter your email address and we'll send you a link to reset your password.
                                </p>

                                <div>
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
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded mb-4 transition-colors disabled:opacity-50"
                                    >
                                        {loading ? 'Sending...' : 'Send Reset Link'}
                                    </button>

                                    {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                                </div>

                                {/* Back to Login Link */}
                                <p className="text-center text-sm text-gray-600 mt-8">
                                    Remember your password?{' '}
                                    <a
                                        href="/main/auth/login"
                                        className="text-gray-900 underline font-medium hover:text-gray-700"
                                    >
                                        Back to Log In
                                    </a>
                                </p>
                            </>
                        ) : (
                            <>
                                <h1 className="text-4xl font-bold text-gray-900 mb-3">Check Your Email</h1>
                                <p className="text-gray-600 mb-8">
                                    We've sent a password reset link to{' '}
                                    <span className="font-medium text-gray-900">{email}</span>. Please check your inbox
                                    and follow the instructions.
                                </p>

                                <div>
                                    {/* Back to Login Button */}
                                    <a
                                        href="/login"
                                        className="w-full block text-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded mb-4 transition-colors"
                                    >
                                        Back to Log In
                                    </a>

                                    {/* Resend Email */}
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600">
                                            Didn't receive the email?{' '}
                                            <button
                                                onClick={() => setIsSubmitted(false)}
                                                className="text-gray-900 underline font-medium hover:text-gray-700"
                                            >
                                                Resend Email
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}

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

export default ForgotPasswordPage
