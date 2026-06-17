(() => {
  const audio       = document.getElementById('audio');
  const titleEl     = document.getElementById('trackTitle');
  const artistEl    = document.getElementById('trackArtist');
  const playBtn     = document.getElementById('playBtn');
  const prevBtn     = document.getElementById('prevBtn');
  const nextBtn     = document.getElementById('nextBtn');
  const seek        = document.getElementById('seek');
  const volume      = document.getElementById('volume');
  const currentTime = document.getElementById('currentTime');
  const durationEl  = document.getElementById('duration');
  const playlistEl  = document.getElementById('playlistEl');
  const statusEl    = document.getElementById('status');

  let playlist = [];
  let currentIndex = -1;
  let isSeeking = false;

  function fmtTime(s) {
    if (!isFinite(s) || s < 0) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  function setStatus(msg) { statusEl.textContent = msg || ''; }

  function renderPlaylist() {
    playlistEl.innerHTML = '';
    if (!playlist.length) {
      const li = document.createElement('li');
      li.textContent = 'No tracks available.';
      playlistEl.appendChild(li);
      return;
    }
    playlist.forEach((t, i) => {
      const li = document.createElement('li');
      if (i === currentIndex) li.classList.add('active');
      li.innerHTML = `
        <div class="meta">
          <span class="t"></span>
          <span class="a"></span>
        </div>
        <span class="d">${fmtTime(t.duration)}</span>`;
      li.querySelector('.t').textContent = t.title;
      li.querySelector('.a').textContent = t.artist;
      li.addEventListener('click', () => loadTrack(i, true));
      playlistEl.appendChild(li);
    });
  }

  function loadTrack(index, autoplay) {
    if (!playlist.length) return;
    if (index < 0) index = playlist.length - 1;
    if (index >= playlist.length) index = 0;
    currentIndex = index;
    const track = playlist[index];

    titleEl.textContent = track.title;
    artistEl.textContent = track.artist;
    durationEl.textContent = fmtTime(track.duration);
    seek.value = 0;
    currentTime.textContent = '0:00';
    setStatus('');

    audio.src = track.streamUrl;
    audio.load();
    renderPlaylist();

    if (autoplay) {
      audio.play().catch(err => {
        setStatus('Playback blocked — click play.');
        updatePlayButton();
      });
    }
    updatePlayButton();
  }

  function updatePlayButton() {
    playBtn.textContent = audio.paused ? '▶' : '⏸';
    playBtn.setAttribute('aria-label', audio.paused ? 'Play' : 'Pause');
  }

  function togglePlay() {
    if (currentIndex === -1) {
      if (playlist.length) loadTrack(0, true);
      return;
    }
    if (audio.paused) {
      audio.play().catch(() => setStatus('Unable to play this track.'));
    } else {
      audio.pause();
    }
  }

  // --- Wiring -----------------------------------------------------------
  playBtn.addEventListener('click', togglePlay);
  prevBtn.addEventListener('click', () => loadTrack(currentIndex - 1, !audio.paused || currentIndex !== -1));
  nextBtn.addEventListener('click', () => loadTrack(currentIndex + 1, !audio.paused || currentIndex !== -1));

  audio.addEventListener('play',  updatePlayButton);
  audio.addEventListener('pause', updatePlayButton);
  audio.addEventListener('ended', () => loadTrack(currentIndex + 1, true));

  audio.addEventListener('loadedmetadata', () => {
    if (isFinite(audio.duration)) {
      durationEl.textContent = fmtTime(audio.duration);
      seek.max = audio.duration;
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (!isSeeking && isFinite(audio.currentTime)) {
      seek.value = audio.currentTime;
      currentTime.textContent = fmtTime(audio.currentTime);
    }
  });

  audio.addEventListener('error', () => {
    setStatus('Playback failed — skipping.');
    setTimeout(() => {
      if (currentIndex !== -1) loadTrack(currentIndex + 1, true);
    }, 800);
  });

  seek.addEventListener('input',  () => {
    isSeeking = true;
    currentTime.textContent = fmtTime(parseFloat(seek.value));
  });
  seek.addEventListener('change', () => {
    if (isFinite(audio.duration)) audio.currentTime = parseFloat(seek.value);
    isSeeking = false;
  });

  volume.addEventListener('input', () => { audio.volume = parseFloat(volume.value); });
  audio.volume = parseFloat(volume.value);

  // --- Boot -------------------------------------------------------------
  async function init() {
    try {
      const res = await fetch('/api/playlist');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      playlist = await res.json();
      if (!playlist.length) {
        artistEl.textContent = 'Playlist is empty.';
        renderPlaylist();
        [playBtn, prevBtn, nextBtn, seek].forEach(el => el.disabled = true);
        return;
      }
      renderPlaylist();
      loadTrack(0, false);
      artistEl.textContent = playlist[0].artist;
    } catch (err) {
      console.error(err);
      artistEl.textContent = 'Failed to load playlist.';
      setStatus(String(err.message || err));
    }
  }
  init();
})();
