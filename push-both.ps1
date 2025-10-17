# Script to push to both repositories
# Usage: .\push-both.ps1 [branch-name]

param(
    [string]$Branch = "main"
)

Write-Host "🚀 Pushing to both repositories..." -ForegroundColor Green

# Push to your original repository
Write-Host "📤 Pushing to origin (spastorr/aabo-frontend)..." -ForegroundColor Yellow
git push origin $Branch

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to origin" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to push to origin" -ForegroundColor Red
    exit 1
}

# Push to coworker's repository
Write-Host "📤 Pushing to coworker (AABOServices/aabo-frontend)..." -ForegroundColor Yellow
git push coworker $Branch

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to coworker repository" -ForegroundColor Green
    Write-Host "🎉 All repositories updated!" -ForegroundColor Cyan
} else {
    Write-Host "❌ Failed to push to coworker repository" -ForegroundColor Red
    exit 1
}
