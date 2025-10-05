'use client'

import { X } from 'lucide-react'

interface Props {
    onClose: () => void
}

export default function Notifications({ onClose }: Props) {
    return (
        <div className="px-6 py-4 space-y-2">
            {[
                {
                    type: 'IMPORTANT',
                    text: 'Spaces with "Markdown" formatting will switch to "Github Flavoured" markdown (Beta).',
                    color: 'red',
                },
                {
                    type: 'ACTIVE',
                    text: 'Add collapsible sections and due dates for issues in the latest release notes.',
                    color: 'green',
                },
            ].map((n, idx) => (
                <div
                    key={idx}
                    className={`bg-${n.color}-100 border border-${n.color}-300 rounded-lg px-4 py-3 flex items-start justify-between`}
                >
                    <div className="flex items-start gap-3">
                        <span className={`bg-${n.color}-600 text-white text-xs font-bold px-2 py-1 rounded`}>
                            {n.type}
                        </span>
                        <p className="text-sm text-gray-800">{n.text}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    )
}
