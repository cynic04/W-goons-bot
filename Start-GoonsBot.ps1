[CmdletBinding()]
param (
    [Alias("s")]
    [Switch]$Stop
)

$ProjectRoot = $PSScriptRoot
$PidFile = Join-Path $ProjectRoot ".goons-bot.pid"

if ($Stop) {
    Write-Host "Stopping GoonsBot services..." -ForegroundColor Yellow
    if (Test-Path $PidFile) {
        $pids = Get-Content $PidFile -ErrorAction SilentlyContinue
        foreach ($pidToKill in $pids) {
            if ($pidToKill -and (Get-Process -Id $pidToKill -ErrorAction SilentlyContinue)) {
                Write-Host "Stopping process tree for PID $pidToKill..." -ForegroundColor Cyan
                taskkill /PID $pidToKill /T /F *>$null
            }
        }
        Remove-Item $PidFile -Force -ErrorAction SilentlyContinue
        Write-Host "All services stopped." -ForegroundColor Green
    } else {
        Write-Host "No active PID file found ($PidFile). Services may not be running." -ForegroundColor Yellow
    }
    return
}

# Check if services are already running
if (Test-Path $PidFile) {
    $existingPids = Get-Content $PidFile -ErrorAction SilentlyContinue
    $runningPids = @()
    foreach ($p in $existingPids) {
        if ($p -and (Get-Process -Id $p -ErrorAction SilentlyContinue)) {
            $runningPids += $p
        }
    }
    if ($runningPids.Count -gt 0) {
        Write-Host "Services are already running (PIDs: $($runningPids -join ', '))." -ForegroundColor Yellow
        Write-Host "Run '.\Start-GoonsBot.ps1 -Stop' to stop them first." -ForegroundColor Yellow
        return
    }
}

Write-Host "Starting Backend (FastAPI)..." -ForegroundColor Yellow
$backendProc = Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$ProjectRoot\backend'; `$Host.UI.RawUI.WindowTitle = 'W-goons Backend'; Write-Host '--- Backend Server (FastAPI) ---' -ForegroundColor Cyan; uv run fastapi dev" -PassThru

Write-Host "Starting Frontend (Vite)..." -ForegroundColor Yellow
$frontendProc = Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$ProjectRoot\frontend'; `$Host.UI.RawUI.WindowTitle = 'W-goons Frontend'; Write-Host '--- Frontend Server (Vite) ---' -ForegroundColor Cyan; npm run dev" -PassThru

@($backendProc.Id, $frontendProc.Id) | Set-Content $PidFile

Write-Host "Both servers started in separate terminal windows." -ForegroundColor Green
Write-Host "To stop all services, run: .\Start-GoonsBot.ps1 -Stop" -ForegroundColor Gray
