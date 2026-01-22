# Full Stack Chat Application

A real-time chat application using React, Node.js, Express, Socket.io, and Firebase.

## Project Structure

```
full-stack-chat-app/
├── chat-app-backend/           # Node.js/Express Backend
│   ├── node_modules/           # Backend dependencies
│   ├── firebaseConfig.js       # Firebase Client SDK Configuration
│   ├── package.json            # Backend scripts and dependencies
│   ├── seed.js                 # Script to seed initial users and conversations
│   ├── server.js               # Main Express server with Socket.io
│   └── serviceAccountKey.json  # (Optional) Admin SDK key (deprecated in favor of Client SDK)
│
├── chat-app-frontend/          # React Frontend (Vite)
│   ├── node_modules/           # Frontend dependencies
│   ├── public/                 # Static assets
│   ├── src/                    # Source code
│   │   ├── assets/             # Images and local assets
│   │   ├── App.css             # Component styles
│   │   ├── App.jsx             # Main Chat Component
│   │   ├── index.css           # Global styles
│   │   └── main.jsx            # Entry point
│   ├── index.html              # HTML template
│   ├── package.json            # Frontend scripts and dependencies
│   └── vite.config.js          # Vite configuration
│
└── firebase_schema.md          # Database schema documentation
```

## Getting Started

1. **Backend**:
   - Navigate to `chat-app-backend`.
   - Run `npm install`.
   - Add your credentials to `firebaseConfig.js`.
   - Run `node server.js`.

2. **Frontend**:
   - Navigate to `chat-app-frontend`.
   - Run `npm install`.
   - Run `npm run dev`.
   - Open specific URL (usually http://localhost:5173).

## Features
- Real-time messaging with Socket.io
- Firebase Firestore integration (Client SDK)
- Multi-user simulation (User Switching)
