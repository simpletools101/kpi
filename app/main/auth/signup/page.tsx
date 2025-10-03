'use client'
import React, { useState, useEffect } from 'react'
import { Eye, EyeOff, Users, Building2, Phone, Globe, Github } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
// --- REPLACE THESE IMPORTS WITH YOUR ACTUAL AUTH AND ENV FILES ---
import { signUpUser } from '@/lib/supabase/auth/signup'
import { signInWithGoogle, signInWithGitHub } from '@/lib/supabase/auth/signin' // Added signInWithGithub
import { baseURL } from '@/lib/env'
import { supabaseClient } from '@/lib/supabase/client'
// -----------------------------------------------------------------

// --- Constants for Interpolation ---
type UserRole = 'company' | 'individual' | null

export const ALL_COUNTRIES = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo (Congo-Brazzaville)',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czechia (Czech Republic)',
    'Democratic Republic of the Congo',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini (fmr. Swaziland)',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Holy See',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Ivory Coast',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar (formerly Burma)',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'North Macedonia (formerly Macedonia)',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine State',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States of America',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
]

// Dummy check for initial user state
const checkExistingUser = async (router: any) => {
    // This part should handle checking if the user is already logged in
    const {
        data: { user },
    } = await supabaseClient.auth.getUser()
    if (user) {
        router.push('/dashboard')
    }
}
// ------------------------------------

