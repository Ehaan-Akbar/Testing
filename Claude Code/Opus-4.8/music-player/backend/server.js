import express from "express";
import cors from "cors";
import { createReadStream, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, normalize } from "node:path";
import { PLAYLIST } from "./playlist.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const AUDIO_DIR = join(__dirname, "audio");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

// Map a song id to its on-disk file path, guarding against path traversal.
function resolveSongPath(id) {
  const song = PLAYLIST.find((s) => s.id === id);
  if (!song) return null;
  const filePath = normalize(join(AUDIO_DIR, song.file));
  if (!filePath.startsWith(AUDIO_DIR)) return null; // traversal guard
  return filePath;
}

const MIME_TYPES = {
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  ".ogg": "audio/ogg",
  ".m4a": "audio/mp4",
};

function contentTypeFor(filePath) {
  const ext = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream";
}

// Health check.
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Playlist metadata (no file system paths exposed to the client).
app.get("/api/songs", (_req, res) => {
  const songs = PLAYLIST.map(({ id, title, artist, duration }) => ({
    id,
    title,
    artist,
    duration,
    url: `/api/stream/${id}`,
  }));
  res.json(songs);
});

// Audio streaming with HTTP range support so seeking works correctly.
app.get("/api/stream/:id", (req, res) => {
  const filePath = resolveSongPath(req.params.id);

  if (!filePath || !existsSync(filePath)) {
    return res.status(404).json({ error: "Song not found" });
  }

  const { size } = statSync(filePath);
  const contentType = contentTypeFor(filePath);
  const range = req.headers.range;

  if (!range) {
    // No range requested: send the whole file.
    res.writeHead(200, {
      "Content-Length": size,
      "Content-Type": contentType,
      "Accept-Ranges": "bytes",
    });
    return createReadStream(filePath).pipe(res);
  }

  // Parse "bytes=start-end".
  const match = /bytes=(\d*)-(\d*)/.exec(range);
  let start = match && match[1] ? parseInt(match[1], 10) : 0;
  let end = match && match[2] ? parseInt(match[2], 10) : size - 1;

  // Clamp to valid bounds.
  if (isNaN(start) || start < 0) start = 0;
  if (isNaN(end) || end >= size) end = size - 1;

  if (start > end) {
    res.writeHead(416, { "Content-Range": `bytes */${size}` });
    return res.end();
  }

  const chunkSize = end - start + 1;
  res.writeHead(206, {
    "Content-Range": `bytes ${start}-${end}/${size}`,
    "Accept-Ranges": "bytes",
    "Content-Length": chunkSize,
    "Content-Type": contentType,
  });
  createReadStream(filePath, { start, end }).pipe(res);
});

app.listen(PORT, () => {
  console.log(`🎵 Music player backend running at http://localhost:${PORT}`);
  console.log(`   Playlist:  http://localhost:${PORT}/api/songs`);
});
