'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Editor from '../../components/Editor'
import { marked } from 'marked'
import TurndownService from 'turndown'

export default function EditManualPage() {
  const router = useRouter()
  const params = useParams()
  const chapterId = params.id
  
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [chapterTitle, setChapterTitle] = useState('')

  useEffect(() => {
    const loggedIn = localStorage.getItem('admin_logged_in')
    if (loggedIn !== 'true') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
      loadContent()
    }
  }, [router, chapterId])

  const loadContent = async () => {
    try {
      const response = await fetch(`/api/manual/${chapterId}`)
      const data = await response.json()
      
      // Convert Markdown to HTML for editor
      const html = marked(data.content)
      setContent(html)
      setChapterTitle(data.title)
      setLoading(false)
    } catch (error) {
      console.error('Failed to load content:', error)
      alert('콘텐츠 로드 실패')
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!content) {
      alert('내용을 입력하세요')
      return
    }

    setSaving(true)

    try {
      // Convert HTML back to Markdown
      const turndownService = new TurndownService()
      const markdown = turndownService.turndown(content)

      const response = await fetch(`/api/manual/${chapterId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: markdown }),
      })

      const data = await response.json()

      if (data.success) {
        alert('저장 및 GitHub에 푸시 완료!')
        router.push('/admin/manual')
      } else {
        alert('저장 실패: ' + data.error)
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('저장 실패: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  if (!isAuthenticated || loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        로딩중...
      </div>
    )
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
        <div>
          <button
            onClick={() => router.push('/admin/manual')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '20px'
            }}
          >
            ← 목록
          </button>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {chapterTitle} 편집
          </span>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            padding: '10px 24px',
            backgroundColor: saving ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: saving ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {saving ? '저장중...' : '💾 저장 & GitHub 푸시'}
        </button>
      </header>

      <main style={{
        maxWidth: '1400px',
        margin: '40px auto',
        padding: '0 20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: '#e3f2fd',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            💡 <strong>사용 방법:</strong> 이미지를 드래그 앤 드롭하거나 "📷 이미지 업로드" 버튼을 클릭하세요.
            저장하면 자동으로 GitHub에 커밋됩니다.
          </div>

          <Editor content={content} onChange={setContent} />
        </div>
      </main>
    </div>
  )
}
