import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const audioDir = path.join(__dirname, "..", "audio");
const playlistPath = path.join(__dirname, "..", "playlist.json");
const playlist = JSON.parse(fs.readFileSync(playlistPath, "utf8"));
const sampleRate = 44100;
const channels = 1;
const bitsPerSample = 16;

const arrangements = {
  "morning-pulse": [261.63, 329.63, 392.0, 523.25],
  "city-lights": [220.0, 277.18, 329.63, 440.0],
  "quiet-orbit": [196.0, 246.94, 293.66, 392.0],
  "late-train": [174.61, 220.0, 261.63, 349.23]
};

function writeString(buffer, offset, value) {
  buffer.write(value, offset, value.length, "ascii");
}

function createWav(track) {
  const totalSamples = Math.floor(track.duration * sampleRate);
  const dataSize = totalSamples * channels * (bitsPerSample / 8);
  const buffer = Buffer.alloc(44 + dataSize);
  const byteRate = sampleRate * channels * (bitsPerSample / 8);
  const blockAlign = channels * (bitsPerSample / 8);
  const notes = arrangements[track.id] || [220, 330, 440];

  writeString(buffer, 0, "RIFF");
  buffer.writeUInt32LE(36 + dataSize, 4);
  writeString(buffer, 8, "WAVE");
  writeString(buffer, 12, "fmt ");
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(channels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  writeString(buffer, 36, "data");
  buffer.writeUInt32LE(dataSize, 40);

  for (let sample = 0; sample < totalSamples; sample += 1) {
    const time = sample / sampleRate;
    const bar = Math.floor(time / 0.75);
    const base = notes[bar % notes.length];
    const envelope = Math.min(1, time / 0.08) * Math.min(1, (track.duration - time) / 0.2);
    const beat = Math.sin(2 * Math.PI * 2 * time) > 0.55 ? 0.18 : 0;
    const wave =
      Math.sin(2 * Math.PI * base * time) * 0.24 +
      Math.sin(2 * Math.PI * base * 1.5 * time) * 0.08 +
      Math.sin(2 * Math.PI * base * 2 * time) * 0.05 +
      beat;
    const value = Math.max(-1, Math.min(1, wave * envelope));
    buffer.writeInt16LE(Math.round(value * 32767), 44 + sample * 2);
  }

  return buffer;
}

fs.mkdirSync(audioDir, { recursive: true });

for (const track of playlist) {
  const filePath = path.join(audioDir, track.file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, createWav(track));
    console.log(`Created ${path.relative(process.cwd(), filePath)}`);
  }
}
