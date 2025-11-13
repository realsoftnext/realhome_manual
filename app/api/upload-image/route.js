import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/\s+/g, '-')
    const filename = `${timestamp}-${originalName}`
    
    // Use GitHub API to upload image
    const token = process.env.GITHUB_TOKEN
    const owner = 'realsoftnext'
    const repo = 'realhome_manual'
    const branch = 'main'
    const path = `public/images/${filename}`
    
    if (!token) {
      throw new Error('GITHUB_TOKEN not configured')
    }

    // Upload to GitHub
    const uploadUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Upload image: ${filename}`,
        content: buffer.toString('base64'),
        branch: branch,
      }),
    })

    if (!uploadResponse.ok) {
      const error = await uploadResponse.json()
      throw new Error(`GitHub API error: ${error.message}`)
    }
    
    // Return URL
    const url = `/images/${filename}`
    
    return NextResponse.json({ url, success: true })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
