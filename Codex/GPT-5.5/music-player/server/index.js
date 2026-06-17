import cors from "cors";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const audioDir = path.join(__dirname, "audio");
const clientDist = path.join(__dirname, "..", "dist");
const playlistPath = path.join(__dirname, "playlist.json");
const playlist = JSON.parse(fs.readFileSync(playlistPath, "utf8"));
const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: ["http://127.0.0.1:5173", "http://localhost:5173"] }));
app.use(express.json());

function publicTrack(track) {
  return {
    id: track.id,
    title: track.title,
    artist: track.artist,
    duration: track.duration,
    streamUrl: `/api/tracks/${encodeURIComponent(track.id)}/stream`
  };
}

function findTrack(id) {
  return playlist.find((track) => track.id === id);
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/playlist", (_req, res) => {
  const availableTracks = playlist
    .filter((track) => fs.existsSync(path.join(audioDir, track.file)))
    .map(publicTrack);

  res.json({ tracks: availableTracks });
});

app.get("/api/tracks/:id/stream", (req, res) => {
  const track = findTrack(req.params.id);

  if (!track) {
    res.status(404).json({ error: "Track not found" });
    return;
  }

  const filePath = path.join(audioDir, track.file);
  if (!filePath.startsWith(audioDir) || !fs.existsSync(filePath)) {
    res.status(404).json({ error: "Audio file not found" });
    return;
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;
  const contentType = "audio/wav";

  if (!range) {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": contentType,
      "Accept-Ranges": "bytes"
    });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  const match = range.match(/bytes=(\d*)-(\d*)/);
  if (!match) {
    res.status(416).set("Content-Range", `bytes */${fileSize}`).end();
    return;
  }

  const requestedStart = match[1] === "" ? 0 : Number.parseInt(match[1], 10);
  const requestedEnd = match[2] === "" ? fileSize - 1 : Number.parseInt(match[2], 10);
  const start = Math.max(0, requestedStart);
  const end = Math.min(requestedEnd, fileSize - 1);

  if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= fileSize) {
    res.status(416).set("Content-Range", `bytes */${fileSize}`).end();
    return;
  }

  res.writeHead(206, {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": end - start + 1,
    "Content-Type": contentType
  });

  fs.createReadStream(filePath, { start, end }).pipe(res);
});

if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Music player API running at http://127.0.0.1:${port}`);
});
