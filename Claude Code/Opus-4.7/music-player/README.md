# Music Player

A minimal full-stack music player. Express backend streams audio with HTTP range support; vanilla JS frontend handles playback UI.

## Run

```bash
cd music-player
npm install
npm start
```

Then open <http://localhost:3000>.

On first start the server generates 5 short WAV files (different tones) into `audio/` so playback works immediately with zero external files. Replace any of them with your own `.wav`/`.mp3` (keep the filename) and edit `playlist.json` if you want — the server will stop regenerating once files exist.

## Structure

```
music-player/
├── server.js          # Express: /api/playlist + /api/stream/:id (range)
├── playlist.json      # Tracks metadata + generator tones
├── package.json
├── audio/             # Audio files (auto-generated on first run)
└── public/
    ├── index.html
    ├── styles.css
    └── app.js         # Player logic
```

## API

- `GET /api/playlist` → `[{ id, title, artist, duration, size, streamUrl }]`
- `GET /api/stream/:id` → audio bytes, supports `Range:` requests (206 Partial Content)

## Notes

- Frontend is served by the same Express process — one port, no CORS quirks.
- Seek bar uses the audio element's real time/duration; range requests make scrubbing instant.
- If a file 404s the UI shows a status message and skips to the next track.
