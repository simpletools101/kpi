import React from 'react'
import clsx from 'clsx'

interface EmptyPlaceholderProps {
    height?: string
    className?: string
}

const EmptyPlaceholder: React.FC<EmptyPlaceholderProps> = ({ height = 'h-40', className = '' }) => (
    <div className={clsx('bg-gray-200 rounded-lg', height, className)}></div>
)

export default EmptyPlaceholder
