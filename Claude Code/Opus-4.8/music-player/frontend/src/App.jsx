import { useEffect, useRef, useState, useCallback } from "react";
import { fetchSongs, streamUrl } from "./api.js";

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function App() {
  const audioRef = useRef(null);

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [playbackError, setPlaybackError] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const currentSong = songs[currentIndex] || null;

  // Load the playlist from the backend on mount.
  useEffect(() => {
    let cancelled = false;
    fetchSongs()
      .then((data) => {
        if (cancelled) return;
        setSongs(data);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(err.message);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Keep the audio element's volume in sync with state.
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // When the selected song changes, load it and (if we were playing) play it.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    setPlaybackError(null);
    setCurrentTime(0);
    setDuration(currentSong.duration || 0);
    audio.src = streamUrl(currentSong);
    audio.load();

    if (isPlaying) {
      audio.play().catch((err) => {
        setPlaybackError(`Could not play "${currentSong.title}": ${err.message}`);
        setIsPlaying(false);
      });
    }
    // We intentionally only react to index changes here, not isPlaying.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, currentSong?.id]);

  const playPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setPlaybackError(null);
        })
        .catch((err) => {
          setPlaybackError(`Could not play "${currentSong.title}": ${err.message}`);
          setIsPlaying(false);
        });
    }
  }, [isPlaying, currentSong]);

  const playIndex = useCallback(
    (index) => {
      if (index < 0 || index >= songs.length) return;
      const audio = audioRef.current;
      setCurrentIndex(index);
      setIsPlaying(true);
      // The effect above swaps the src; ensure playback starts even if the
      // index is unchanged (e.g. clicking the current track).
      if (audio && songs[index]?.id === currentSong?.id) {
        audio.currentTime = 0;
        audio.play().catch((err) => {
          setPlaybackError(`Could not play "${songs[index].title}": ${err.message}`);
          setIsPlaying(false);
        });
      }
    },
    [songs, currentSong]
  );

  const next = useCallback(() => {
    if (songs.length === 0) return;
    setCurrentIndex((i) => (i + 1) % songs.length);
    setIsPlaying(true);
  }, [songs.length]);

  const prev = useCallback(() => {
    if (songs.length === 0) return;
    const audio = audioRef.current;
    // Standard behavior: restart track if more than 3s in, else go previous.
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    setCurrentIndex((i) => (i - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  }, [songs.length]);

  const onSeek = useCallback((e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setCurrentTime(value);
  }, []);

  // Wire up audio element events.
  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) setCurrentTime(audio.currentTime);
  };
  const onLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio && Number.isFinite(audio.duration)) setDuration(audio.duration);
  };
  const onEnded = () => next();
  const onAudioError = () => {
    if (currentSong) {
      setPlaybackError(`Failed to load "${currentSong.title}". The audio file may be missing.`);
      setIsPlaying(false);
    }
  };

  return (
    <div className="app">
      <div className="player">
        <h1 className="brand">🎵 Music Player</h1>

        {loading && <p className="status">Loading playlist…</p>}

        {loadError && (
          <p className="status error">
            Couldn't load playlist: {loadError}. Is the backend running on port 3001?
          </p>
        )}

        {!loading && !loadError && songs.length === 0 && (
          <p className="status">The playlist is empty.</p>
        )}

        {currentSong && (
          <>
            <div className="now-playing">
              <div className="title">{currentSong.title}</div>
              <div className="artist">{currentSong.artist}</div>
            </div>

            <div className="seek">
              <span className="time">{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || currentSong.duration || 0}
                step={0.1}
                value={Math.min(currentTime, duration || currentSong.duration || 0)}
                onChange={onSeek}
                className="seek-bar"
                aria-label="Seek"
              />
              <span className="time">{formatTime(duration || currentSong.duration)}</span>
            </div>

            <div className="controls">
              <button onClick={prev} className="ctrl" aria-label="Previous">
                ⏮
              </button>
              <button onClick={playPause} className="ctrl play" aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button onClick={next} className="ctrl" aria-label="Next">
                ⏭
              </button>
            </div>

            <div className="volume">
              <span aria-hidden="true">🔈</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="volume-bar"
                aria-label="Volume"
              />
              <span aria-hidden="true">🔊</span>
            </div>

            {playbackError && <p className="status error">{playbackError}</p>}
          </>
        )}

        {songs.length > 0 && (
          <ul className="playlist">
            {songs.map((song, index) => (
              <li
                key={song.id}
                className={`playlist-item${index === currentIndex ? " active" : ""}`}
                onClick={() => playIndex(index)}
              >
                <span className="playlist-index">
                  {index === currentIndex && isPlaying ? "♪" : index + 1}
                </span>
                <span className="playlist-meta">
                  <span className="playlist-title">{song.title}</span>
                  <span className="playlist-artist">{song.artist}</span>
                </span>
                <span className="playlist-duration">{formatTime(song.duration)}</span>
              </li>
            ))}
          </ul>
        )}

        <audio
          ref={audioRef}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={onEnded}
          onError={onAudioError}
          preload="metadata"
        />
      </div>
    </div>
  );
}
