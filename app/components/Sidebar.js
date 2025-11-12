'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    title: '시작하기',
    items: [
      { href: '/manual/01-getting-started', label: '1. 시작하기' },
      { href: '/manual/02-login-account', label: '2. 로그인 및 계정 관리' },
      { href: '/manual/03-dashboard', label: '3. 대시보드' },
    ]
  },
  {
    title: '매물 관리',
    items: [
      { href: '/manual/04-product-registration', label: '4. 매물 등록하기' },
      { href: '/manual/05-product-management', label: '5. 매물 관리하기' },
    ]
  },
  {
    title: '고객 관리',
    items: [
      { href: '/manual/06-contact-management', label: '6. 고객 연락처 관리' },
      { href: '/manual/07-enquiry-management', label: '7. 문의 관리' },
    ]
  },
  {
    title: '계약 및 설정',
    items: [
      { href: '/manual/08-contract-management', label: '8. 계약 관리' },
      { href: '/manual/09-category-settings', label: '9. 매물 종류 설정' },
      { href: '/manual/10-staff-permissions', label: '10. 직원 및 권한 관리' },
    ]
  },
  {
    title: '콘텐츠 관리',
    items: [
      { href: '/manual/11-content-management', label: '11. 콘텐츠 관리' },
    ]
  },
  {
    title: '홈페이지 관리',
    items: [
      { href: '/manual/12-website-management', label: '12. 홈페이지 관리' },
    ]
  },
  {
    title: '참고 자료',
    items: [
      { href: '/manual/13-faq', label: '13. FAQ' },
      { href: '/manual/14-quick-reference', label: '14. 빠른 참조' },
      { href: '/manual/15-glossary', label: '15. 용어 설명' },
    ]
  },
]

export default function Sidebar({ isOpen, onToggle }) {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState(
    menuItems.map((_, i) => i) // 모든 섹션 기본 열림
  )

  const toggleSection = (index) => {
    setExpandedSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onToggle}
        />
      )}

      {/* 사이드바 */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo">
            <h2>📘리얼홈 매뉴얼</h2>
          </Link>
          <button className="sidebar-close" onClick={onToggle}>
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="nav-section">
              <button
                className="section-header"
                onClick={() => toggleSection(sectionIndex)}
              >
                <span>{section.title}</span>
                <span className="collapse-icon">
                  {expandedSections.includes(sectionIndex) ? '▼' : '▶'}
                </span>
              </button>

              {expandedSections.includes(sectionIndex) && (
                <ul className="section-items">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={pathname === item.href ? 'active' : ''}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
