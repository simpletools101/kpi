import React from 'react'
import { FileText } from 'lucide-react'

interface EmptyStateCardProps {
    onAddIssue?: () => void
}

const EmptyStateCard: React.FC<EmptyStateCardProps> = ({ onAddIssue }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                    <FileText className="w-8 h-8 text-gray-700" />
                </div>
                <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">
                        No issues have been added to this project yet.
                    </h2>
                    <p className="text-sm text-gray-600 mb-1">Use "Add Issue" to start managing this project.</p>
                    <p className="text-sm text-gray-600 mb-4">
                        Once you add an issue, all project members will be notified.
                    </p>
                    <button
                        onClick={onAddIssue}
                        className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors"
                    >
                        Add Issue
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmptyStateCard
