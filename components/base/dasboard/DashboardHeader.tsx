'use client'

import { Settings } from 'lucide-react'

export default function DashboardHeader() {
    return (
        <div className="flex flex-col items-center mb-12">
            <div className="flex items-center gap-3 mb-4">
                <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>
                <h1 className="text-3xl font-bold text-gray-900">Trust Bridge</h1>
                <Settings className="w-7 h-7 text-gray-500" />
            </div>
            <p className="text-gray-600 text-base">Get started with your new Trust Bridge Space!</p>
        </div>
    )
}
