#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
Set-Location (Split-Path $PSScriptRoot)

node_modules/.bin/compodoc.ps1 --config=etc/compodoc.yaml
mkdocs build --config-file=etc/mkdocs.yaml
