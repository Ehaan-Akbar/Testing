// All requests go through the relative /api path, which Vite proxies to the
// Express backend (see vite.config.js). The backend also enables CORS, so this
// works whether served via the dev proxy or directly.
export async function fetchSongs() {
  const res = await fetch("/api/songs");
  if (!res.ok) throw new Error(`Failed to load playlist (${res.status})`);
  return res.json();
}

// Resolve a song's stream URL to an absolute path usable by <audio src>.
export function streamUrl(song) {
  return song.url; // e.g. "/api/stream/1" — proxied to the backend
}
