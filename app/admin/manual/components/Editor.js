'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { useCallback } from 'react'

export default function Editor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const addImage = useCallback(() => {
    const url = window.prompt('이미지 URL을 입력하세요:')
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const uploadImage = useCallback(async (file) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.url && editor) {
        editor.chain().focus().setImage({ src: data.url }).run()
      }
    } catch (error) {
      alert('이미지 업로드 실패: ' + error.message)
    }
  }, [editor])

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadImage(file)
    }
  }, [uploadImage])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      uploadImage(file)
    }
  }, [uploadImage])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
  }, [])

  if (!editor) {
    return null
  }

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        padding: '10px',
        display: 'flex',
        gap: '5px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          style={{
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: editor.isActive('bold') ? '#0070f3' : 'white',
            color: editor.isActive('bold') ? 'white' : 'black',
            cursor: 'pointer'
          }}
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          style={{
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: editor.isActive('italic') ? '#0070f3' : 'white',
            color: editor.isActive('italic') ? 'white' : 'black',
            cursor: 'pointer'
          }}
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          style={{
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: editor.isActive('heading', { level: 1 }) ? '#0070f3' : 'white',
            color: editor.isActive('heading', { level: 1 }) ? 'white' : 'black',
            cursor: 'pointer'
          }}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          style={{
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: editor.isActive('heading', { level: 2 }) ? '#0070f3' : 'white',
            color: editor.isActive('heading', { level: 2 }) ? 'white' : 'black',
            cursor: 'pointer'
          }}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          style={{
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: editor.isActive('heading', { level: 3 }) ? '#0070f3' : 'white',
            color: editor.isActive('heading', { level: 3 }) ? 'white' : 'black',
            cursor: 'pointer'
          }}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          style={{
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: editor.isActive('bulletList') ? '#0070f3' : 'white',
            color: editor.isActive('bulletList') ? 'white' : 'black',
            cursor: 'pointer'
          }}
        >
          • 목록
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
          style={{
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: editor.isActive('codeBlock') ? '#0070f3' : 'white',
            color: editor.isActive('codeBlock') ? 'white' : 'black',
            cursor: 'pointer'
          }}
        >
          {'<>'}
        </button>
        <label
          style={{
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
        >
          📷 이미지 업로드
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </label>
        <button
          onClick={addImage}
          style={{
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
        >
          🔗 이미지 URL
        </button>
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          minHeight: '500px',
          padding: '20px',
          backgroundColor: 'white'
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
