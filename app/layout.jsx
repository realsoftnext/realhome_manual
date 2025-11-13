import LayoutClient from './components/LayoutClient'
import './globals.css'

export const metadata = {
  title: '부동산 홈페이지 및 통합관리시스템 사용자 매뉴얼',
  description: '부동산 중개업소를 위한 홈페이지 및 통합관리시스템 사용 가이드',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}
