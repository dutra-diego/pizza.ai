#!/bin/sh
set -e

echo "Applying migrations..."
dotnet ef database update --project Client/Client.csproj --connection "$ConnectionStrings__DefaultConnection"

echo "Starting application..."
exec dotnet watch run --project Client/Client.csproj --urls http://0.0.0.0:7180 --no-launch-profile
