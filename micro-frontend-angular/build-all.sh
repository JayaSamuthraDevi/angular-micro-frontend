#!/bin/bash
echo "Building all micro-frontends..."

echo "Building Shell..."
cd shell && npm run build
echo "Shell Build Complete"

echo "Building Users..."
cd ../users && npm run build
echo "Users Build Complete"

echo "Building Instances..."
cd ../instances && npm run build
echo "Instances Build Complete"

echo "Building Storage..."
cd ../storage && npm run build
echo "Storage Build Complete"

echo "Building Volumes..."
cd ../volumes && npm run build
echo "Volumes Build Complete"

echo "All builds finished."
