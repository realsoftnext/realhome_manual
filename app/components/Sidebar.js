'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar({ isOpen, onToggle }) {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState([])

  // groups.json 로드
  useEffect(() => {
    async function loadGroups() {
      try {
        const response = await fetch('/api/groups')
        const data = await response.json()
        
        // groups.json을 menuItems 형식으로 변환
        const items = data.groups
          .sort((a, b) => a.order - b.order)
          .map(group => ({
            title: `${group.icon} ${group.title}`,
            items: group.chapters
              .sort((a, b) => a.order - b.order)
              .map(chapter => ({
                href: `/manual/${group.id}/${chapter.id}`,
                label: chapter.title
              }))
          }))
        
        setMenuItems(items)
        // 모든 섹션 기본 열림
        setExpandedSections(items.map((_, i) => i))
        setLoading(false)
      } catch (error) {
        console.error('Failed to load groups:', error)
        setLoading(false)
      }
    }
    
    loadGroups()
  }, [])

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
          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>로딩중...</div>
          ) : (
            <>
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
            </>
          )}
        </nav>
      </aside>
    </>
  )
}
