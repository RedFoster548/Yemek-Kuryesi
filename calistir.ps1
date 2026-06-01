# Node.js PATH'e eklenmediyse bu script ile projeyi başlatın
$nodePath = "C:\Program Files\nodejs"
if (Test-Path "$nodePath\npm.cmd") {
    $env:Path = "$nodePath;" + $env:Path
    Set-Location $PSScriptRoot
    Write-Host "TaskFlow Pro baslatiliyor..." -ForegroundColor Cyan
    Write-Host "Tarayici: http://localhost:5173" -ForegroundColor Green
    npm.cmd run dev
} else {
    Write-Host "Node.js bulunamadi. https://nodejs.org adresinden LTS kurun." -ForegroundColor Red
}
