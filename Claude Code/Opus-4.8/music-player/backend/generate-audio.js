// Generates small, real, playable WAV files so the app works on the very first run
// with no external assets. Each track is a pleasant multi-tone chord with fade in/out
// to avoid clicks. Files are only created if they don't already exist.
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const AUDIO_DIR = join(__dirname, "audio");

const SAMPLE_RATE = 44100;

// Each entry produces one WAV file. Frequencies are the notes of a simple chord.
const TRACKS = [
  { file: "track1.wav", seconds: 18, freqs: [261.63, 329.63, 392.0] }, // C major
  { file: "track2.wav", seconds: 22, freqs: [293.66, 369.99, 440.0] }, // D major
  { file: "track3.wav", seconds: 15, freqs: [220.0, 277.18, 329.63] }, // A major
  { file: "track4.wav", seconds: 27, freqs: [196.0, 246.94, 293.66] }, // G major
];

function buildWav(seconds, freqs) {
  const numSamples = Math.floor(SAMPLE_RATE * seconds);
  const bytesPerSample = 2; // 16-bit
  const dataSize = numSamples * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write("RIFF", 0, "ascii");
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8, "ascii");

  // fmt chunk
  buffer.write("fmt ", 12, "ascii");
  buffer.writeUInt32LE(16, 16); // PCM chunk size
  buffer.writeUInt16LE(1, 20); // audio format = PCM
  buffer.writeUInt16LE(1, 22); // channels = mono
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * bytesPerSample, 28); // byte rate
  buffer.writeUInt16LE(bytesPerSample, 32); // block align
  buffer.writeUInt16LE(16, 34); // bits per sample

  // data chunk
  buffer.write("data", 36, "ascii");
  buffer.writeUInt32LE(dataSize, 40);

  const fadeSamples = Math.min(SAMPLE_RATE * 0.5, numSamples / 2);
  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let sample = 0;
    for (const f of freqs) sample += Math.sin(2 * Math.PI * f * t);
    sample /= freqs.length;

    // Fade in / out envelope to avoid clicks.
    let env = 1;
    if (i < fadeSamples) env = i / fadeSamples;
    else if (i > numSamples - fadeSamples) env = (numSamples - i) / fadeSamples;

    const value = Math.max(-1, Math.min(1, sample * env)) * 0.6;
    buffer.writeInt16LE(Math.round(value * 32767), 44 + i * bytesPerSample);
  }

  return buffer;
}

function main() {
  if (!existsSync(AUDIO_DIR)) mkdirSync(AUDIO_DIR, { recursive: true });

  for (const track of TRACKS) {
    const outPath = join(AUDIO_DIR, track.file);
    if (existsSync(outPath)) {
      console.log(`✓ ${track.file} already exists, skipping`);
      continue;
    }
    const wav = buildWav(track.seconds, track.freqs);
    writeFileSync(outPath, wav);
    console.log(`✓ generated ${track.file} (${track.seconds}s)`);
  }
}

main();
