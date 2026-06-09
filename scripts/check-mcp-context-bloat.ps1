# check-mcp-context-bloat.ps1
# Scan project docs and artifacts for possible raw Playwright MCP / DOM bloat.

$ErrorActionPreference = "Stop"

$root = Get-Location

$targets = @(
  "docs",
  "artifacts"
)

$patterns = @(
  "<html",
  "<body",
  "<div",
  "aria-role",
  "accessibility tree",
  "browser_snapshot",
  "ref=e",
  "locator(",
  "page.locator",
  "innerHTML",
  "outerHTML"
)

$largeFileThresholdKb = 300
$violations = @()

Write-Host "== MCP context bloat scan ==" -ForegroundColor Cyan

foreach ($target in $targets) {
  $path = Join-Path $root $target
  if (-not (Test-Path $path)) {
    continue
  }

  Get-ChildItem $path -Recurse -File -ErrorAction SilentlyContinue |
    Where-Object {
      $_.Extension -in @(".md", ".txt", ".json", ".html", ".log")
    } |
    ForEach-Object {
      $file = $_
      $sizeKb = [math]::Round($file.Length / 1KB, 2)

      if ($sizeKb -gt $largeFileThresholdKb -and $file.FullName -match "\\docs\\") {
        $violations += [PSCustomObject]@{
          Type = "LargeDocFile"
          File = $file.FullName
          Detail = "$sizeKb KB"
        }
      }

      foreach ($pattern in $patterns) {
        $matches = Select-String -Path $file.FullName -Pattern $pattern -SimpleMatch -ErrorAction SilentlyContinue
        if ($matches) {
          $violations += [PSCustomObject]@{
            Type = "SuspiciousPattern"
            File = $file.FullName
            Detail = $pattern
          }
        }
      }
    }
}

if ($violations.Count -eq 0) {
  Write-Host "PASS: No obvious MCP context bloat risk found." -ForegroundColor Green
  exit 0
}

Write-Host "WARN: Possible MCP context bloat risks found:" -ForegroundColor Yellow
$violations |
  Sort-Object Type, File, Detail |
  Format-Table -AutoSize

Write-Host ""
Write-Host "Recommendation:" -ForegroundColor Cyan
Write-Host "- Do not store raw DOM / full snapshots in docs."
Write-Host "- Move large raw evidence to artifacts/playwright/raw."
Write-Host "- Keep only Page State Summary in markdown docs."
Write-Host "- Treat refs as temporary and avoid storing them in long-term documents."

exit 1
