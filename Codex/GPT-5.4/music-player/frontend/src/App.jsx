import { useEffect, useMemo, useRef, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

export default function App() {
  const audioRef = useRef(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentTrack = playlist[currentIndex] || null;
  const streamSrc = useMemo(() => {
    if (!currentTrack) {
      return "";
    }

    return `${API_BASE}${currentTrack.streamUrl}`;
  }, [currentTrack]);

  useEffect(() => {
    let cancelled = false;

    async function loadPlaylist() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE}/api/playlist`);

        if (!response.ok) {
          throw new Error("Failed to load playlist");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Playlist response was invalid");
        }

        if (!cancelled) {
          setPlaylist(data);
          setCurrentIndex(0);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load playlist");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPlaylist();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !streamSrc) {
      return;
    }

    setCurrentTime(0);
    setDuration(currentTrack?.duration || 0);
    audio.load();

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
        setError("Playback failed. Try selecting the track again.");
      });
    }
  }, [streamSrc]);

  async function togglePlay() {
    const audio = audioRef.current;

    if (!audio || !currentTrack) {
      return;
    }

    try {
      setError("");

      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch {
      setIsPlaying(false);
      setError("Playback failed. Check that the backend is running.");
    }
  }

  function playTrack(index) {
    if (index < 0 || index >= playlist.length) {
      return;
    }

    setError("");
    setCurrentIndex(index);
    setIsPlaying(true);
  }

  function playPrevious() {
    if (!playlist.length) {
      return;
    }

    const audio = audioRef.current;

    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    playTrack((currentIndex - 1 + playlist.length) % playlist.length);
  }

  function playNext() {
    if (!playlist.length) {
      return;
    }

    playTrack((currentIndex + 1) % playlist.length);
  }

  function handleSeek(event) {
    const audio = audioRef.current;
    const nextTime = Number(event.target.value);

    setCurrentTime(nextTime);

    if (audio && Number.isFinite(nextTime)) {
      audio.currentTime = nextTime;
    }
  }

  function handleVolume(event) {
    setVolume(Number(event.target.value));
  }

  function handleLoadedMetadata() {
    const audio = audioRef.current;
    const nextDuration = audio?.duration || currentTrack?.duration || 0;
    setDuration(Number.isFinite(nextDuration) ? nextDuration : currentTrack?.duration || 0);
  }

  function handleTimeUpdate() {
    const audio = audioRef.current;

    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  }

  function handleEnded() {
    playNext();
  }

  function handlePlaybackError() {
    setIsPlaying(false);
    setError("This audio file could not be played.");
  }

  return (
    <main className="app">
      <section className="player">
        <div className="now-playing">
          <p className="eyebrow">Now playing</p>
          <h1>{currentTrack ? currentTrack.title : "No track selected"}</h1>
          <p>{currentTrack ? currentTrack.artist : "Start the backend to load songs"}</p>
        </div>

        <audio
          ref={audioRef}
          src={streamSrc}
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={handlePlaybackError}
        />

        <div className="controls" aria-label="Playback controls">
          <button type="button" onClick={playPrevious} disabled={!playlist.length}>
            Previous
          </button>
          <button
            type="button"
            className="primary"
            onClick={togglePlay}
            disabled={!currentTrack}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button type="button" onClick={playNext} disabled={!playlist.length}>
            Next
          </button>
        </div>

        <div className="timeline">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={Math.max(duration || currentTrack?.duration || 0, 1)}
            step="0.01"
            value={Math.min(currentTime, duration || currentTrack?.duration || 0)}
            onChange={handleSeek}
            disabled={!currentTrack}
            aria-label="Seek"
          />
          <span>{formatTime(duration || currentTrack?.duration || 0)}</span>
        </div>

        <label className="volume">
          <span>Volume</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolume}
          />
          <span>{Math.round(volume * 100)}%</span>
        </label>

        {loading && <p className="status">Loading playlist...</p>}
        {error && <p className="status error">{error}</p>}
      </section>

      <section className="playlist" aria-label="Playlist">
        <div className="playlist-header">
          <h2>Playlist</h2>
          <span>{playlist.length} tracks</span>
        </div>

        {!loading && playlist.length === 0 && !error && (
          <p className="status">No tracks are available.</p>
        )}

        <ul>
          {playlist.map((track, index) => (
            <li key={track.id}>
              <button
                type="button"
                className={index === currentIndex ? "active" : ""}
                onClick={() => playTrack(index)}
              >
                <span className="track-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="track-copy">
                  <strong>{track.title}</strong>
                  <small>{track.artist}</small>
                </span>
                <span>{formatTime(track.duration)}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
