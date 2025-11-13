'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminGroupsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showAddGroupModal, setShowAddGroupModal] = useState(false)
  const [showAddChapterModal, setShowAddChapterModal] = useState(false)
  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const [newGroupData, setNewGroupData] = useState({ id: '', title: '', icon: '📁' })
  const [newChapterData, setNewChapterData] = useState({ id: '', title: '' })

  useEffect(() => {
    const loggedIn = localStorage.getItem('admin_logged_in')
    if (loggedIn !== 'true') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
      loadGroups()
    }
  }, [router])

  async function loadGroups() {
    try {
      const response = await fetch('/api/groups')
      const data = await response.json()
      setGroups(data.groups || [])
    } catch (error) {
      console.error('Failed to load groups:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in')
    router.push('/admin/login')
  }

  const moveUp = (index) => {
    if (index === 0) return
    const newGroups = [...groups]
    ;[newGroups[index - 1], newGroups[index]] = [newGroups[index], newGroups[index - 1]]
    newGroups.forEach((group, i) => {
      group.order = i + 1
    })
    setGroups(newGroups)
  }

  const moveDown = (index) => {
    if (index === groups.length - 1) return
    const newGroups = [...groups]
    ;[newGroups[index], newGroups[index + 1]] = [newGroups[index + 1], newGroups[index]]
    newGroups.forEach((group, i) => {
      group.order = i + 1
    })
    setGroups(newGroups)
  }

  const handleSaveOrder = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/groups', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groups }),
      })

      const data = await response.json()
      if (data.success) {
        alert('순서 저장 완료!')
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

  const handleAddGroup = async () => {
    if (!newGroupData.id || !newGroupData.title) {
      alert('그룹 ID와 제목을 입력하세요')
      return
    }

    if (!/^[a-z0-9-]+$/.test(newGroupData.id)) {
      alert('그룹 ID는 영문 소문자, 숫자, 하이픈(-)만 사용 가능합니다')
      return
    }

    if (groups.find(g => g.id === newGroupData.id)) {
      alert('이미 존재하는 그룹 ID입니다')
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'add-group',
          groupData: newGroupData
        }),
      })

      const data = await response.json()
      if (data.success) {
        alert('그룹 추가 완료!')
        setShowAddGroupModal(false)
        setNewGroupData({ id: '', title: '', icon: '📁' })
        loadGroups()
      } else {
        alert('추가 실패: ' + data.error)
      }
    } catch (error) {
      console.error('Add group error:', error)
      alert('추가 실패: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteGroup = async (groupId) => {
    if (!confirm('정말로 이 그룹을 삭제하시겠습니까? 그룹 내 모든 챕터도 삭제됩니다.')) {
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'delete-group',
          groupId
        }),
      })

      const data = await response.json()
      if (data.success) {
        alert('그룹 삭제 완료!')
        loadGroups()
      } else {
        alert('삭제 실패: ' + data.error)
      }
    } catch (error) {
      console.error('Delete group error:', error)
      alert('삭제 실패: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleAddChapter = async () => {
    if (!newChapterData.id || !newChapterData.title) {
      alert('챕터 ID와 제목을 입력하세요')
      return
    }

    if (!/^[a-z0-9-]+$/.test(newChapterData.id)) {
      alert('챕터 ID는 영문 소문자, 숫자, 하이픈(-)만 사용 가능합니다')
      return
    }

    const group = groups.find(g => g.id === selectedGroupId)
    if (group && group.chapters.find(c => c.id === newChapterData.id)) {
      alert('이미 존재하는 챕터 ID입니다')
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'add-chapter',
          groupId: selectedGroupId,
          chapterData: newChapterData
        }),
      })

      const data = await response.json()
      if (data.success) {
        alert('챕터 추가 완료!')
        setShowAddChapterModal(false)
        setNewChapterData({ id: '', title: '' })
        setSelectedGroupId(null)
        loadGroups()
      } else {
        alert('추가 실패: ' + data.error)
      }
    } catch (error) {
      console.error('Add chapter error:', error)
      alert('추가 실패: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteChapter = async (groupId, chapterId) => {
    if (!confirm('정말로 이 챕터를 삭제하시겠습니까?')) {
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'delete-chapter',
          groupId,
          chapterData: { id: chapterId }
        }),
      })

      const data = await response.json()
      if (data.success) {
        alert('챕터 삭제 완료!')
        loadGroups()
      } else {
        alert('삭제 실패: ' + data.error)
      }
    } catch (error) {
      console.error('Delete chapter error:', error)
      alert('삭제 실패: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  if (!isAuthenticated || loading) {
    return <div>로딩중...</div>
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #ddd',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0 }}>그룹 & 챕터 관리</h1>
        <div>
          <Link 
            href="/admin/manual"
            style={{
              padding: '8px 16px',
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              textDecoration: 'none',
              marginRight: '10px',
              display: 'inline-block'
            }}
          >
            ← 매뉴얼 관리
          </Link>
          <button
            onClick={() => setShowAddGroupModal(true)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            + 그룹 추가
          </button>
          <button
            onClick={handleSaveOrder}
            disabled={saving}
            style={{
              padding: '8px 16px',
              backgroundColor: saving ? '#ccc' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: saving ? 'not-allowed' : 'pointer',
              marginRight: '10px'
            }}
          >
            {saving ? '저장중...' : '순서 저장'}
          </button>
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
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {groups.sort((a, b) => a.order - b.order).map((group, index) => (
            <div
              key={group.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '25px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '15px',
                borderBottom: '2px solid #f0f0f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#999' }}>
                    {group.order}
                  </span>
                  <span style={{ fontSize: '28px' }}>{group.icon}</span>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
                      {group.title}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      {group.chapters.length}개 챕터 | ID: {group.id}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: index === 0 ? '#ccc' : '#2196F3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: index === 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === groups.length - 1}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: index === groups.length - 1 ? '#ccc' : '#2196F3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: index === groups.length - 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => {
                      setSelectedGroupId(group.id)
                      setShowAddChapterModal(true)
                    }}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    + 챕터
                  </button>
                  <button
                    onClick={() => handleDeleteGroup(group.id)}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {group.chapters.length === 0 ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                    챕터가 없습니다. "+ 챕터" 버튼을 클릭하여 추가하세요.
                  </div>
                ) : (
                  group.chapters.sort((a, b) => a.order - b.order).map((chapter) => (
                    <div
                      key={chapter.id}
                      style={{
                        padding: '12px 15px',
                        backgroundColor: '#f9f9f9',
                        border: '1px solid #e0e0e0',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: 'bold', marginRight: '10px' }}>
                          {chapter.order}.
                        </span>
                        <span>{chapter.title}</span>
                        <span style={{ marginLeft: '10px', fontSize: '12px', color: '#999' }}>
                          (ID: {chapter.id})
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <Link
                          href={`/admin/manual/edit/${group.id}/${chapter.id}`}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#2196F3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontSize: '14px'
                          }}
                        >
                          편집
                        </Link>
                        <button
                          onClick={() => handleDeleteChapter(group.id, chapter.id)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {showAddGroupModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '30px',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h2 style={{ marginTop: 0 }}>새 그룹 추가</h2>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                그룹 ID (영문소문자, 숫자, 하이픈만)
              </label>
              <input
                type="text"
                value={newGroupData.id}
                onChange={(e) => setNewGroupData({ ...newGroupData, id: e.target.value })}
                placeholder="예: advanced-features"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                그룹 제목
              </label>
              <input
                type="text"
                value={newGroupData.title}
                onChange={(e) => setNewGroupData({ ...newGroupData, title: e.target.value })}
                placeholder="예: 고급 기능"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                아이콘 (이모지)
              </label>
              <input
                type="text"
                value={newGroupData.icon}
                onChange={(e) => setNewGroupData({ ...newGroupData, icon: e.target.value })}
                placeholder="예: 🚀"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowAddGroupModal(false)
                  setNewGroupData({ id: '', title: '', icon: '📁' })
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#666',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                취소
              </button>
              <button
                onClick={handleAddGroup}
                disabled={saving}
                style={{
                  padding: '8px 16px',
                  backgroundColor: saving ? '#ccc' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: saving ? 'not-allowed' : 'pointer'
                }}
              >
                {saving ? '추가중...' : '추가'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddChapterModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '30px',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h2 style={{ marginTop: 0 }}>새 챕터 추가</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              그룹: {groups.find(g => g.id === selectedGroupId)?.title}
            </p>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                챕터 ID (영문소문자, 숫자, 하이픈만)
              </label>
              <input
                type="text"
                value={newChapterData.id}
                onChange={(e) => setNewChapterData({ ...newChapterData, id: e.target.value })}
                placeholder="예: api-integration"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                챕터 제목
              </label>
              <input
                type="text"
                value={newChapterData.title}
                onChange={(e) => setNewChapterData({ ...newChapterData, title: e.target.value })}
                placeholder="예: API 연동하기"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowAddChapterModal(false)
                  setNewChapterData({ id: '', title: '' })
                  setSelectedGroupId(null)
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#666',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                취소
              </button>
              <button
                onClick={handleAddChapter}
                disabled={saving}
                style={{
                  padding: '8px 16px',
                  backgroundColor: saving ? '#ccc' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: saving ? 'not-allowed' : 'pointer'
                }}
              >
                {saving ? '추가중...' : '추가'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
