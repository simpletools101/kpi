import React from 'react'
import StatusCard from './StatusCard'
import EmptyStateCard from './EmptyStateCard'
import EmptyPlaceholder from './EmptyPlaceholder'

const statusItems = [
    { color: 'bg-red-400', label: 'Open' },
    { color: 'bg-blue-500', label: 'In Progress' },
    { color: 'bg-green-400', label: 'Resolved' },
    { color: 'bg-lime-500', label: 'Closed' },
]

const MainContent: React.FC = () => {
    return (
        <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
                <EmptyStateCard />
                <EmptyPlaceholder />
                <StatusCard statusItems={statusItems} />
                <EmptyPlaceholder />
                <EmptyPlaceholder />
                <EmptyPlaceholder />
            </div>
        </div>
    )
}

export default MainContent
