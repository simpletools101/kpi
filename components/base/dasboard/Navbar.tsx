'use client'

import SearchBar from './SearchBar'
import UserDropdown from './UserDropdown'
import { Bell, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import UserAccountItem from '../user-account'
import { supabaseClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { UserMetadata } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = supabaseClient

export default function Navbar() {
    const [userName, setUserName] = useState<string>('KPI')
    const [userEmail, setUserEmail] = useState<string>('KPI')
    const [userImage, setUserImage] = useState<string>('')
    const [user, setUser] = useState<UserMetadata | null>(null)
    const router = useRouter()

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
        <nav className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex items-center justify-between">
                {/* Left Section */}
                <div className="flex items-center gap-8">
                    <div className="bg-gray-900 text-white px-3 py-2 text-sm font-medium rounded">trust</div>
                    <div className="flex items-center gap-6">
                        {['Dashboard', 'Projects', 'Recently Viewed', 'Filters'].map((item) => (
                            <button key={item} className="text-sm font-medium text-gray-600 hover:text-gray-900">
                                {item}
                            </button>
                        ))}
                        <button className="px-4 py-1.5 text-sm font-medium text-gray-900 border-2 border-green-500 rounded-full hover:bg-green-50">
                            Tutorial Guide
                        </button>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    <SearchBar />
                    <button className="p-2 hover:bg-gray-100 rounded">
                        <Bell className="w-5 h-5 text-gray-700" />
                    </button>
                    <UserAccountItem
                        userEmail={userEmail}
                        userImageSource={userImage}
                        userName={userName}
                        signOutUser={onWillSignOutUser}
                    />
                    <button className="p-2 hover:bg-gray-100 rounded">
                        <Settings className="w-5 h-5 text-gray-700" />
                    </button>
                    <Button className="bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800">
                        Upgrade
                    </Button>
                </div>
            </div>
        </nav>
    )
}
