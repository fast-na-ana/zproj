Write-Host "Setting up CampusRide Database..."
Write-Host "Creating CampusRide Database..."
sqlcmd -S localhost\SQLEXPRESS -E -Q "IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'CampusRide') CREATE DATABASE CampusRide"

Write-Host "Running Group5-phase1.sql..."
sqlcmd -S localhost\SQLEXPRESS -E -d CampusRide -i Group5-phase1.sql

Write-Host "Running Group5-phase2.sql..."
sqlcmd -S localhost\SQLEXPRESS -E -d CampusRide -i Group5-phase2.sql

Write-Host "Database Setup Complete!"
