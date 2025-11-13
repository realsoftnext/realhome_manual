import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'manual', 'groups.json')
    const fileContent = await fs.readFile(filePath, 'utf8')
    const data = JSON.parse(fileContent)
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to read groups.json:', error)
    return NextResponse.json(
      { error: 'Failed to load groups' },
      { status: 500 }
    )
  }
}

// Admin에서 groups.json 업데이트
export async function PUT(request) {
  try {
    const data = await request.json()
    
    // GitHub API로 업데이트
    const token = process.env.GITHUB_TOKEN
    if (!token) {
      return NextResponse.json(
        { error: 'GITHUB_TOKEN not configured' },
        { status: 500 }
      )
    }

    const filePath = 'manual/groups.json'
    const content = JSON.stringify(data, null, 2)
    
    // 현재 파일의 SHA 가져오기
    const getResponse = await fetch(
      `https://api.github.com/repos/realsoftnext/realhome_manual/contents/${filePath}`,
      {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    )
    
    const currentFile = await getResponse.json()
    
    // GitHub API로 업데이트
    const updateResponse = await fetch(
      `https://api.github.com/repos/realsoftnext/realhome_manual/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message: 'Update groups.json',
          content: Buffer.from(content).toString('base64'),
          sha: currentFile.sha,
          branch: 'main'
        }),
      }
    )

    if (!updateResponse.ok) {
      throw new Error('Failed to update groups.json on GitHub')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update groups.json:', error)
    return NextResponse.json(
      { error: 'Failed to update groups' },
      { status: 500 }
    )
  }
}

// 새 그룹 추가
export async function POST(request) {
  try {
    const { action, groupData, groupId, chapterData } = await request.json()
    
    const token = process.env.GITHUB_TOKEN
    if (!token) {
      return NextResponse.json(
        { error: 'GITHUB_TOKEN not configured' },
        { status: 500 }
      )
    }

    // 현재 groups.json 읽기
    const filePath = path.join(process.cwd(), 'manual', 'groups.json')
    const fileContent = await fs.readFile(filePath, 'utf8')
    const data = JSON.parse(fileContent)

    if (action === 'add-group') {
      // 새 그룹 추가
      const newGroup = {
        id: groupData.id,
        title: groupData.title,
        icon: groupData.icon || '📁',
        order: data.groups.length + 1,
        chapters: []
      }
      data.groups.push(newGroup)

      // 그룹 디렉토리 생성을 위한 빈 파일 생성
      const readmePath = `manual/${groupData.id}/README.md`
      const readmeContent = `# ${groupData.title}\n\n이 디렉토리는 "${groupData.title}" 그룹의 챕터들을 포함합니다.`
      
      await fetch(
        `https://api.github.com/repos/realsoftnext/realhome_manual/contents/${readmePath}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json',
          },
          body: JSON.stringify({
            message: `Create group directory: ${groupData.title}`,
            content: Buffer.from(readmeContent).toString('base64'),
            branch: 'main'
          }),
        }
      )
    } else if (action === 'delete-group') {
      // 그룹 삭제
      data.groups = data.groups.filter(g => g.id !== groupId)
      // 순서 재정렬
      data.groups.forEach((g, i) => {
        g.order = i + 1
      })
    } else if (action === 'add-chapter') {
      // 챕터 추가
      const group = data.groups.find(g => g.id === groupId)
      if (!group) {
        throw new Error('Group not found')
      }

      const newChapter = {
        id: chapterData.id,
        title: chapterData.title,
        file: `${chapterData.id}.md`,
        order: group.chapters.length + 1
      }
      group.chapters.push(newChapter)

      // 빈 챕터 파일 생성
      const chapterPath = `manual/${groupId}/${chapterData.id}.md`
      const chapterContent = `# ${chapterData.title}\n\n[← 목차로 돌아가기](/)\n\n---\n\n## 개요\n\n여기에 내용을 작성하세요.\n\n---\n\n[← 목차로 돌아가기](/)`
      
      await fetch(
        `https://api.github.com/repos/realsoftnext/realhome_manual/contents/${chapterPath}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json',
          },
          body: JSON.stringify({
            message: `Create chapter: ${chapterData.title}`,
            content: Buffer.from(chapterContent).toString('base64'),
            branch: 'main'
          }),
        }
      )
    } else if (action === 'delete-chapter') {
      // 챕터 삭제
      const group = data.groups.find(g => g.id === groupId)
      if (!group) {
        throw new Error('Group not found')
      }
      
      const chapter = group.chapters.find(c => c.id === chapterData.id)
      if (!chapter) {
        throw new Error('Chapter not found')
      }

      group.chapters = group.chapters.filter(c => c.id !== chapterData.id)
      // 순서 재정렬
      group.chapters.forEach((c, i) => {
        c.order = i + 1
      })

      // GitHub에서 파일 삭제
      const chapterPath = `manual/${groupId}/${chapterData.id}.md`
      const getFileResponse = await fetch(
        `https://api.github.com/repos/realsoftnext/realhome_manual/contents/${chapterPath}`,
        {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      )
      
      if (getFileResponse.ok) {
        const fileData = await getFileResponse.json()
        await fetch(
          `https://api.github.com/repos/realsoftnext/realhome_manual/contents/${chapterPath}`,
          {
            method: 'DELETE',
            headers: {
              'Authorization': `token ${token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/vnd.github.v3+json',
            },
            body: JSON.stringify({
              message: `Delete chapter: ${chapterData.id}`,
              sha: fileData.sha,
              branch: 'main'
            }),
          }
        )
      }
    }

    // groups.json 업데이트
    const groupsPath = 'manual/groups.json'
    const getResponse = await fetch(
      `https://api.github.com/repos/realsoftnext/realhome_manual/contents/${groupsPath}`,
      {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    )
    
    const currentFile = await getResponse.json()
    
    await fetch(
      `https://api.github.com/repos/realsoftnext/realhome_manual/contents/${groupsPath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message: `Update groups: ${action}`,
          content: Buffer.from(JSON.stringify(data, null, 2)).toString('base64'),
          sha: currentFile.sha,
          branch: 'main'
        }),
      }
    )

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Failed to process action:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
