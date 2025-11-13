'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Editor from '../../../components/Editor'
import { marked } from 'marked'
import TurndownService from 'turndown'

export default function EditManualChapterPage() {
  const router = useRouter()
  const params = useParams()
  const { group, chapter } = params
  
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
  }, [router, group, chapter])

  const loadContent = async () => {
    try {
      const response = await fetch(`/api/manual/${group}/${chapter}`)
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

      const response = await fetch(`/api/manual/${group}/${chapter}`, {
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
          <h1 style={{ margin: 0 }}>{chapterTitle}</h1>
          <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>
            {group} / {chapter}
          </p>
        </div>
        <div>
          <button
            onClick={() => router.push('/admin/manual')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '8px 16px',
              backgroundColor: saving ? '#ccc' : '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: saving ? 'not-allowed' : 'pointer'
            }}
          >
            {saving ? '저장중...' : '저장하기'}
          </button>
        </div>
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
          <Editor content={content} onChange={setContent} />
        </div>
      </main>
    </div>
  )
}
