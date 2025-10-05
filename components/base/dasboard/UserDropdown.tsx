'use client'

import { useState, useEffect } from 'react'
import { supabaseClient } from '@/lib/supabase/client'
import { User } from 'lucide-react'

export default function UserDropdown() {
    const supabase = supabaseClient
    const [user, setUser] = useState<any>(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser()
            setUser(data.user)
        }
        getUser()
    }, [supabase])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setUser(null)
    }

    if (!user) {
        return (
            <button
                onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
                className="p-2 hover:bg-gray-100 rounded flex items-center gap-1"
            >
                <User className="w-5 h-5 text-gray-700" />
                <span className="text-sm text-gray-700">Login</span>
            </button>
        )
    }

    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)} className="p-2 hover:bg-gray-100 rounded flex items-center gap-1">
                <User className="w-5 h-5 text-gray-700" />
                <span className="text-sm text-gray-700">{user.email}</span>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-md text-sm z-50">
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Settings</button>
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                        Log out
                    </button>
                </div>
            )}
        </div>
    )
}
