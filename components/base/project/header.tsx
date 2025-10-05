'use client'

import React, { useEffect, useState } from 'react'
import { Bell, UserCircle, ChevronDown, LogOut } from 'lucide-react'
import { supabaseClient } from '@/lib/supabase/client'

interface UserData {
    email: string
}

const supabase = supabaseClient;

const Header: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()
            if (user) setUser({ email: user.email ?? 'Unknown user' })
        }
        getUser()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        window.location.href = '/main/auth/login'
    }

    return (
        <header className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-6 relative">
            <h1 className="text-lg font-semibold text-gray-800">Project Home</h1>

            <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-full relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                </button>

                {/* User dropdown */}
                <div className="relative">
                    <button
                        className="p-2 flex items-center gap-1 hover:bg-gray-100 rounded-full"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <UserCircle className="w-5 h-5 text-gray-600" />
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                                {user ? user.email : 'Loading...'}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <LogOut className="w-4 h-4 text-gray-600" />
                                Log out
                            </button>
                        </div>
                    )}
                </div>

                <button className="px-4 py-1.5 bg-gray-900 text-white text-sm rounded hover:bg-gray-800">
                    Invite users
                </button>
            </div>
        </header>
    )
}

export default Header
