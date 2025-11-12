'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'

export default function LayoutClient({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  
  // pathname이 /manual/로 시작하는지 체크
  const isManualPage = pathname && pathname.startsWith('/manual/')

  console.log('LayoutClient:', { pathname, isManualPage }) // 디버깅용

  return (
    <div className="app-container">
      {isManualPage ? (
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
