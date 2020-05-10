#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
Set-Location (Split-Path $PSScriptRoot)

node_modules/.bin/ng build
if (-not (Test-Path lib)) { New-Item lib -ItemType Directory | Out-Null }

$regex = "(export|import)\s+(.+)\s+from\s+'((?!.*\.js)\.[^']+)'"
foreach ($item in Get-ChildItem build/esm2015 -File -Filter '*.js') {
  $file = Get-Content $item -Raw
  ($file -replace $regex, '$1 $2 from ''$3.js''') -replace "`r?`n//# sourceMappingURL=.*$", '' | Out-File "lib/$($item.Name)"
}

foreach ($item in Get-ChildItem build -File -Filter '*.d.ts') {
  Copy-Item $item "lib/$($item.Name)"
}

Remove-Item build -Recurse
