import React from 'react'
import { Menu } from 'lucide-react'

const SidebarLogo = () => (
    <div className="h-12 px-4 flex items-center border-b border-gray-200 bg-white">
        <Menu className="w-5 h-5 mr-3 text-gray-600" />
        <div className="flex items-center">
            <div className="w-5 h-5 mr-2">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path
                        d="M3 21h18M3 7l9-4 9 4M5 21V9m14 12V9m-7 12V9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <span className="font-semibold text-gray-800">Trust Bridge</span>
        </div>
    </div>
)

export default SidebarLogo
