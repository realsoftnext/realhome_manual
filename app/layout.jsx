import LayoutClient from './components/LayoutClient'
import '../styles.css'

export const metadata = {
  title: '부동산 매물관리 시스템 사용자 매뉴얼',
  description: '부동산 중개업소를 위한 매물관리 시스템 사용 가이드',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      </head>
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}
