#!/bin/bash

# Kill all background jobs on exit
trap 'kill $(jobs -p)' EXIT

echo "Starting all apps in development mode..."

# 1. Start Shell (Port 4200)
echo "Starting Shell on 4200..."
(cd shell && npx ng serve --port 4200 --open) &
PID_SHELL=$!

# 2. Start Users (Port 4201)
echo "Starting Users on 4201..."
(cd users && npx ng serve --port 4201) &
PID_USERS=$!

# 3. Start Instances (Port 4202)
echo "Starting Instances on 4202..."
(cd instances && npx ng serve --port 4202) &
PID_INSTANCES=$!

# 4. Start Storage (Port 4203)
echo "Starting Storage on 4203..."
(cd storage && npx ng serve --port 4203) &
PID_STORAGE=$!

# 5. Start Volumes (Port 4204)
echo "Starting Volumes on 4204..."
(cd volumes && npx ng serve --port 4204) &
PID_VOLUMES=$!

echo "------------------------------------------------"
echo "✅ Apps are starting up!"
echo "   Shell:     http://localhost:4200"
echo "   Users:     http://localhost:4201"
echo "   Instances: http://localhost:4202"
echo "   Storage:   http://localhost:4203"
echo "   Volumes:   http://localhost:4204"
echo "------------------------------------------------"
echo "Press [CTRL+C] to stop all."

wait
