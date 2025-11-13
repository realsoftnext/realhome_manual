import { promises as fs } from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import ImageModal from './ImageModal'

export async function generateStaticParams() {
  // groups.json 읽기
  const groupsPath = path.join(process.cwd(), 'manual', 'groups.json')
  const groupsContent = await fs.readFile(groupsPath, 'utf8')
  const { groups } = JSON.parse(groupsContent)
  
  // 모든 group/chapter 조합 생성
  const params = []
  for (const group of groups) {
    for (const chapter of group.chapters) {
      params.push({
        group: group.id,
        chapter: chapter.id
      })
    }
  }
  
  return params
}

export default async function Page({ params }) {
  const { group, chapter } = params
  
  // MDX 파일 읽기
  const filePath = path.join(process.cwd(), 'manual', group, `${chapter}.md`)
  
  try {
    const content = await fs.readFile(filePath, 'utf8')
    
    return (
      <div className="manual-content">
        <MDXRemote 
          source={content} 
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm]
            }
          }}
          components={{
            img: (props) => <ImageModal {...props} />
          }}
        />
      </div>
    )
  } catch (error) {
    return (
      <div className="manual-content">
        <h1>페이지를 찾을 수 없습니다</h1>
        <p>요청하신 매뉴얼 페이지가 존재하지 않습니다.</p>
        <p>그룹: {group}, 챕터: {chapter}</p>
      </div>
    )
  }
}
