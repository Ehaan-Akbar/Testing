# Local Music Player

A complete local music player with a React frontend and an Express backend. The frontend fetches the playlist from the API and plays every track through the backend streaming endpoint with HTTP range support for seeking.

## Project Structure

```text
music-player/
  index.html
  package.json
  package-lock.json
  README.md
  server/
    index.js
    playlist.json
    audio/
      morning-pulse.wav
      city-lights.wav
      quiet-orbit.wav
      late-train.wav
    scripts/
      generate-audio.js
  src/
    main.jsx
    styles.css
```

## Run Locally

Install dependencies:

```bash
npm install
```

Start the backend API:

```bash
npm run server
```

Start the frontend app in a second terminal:

```bash
npm run client
```

Open `http://127.0.0.1:5173/`.

## Production Mode

Build the frontend:

```bash
npm run build
```

Start the Express server:

```bash
npm run server
```

Open `http://127.0.0.1:4000/`.

## API

- `GET /api/playlist` returns playable tracks with metadata and stream URLs.
- `GET /api/tracks/:id/stream` streams local WAV files and supports `Range` requests.
