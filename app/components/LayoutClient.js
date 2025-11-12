'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'

export default function LayoutClient({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  
  // 홈페이지(/) 또는 /manual/로 시작하는 모든 페이지에서 사이드바 표시
  const showSidebar = pathname === '/' || (pathname && pathname.startsWith('/manual'))

  return (
    <div className="app-container">
      {showSidebar ? (
        <>
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="메뉴 토글"
          >
            ☰
          </button>
          <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main className="main-content with-sidebar">
            <div className="container">{children}</div>
          </main>
        </>
      ) : (
        <main className="main-content">
          <div className="container">{children}</div>
        </main>
      )}
    </div>
  )
}
