import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

// GET /api/manual/[group]/[chapter] - 챕터 내용 가져오기
export async function GET(request, { params }) {
  const { group, chapter } = params
  
  try {
    const filePath = path.join(process.cwd(), 'manual', group, `${chapter}.md`)
    const content = await fs.readFile(filePath, 'utf-8')
    
    // Extract title from first line
    const lines = content.split('\n')
    const titleMatch = lines[0].match(/^#\s+(.+)$/)
    const title = titleMatch ? titleMatch[1] : chapter
    
    return NextResponse.json({ content, title, group, chapter })
  } catch (error) {
    return NextResponse.json(
      { error: 'File not found' },
      { status: 404 }
    )
  }
}

// POST /api/manual/[group]/[chapter] - 챕터 내용 저장
export async function POST(request, { params }) {
  const { group, chapter } = params
  const { content } = await request.json()
  
  try {
    // Use GitHub API to update file
    const token = process.env.GITHUB_TOKEN
    const owner = 'realsoftnext'
    const repo = 'realhome_manual'
    const branch = 'main'
    
    if (!token) {
      throw new Error('GITHUB_TOKEN not configured')
    }

    const filePath = `manual/${group}/${chapter}.md`

    // Get current file SHA
    const getFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`
    const getResponse = await fetch(getFileUrl, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    let sha = null
    if (getResponse.ok) {
      const fileData = await getResponse.json()
      sha = fileData.sha
    }

    // Update or create file
    const updateUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`
    const updateResponse = await fetch(updateUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Update manual: ${group}/${chapter}`,
        content: Buffer.from(content).toString('base64'),
        sha: sha,
        branch: branch,
      }),
    })

    if (!updateResponse.ok) {
      const error = await updateResponse.json()
      throw new Error(`GitHub API error: ${error.message}`)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Save error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
