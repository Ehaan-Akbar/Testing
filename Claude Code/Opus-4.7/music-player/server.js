const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const AUDIO_DIR = path.join(__dirname, 'audio');
const PLAYLIST_PATH = path.join(__dirname, 'playlist.json');

// ---- WAV generation ----------------------------------------------------
// Creates a 16-bit PCM mono WAV at 44.1kHz. Simple sine with slow fade-in/out
// so tracks are audible and pleasant rather than clipping.
function generateWav(filePath, freqHz, seconds) {
  const sampleRate = 44100;
  const numSamples = Math.floor(sampleRate * seconds);
  const bytesPerSample = 2;
  const dataSize = numSamples * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  // fmt chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);          // PCM chunk size
  buffer.writeUInt16LE(1, 20);           // PCM format
  buffer.writeUInt16LE(1, 22);           // mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * bytesPerSample, 28);
  buffer.writeUInt16LE(bytesPerSample, 32);
  buffer.writeUInt16LE(16, 34);          // bits per sample
  // data chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  const fadeSamples = Math.min(sampleRate * 1, numSamples / 2);
  for (let i = 0; i < numSamples; i++) {
    let amp = 0.35;
    if (i < fadeSamples) amp *= i / fadeSamples;
    else if (i > numSamples - fadeSamples) amp *= (numSamples - i) / fadeSamples;

    // main tone + soft 5th harmonic for texture
    const t = i / sampleRate;
    const s =
      Math.sin(2 * Math.PI * freqHz * t) * 0.8 +
      Math.sin(2 * Math.PI * freqHz * 1.5 * t) * 0.2;
    const sample = Math.max(-1, Math.min(1, s * amp));
    buffer.writeInt16LE(Math.round(sample * 32767), 44 + i * bytesPerSample);
  }

  fs.writeFileSync(filePath, buffer);
}

function ensureAudioFiles(playlist) {
  if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR, { recursive: true });
  for (const track of playlist) {
    const p = path.join(AUDIO_DIR, track.file);
    if (!fs.existsSync(p)) {
      console.log(`Generating ${track.file} (${track.seconds}s @ ${track.tone}Hz)...`);
      generateWav(p, track.tone, track.seconds);
    }
  }
}

// ---- Playlist loading --------------------------------------------------
function loadPlaylist() {
  const raw = JSON.parse(fs.readFileSync(PLAYLIST_PATH, 'utf8'));
  return raw.map(t => {
    const filePath = path.join(AUDIO_DIR, t.file);
    let size = 0;
    try { size = fs.statSync(filePath).size; } catch (_) {}
    return {
      id: t.id,
      title: t.title,
      artist: t.artist,
      duration: t.seconds,
      size,
      streamUrl: `/api/stream/${encodeURIComponent(t.id)}`
    };
  });
}

// ---- App ---------------------------------------------------------------
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

let playlistRaw = JSON.parse(fs.readFileSync(PLAYLIST_PATH, 'utf8'));
ensureAudioFiles(playlistRaw);

app.get('/api/playlist', (req, res) => {
  try {
    res.json(loadPlaylist());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load playlist' });
  }
});

app.get('/api/stream/:id', (req, res) => {
  const track = playlistRaw.find(t => t.id === req.params.id);
  if (!track) return res.status(404).json({ error: 'Track not found' });

  const filePath = path.join(AUDIO_DIR, track.file);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Audio file missing' });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;
  const mime = 'audio/wav';

  if (!range) {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': mime,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache'
    });
    return fs.createReadStream(filePath).pipe(res);
  }

  const match = /bytes=(\d*)-(\d*)/.exec(range);
  if (!match) {
    res.status(416).set('Content-Range', `bytes */${fileSize}`).end();
    return;
  }
  const start = match[1] ? parseInt(match[1], 10) : 0;
  const end = match[2] ? parseInt(match[2], 10) : fileSize - 1;
  if (isNaN(start) || isNaN(end) || start > end || end >= fileSize) {
    res.status(416).set('Content-Range', `bytes */${fileSize}`).end();
    return;
  }

  res.writeHead(206, {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': end - start + 1,
    'Content-Type': mime,
    'Cache-Control': 'no-cache'
  });
  fs.createReadStream(filePath, { start, end }).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Music player running at http://localhost:${PORT}`);
});