const SignUpPage = () => {
    const router = useRouter()

    // State adapted from the first example
    const [accountType, setAccountType] = useState<UserRole>(null)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [fullName, setFullName] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    // Shared & Role-specific fields
    const [phone, setPhone] = useState<string>('')
    const [country, setCountry] = useState<string>('')
    const [paymentMethod, setPaymentMethod] = useState<string>('Unknown')
    const [socialLinks, setSocialLinks] = useState<string>('')

    useEffect(() => {
        checkExistingUser(router)
    }, [router])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!accountType) {
            toast.info('Select your account type first.', { style: { fontSize: 14, padding: 10 } })
            return
        }

        if (password !== confirmPassword) {
            toast.error("Passwords don't match.", { style: { fontSize: 14, padding: 10 } })
            return
        }

        // Validation (Individual is like the original 'creator')
        if (accountType === 'individual') {
            if (!phone || !country) {
                toast.error('Fill in all required fields for Individuals (Phone, Country).', {
                    style: { fontSize: 14, padding: 10 },
                })
                return
            }
        }

        // Validation (Company is like the original 'brand')
        if (accountType === 'company') {
            if (!phone) {
                toast.error('A phone number is required for Company/Client accounts.', {
                    style: { fontSize: 14, padding: 10 },
                })
                return
            }
        }

        // Sign up attempt
        signUpUser({
            email,
            password,
            fullName,
            role: accountType,
            phone,
            country,
            paymentMethod,
            socialLinks,
        })
            .then((args) => {
                if (args.isErrorTrue) {
                    toast.error('Sign Up Failed', {
                        description: 'Account already exists or credentials are weak.',
                    })
                } else {
                    toast.success('Welcome to Trust Bridge!', {
                        description: `Account created successfully as ${accountType}.`,
                    })
                    router.push(`/auth/verification?email=${encodeURIComponent(email)}`)
                }
            })
            .catch((error) => {
                console.error('Sign up error:', error)
                toast.error('An unexpected error occurred.')
            })
    }

    const handleGoogleSignUp = () => {
        if (!accountType) {
            toast.info('Select your account type first.', { style: { fontSize: 14, padding: 10 } })
            return
        }
        // Redirect to your app's main route after OAuth sign-in
        signInWithGoogle({
            redirectURL: `${baseURL}/dashboard?role=${accountType}`,
        })
    }

    // --- New GitHub Handler ---
    const handleGithubSignUp = () => {
        if (!accountType) {
            toast.info('Select your account type first.', { style: { fontSize: 14, padding: 10 } })
            return
        }
        // Redirect to your app's main route after OAuth sign-in
        signInWithGitHub({
            redirectURL: `${baseURL}/dashboard?role=${accountType}`,
        })
    }
    // --------------------------

    // Updated handleChange to use the new state structure
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        switch (name) {
            case 'fullName':
                setFullName(value)
                break
            case 'email':
                setEmail(value)
                break
            case 'password':
                setPassword(value)
                break
            case 'confirmPassword':
                setConfirmPassword(value)
                break
            case 'phone':
                setPhone(value)
                break
            case 'country':
                setCountry(value)
                break
        }
    }

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
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">Create an Account</h1>
                        <p className="text-gray-600 mb-8">Start connecting with the right people today.</p>

                        <form onSubmit={handleSubmit} className="w-full">
                            {/* Account Type Radio Buttons */}
                            <div className="flex gap-8 mb-6">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="accountType"
                                        value="company"
                                        checked={accountType === 'company'}
                                        onChange={() => setAccountType('company')}
                                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-600"
                                    />
                                    <span className="ml-2 text-sm text-gray-900 flex items-center">
                                        <Building2 size={16} className="mr-1 text-gray-600" /> Company/Client
                                    </span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="accountType"
                                        value="individual"
                                        checked={accountType === 'individual'}
                                        onChange={() => setAccountType('individual')}
                                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-600"
                                    />
                                    <span className="ml-2 text-sm text-gray-900 flex items-center">
                                        <Users size={16} className="mr-1 text-gray-600" /> Individual
                                    </span>
                                </label>
                            </div>

                            <div>
                                {/* Name Field */}
                                <div className="mb-6">
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-900 mb-2">
                                        {accountType === 'company' ? 'Company Name' : 'Full Name'}*
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={fullName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                        required
                                    />
                                </div>

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
                                        required
                                    />
                                </div>

                                {/* Password Field with Toggle */}
                                <div className="mb-6 relative">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                                        Password*
                                    </label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded pr-12 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-[40px] text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>

                                {/* Confirm Password Field with Toggle */}
                                <div className="mb-6 relative">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block text-sm font-medium text-gray-900 mb-2"
                                    >
                                        Confirm Password*
                                    </label>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded pr-12 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-[40px] text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>

                                {/* Shared Phone Field */}
                                {accountType && (
                                    <div className="mb-6">
                                        <label
                                            htmlFor="phone"
                                            className=" text-sm font-medium text-gray-900 mb-2 flex items-center"
                                        >
                                            <Phone size={14} className="mr-1" /> Phone Number*
                                        </label>
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            value={phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                )}

                                {/* Individual-specific field: Country */}
                                {accountType === 'individual' && (
                                    <div className="mb-6">
                                        <label
                                            htmlFor="country"
                                            className=" text-sm font-medium text-gray-900 mb-2 flex items-center"
                                        >
                                            <Globe size={14} className="mr-1" /> Country*
                                        </label>
                                        <select
                                            id="country"
                                            name="country"
                                            value={country}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent appearance-none"
                                            required
                                        >
                                            <option value="" disabled>
                                                Select your Country
                                            </option>
                                            {ALL_COUNTRIES.map((countryName) => (
                                                <option key={countryName} value={countryName}>
                                                    {countryName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={!accountType}
                                    className={`w-full font-medium py-3 px-4 rounded mb-4 transition-colors ${
                                        accountType
                                            ? 'bg-green-600 hover:bg-green-700 text-white'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>

                        {/* Social Sign Up Buttons */}
                        <button
                            type="button"
                            onClick={handleGoogleSignUp}
                            disabled={!accountType}
                            className={`w-full bg-white text-gray-900 font-medium py-3 px-4 rounded border border-gray-300 mb-4 flex items-center justify-center transition-colors ${
                                !accountType ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                            }`}
                        >
                            {/* Google SVG kept for design */}
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
                            Sign up with Google
                        </button>

                        <button
                            type="button"
                            onClick={handleGithubSignUp}
                            disabled={!accountType}
                            className={`w-full bg-gray-900 text-white font-medium py-3 px-4 rounded flex items-center justify-center transition-colors ${
                                !accountType ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                            }`}
                        >
                            {/* Replaced generic SVG with Lucide icon for consistency */}
                            <Github className="w-5 h-5 mr-2" />
                            Sign up with GitHub
                        </button>

                        {/* Log In Link */}
                        <p className="text-center text-sm text-gray-600 mt-8">
                            Already have an account?{' '}
                            <Link
                                href="/main/auth/login"
                                className="text-gray-900 underline font-medium hover:text-gray-700"
                            >
                                Log In
                            </Link>
                        </p>

                        {/* Terms and Privacy added for professionalism */}
                        <p className="text-center text-xs text-gray-500 mt-4">
                            By clicking "Create Account" you agree to the{' '}
                            <Link href="/terms" className="underline hover:text-gray-700">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" className="underline hover:text-gray-700">
                                Privacy Policy
                            </Link>
                            .
                        </p>

                        {/* Footer */}
                        <p className="text-center text-xs text-gray-600 mt-8">© 2025 Trust Bridge</p>
                    </div>
                </div>
            </div>

            {/* Right Section - Image Placeholder (Unchanged) */}
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

export default SignUpPage
