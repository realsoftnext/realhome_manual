import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET(request, { params }) {
  const { id } = params
  
  try {
    const filePath = path.join(process.cwd(), 'manual', `${id}.md`)
    const content = await fs.readFile(filePath, 'utf-8')
    
    // Extract title from first line
    const lines = content.split('\n')
    const titleMatch = lines[0].match(/^#\s+(.+)$/)
    const title = titleMatch ? titleMatch[1] : id
    
    return NextResponse.json({ content, title })
  } catch (error) {
    return NextResponse.json(
      { error: 'File not found' },
      { status: 404 }
    )
  }
}

export async function POST(request, { params }) {
  const { id } = params
  const { content } = await request.json()
  
  try {
    const filePath = path.join(process.cwd(), 'manual', `${id}.md`)
    await fs.writeFile(filePath, content, 'utf-8')
    
    // Also update app/manual/*/content.mdx
    const mdxPath = path.join(process.cwd(), 'app', 'manual', id, 'content.mdx')
    await fs.writeFile(mdxPath, content, 'utf-8')
    
    // Git commit and push
    const simpleGit = require('simple-git')
    const git = simpleGit(process.cwd())
    
    await git.add([filePath, mdxPath])
    await git.commit(`Update manual: ${id}`)
    await git.push('origin', 'main')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Save error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
