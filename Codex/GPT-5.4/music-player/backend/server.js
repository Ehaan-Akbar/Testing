import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 4000);
const audioDir = path.join(__dirname, "audio");

const playlist = [
  {
    id: "aurora-pulse",
    title: "Aurora Pulse",
    artist: "Local Synths",
    duration: 16,
    file: "aurora-pulse.wav"
  },
  {
    id: "city-lights",
    title: "City Lights",
    artist: "Local Synths",
    duration: 18,
    file: "city-lights.wav"
  },
  {
    id: "midnight-signal",
    title: "Midnight Signal",
    artist: "Local Synths",
    duration: 20,
    file: "midnight-signal.wav"
  },
  {
    id: "sunrise-loop",
    title: "Sunrise Loop",
    artist: "Local Synths",
    duration: 17,
    file: "sunrise-loop.wav"
  }
];

app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/playlist", (_req, res) => {
  const tracks = playlist.map(({ id, title, artist, duration }) => ({
    id,
    title,
    artist,
    duration,
    streamUrl: `/api/stream/${id}`
  }));

  res.json(tracks);
});

app.get("/api/stream/:id", (req, res) => {
  const track = playlist.find((song) => song.id === req.params.id);

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

  res.setHeader("Accept-Ranges", "bytes");
  res.setHeader("Content-Type", "audio/wav");

  if (!range) {
    res.setHeader("Content-Length", fileSize);
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  const match = range.match(/bytes=(\d*)-(\d*)/);

  if (!match) {
    res.status(416).setHeader("Content-Range", `bytes */${fileSize}`).end();
    return;
  }

  const start = match[1] ? Number.parseInt(match[1], 10) : 0;
  const end = match[2] ? Number.parseInt(match[2], 10) : fileSize - 1;

  if (
    Number.isNaN(start) ||
    Number.isNaN(end) ||
    start < 0 ||
    end >= fileSize ||
    start > end
  ) {
    res.status(416).setHeader("Content-Range", `bytes */${fileSize}`).end();
    return;
  }

  res.status(206);
  res.setHeader("Content-Range", `bytes ${start}-${end}/${fileSize}`);
  res.setHeader("Content-Length", end - start + 1);

  fs.createReadStream(filePath, { start, end }).pipe(res);
});

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Music backend running at http://localhost:${PORT}`);
});
