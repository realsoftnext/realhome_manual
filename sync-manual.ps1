# manual 폴더의 .md 파일을 app/manual 구조로 동기화

$files = Get-ChildItem "manual\*.md" -Exclude "README.md"

foreach($file in $files) {
    $folder = $file.BaseName
    $targetDir = "app\manual\$folder"
    $targetFile = "$targetDir\page.mdx"
    
    # 폴더 생성
    if (-not (Test-Path $targetDir)) {
        New-Item -Path $targetDir -ItemType Directory -Force | Out-Null
    }
    
    # 파일 복사 (.md -> .mdx)
    Copy-Item $file.FullName $targetFile -Force
    Write-Host "✓ Synced: $($file.Name) -> $targetFile"
}

Write-Host "`n동기화 완료! 이제 빌드하세요: npm run build"
