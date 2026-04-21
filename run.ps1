Write-Host "Starting the backend server in a new window..."
Start-Process powershell -ArgumentList "-NoExit -Command `"cd backend; npm run dev`""

Write-Host "Starting the frontend server in a new window..."
Start-Process powershell -ArgumentList "-NoExit -Command `"cd frontend; npm run dev`""

Write-Host "Both servers are starting up!"
