import React from 'react'
import {
    Home,
    Plus,
    FileText,
    LayoutGrid,
    BarChart3,
    Folder,
    Target,
    Bug,
    FileSpreadsheet,
    Settings,
    User,
    HelpCircle,
    LogOut,
    Menu,
} from 'lucide-react'
import SidebarLogo from './SidebarLogo'
import SidebarFooter from './SidebarFooter'

interface SidebarProps {
    activeNav: string
    setActiveNav: (label: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeNav, setActiveNav }) => {
    const navItems = [
        { icon: Home, label: 'Home' },
        { icon: Plus, label: 'Add Issue' },
        { icon: FileText, label: 'Issues' },
        { icon: LayoutGrid, label: 'Board' },
        { icon: BarChart3, label: 'Gantt Chart' },
        { icon: FileText, label: 'Documents' },
        { icon: Folder, label: 'Files' },
        { icon: Target, label: 'KPI Management' },
        { icon: Bug, label: 'Bug Management' },
        { icon: FileSpreadsheet, label: 'Daily Reports' },
        { icon: Settings, label: 'Project Settings' },
    ]

    return (
        <aside className="w-52 bg-gray-100 border-r border-gray-200 flex flex-col">
            <SidebarLogo />

            {/* Navigation */}
            <nav className="flex-1 py-4 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeNav === item.label
                    return (
                        <button
                            key={item.label}
                            onClick={() => setActiveNav(item.label)}
                            className={`w-full px-4 py-2 flex items-center text-sm transition-colors ${
                                isActive ? 'bg-gray-200 text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-150'
                            }`}
                        >
                            <Icon className="w-4 h-4 mr-3" />
                            {item.label}
                        </button>
                    )
                })}
            </nav>

            {/* Bottom Menu */}
            <div className="border-t border-gray-200 py-2">
                <button className="w-full px-4 py-2 flex items-center text-sm text-gray-700 hover:bg-gray-150">
                    <User className="w-4 h-4 mr-3" />
                    Profile
                </button>
                <button className="w-full px-4 py-2 flex items-center text-sm text-gray-700 hover:bg-gray-150">
                    <HelpCircle className="w-4 h-4 mr-3" />
                    Help & Support
                </button>
                <button className="w-full px-4 py-2 flex items-center text-sm text-gray-700 hover:bg-gray-150">
                    <LogOut className="w-4 h-4 mr-3" />
                    Log out
                </button>
            </div>

            <SidebarFooter />
        </aside>
    )
}

export default Sidebar
