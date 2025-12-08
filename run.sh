#!/bin/bash
echo "Starting VIPERE-WEB"
cd backend
python3 api.py &
cd ..
cd frontend
npm start &
cd ..