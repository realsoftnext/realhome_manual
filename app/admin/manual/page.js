'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const manualChapters = [
  { id: '01-getting-started', title: '1. 시작하기' },
  { id: '02-login-account', title: '2. 로그인 및 계정 관리' },
  { id: '03-dashboard', title: '3. 대시보드' },
  { id: '04-product-registration', title: '4. 매물 등록하기' },
  { id: '05-product-management', title: '5. 매물 관리하기' },
  { id: '06-contact-management', title: '6. 고객 연락처 관리' },
  { id: '07-enquiry-management', title: '7. 문의 관리' },
  { id: '08-contract-management', title: '8. 계약 관리' },
  { id: '09-category-settings', title: '9. 매물 종류 설정' },
  { id: '10-staff-permissions', title: '10. 직원 및 권한 관리' },
  { id: '11-content-management', title: '11. 콘텐츠 관리' },
  { id: '12-website-management', title: '12. 홈페이지 관리' },
  { id: '13-faq', title: '13. FAQ' },
  { id: '14-quick-reference', title: '14. 빠른 참조' },
  { id: '15-glossary', title: '15. 용어 설명' },
]

export default function AdminManualPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem('admin_logged_in')
    if (loggedIn !== 'true') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in')
    router.push('/admin/login')
  }

  if (!isAuthenticated) {
    return <div>로딩중...</div>
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Paperozi, -apple-system, sans-serif'
    }}>
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #ddd',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0 }}>매뉴얼 관리</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          로그아웃
        </button>
      </header>

      <main style={{
        maxWidth: '1200px',
        margin: '40px auto',
        padding: '0 20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '20px' }}>매뉴얼 장 선택</h2>
          <p style={{ color: '#666', marginBottom: '30px' }}>
            편집할 장을 선택하세요
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {manualChapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/admin/manual/edit/${chapter.id}`}
                style={{
                  padding: '20px',
                  backgroundColor: '#f9f9f9',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0070f3'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9f9f9'
                  e.currentTarget.style.color = 'inherit'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                  {chapter.title}
                </div>
                <div style={{ fontSize: '14px', opacity: 0.7 }}>
                  편집하기 →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
