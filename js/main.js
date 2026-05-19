/* =========================================================
   JG CORPORATION — Common interactions
   ========================================================= */

(function () {
    'use strict';

    /* ----- Custom Cursor with spark + zap sound ----- */
    function initCursor() {
        if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
        const dot  = document.createElement('div');
        const ring = document.createElement('div');
        dot.className = 'cursor-dot';
        ring.className = 'cursor-ring';
        document.body.appendChild(dot);
        document.body.appendChild(ring);

        let mx = window.innerWidth / 2, my = window.innerHeight / 2;
        let rx = mx, ry = my;
        let lastSparkX = mx, lastSparkY = my;
        let lastSparkTime = 0;
        let lastZapTime = 0;

        /* ---- Sound (Web Audio: bzzt / zap noise) ---- */
        const AC = window.AudioContext || window.webkitAudioContext;
        let audioCtx = null;
        let masterGain = null;
        let muted = (localStorage.getItem('jg-cursor-mute') === '1');

        function ensureAudio() {
            if (audioCtx || !AC) return;
            try {
                audioCtx = new AC();
                masterGain = audioCtx.createGain();
                masterGain.gain.value = muted ? 0 : 0.045; // very subtle
                masterGain.connect(audioCtx.destination);
            } catch (e) { audioCtx = null; }
        }
        // AudioContext requires a user gesture in most browsers
        const resumeOnce = () => {
            ensureAudio();
            if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
        };
        ['pointerdown','keydown','mousemove','touchstart'].forEach(ev =>
            window.addEventListener(ev, resumeOnce, { once: true, passive: true })
        );

        function playZap(intensity) {
            if (!audioCtx || muted) return;
            const t = audioCtx.currentTime;
            // Short white-noise burst, band-passed → "jijiji" crackle
            const dur = 0.045 + Math.random() * 0.05;
            const bufSize = Math.max(1, Math.floor(audioCtx.sampleRate * dur));
            const buf = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
            const data = buf.getChannelData(0);
            for (let i = 0; i < bufSize; i++) {
                // Crackly noise: random spikes
                const n = (Math.random() * 2 - 1);
                const spike = Math.random() < 0.25 ? (Math.random() * 2 - 1) : 0;
                data[i] = (n * 0.5 + spike * 0.9);
            }
            const src = audioCtx.createBufferSource();
            src.buffer = buf;

            const bp = audioCtx.createBiquadFilter();
            bp.type = 'bandpass';
            bp.frequency.value = 2200 + Math.random() * 2600; // electric zap range
            bp.Q.value = 4 + Math.random() * 3;

            const hp = audioCtx.createBiquadFilter();
            hp.type = 'highpass';
            hp.frequency.value = 1200;

            const g = audioCtx.createGain();
            const peak = Math.min(1, 0.25 + intensity * 0.9);
            g.gain.setValueAtTime(0.0001, t);
            g.gain.exponentialRampToValueAtTime(peak, t + 0.004);
            g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

            src.connect(bp); bp.connect(hp); hp.connect(g); g.connect(masterGain);
            src.start(t);
            src.stop(t + dur + 0.02);
        }

        /* ---- Spark particles ---- */
        function spawnSpark(x, y, angleDeg, isLine) {
            const s = document.createElement('div');
            s.className = 'cursor-spark' + (isLine ? ' s-line' : '');
            const ty = (10 + Math.random() * 20) * (isLine ? 1 : 1);
            s.style.setProperty('--r', angleDeg + 'deg');
            s.style.setProperty('--ty', ty + 'px');
            s.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${angleDeg}deg)`;
            // Keep top-left at cursor; the keyframe handles the translateY(--ty) outward motion
            s.style.left = x + 'px';
            s.style.top  = y + 'px';
            s.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg)`;
            document.body.appendChild(s);
            setTimeout(() => s.remove(), 650);
        }

        function emitSparks(x, y, speed) {
            // Number of particles scales with cursor speed
            const count = Math.min(6, 1 + Math.floor(speed / 14));
            for (let i = 0; i < count; i++) {
                const angle = Math.random() * 360;
                const isLine = Math.random() < 0.35;
                spawnSpark(x, y, angle, isLine);
            }
        }

        document.addEventListener('mousemove', (e) => {
            mx = e.clientX; my = e.clientY;
            dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;

            const now = performance.now();
            const dx = mx - lastSparkX, dy = my - lastSparkY;
            const dist = Math.hypot(dx, dy);

            // Throttle: emit sparks if moved enough or enough time passed
            if (dist > 12 && now - lastSparkTime > 28) {
                emitSparks(mx, my, dist);
                lastSparkX = mx; lastSparkY = my;
                lastSparkTime = now;

                // Crackle sound — throttled separately so it stays subtle
                if (now - lastZapTime > 55 + Math.random() * 90) {
                    playZap(Math.min(1, dist / 60));
                    lastZapTime = now;
                }
            }
        });

        function tick() {
            rx += (mx - rx) * 0.18;
            ry += (my - ry) * 0.18;
            ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
            requestAnimationFrame(tick);
        }
        tick();

        const hoverables = 'a, button, input, select, textarea, .card, .insight-card, .service-grid a, .figure';
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(hoverables)) {
                dot.classList.add('is-hover');
                ring.classList.add('is-hover');
                // Extra burst on hover-enter
                emitSparks(mx, my, 60);
                playZap(0.8);
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(hoverables)) {
                dot.classList.remove('is-hover');
                ring.classList.remove('is-hover');
            }
        });

        /* ---- Mute toggle button ---- */
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cursor-sound-toggle' + (muted ? ' is-muted' : '');
        btn.setAttribute('aria-label', muted ? 'カーソル効果音 ON' : 'カーソル効果音 OFF');
        btn.innerHTML = muted
            ? '<i class="fas fa-volume-mute" aria-hidden="true"></i>'
            : '<i class="fas fa-volume-up"   aria-hidden="true"></i>';
        // Fallback glyph when Font Awesome is not loaded on the page
        if (!document.querySelector('link[href*="fontawesome"]')) {
            btn.textContent = muted ? '🔇' : '🔊';
        }
        btn.addEventListener('click', () => {
            muted = !muted;
            localStorage.setItem('jg-cursor-mute', muted ? '1' : '0');
            ensureAudio();
            if (masterGain) masterGain.gain.value = muted ? 0 : 0.045;
            btn.classList.toggle('is-muted', muted);
            btn.setAttribute('aria-label', muted ? 'カーソル効果音 ON' : 'カーソル効果音 OFF');
            if (btn.querySelector('i')) {
                btn.querySelector('i').className = muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
            } else {
                btn.textContent = muted ? '🔇' : '🔊';
            }
        });
        document.body.appendChild(btn);
    }

    /* ----- Navigation behaviour ----- */
    function initNav() {
        const header = document.querySelector('.site-header');
        if (header) {
            const onScroll = () => {
                if (window.scrollY > 20) header.classList.add('is-scrolled');
                else header.classList.remove('is-scrolled');
            };
            onScroll();
            window.addEventListener('scroll', onScroll, { passive: true });
        }
        const toggle = document.querySelector('.nav-toggle');
        const navMain = document.querySelector('.nav-main');
        const navLang = document.querySelector('.nav-lang');
        if (toggle && navMain) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('is-open');
                navMain.classList.toggle('is-open');
                if (navLang) navLang.classList.toggle('is-open');
            });
        }

        /* Dropdown menus (e.g. Services) — works on PC click and mobile tap */
        const dropdowns = document.querySelectorAll('.nav-main .has-dropdown');
        dropdowns.forEach(dd => {
            const ddToggle = dd.querySelector('.nav-dd-toggle');
            if (!ddToggle) return;
            ddToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                // close siblings
                dropdowns.forEach(other => { if (other !== dd) other.classList.remove('is-open'); });
                dd.classList.toggle('is-open');
                const expanded = dd.classList.contains('is-open');
                ddToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            });
        });
        // Click outside closes any open dropdown (PC)
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-main .has-dropdown')) {
                dropdowns.forEach(dd => {
                    dd.classList.remove('is-open');
                    const t = dd.querySelector('.nav-dd-toggle');
                    if (t) t.setAttribute('aria-expanded', 'false');
                });
            }
        });
        // ESC closes dropdowns
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dropdowns.forEach(dd => {
                    dd.classList.remove('is-open');
                    const t = dd.querySelector('.nav-dd-toggle');
                    if (t) t.setAttribute('aria-expanded', 'false');
                });
            }
        });
    }

    /* ----- Reveal on scroll ----- */
    function initReveal() {
        const els = document.querySelectorAll('.reveal');
        if (!els.length || !('IntersectionObserver' in window)) {
            els.forEach(el => el.classList.add('is-visible'));
            return;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    en.target.classList.add('is-visible');
                    io.unobserve(en.target);
                }
            });
        }, { threshold: 0.12 });
        els.forEach(el => io.observe(el));
    }

    /* ----- Hero video: ensure smooth autoplay + graceful fallback ----- */
    function initHeroVideo() {
        const video = document.querySelector('.hero-video');
        if (!video) return;
        // Some browsers block autoplay until user interaction — attempt play and ignore failure
        const tryPlay = () => {
            const p = video.play();
            if (p && typeof p.catch === 'function') p.catch(() => { /* poster will show */ });
        };
        tryPlay();
        // If page is restored from BFCache or visibility changes, re-try
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) tryPlay();
        });
    }

    /* ----- Typewriter (hero) ----- */
    function initTypewriter() {
        const el = document.querySelector('[data-typewriter]');
        if (!el) return;
        const phrases = (el.dataset.typewriter || '').split('|').map(s => s.trim()).filter(Boolean);
        if (!phrases.length) return;

        let phraseIdx = 0;
        let charIdx = 0;
        let deleting = false;

        function tick() {
            const current = phrases[phraseIdx];
            if (!deleting) {
                charIdx++;
                el.textContent = current.slice(0, charIdx);
                if (charIdx === current.length) {
                    deleting = true;
                    setTimeout(tick, 1800);
                    return;
                }
                setTimeout(tick, 70 + Math.random() * 50);
            } else {
                charIdx--;
                el.textContent = current.slice(0, charIdx);
                if (charIdx === 0) {
                    deleting = false;
                    phraseIdx = (phraseIdx + 1) % phrases.length;
                    setTimeout(tick, 350);
                    return;
                }
                setTimeout(tick, 35);
            }
        }
        tick();
    }

    /* ----- Year in footer ----- */
    function initYear() {
        document.querySelectorAll('[data-year]').forEach(el => {
            el.textContent = new Date().getFullYear();
        });
    }

    /* ----- News list expand/collapse toggle ----- */
    function initNewsToggle() {
        const btn = document.getElementById('news-toggle');
        if (!btn) return;
        const list = document.getElementById('news-list');
        if (!list) return;
        const extras = list.querySelectorAll('.news-extra');
        if (!extras.length) return;

        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            const next = !expanded;
            extras.forEach(li => {
                if (next) {
                    li.removeAttribute('hidden');
                } else {
                    li.setAttribute('hidden', '');
                }
            });
            btn.setAttribute('aria-expanded', String(next));
            btn.textContent = next ? 'Close' : 'View All News';
            if (!next) {
                // Scroll back to news section heading when collapsing
                const section = document.getElementById('news');
                if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    function bootstrap() {
        initCursor();
        initNav();
        initReveal();
        initHeroVideo();
        initTypewriter();
        initYear();
        initNewsToggle();
    }

    // DOM が既に構築済みなら即実行、まだなら DOMContentLoaded を待つ
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootstrap);
    } else {
        bootstrap();
    }
})();
