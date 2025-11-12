# manual 폴더의 .md 파일을 app/manual 구조로 동기화

$files = Get-ChildItem "manual\*.md" -Exclude "README.md"

foreach($file in $files) {
    $folder = $file.BaseName
    $targetDir = "app\manual\$folder"
    $contentFile = "$targetDir\content.mdx"
    $wrapperFile = "$targetDir\page.js"
    
    # 폴더 생성
    if (-not (Test-Path $targetDir)) {
        New-Item -Path $targetDir -ItemType Directory -Force | Out-Null
    }
    
    # 파일 복사 (.md -> content.mdx)
    Copy-Item $file.FullName $contentFile -Force
    
    # page.js wrapper 생성 (없으면)
    if (-not (Test-Path $wrapperFile)) {
        @"
import Content from './content.mdx'

export default function Page() {
  return <Content />
}
"@ | Out-File -FilePath $wrapperFile -Encoding UTF8
    }
    
    Write-Host "✓ Synced: $($file.Name) -> $contentFile"
}

Write-Host "`n동기화 완료! 이제 빌드하세요: npm run build"
