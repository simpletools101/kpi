import React from 'react'

interface StatusCardProps {
    statusItems: { color: string; label: string }[]
}

const StatusCard: React.FC<StatusCardProps> = ({ statusItems }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-6">Project Status</h3>
            <div className="space-y-4">
                {statusItems.map((status, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                        <div className={`w-20 h-8 ${status.color} rounded-full`} />
                        <span className="text-sm font-medium text-gray-900">{status.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StatusCard
