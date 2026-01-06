#!/bin/bash

# Kill all background jobs on exit
trap 'kill $(jobs -p)' EXIT

echo "🚀 Starting Enterprise Workspace Platform..."

# Start the unified app from the workspace root
npx ng serve --port 4200 --open

echo "------------------------------------------------"
echo "✅ Workspace Platform is live at http://localhost:4200"
echo "------------------------------------------------"
