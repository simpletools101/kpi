'use client'

import React, { useEffect, useState } from 'react'
import { Bell, UserCircle, ChevronDown, LogOut } from 'lucide-react'
import { supabaseClient } from '@/lib/supabase/client'
import UserAccountItem from '../user-account'
import { useRouter } from 'next/navigation'

interface UserData {
    email: string
}

const supabase = supabaseClient

const Header: React.FC = () => {
    const router = useRouter()
    const [userName, setUserName] = useState<string>('KPI')
    const [userEmail, setUserEmail] = useState<string>('KPI')
    const [userImage, setUserImage] = useState<string>('')
    const [user, setUser] = useState<UserData | null>(null)

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

    const onWillSignOutUser = async () => {
        await supabaseClient.auth.signOut()
        router.push('/main/auth/login')
    }

    useEffect(() => {
        const onLoad = async () => {
            const {
                data: { user },
            } = await supabaseClient.auth.getUser()

            if (user) {
                const name =
                    user.identities![0]?.identity_data?.full_name ||
                    user.user_metadata?.full_name ||
                    user.user_metadata.fullName ||
                    'KPI'
                const avatar = user.identities![0]?.identity_data?.avatar_url || user.user_metadata?.avatar_url || ''
                setUserName(name)
                setUserImage(avatar)
                setUserEmail(user.email!)
            }
        }

        onLoad()
    }, [])

    return (
        <header className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-6 relative">
            <h1 className="text-lg font-semibold text-gray-800">Project Home</h1>

            <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-full relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                </button>

                {/* User dropdown */}
                <UserAccountItem
                    userEmail={userEmail}
                    userImageSource={userImage}
                    userName={userName}
                    signOutUser={onWillSignOutUser}
                />

                <button className="px-4 py-1.5 bg-gray-900 text-white text-sm rounded hover:bg-gray-800">
                    Invite users
                </button>
            </div>
        </header>
    )
}

export default Header
