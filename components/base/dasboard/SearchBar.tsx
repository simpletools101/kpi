'use client'

import { Search } from 'lucide-react'

interface Props {
    onChange?: (val: string) => void
    value?: string
}

export default function SearchBar({ onChange, value }: Props) {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
                type="text"
                placeholder="Search"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-600 w-64"
            />
        </div>
    )
}
