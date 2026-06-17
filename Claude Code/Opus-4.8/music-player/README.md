# 🎵 Music Player

A complete, fully wired music player web app — React frontend + Node/Express backend with real audio streaming and HTTP range support (working seek bar).

The audio files are **generated automatically** (short pleasant chord tones) the first time the backend starts, so the app works immediately with no external assets to download.

## Project structure

```
music-player/
├── backend/
│   ├── audio/                # generated .wav files (created on first start)
│   ├── generate-audio.js     # creates real, playable WAV files
│   ├── playlist.js           # playlist metadata
│   ├── server.js             # Express API: /api/songs + /api/stream/:id (range support)
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── vite.config.js        # proxies /api -> http://localhost:3001
│   ├── src/
│   │   ├── api.js            # fetch playlist + stream URLs
│   │   ├── App.jsx           # player UI + state
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Requirements

- Node.js 18+ (tested on Node 24) and npm

## Run it (two terminals)

### 1. Start the backend

```bash
cd backend
npm install
npm start
```

The first start auto-generates the audio files, then serves:

- `http://localhost:3001/api/songs` — playlist metadata
- `http://localhost:3001/api/stream/:id` — audio stream with range support

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (default **http://localhost:5173**).

## Features

- Play / Pause, Next / Previous controls
- Scrubbable seek bar that updates in real time (backed by HTTP range requests)
- Volume control
- Track title, artist, and duration display
- Clickable playlist to switch songs
- Auto-advance to the next track when one ends
- Handles edge cases: empty playlist, failed playback / missing file, backend unreachable

## How it's wired

- The frontend fetches the playlist from `/api/songs` on load (no hardcoded songs).
- `<audio>` plays from `/api/stream/:id` (no hardcoded file paths).
- Vite proxies `/api` to the backend; the backend also enables CORS, so either approach works.
- The backend streams audio with `Accept-Ranges`/`Content-Range` (HTTP 206) so seeking is precise.
