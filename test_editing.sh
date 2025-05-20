#!/bin/bash

echo "Blog Application Test Script"
echo "============================"
echo "This script will help verify that blog editing is working properly."
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install it first."
    exit 1
fi

# Start the backend server (in the background)
echo "Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 5

# Start the frontend server (in the background)
echo "Starting frontend server..."
cd ../frontend
npm start &
FRONTEND_PID=$!

# Wait for frontend to start
echo "Waiting for frontend to start..."
sleep 10

echo
echo "=== Testing Instructions ==="
echo "1. Open your browser and navigate to http://localhost:3000"
echo "2. Register a new user or login with existing credentials"
echo "3. Create a new blog post"
echo "4. After saving or publishing, try to edit the blog"
echo "5. Verify that editing works correctly"
echo
echo "Press Ctrl+C when you're done testing to stop both servers."

# Wait for user to finish testing
wait $FRONTEND_PID

# Clean up
kill $BACKEND_PID $FRONTEND_PID
echo "Test complete. Both servers have been stopped."
