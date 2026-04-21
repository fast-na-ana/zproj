# Install backend dependencies
Write-Host "Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies (including missing ones)
Write-Host "Installing frontend dependencies..."
cd frontend
npm install react-hook-form lucide-react axios react-router-dom react react-dom
npm install
cd ..

Write-Host "Setup complete!"
