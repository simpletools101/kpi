'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/base/project/sidebar'
import Header from '@/components/base/project/header'
import MainContent from '@/components/base/project/MainContent'

const TrustBridgeProject: React.FC = () => {
  const [activeNav, setActiveNav] = useState('Home')

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <main className="flex-1 overflow-y-auto">
        <Header />
        <MainContent />
      </main>
    </div>
  )
}

export default TrustBridgeProject
