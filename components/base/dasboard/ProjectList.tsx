'use client'

import { useState } from 'react'
import { ChevronDown, Plus, Search, X } from 'lucide-react'

interface ProjectListProps {
    projects: string[]
    onAdd: () => void
    onDelete: (index: number) => void
}

export default function ProjectList({ projects, onAdd, onDelete }: ProjectListProps) {
    const [showProjects, setShowProjects] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    const filteredProjects = projects.filter((p) => p.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <div className="max-w-2xl w-full mt-12">
            {/* Header */}
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
                    <button onClick={onAdd} className="p-2 hover:bg-gray-200 rounded">
                        <Plus className="w-5 h-5 text-gray-700" />
                    </button>
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-600"
                        />
                    </div>
                </div>
            </div>

            {/* Body */}
            {showProjects && (
                <>
                    {filteredProjects.length === 0 ? (
                        <div className="border-2 border-gray-300 rounded-lg bg-white p-16">
                            <div className="text-center">
                                <p className="text-gray-900 text-sm mb-2">No projects yet.</p>
                                <button
                                    onClick={onAdd}
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
                                    <button onClick={() => onDelete(idx)} className="text-gray-500 hover:text-red-600">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
