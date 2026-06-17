// The playlist served to the frontend. `file` maps to a real file in ./audio
// (created by generate-audio.js). `duration` is in seconds and matches the
// generated audio so the UI can render it before playback even begins.
export const PLAYLIST = [
  {
    id: "1",
    title: "Sunrise in C",
    artist: "The Oscillators",
    duration: 18,
    file: "track1.wav",
  },
  {
    id: "2",
    title: "Drifting in D",
    artist: "Sine & Cosine",
    duration: 22,
    file: "track2.wav",
  },
  {
    id: "3",
    title: "A Minor Detour",
    artist: "Wavelength",
    duration: 15,
    file: "track3.wav",
  },
  {
    id: "4",
    title: "Gravity in G",
    artist: "The Oscillators",
    duration: 27,
    file: "track4.wav",
  },
];
