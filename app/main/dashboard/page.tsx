'use client'

import { useState } from 'react'
import Navbar from '@/components/base/dasboard/Navbar'
import Notifications from '@/components/base/dasboard/Notifications'
import AddProjectDialog from '@/components/base/dasboard/AddProjectDialog'
import ProjectList from '@/components/base/dasboard/ProjectList'
import DashboardHeader from '@/components/base/dasboard/DashboardHeader'

export default function DashboardPage() {
    const [showNotifications, setShowNotifications] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)
    const [projects, setProjects] = useState<string[]>([])

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {showNotifications && <Notifications onClose={() => setShowNotifications(false)} />}

            <main className="px-6 py-8 max-w-3xl mx-auto">
                <DashboardHeader />

                <ProjectList
                    projects={projects}
                    onAdd={() => setOpenDialog(true)}
                    onDelete={(i) => setProjects(projects.filter((_, idx) => idx !== i))}
                />

                <AddProjectDialog
                    open={openDialog}
                    onOpenChange={setOpenDialog}
                    onSave={(name) => setProjects([...projects, name])}
                />
            </main>
        </div>
    )
}
