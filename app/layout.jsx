'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from './components/Sidebar'
import '../styles.css'

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const isManualPage = pathname?.startsWith('/manual/')

  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>부동산 매물관리 시스템 사용자 매뉴얼</title>
        <meta name="description" content="부동산 중개업소를 위한 매물관리 시스템 사용 가이드" />
      </head>
      <body>
        <div className="app-container">
          {isManualPage && (
            <>
              <button 
                className="menu-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="메뉴 토글"
              >
                ☰
              </button>
              <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
            </>
          )}
          <main className={`main-content ${isManualPage ? 'with-sidebar' : ''}`}>
            <div className="container">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
