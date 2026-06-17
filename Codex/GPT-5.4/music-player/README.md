# Local Music Player

A minimal full-stack music player using React, Vite, Node.js, and Express. The frontend fetches the playlist from the backend and plays every track through backend streaming endpoints with HTTP range support.

## Project Structure

```text
local-music-player/
  package.json
  README.md
  backend/
    package.json
    server.js
    audio/
      aurora-pulse.wav
      city-lights.wav
      midnight-signal.wav
      sunrise-loop.wav
  frontend/
    package.json
    index.html
    vite.config.js
    src/
      App.jsx
      main.jsx
      styles.css
```

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start backend and frontend together:

```bash
npm run dev
```

3. Open the app:

```text
http://localhost:5173
```

Backend API:

```text
http://localhost:4000/api/playlist
http://localhost:4000/api/stream/:id
```

## Separate Commands

Start only the backend:

```bash
npm run dev --workspace backend
```

Start only the frontend:

```bash
npm run dev --workspace frontend
```
