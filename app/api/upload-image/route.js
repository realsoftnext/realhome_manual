import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

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
    
    // Save to public/images/
    const imagePath = path.join(process.cwd(), 'public', 'images', filename)
    await writeFile(imagePath, buffer)
    
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
