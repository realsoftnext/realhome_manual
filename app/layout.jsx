import { Suspense } from 'react'
import LayoutClient from './components/LayoutClient'
import './globals.css'

export const metadata = {
  title: '부동산 매물관리 시스템 사용자 매뉴얼',
  description: '부동산 중개업소를 위한 매물관리 시스템 사용 가이드',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>
        <Suspense fallback={<div>Loading...</div>}>
          <LayoutClient>{children}</LayoutClient>
        </Suspense>
      </body>
    </html>
  )
}
