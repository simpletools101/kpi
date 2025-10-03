'use client'

import React, { useState } from 'react'
import { supabaseClient } from '@/lib/supabase/client' // make sure you have this

const VerifyPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [isCodeSent, setIsCodeSent] = useState(false)
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', ''])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSendCode = async () => {
        if (!email) return
        setLoading(true)
        setError(null)

        const { error } = await supabaseClient.auth.signInWithOtp({ email })

        if (error) {
            setError(error.message)
        } else {
            setIsCodeSent(true)
        }

        setLoading(false)
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`)
            if (prevInput) prevInput.focus()
        }
    }

    const handleVerify = async () => {
        const token = verificationCode.join('')
        if (!email || token.length !== 6) return

        setLoading(true)
        setError(null)

        const { error } = await supabaseClient.auth.verifyOtp({
            email,
            token,
            type: 'email'
        })

        if (error) {
            setError(error.message)
        } else {
            setSuccess(true)
        }

        setLoading(false)
    }

    const handleResend = () => {
        setVerificationCode(['', '', '', '', '', ''])
        handleSendCode()
    }

    const handleDigitChange = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return // allow only digits
        const newCode = [...verificationCode]
        newCode[index] = value
        setVerificationCode(newCode)

        if (value && index < verificationCode.length - 1) {
            const nextInput = document.getElementById(`code-${index + 1}`)
            if (nextInput) nextInput.focus()
        }
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
                        {!isCodeSent ? (
                            <>
                                <h1 className="text-4xl font-bold text-gray-900 mb-3">Verify Password</h1>
                                <p className="text-gray-600 mb-8">
                                    Enter your email address to receive a verification code.
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
                                            onChange={handleEmailChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    {/* Send Code Button */}
                                    <button
                                        onClick={handleSendCode}
                                        disabled={loading}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded mb-4 transition-colors disabled:opacity-50"
                                    >
                                        {loading ? 'Sending...' : 'Send Verification Code'}
                                    </button>

                                    {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                                </div>

                                {/* Back to Login Link */}
                                <p className="text-center text-sm text-gray-600 mt-8">
                                    <a href="/login" className="text-gray-900 underline font-medium hover:text-gray-700">
                                        Back to Log In
                                    </a>
                                </p>
                            </>
                        ) : (
                            <>
                                <h1 className="text-4xl font-bold text-gray-900 mb-3">Enter Verification Code</h1>
                                <p className="text-gray-600 mb-2">We've sent a verification code to</p>
                                <p className="text-gray-900 font-medium mb-8">{email}</p>

                                <div>
                                    {/* Verification Code Inputs */}
                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-gray-900 mb-3">
                                            Verification Code*
                                        </label>
                                        <div className="flex gap-3 justify-between">
                                            {verificationCode.map((digit, index) => (
                                                <input
                                                    key={index}
                                                    id={`code-${index}`}
                                                    type="text"
                                                    maxLength={1}
                                                    value={digit}
                                                    onChange={(e) => handleDigitChange(index, e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                                    className="w-14 h-14 text-center text-2xl font-bold border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Verify Button */}
                                    <button
                                        onClick={handleVerify}
                                        disabled={loading}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded mb-4 transition-colors disabled:opacity-50"
                                    >
                                        {loading ? 'Verifying...' : 'Verify'}
                                    </button>

                                    {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                                    {success && <p className="text-green-600 text-sm mt-2">Verification successful!</p>}

                                    {/* Resend Code */}
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600">
                                            Didn't receive the code?{' '}
                                            <button
                                                onClick={handleResend}
                                                className="text-gray-900 underline font-medium hover:text-gray-700"
                                            >
                                                Resend Code
                                            </button>
                                        </p>
                                    </div>
                                </div>

                                {/* Back to Login Link */}
                                <p className="text-center text-sm text-gray-600 mt-8">
                                    <button
                                        onClick={() => setIsCodeSent(false)}
                                        className="text-gray-900 underline font-medium hover:text-gray-700"
                                    >
                                        Change Email
                                    </button>
                                </p>
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

export default VerifyPasswordPage
