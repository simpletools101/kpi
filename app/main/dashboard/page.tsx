'use client'

import React, { useState } from 'react'
import { Search, Plus, ChevronDown, Bell, User, Settings, X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [showNotifications, setShowNotifications] = useState(true)
    const [projects, setProjects] = useState<string[]>([])
    const [showProjects, setShowProjects] = useState(true)

    // dialog state
    const [openDialog, setOpenDialog] = useState(false)
    const [newProject, setNewProject] = useState('')

    // Add new project
    const handleSaveProject = () => {
        if (newProject.trim() !== '') {
            setProjects([...projects, newProject.trim()])
            setNewProject('')
            setOpenDialog(false)
        }
    }

    // Filter projects by search query
    const filteredProjects = projects.filter((p) => p.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation Bar */}
            <nav className="bg-white border-b border-gray-200 px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Left Section - Logo and Nav Links */}
                    <div className="flex items-center gap-8">
                        <div className="bg-gray-900 text-white px-3 py-2 text-sm font-medium">trust</div>
                        <div className="flex items-center gap-6">
                            <button className="text-sm font-medium text-gray-900 hover:text-gray-600">Dashboard</button>
                            <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Projects</button>
                            <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                                Recently Viewed
                            </button>
                            <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Filters</button>
                            <button className="px-4 py-1.5 text-sm font-medium text-gray-900 border-2 border-green-500 rounded-full hover:bg-green-50">
                                Tutorial Guide
                            </button>
                        </div>
                    </div>

                    {/* Right Section - Search and Icons */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent w-64"
                            />
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded">
                            <div className="w-6 h-6 border border-gray-400 rounded"></div>
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded">
                            <Bell className="w-5 h-5 text-gray-700" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded">
                            <User className="w-5 h-5 text-gray-700" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded">
                            <Settings className="w-5 h-5 text-gray-700" />
                        </button>
                        <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800">
                            Upgrade
                        </button>
                    </div>
                </div>
            </nav>

            {/* Notification Banners */}
            {showNotifications && (
                <div className="px-6 py-4 space-y-2">
                    <div className="bg-red-100 border border-red-300 rounded-lg px-4 py-3 flex items-start justify-between">
                        <div className="flex items-start gap-3">
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">IMPORTANT</span>
                            <p className="text-sm text-gray-800">
                                Spaces and projects that currently have "Markdown" set as their testing formatting rule
                                will be automatically switched to "Github Flavoured" markdown (Beta) starting on
                                September 4.
                            </p>
                            <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">NEW</span>
                        </div>
                        <button
                            onClick={() => setShowNotifications(false)}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="bg-green-100 border border-green-300 rounded-lg px-4 py-3 flex items-start justify-between">
                        <div className="flex items-start gap-3">
                            <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">ACTIVE</span>
                            <p className="text-sm text-gray-800">
                                Add collapsible sections to documents in any notation and get due dates for issues
                                related APIs Learn more about these and all Backlog updates in our latest release notes
                            </p>
                            <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">
                                BETA
                            </span>
                        </div>
                        <button
                            onClick={() => setShowNotifications(false)}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="px-6 py-8">
                {/* Trust Bridge Logo and Title */}
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

                {/* Projects Section */}
                <div className="max-w-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={() => setShowProjects(!showProjects)}
                            className="flex items-center gap-2 text-gray-900 hover:text-gray-600"
                        >
                            <ChevronDown
                                className={`w-5 h-5 transform transition-transform ${showProjects ? 'rotate-180' : ''}`}
                            />
                            <span className="font-medium">Projects</span>
                        </button>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setOpenDialog(true)} className="p-2 hover:bg-gray-200 rounded">
                                <Plus className="w-5 h-5 text-gray-700" />
                            </button>
                            <button className="p-2 hover:bg-gray-200 rounded">
                                <Search className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>
                    </div>

                    {showProjects && (
                        <>
                            {filteredProjects.length === 0 ? (
                                <div className="border-2 border-gray-300 rounded-lg bg-white p-16">
                                    <div className="text-center">
                                        <p className="text-gray-900 text-sm mb-2">There no projects at the moment.</p>
                                        <button
                                            onClick={() => setOpenDialog(true)}
                                            className="text-green-600 hover:text-green-700 font-medium text-sm"
                                        >
                                            Add Project
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {filteredProjects.map((project, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex justify-between items-center"
                                        >
                                            <span className="text-sm text-gray-900">{project}</span>
                                            <button
                                                onClick={() => setProjects(projects.filter((_, i) => i !== idx))}
                                                className="text-gray-500 hover:text-red-600"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Dialog for Add Project */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add a New Project</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <Input
                            placeholder="Enter project name"
                            value={newProject}
                            onChange={(e) => setNewProject(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpenDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveProject}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Dashboard
