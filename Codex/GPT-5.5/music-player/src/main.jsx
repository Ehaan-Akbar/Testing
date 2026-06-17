import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:4000";

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const whole = Math.floor(seconds);
  const minutes = Math.floor(whole / 60);
  const remaining = String(whole % 60).padStart(2, "0");
  return `${minutes}:${remaining}`;
}

function App() {
  const audioRef = useRef(null);
  const [tracks, setTracks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const currentTrack = tracks[currentIndex] || null;
  const streamUrl = useMemo(() => {
    return currentTrack ? `${API_BASE}${currentTrack.streamUrl}` : "";
  }, [currentTrack]);

  useEffect(() => {
    let ignore = false;

    async function loadPlaylist() {
      try {
        const response = await fetch(`${API_BASE}/api/playlist`);
        if (!response.ok) {
          throw new Error(`Playlist request failed with ${response.status}`);
        }

        const data = await response.json();
        if (!ignore) {
          setTracks(Array.isArray(data.tracks) ? data.tracks : []);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setError("Unable to load playlist. Start the backend server and refresh.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadPlaylist();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(currentTrack?.duration || 0);
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current || !streamUrl) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
        setError("Playback failed. The audio stream could not be started.");
      });
    }
  }, [streamUrl, isPlaying]);

  function playTrack(index) {
    if (index < 0 || index >= tracks.length) {
      return;
    }

    setCurrentIndex(index);
    setError("");
    setIsPlaying(true);
  }

  function togglePlayback() {
    const audio = audioRef.current;
    if (!audio || !currentTrack) {
      return;
    }

    if (audio.paused) {
      audio.play().then(() => {
        setIsPlaying(true);
        setError("");
      }).catch(() => {
        setIsPlaying(false);
        setError("Playback failed. Try another track.");
      });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function goToNext() {
    if (!tracks.length) {
      return;
    }

    playTrack((currentIndex + 1) % tracks.length);
  }

  function goToPrevious() {
    if (!tracks.length) {
      return;
    }

    playTrack((currentIndex - 1 + tracks.length) % tracks.length);
  }

  function seekTo(value) {
    const nextTime = Number(value);
    if (!audioRef.current || !Number.isFinite(nextTime)) {
      return;
    }

    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  function handleLoadedMetadata() {
    const audioDuration = audioRef.current?.duration;
    setDuration(Number.isFinite(audioDuration) ? audioDuration : currentTrack?.duration || 0);
  }

  return (
    <main className="shell">
      <section className="player" aria-label="Music player">
        <div className="nowPlaying">
          <p className="eyebrow">Now playing</p>
          <h1>{currentTrack ? currentTrack.title : "No track selected"}</h1>
          <p>{currentTrack ? currentTrack.artist : "Start the backend to load the playlist"}</p>
        </div>

        <audio
          ref={audioRef}
          src={streamUrl}
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={goToNext}
          onError={() => {
            if (currentTrack) {
              setError(`Could not play "${currentTrack.title}". The audio file may be missing.`);
              setIsPlaying(false);
            }
          }}
        />

        <div className="controls" aria-label="Playback controls">
          <button type="button" onClick={goToPrevious} disabled={!tracks.length} aria-label="Previous track">
            Prev
          </button>
          <button type="button" className="primary" onClick={togglePlayback} disabled={!currentTrack}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button type="button" onClick={goToNext} disabled={!tracks.length} aria-label="Next track">
            Next
          </button>
        </div>

        <div className="seekRow">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={Math.max(duration, 0)}
            step="0.01"
            value={Math.min(currentTime, duration || currentTime)}
            onChange={(event) => seekTo(event.target.value)}
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
            onChange={(event) => setVolume(Number(event.target.value))}
          />
          <span>{Math.round(volume * 100)}%</span>
        </label>

        {error ? <p className="error" role="alert">{error}</p> : null}
      </section>

      <section className="playlist" aria-label="Playlist">
        <div className="playlistHeader">
          <h2>Playlist</h2>
          <span>{tracks.length} tracks</span>
        </div>

        {isLoading ? <p className="empty">Loading playlist...</p> : null}
        {!isLoading && !tracks.length ? <p className="empty">No playable tracks were found.</p> : null}

        <div className="trackList">
          {tracks.map((track, index) => (
            <button
              type="button"
              key={track.id}
              className={`track ${index === currentIndex ? "active" : ""}`}
              onClick={() => playTrack(index)}
            >
              <span className="trackNumber">{String(index + 1).padStart(2, "0")}</span>
              <span className="trackText">
                <strong>{track.title}</strong>
                <small>{track.artist}</small>
              </span>
              <span>{formatTime(track.duration)}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
