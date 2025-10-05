'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AddProjectDialogProps {
    open: boolean
    onOpenChange: (val: boolean) => void
    onSave: (name: string) => void
}

export default function AddProjectDialog({ open, onOpenChange, onSave }: AddProjectDialogProps) {
    const [newProject, setNewProject] = useState('')

    const handleSave = () => {
        if (newProject.trim() === '') return
        onSave(newProject.trim())
        setNewProject('')
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
