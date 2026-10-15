/*
 * LUMA HOP — an original, dependency-free canvas platformer.
 * Everything (including art and sound) is generated locally.
 * Feel free to customize, fork, and host on GitHub Pages.
 */
(() => {
  'use strict';

  const W = 960;
  const H = 540;
  const FLOOR = 440;
  const GRAVITY = 1810;
  const RUN_SPEED = 315;
  const JUMP_SPEED = -670;
  const STEP = 1 / 60;
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const screen = document.getElementById('gameScreen');
  const screenCard = document.getElementById('screenCard');
  const toast = document.getElementById('toast');
  const soundBtn = document.getElementById('soundBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const progressTrack = document.getElementById('progressTrack');
  const progressFill = document.getElementById('progressFill');
  const worldValue = document.getElementById('worldValue');
  const placeValue = document.getElementById('placeValue');
  const starsValue = document.getElementById('starsValue');
  const timeValue = document.getElementById('timeValue');
  const heartsValue = document.getElementById('heartsValue');

  const LEVELS = [
    {
      name: 'Sunbeam Meadows', width: 3030,
      sky: ['#77cce7', '#e2f4da', '#fff5ce'],
      far: '#b3d5d1', mid: '#8abdb5', near: '#75ada5',
      earth: '#826d7c', earthDark: '#62546b', grass: '#72c99c', grassLight: '#bbf0b0',
      flowers: ['#ff9fac', '#ffe39a', '#f4c4ff'], glow: '#ffdc93', night: false,
      grounds: [[0, 690], [820, 1450], [1580, 2230], [2360, 3030]],
      platforms: [[260, 365, 130], [479, 311, 123], [706, 383, 128], [965, 356, 145],
        [1193, 313, 130], [1430, 383, 140], [1775, 365, 132], [1980, 314, 138],
        [2232, 383, 136], [2510, 352, 148], [2702, 300, 128]],
      enemies: [[450, 392, 600, 75], [1080, 940, 1240, 67], [1845, 1720, 2080, 79],
        [2490, 2390, 2610, 80], [2850, 2720, 2910, 87]],
      starLines: [[145, 406, 5, 43], [279, 332, 3, 42], [492, 276, 3, 40],
        [856, 406, 5, 43], [983, 323, 3, 43], [1210, 277, 3, 41],
        [1630, 406, 5, 46], [1787, 331, 3, 44], [1994, 279, 3, 45],
        [2408, 406, 4, 43], [2525, 317, 3, 44], [2716, 265, 3, 44]],
      starArcs: [735, 1500, 2282], checkpoint: 1640, goal: 2918,
    },
    {
      name: 'Cotton Candy Cliffs', width: 3480,
      sky: ['#8b83c9', '#f1acc2', '#ffe1ba'],
      far: '#ddadc4', mid: '#c895b3', near: '#b582ad',
      earth: '#826184', earthDark: '#5d4a78', grass: '#a2c7a3', grassLight: '#dfebac',
      flowers: ['#ffaabd', '#f8e69f', '#bbd9ff'], glow: '#ffdfc9', night: false,
      grounds: [[0, 575], [725, 1310], [1465, 1940], [2095, 2640], [2810, 3480]],
      platforms: [[225, 355, 140], [500, 370, 119], [598, 321, 115], [866, 349, 135],
        [1090, 298, 133], [1311, 374, 141], [1545, 355, 121], [1787, 309, 144],
        [1963, 371, 136], [2215, 343, 137], [2438, 296, 135], [2647, 376, 156],
        [2945, 350, 130], [3150, 298, 128]],
      enemies: [[425, 362, 490, 83], [940, 840, 1190, 100], [1575, 1500, 1775, 96],
        [1840, 1785, 1880, 72], [2225, 2130, 2375, 108], [2560, 2440, 2585, 100],
        [3030, 2890, 3190, 107], [3290, 3200, 3350, 118]],
      starLines: [[147, 407, 5, 42], [247, 320, 3, 44], [604, 287, 2, 44],
        [759, 407, 4, 43], [873, 315, 3, 44], [1094, 262, 3, 45],
        [1480, 407, 4, 42], [1560, 321, 3, 43], [1796, 275, 3, 43],
        [2155, 407, 4, 43], [2226, 309, 3, 43], [2450, 261, 3, 43],
        [2845, 407, 5, 44], [2952, 315, 3, 43], [3155, 264, 3, 42]],
      starArcs: [627, 1360, 2002, 2695], checkpoint: 1525, goal: 3380,
    },
    {
      name: 'Moonberry Mountain', width: 3800,
      sky: ['#1d315f', '#514d8c', '#a68ab2'],
      far: '#6b70a5', mid: '#576a98', near: '#405d86',
      earth: '#625b82', earthDark: '#474565', grass: '#69b8af', grassLight: '#a0edcf',
      flowers: ['#a2e7fa', '#e9c2ff', '#ffe59d'], glow: '#b1eafb', night: true,
      grounds: [[0, 565], [740, 1300], [1465, 2030], [2210, 2770], [2955, 3800]],
      platforms: [[205, 350, 141], [473, 370, 113], [592, 371, 133], [827, 355, 136],
        [1097, 308, 131], [1315, 380, 131], [1550, 352, 138], [1765, 303, 138],
        [2038, 378, 160], [2310, 351, 138], [2540, 300, 134], [2775, 379, 163],
        [3030, 357, 130], [3230, 308, 132], [3427, 348, 132]],
      enemies: [[395, 350, 498, 94], [845, 795, 1020, 107], [1205, 1150, 1245, 112],
        [1578, 1515, 1730, 108], [1838, 1780, 1960, 110], [2360, 2240, 2490, 118],
        [2630, 2520, 2680, 112], [3110, 2980, 3180, 119], [3345, 3280, 3430, 116],
        [3550, 3460, 3650, 126]],
      starLines: [[133, 407, 5, 43], [221, 317, 3, 45], [600, 337, 3, 44],
        [788, 407, 5, 45], [842, 320, 3, 43], [1110, 274, 3, 42],
        [1510, 407, 5, 44], [1565, 319, 3, 43], [1775, 268, 3, 42],
        [2245, 407, 4, 43], [2324, 316, 3, 43], [2554, 265, 3, 42],
        [3002, 407, 5, 44], [3050, 322, 3, 43], [3240, 273, 3, 43], [3442, 315, 3, 43]],
      starArcs: [645, 1370, 2110, 2840], checkpoint: 1530, goal: 3688,
    },
  ];

  const key = { left: false, right: false, jump: false };
  const touch = { left: false, right: false, jump: false };
  let jumpRequested = false;
  let mode = 'menu';
  let levelIndex = 0;
  let level = null;
  let player = null;
  let cameraX = 0;
  let viewTime = 0;
  let gameTime = 0;
  let runScore = 0;
  let runStars = 0;
  let lives = 3;
  let levelStars = 0;
  let particles = [];
  let floatLabels = [];
  let shake = 0;
  let toastDuration = 0;
  let screenFlash = 0;
  let lastFrame = 0;
  let lag = 0;
  let audioCtx = null;
  let muted = safeGet('luma-hop-muted') === 'true';
  let bestScore = Number(safeGet('luma-hop-best-score')) || 0;
  let bestTime = Number(safeGet('luma-hop-best-time')) || 0;

  function safeGet(name) {
    try { return localStorage.getItem(name); } catch (_) { return null; }
  }
  function safeSet(name, value) {
    try { localStorage.setItem(name, String(value)); } catch (_) { /* private browsing */ }
  }
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const approach = (current, target, change) => current < target ? Math.min(target, current + change) : Math.max(target, current - change);
  const overlap = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  const visible = (x, w = 50) => x + w >= cameraX - 75 && x <= cameraX + W + 75;
  const rand = (n) => { const x = Math.sin(n * 127.1 + 54.3) * 43758.5453; return x - Math.floor(x); };
  const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  function createLevel(i) {
    const config = LEVELS[i];
    const solids = config.grounds.map(([x, end]) => ({ x, y: FLOOR, w: end - x, h: H + 60 - FLOOR, kind: 'ground' }));
    for (const [x, y, w] of config.platforms) solids.push({ x, y, w, h: 23, kind: 'platform' });
    const stars = [];
    for (const [x, y, count, dx] of config.starLines) {
      for (let n = 0; n < count; n++) stars.push({ x: x + n * dx, y, collected: false, phase: rand(x + n) * 6.28 });
    }
    for (const gapX of config.starArcs) {
      [[0, 358], [38, 327], [77, 322], [115, 354]].forEach(([dx, y], idx) => {
        stars.push({ x: gapX + dx, y, collected: false, phase: idx });
      });
    }
    const enemies = config.enemies.map(([x, left, right, speed], iEnemy) => ({
      x, y: FLOOR - 30, w: 35, h: 30, left, right, speed,
      direction: iEnemy % 2 ? -1 : 1, dead: false, tick: iEnemy * .91,
    }));
    const decorations = [];
    for (const [start, end] of config.grounds) {
      for (let x = start + 72; x < end - 35; x += 87 + Math.floor(rand(x) * 70)) {
        decorations.push({ x, kind: rand(x * 3) < .28 ? 'bush' : rand(x * 2) < .55 ? 'flower' : 'sprout', scale: .7 + rand(x * 4) * .5 });
      }
    }
    return { ...config, solids, stars, enemies, decorations, checkpointActive: false };
  }

  function resetPlayer(x = 80) {
    player = { x, y: FLOOR - 42, w: 31, h: 42, vx: 0, vy: 0, onGround: false,
      coyote: 0, jumpBuffer: 0, jumpCut: false, jumpDuration: 0, facing: 1, steps: 0, invuln: 0,
      previousBottom: FLOOR };
  }

  function loadLevel(i) {
    levelIndex = i;
    level = createLevel(i);
    levelStars = 0;
    particles = [];
    floatLabels = [];
    cameraX = 0;
    resetPlayer();
    syncHud();
  }

  function startGame() {
    lives = 3;
    runScore = 0;
    runStars = 0;
    gameTime = 0;
    jumpRequested = false;
    Object.keys(key).forEach((k) => { key[k] = false; touch[k] = false; });
    document.querySelectorAll('.touch-key').forEach(b => b.classList.remove('pressed'));
    loadLevel(0);
    mode = 'playing';
    closeScreen();
    playSfx('start');
    syncHud();
  }

  function nextLevel() {
    if (levelIndex >= LEVELS.length - 1) return;
    lives = 3; // Fresh hearts for each world: challenging, but friend-friendly.
    loadLevel(levelIndex + 1);
    mode = 'playing';
    closeScreen();
    showToast(`✦ ${level.name}`);
    playSfx('start');
  }

  function pauseGame() {
    if (mode !== 'playing') return;
    mode = 'paused';
    showScreen('paused');
    syncHud();
  }
  function resumeGame() {
    if (mode !== 'paused') return;
    mode = 'playing';
    closeScreen();
    syncHud();
  }
  function togglePause() {
    if (mode === 'playing') pauseGame();
    else if (mode === 'paused') resumeGame();
  }

  function finishLevel() {
    if (mode !== 'playing') return;
    runScore += 500 + lives * 100;
    particlesBurst(level.goal, FLOOR - 58, level.glow, 24);
    screenFlash = .27;
    playSfx('win');
    if (levelIndex === LEVELS.length - 1) {
      mode = 'victory';
      saveRecords();
      showScreen('victory');
    } else {
      mode = 'levelComplete';
      showScreen('levelComplete');
    }
    syncHud();
  }

  function saveRecords() {
    if (runScore > bestScore) {
      bestScore = runScore;
      safeSet('luma-hop-best-score', bestScore);
    }
    if (mode === 'victory' && (!bestTime || gameTime < bestTime)) {
      bestTime = gameTime;
      safeSet('luma-hop-best-time', gameTime.toFixed(3));
    }
  }

  function damage(reason) {
    if (mode !== 'playing' || player.invuln > 0) return;
    lives--;
    shake = 10;
    screenFlash = .2;
    playSfx('hurt');
    particlesBurst(player.x + 15, player.y + 22, '#ffa1af', 14);
    if (lives <= 0) {
      mode = 'gameOver';
      saveRecords();
      showScreen('gameOver');
    } else {
      resetPlayer(level.checkpointActive ? level.checkpoint + 20 : 80);
      player.invuln = 2.0;
      cameraX = clamp(player.x - W * .3, 0, level.width - W);
      showToast(reason === 'fall' ? 'A little tumble! Try again ♥' : 'Ouch! You’ve got this ♥');
    }
    syncHud();
  }

  function collectStar(star) {
    star.collected = true;
    runStars++;
    levelStars++;
    runScore += 100;
    particlesBurst(star.x, star.y, '#ffe7a6', 9);
    floatLabels.push({ x: star.x, y: star.y, text: '+100', life: .65, maxLife: .65, color: '#fff5c8' });
    playSfx('star');
    syncHud();
  }

  function stompEnemy(enemy) {
    enemy.dead = true;
    player.vy = -455;
    player.jumpCut = false;
    runScore += 150;
    shake = 3.5;
    particlesBurst(enemy.x + enemy.w / 2, enemy.y + 16, '#efbcff', 15);
    floatLabels.push({ x: enemy.x, y: enemy.y, text: '+150', life: .85, maxLife: .85, color: '#ffffff' });
    playSfx('stomp');
  }

  function particlesBurst(x, y, color, count) {
    for (let i = 0; i < count; i++) {
      const angle = Math.PI * 2 * (i / count + Math.random() * .16);
      const speed = 80 + Math.random() * 180;
      const life = .35 + Math.random() * .48;
      particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 65,
        life, maxLife: life, radius: 2 + Math.random() * 3.7, color });
    }
    if (particles.length > 240) particles.splice(0, particles.length - 240);
  }

  function showToast(message) {
    toast.textContent = message;
    toastDuration = 1.85;
    toast.classList.add('visible');
  }

  function syncHud() {
    worldValue.textContent = `${String(levelIndex + 1).padStart(2, '0')} / 03`;
    placeValue.textContent = level.name;
    starsValue.textContent = String(runStars);
    timeValue.textContent = fmtTime(gameTime);
    heartsValue.innerHTML = Array.from({ length: 3 }, (_, i) => `<span class="heart${i >= lives ? ' empty' : ''}">♥</span>`).join('');
    heartsValue.setAttribute('aria-label', `${lives} of 3 hearts remaining`);
    const progress = Math.round(clamp((player.x / (level.goal || level.width)) * 100, 0, 100));
    progressFill.style.width = `${progress}%`;
    progressTrack.setAttribute('aria-valuenow', String(progress));
    pauseBtn.title = mode === 'paused' ? 'Resume (Esc)' : 'Pause (Esc)';
    pauseBtn.setAttribute('aria-label', mode === 'paused' ? 'Resume game' : 'Pause game');
  }

  function showScreen(which) {
    const worldNum = levelIndex + 1;
    const totalStars = level.stars.length;
    const stat = (number, label) => `<div class="stat"><b>${number}</b><small>${label}</small></div>`;
    const btn = (action, label) => `<button class="primary-button" type="button" data-action="${action}">${label}</button>`;
    if (which === 'menu') {
      screenCard.innerHTML = `
        <div class="screen-icon" aria-hidden="true">✦ ✳ ✦</div>
        <p class="screen-kicker">THREE WORLDS · ONE BRAVE LITTLE FOX</p>
        <h1>Little paws.<br><em>Big leaps.</em></h1>
        <p class="screen-copy">Meet Pip, the tiny explorer. Collect the scattered stars, bounce past grumplings, and bring the sky's glow back home.</p>
        ${btn('start', 'Start adventure ↗')}
        <div class="mini-instruction">← → TO MOVE &nbsp;·&nbsp; SPACE TO JUMP</div>`;
    } else if (which === 'paused') {
      screenCard.innerHTML = `
        <div class="screen-icon" aria-hidden="true">☾</div>
        <p class="screen-kicker">TAKE YOUR TIME</p>
        <h2>Little breather?</h2>
        <p class="screen-copy">Pip will be right here when you're ready.</p>
        ${btn('resume', 'Keep hopping →')}
        <div><button class="secondary-button" type="button" data-action="restart">Restart adventure</button></div>`;
    } else if (which === 'levelComplete') {
      screenCard.innerHTML = `
        <div class="screen-icon" aria-hidden="true">✷</div>
        <p class="screen-kicker">WORLD ${worldNum} OF 3 COMPLETE</p>
        <h2>Trail blazed!</h2>
        <p class="screen-copy">A few more stars are twinkling tonight. Beautiful work!</p>
        <div class="stat-grid">${stat(`${levelStars}/${totalStars}`, 'Stars found')}${stat(lives, 'Hearts left')}${stat(runScore.toLocaleString(), 'Total score')}</div>
        ${btn('next', 'Next world →')}`;
    } else if (which === 'gameOver') {
      screenCard.innerHTML = `
        <div class="screen-icon" aria-hidden="true">♡</div>
        <p class="screen-kicker">ADVENTURE ON HOLD</p>
        <h2>One more try?</h2>
        <p class="screen-copy">Every great explorer stumbles. Your next run is waiting.</p>
        <div class="stat-grid">${stat(runStars, 'Stars found')}${stat(runScore.toLocaleString(), 'Your score')}</div>
        ${btn('restart', 'Try again ↗')}`;
    } else if (which === 'victory') {
      screenCard.innerHTML = `
        <div class="screen-icon" aria-hidden="true">✦ ✨ ✦</div>
        <p class="screen-kicker">ALL THREE WORLDS COMPLETE!</p>
        <h2>You lit up the sky!</h2>
        <p class="screen-copy">Pip made it home, and the whole sky is sparkling. You're a star collector extraordinaire!</p>
        <div class="stat-grid">${stat(runScore.toLocaleString(), 'Your score')}${stat(runStars, 'Stars found')}${stat(fmtTime(gameTime), 'Your time')}</div>
        ${btn('restart', 'Play again ↗')}
        <div><button class="secondary-button" type="button" data-action="share">Copy your score to share ↗</button></div>
        <div class="mini-instruction">BEST SCORE ${bestScore.toLocaleString()} &nbsp;·&nbsp; BEST TIME ${fmtTime(bestTime || gameTime)}</div>`;
    }
    screen.classList.add('active');
  }

  function closeScreen() { screen.classList.remove('active'); }

  function update(dt) {
    viewTime += dt;
    if (toastDuration > 0) {
      toastDuration -= dt;
      if (toastDuration <= 0) toast.classList.remove('visible');
    }
    if (screenFlash > 0) screenFlash = Math.max(0, screenFlash - dt);
    shake = Math.max(0, shake - dt * 25);

    // Menu scenery is deliberately alive, but the actual game is paused.
    if (mode !== 'playing') return;
    gameTime += dt;
    player.invuln = Math.max(0, player.invuln - dt);
    player.steps += Math.abs(player.vx) * dt * .052;

    const dir = Number(key.right || touch.right) - Number(key.left || touch.left);
    const moving = !!dir;
    const accel = player.onGround ? 2600 : 1950;
    if (moving) {
      player.vx = approach(player.vx, dir * RUN_SPEED, accel * dt);
      player.facing = dir;
    } else {
      player.vx = approach(player.vx, 0, (player.onGround ? 2450 : 790) * dt);
    }

    if (jumpRequested) player.jumpBuffer = .145;
    jumpRequested = false;
    player.jumpBuffer = Math.max(0, player.jumpBuffer - dt);
    player.coyote = Math.max(0, player.coyote - dt);
    if (player.onGround) player.coyote = .115;
    if (player.jumpBuffer > 0 && player.coyote > 0) {
      player.vy = JUMP_SPEED;
      player.onGround = false;
      player.coyote = 0;
      player.jumpBuffer = 0;
      player.jumpCut = false;
      player.jumpDuration = 0;
      particlesBurst(player.x + 15, player.y + 39, '#ffffff', 6);
      playSfx('jump');
    }
    if (!player.onGround && player.vy < 0) player.jumpDuration += dt;
    if (!(key.jump || touch.jump) && player.vy < -225 && !player.jumpCut && player.jumpDuration > .16) {
      player.vy *= .82;
      player.jumpCut = true;
    }

    // Horizontal, then vertical axis-separated collisions.
    player.x += player.vx * dt;
    player.x = clamp(player.x, 0, level.width - player.w);
    for (const block of level.solids) {
      if (!overlap(player, block)) continue;
      if (player.vx > 0) player.x = block.x - player.w;
      else if (player.vx < 0) player.x = block.x + block.w;
      player.vx = 0;
    }

    player.previousBottom = player.y + player.h;
    const previousTop = player.y;
    player.vy = Math.min(player.vy + GRAVITY * dt, 940);
    player.y += player.vy * dt;
    player.onGround = false;
    for (const block of level.solids) {
      if (!overlap(player, block)) continue;
      if (player.vy >= 0 && player.previousBottom <= block.y + 7) {
        player.y = block.y - player.h;
        player.vy = 0;
        player.onGround = true;
      } else if (player.vy < 0 && previousTop >= block.y + block.h - 7) {
        player.y = block.y + block.h;
        player.vy = 0;
      }
    }
    if (player.y > H + 90) { damage('fall'); return; }

    // Stars can be collected by brushing against them, not only direct hits.
    for (const star of level.stars) {
      if (star.collected || Math.abs(star.x - player.x) > 42) continue;
      const cx = clamp(star.x, player.x, player.x + player.w);
      const cy = clamp(star.y, player.y, player.y + player.h);
      if ((cx - star.x) ** 2 + (cy - star.y) ** 2 < 17 ** 2) collectStar(star);
    }

    for (const enemy of level.enemies) {
      if (enemy.dead) continue;
      enemy.tick += dt * 3;
      enemy.x += enemy.direction * enemy.speed * dt;
      if (enemy.x <= enemy.left) { enemy.x = enemy.left; enemy.direction = 1; }
      if (enemy.x >= enemy.right) { enemy.x = enemy.right; enemy.direction = -1; }
      if (!overlap(player, enemy)) continue;
      if (player.vy > 65 && player.previousBottom <= enemy.y + 14) {
        stompEnemy(enemy);
      } else if (player.invuln <= 0) {
        damage('enemy');
        return;
      }
    }

    if (!level.checkpointActive && player.x + player.w > level.checkpoint) {
      level.checkpointActive = true;
      particlesBurst(level.checkpoint, FLOOR - 68, '#b4ffe2', 20);
      showToast('✦ Checkpoint saved!');
      playSfx('checkpoint');
    }
    if (player.x + player.w >= level.goal && player.y + player.h > FLOOR - 125) finishLevel();

    for (const p of particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 300 * dt;
      p.life -= dt;
    }
    particles = particles.filter((p) => p.life > 0);
    for (const label of floatLabels) { label.y -= 40 * dt; label.life -= dt; }
    floatLabels = floatLabels.filter((label) => label.life > 0);
    cameraX = approach(cameraX, clamp(player.x - W * .38, 0, level.width - W), Math.max(350, Math.abs(player.vx) * 2.4) * dt);
    syncHud();
  }

  function roundedRect(x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }
  function poly(points, fill) {
    ctx.fillStyle = fill;
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const [x, y] = points[i];
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }
  function ellipse(x, y, rx, ry, fill) {
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.ellipse(x, y, Math.max(.01, rx), Math.max(.01, ry), 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawCloud(x, y, s, alpha = .67) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ellipse(x, y + 12 * s, 60 * s, 16 * s, '#fffefa');
    ellipse(x - 27 * s, y + 2 * s, 27 * s, 23 * s, '#fffefa');
    ellipse(x + 4 * s, y - 8 * s, 35 * s, 28 * s, '#fffefa');
    ellipse(x + 37 * s, y + 5 * s, 30 * s, 20 * s, '#fffefa');
    ctx.restore();
  }

  function drawHills(color, base, amp, speed, freq, seed) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, H);
    for (let x = 0; x <= W + 12; x += 12) {
      const z = (x + cameraX * speed + seed) / freq;
      const y = base + Math.sin(z) * amp + Math.cos(z * .59 + 1) * amp * .45;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();
  }

  function drawBackground() {
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, level.sky[0]);
    grad.addColorStop(.60, level.sky[1]);
    grad.addColorStop(1, level.sky[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    const orbX = 760 - cameraX * .028;
    const orbY = level.night ? 118 : 110;
    const halo = ctx.createRadialGradient(orbX, orbY, 9, orbX, orbY, 127);
    halo.addColorStop(0, level.night ? '#ddeaff75' : '#fff9d5a8');
    halo.addColorStop(1, '#ffffff00');
    ctx.fillStyle = halo;
    ctx.fillRect(orbX - 130, orbY - 130, 260, 260);
    ellipse(orbX, orbY, level.night ? 36 : 43, level.night ? 36 : 43, level.night ? '#e4ebff' : '#fff6d1');
    if (level.night) {
      ellipse(orbX + 11, orbY - 7, 35, 35, '#d7e0fb');
      ellipse(orbX - 13, orbY - 8, 4, 4, '#c4d0ef');
      ellipse(orbX + 12, orbY + 13, 6, 6, '#c4d0ef');
      for (let i = 0; i < 70; i++) {
        const x = (rand(i + 52) * 1400 - cameraX * .08 + 2800) % 1400 - 110;
        const y = 24 + rand(i * 3 + 42) * 285;
        const twinkle = .3 + .7 * Math.abs(Math.sin(viewTime * (i % 3 + 1) * .8 + i));
        ctx.globalAlpha = twinkle;
        ellipse(x, y, i % 8 === 0 ? 2.2 : 1.1, i % 8 === 0 ? 2.2 : 1.1, '#f4efff');
      }
      ctx.globalAlpha = 1;
    } else {
      for (let i = 0; i < 9; i++) {
        const x = ((i * 194 + 84 - cameraX * (.1 + i % 3 * .013)) % 1500 + 1500) % 1500 - 100;
        drawCloud(x, 90 + rand(i * 7) * 155, .6 + rand(i * 11) * .45, .27 + rand(i + 5) * .33);
      }
    }

    drawHills(level.far, 335, 36, .12, 118, 20);
    drawHills(level.mid, 375, 36, .23, 98, 290);
    drawHills(level.near, 424, 23, .42, 72, 700);
    ctx.save();
    ctx.globalAlpha = .16;
    for (let i = -1; i < 18; i++) {
      const x = i * 100 - (cameraX * .37) % 100;
      const h = 45 + rand(i + 100) * 45;
      poly([[x - 17, 448], [x + 8, 448 - h], [x + 32, 448]], level.night ? '#183c5d' : '#4c8a7a');
      poly([[x - 9, 443], [x + 8, 450 - h * .8], [x + 25, 443]], level.night ? '#183c5d' : '#4c8a7a');
    }
    ctx.restore();
    const fog = ctx.createLinearGradient(0, 340, 0, H);
    fog.addColorStop(0, '#ffffff00');
    fog.addColorStop(1, level.night ? '#273c8273' : '#fff4d07c');
    ctx.fillStyle = fog;
    ctx.fillRect(0, 325, W, H - 325);
  }

  function drawGround(block) {
    if (!visible(block.x, block.w)) return;
    const { x, y, w, h } = block;
    const dirt = ctx.createLinearGradient(0, y, 0, H);
    dirt.addColorStop(0, level.earth);
    dirt.addColorStop(1, level.earthDark);
    ctx.fillStyle = dirt;
    roundedRect(x, y, w, h + 6, 8);
    ctx.fill();
    ctx.save();
    ctx.beginPath(); ctx.rect(x, y + 8, w, H - y + 10); ctx.clip();
    ctx.globalAlpha = .18;
    for (let i = Math.ceil(x / 43); i * 43 < x + w; i++) {
      const px = i * 43;
      const py = y + 33 + (i % 3) * 32;
      ellipse(px, py, 12, 3, '#ffe7da');
      ellipse(px + 13, py + 46, 4, 4, '#1e294c');
    }
    ctx.restore();
    // Top turf is flat for accurate collision, with soft overhanging clumps.
    ctx.fillStyle = level.grass;
    roundedRect(x, y - 8, w, 16, 7);
    ctx.fill();
    ctx.fillStyle = level.grassLight;
    roundedRect(x + 3, y - 7, w - 6, 5, 3);
    ctx.fill();
    for (let px = x + 15; px < x + w - 10; px += 34) {
      poly([[px - 5, y + 7], [px + 1, y + 12], [px + 6, y + 7]], level.grass);
    }
    ctx.fillStyle = '#ffffff1c';
    ctx.fillRect(x + 8, y + 14, Math.max(0, w - 16), 2);
  }

  function drawPlatform(block) {
    if (!visible(block.x, block.w)) return;
    const { x, y, w, h } = block;
    ctx.fillStyle = '#29324a45';
    roundedRect(x + 5, y + 5, w, h + 7, 9);
    ctx.fill();
    const dirt = ctx.createLinearGradient(0, y, 0, y + h);
    dirt.addColorStop(0, level.earth);
    dirt.addColorStop(1, level.earthDark);
    ctx.fillStyle = dirt;
    roundedRect(x, y, w, h, 8);
    ctx.fill();
    ctx.fillStyle = level.grass;
    roundedRect(x - 3, y - 7, w + 6, 12, 6);
    ctx.fill();
    ctx.fillStyle = level.grassLight;
    roundedRect(x + 1, y - 6, w - 2, 4, 4);
    ctx.fill();
    for (let i = x + 14; i < x + w - 4; i += 26) {
      ellipse(i, y + 13, 4, 2, '#ffffff25');
    }
  }

  function drawDecoration(decor, index) {
    if (!visible(decor.x, 25)) return;
    const { x, scale, kind } = decor;
    const y = FLOOR - 8;
    ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale);
    if (kind === 'bush') {
      ellipse(0, 1, 23, 11, level.near);
      ellipse(-12, -7, 14, 14, level.grass);
      ellipse(6, -11, 17, 18, level.grass);
      ellipse(18, -5, 12, 12, level.grass);
      ellipse(4, -16, 6, 3, level.grassLight);
    } else if (kind === 'flower') {
      ctx.strokeStyle = '#457a72'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-7, -13, 0, -23); ctx.stroke();
      ellipse(-6, -8, 6, 3, '#74a18d');
      const c = level.flowers[index % level.flowers.length];
      for (let a = 0; a < 5; a++) {
        const t = a * Math.PI * 2 / 5;
        ellipse(Math.cos(t) * 6, -24 + Math.sin(t) * 6, 5, 5, c);
      }
      ellipse(0, -24, 4, 4, '#fff6be');
    } else {
      ctx.strokeStyle = '#539987'; ctx.lineWidth = 3;
      ctx.beginPath();ctx.moveTo(0, 0);ctx.lineTo(0, -11);ctx.stroke();
      ellipse(-5, -9, 6, 3, level.grassLight);
      ellipse(6, -14, 7, 4, level.grass);
    }
    ctx.restore();
  }

  function drawStar(star) {
    if (star.collected || !visible(star.x, 25)) return;
    const bob = Math.sin(viewTime * 3.5 + star.phase) * 4;
    const { x } = star;
    const y = star.y + bob;
    ctx.save(); ctx.translate(x, y);
    const aura = ctx.createRadialGradient(0, 0, 1, 0, 0, 27);
    aura.addColorStop(0, '#fff7cc82');aura.addColorStop(1, '#fff7cc00');
    ctx.fillStyle = aura;ctx.fillRect(-28,-28,56,56);
    ctx.rotate(Math.sin(viewTime * 2 + star.phase) * .12);
    const points = [];
    for (let n = 0; n < 10; n++) {
      const a = -Math.PI / 2 + n * Math.PI / 5;
      const rad = n % 2 === 0 ? 13 : 6.3;
      points.push([Math.cos(a) * rad, Math.sin(a) * rad]);
    }
    poly(points, '#ffe1a0');
    ctx.strokeStyle = '#fff8dc';ctx.lineWidth = 2;ctx.lineJoin = 'round';ctx.stroke();
    ellipse(-3, -4, 2.5, 2.5, '#ffffffb0');
    ctx.restore();
  }

  function drawCheckpoint() {
    const x = level.checkpoint;
    if (!visible(x, 30)) return;
    const activated = level.checkpointActive;
    const y = FLOOR;
    ctx.fillStyle = '#44516e';
    roundedRect(x - 5, y - 104, 8, 104, 3);ctx.fill();
    ellipse(x - 1, y - 104, 7, 7, activated ? '#e4ffcc' : '#e9d5e3');
    const wiggle = Math.sin(viewTime * 3) * 5;
    poly([[x + 3, y - 100], [x + 40 + wiggle, y - 91], [x + 4, y - 69]], activated ? '#a6f1ba' : '#ffc3a7');
    ctx.fillStyle = activated ? '#357b6a' : '#af6b83';
    ctx.font = 'bold 15px system-ui';ctx.textAlign = 'center';
    ctx.fillText(activated ? '✓' : '✦', x + 18, y - 84);
    ellipse(x, y + 1, 18, 5, '#2d3c4a45');
  }

  function drawGoal() {
    if (!visible(level.goal, 75)) return;
    const x = level.goal;
    const y = FLOOR;
    ctx.save();ctx.translate(x, y);
    const pulse = 1 + .07 * Math.sin(viewTime * 4);
    const g = ctx.createRadialGradient(0, -53, 5, 0, -53, 83);
    g.addColorStop(0, '#ffffffb0');
    g.addColorStop(.45, level.glow + '95');
    g.addColorStop(1, '#ffffff00');
    ctx.fillStyle = g;ctx.fillRect(-90,-148,180,190);
    ctx.fillStyle = '#33456872';ellipse(0, -4, 42, 10, '#33456872');
    ctx.lineWidth = 14;
    ctx.strokeStyle = level.night ? '#92c9da' : '#fff0bf';
    ctx.beginPath();ctx.moveTo(-28,0);ctx.lineTo(-28,-67);ctx.quadraticCurveTo(-28,-108,0,-108);ctx.quadraticCurveTo(28,-108,28,-67);ctx.lineTo(28,0);ctx.stroke();
    const portal = ctx.createLinearGradient(0, -101, 0, 0);
    portal.addColorStop(0, level.night ? '#a2dbff' : '#fffce2');
    portal.addColorStop(.55, level.night ? '#9e99e9' : '#e7cbdd');
    portal.addColorStop(1, '#5b74ac');
    ctx.fillStyle = portal;
    ctx.beginPath();ctx.moveTo(-20,0);ctx.lineTo(-20,-65);ctx.quadraticCurveTo(-20,-99,0,-99);ctx.quadraticCurveTo(20,-99,20,-65);ctx.lineTo(20,0);ctx.fill();
    ctx.save();ctx.globalAlpha = .4;
    ellipse(0, -48, 13 * pulse, 39 * pulse, '#ffffff');
    ctx.restore();
    ctx.lineWidth=4;ctx.strokeStyle='#fff8e3';
    ctx.beginPath();ctx.moveTo(-28,0);ctx.lineTo(-28,-68);ctx.quadraticCurveTo(-28,-108,0,-108);ctx.quadraticCurveTo(28,-108,28,-68);ctx.lineTo(28,0);ctx.stroke();
    for(let i=0;i<5;i++){
      const a=viewTime*1.5+i*Math.PI*2/5;
      ellipse(Math.cos(a)*44,-55+Math.sin(a)*52,2.8,2.8,level.glow);
    }
    ctx.font = '900 12px system-ui';ctx.textAlign='center';ctx.fillStyle='#ffffff';
    ctx.shadowColor='#25354b';ctx.shadowBlur=8;ctx.fillText('FINISH',0,-128);
    ctx.restore();
  }

  function drawEnemy(enemy) {
    if (enemy.dead || !visible(enemy.x, enemy.w)) return;
    const bounce = Math.sin(enemy.tick * 1.8) * 1.5;
    const x = enemy.x + enemy.w / 2;
    const y = enemy.y + enemy.h;
    ctx.save();ctx.translate(x,y);
    ellipse(0, 0, 19, 5, '#1a274d35');
    ellipse(0, -15 + bounce, 18, 15, '#6d649d');
    ellipse(-3, -19 + bounce, 14, 11, '#9e83b7');
    poly([[-14,-23+bounce],[-14,-37+bounce],[-3,-27+bounce]], '#9e83b7');
    poly([[12,-24+bounce],[15,-36+bounce],[3,-26+bounce]], '#9e83b7');
    ellipse(-6,-14+bounce,3.7,5.2,'#fcf6ec');ellipse(7,-14+bounce,3.7,5.2,'#fcf6ec');
    const look = enemy.direction * 1.1;
    ellipse(-6+look,-13.5+bounce,1.5,3,'#313451');ellipse(7+look,-13.5+bounce,1.5,3,'#313451');
    ellipse(1,-6+bounce,2.7,1.5,'#614c82');
    ctx.restore();
  }

  function drawPip() {
    const p = player;
    if (!visible(p.x, 36)) return;
    if (p.invuln > 0 && Math.floor(viewTime * 13) % 2 === 0) return;
    const groundedBob = p.onGround && Math.abs(p.vx) > 20 ? Math.sin(p.steps * 1.8) * 2 : 0;
    const footY = p.y + p.h;
    ctx.save();ctx.translate(p.x + p.w / 2, footY + groundedBob);ctx.scale(p.facing, 1);
    // Fluffy tail, behind the explorer.
    ctx.save();ctx.rotate((p.onGround ? Math.sin(viewTime * 4) : -.4) * .12);
    ellipse(-17,-15,16,9,'#c16b66');
    ellipse(-26,-17,9,8,'#ffcca2');
    ctx.restore();
    // Scarf ends flutter while moving.
    const flow = clamp(p.vx / RUN_SPEED, -.9, .9);
    poly([[-5,-24],[-22-flow*5,-24],[-18-flow*4,-18],[-4,-19]], '#74ddd3');
    // Body and warm tummy.
    ellipse(1,-14,13,15,'#d77b63');
    ellipse(3,-14,8,10,'#ffe5bd');
    // Feet.
    ellipse(-8,-3,7,4,'#53456c');ellipse(9,-3,7,4,'#53456c');
    // Ears: simple distinct original fox silhouette.
    poly([[-15,-30],[-17,-48],[-3,-39]],'#cb6e68');
    poly([[5,-39],[16,-48],[16,-30]],'#cb6e68');
    poly([[-12,-36],[-13,-43],[-6,-38]],'#ffbda7');
    poly([[9,-38],[13,-43],[12,-35]],'#ffbda7');
    // Head, tiny muzzle, expressive eyes.
    ellipse(0,-29,16.5,14.5,'#eb9476');
    ellipse(-8,-23,9,7,'#fff0d1');ellipse(7,-23,9,7,'#fff0d1');
    ellipse(-6,-30,2.4,3.2,'#343752');ellipse(8,-30,2.4,3.2,'#343752');
    ellipse(1,-22,2.8,2.1,'#674361');
    ellipse(-11,-23,3,1.7,'#ffb09d');ellipse(12,-23,3,1.7,'#ffb09d');
    // A jaunty little kerchief.
    poly([[-10,-16],[6,-16],[13,-19],[10,-12],[-7,-12]], '#6edacb');
    ctx.restore();
  }

  function drawParticles() {
    for (const p of particles) {
      if (!visible(p.x, 10)) continue;
      ctx.globalAlpha = Math.max(0,p.life/p.maxLife);
      ellipse(p.x,p.y,p.radius * Math.max(.25,p.life/p.maxLife),p.radius * Math.max(.25,p.life/p.maxLife),p.color);
    }
    ctx.globalAlpha=1;
    for (const item of floatLabels) {
      if (!visible(item.x, 50)) continue;
      ctx.globalAlpha = item.life / item.maxLife;
      ctx.font='900 17px system-ui';ctx.textAlign='center';
      ctx.shadowColor='#33415b';ctx.shadowBlur=6;
      ctx.fillStyle=item.color;ctx.fillText(item.text,item.x,item.y);
      ctx.shadowBlur=0;
    }
    ctx.globalAlpha=1;
  }

  function render() {
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const dpr = canvas.width / W;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.save();
    if (shake > .3) ctx.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake*.65);
    drawBackground();
    ctx.save();ctx.translate(-cameraX,0);
    for (const block of level.solids) if (block.kind === 'ground') drawGround(block);
    for (const block of level.solids) if (block.kind === 'platform') drawPlatform(block);
    level.decorations.forEach(drawDecoration);
    drawCheckpoint();
    drawGoal();
    for (const star of level.stars) drawStar(star);
    for (const enemy of level.enemies) drawEnemy(enemy);
    drawParticles();
    drawPip();
    ctx.restore();

    // Soft vignette keeps the attention on the center of the level.
    const vignette = ctx.createRadialGradient(W/2,H/2,200,W/2,H/2,640);
    vignette.addColorStop(0,'#10152b00');vignette.addColorStop(1,'#141a3334');
    ctx.fillStyle=vignette;ctx.fillRect(0,0,W,H);
    if (screenFlash > 0) {
      ctx.fillStyle=`rgba(255,244,215,${Math.min(.43, screenFlash*1.7)})`;
      ctx.fillRect(0,0,W,H);
    }
    ctx.restore();
  }

  function frame(now) {
    if (!lastFrame) lastFrame = now;
    const dt = Math.min(.05, (now - lastFrame) / 1000);
    lastFrame = now;
    lag = Math.min(.12, lag + dt);
    while (lag >= STEP) { update(STEP); lag -= STEP; }
    render();
    requestAnimationFrame(frame);
  }

  function initCanvas() {
    const touchScreen = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const ratio = Math.min(touchScreen ? 1.5 : 2, window.devicePixelRatio || 1);
    canvas.width = Math.round(W * ratio);
    canvas.height = Math.round(H * ratio);
  }

  function playTone(frequency, duration, type, volume, endFrequency = frequency) {
    if (muted) return;
    try {
      const AudioAPI = window.AudioContext || window.webkitAudioContext;
      if (!AudioAPI) return;
      if (!audioCtx) audioCtx = new AudioAPI();
      if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(Math.max(1,frequency),t);
      osc.frequency.exponentialRampToValueAtTime(Math.max(1,endFrequency),t+duration);
      gain.gain.setValueAtTime(.001,t);
      gain.gain.exponentialRampToValueAtTime(volume,t+.013);
      gain.gain.exponentialRampToValueAtTime(.001,t+duration);
      osc.connect(gain);gain.connect(audioCtx.destination);
      osc.start(t);osc.stop(t+duration+.01);
    } catch (_) { /* Sound is optional, and never blocks gameplay. */ }
  }
  function playSfx(name) {
    if (name === 'jump') playTone(360,.16,'sine',.06,600);
    if (name === 'star') { playTone(820,.095,'sine',.055,1130); playTone(1260,.12,'sine',.025,1520); }
    if (name === 'stomp') playTone(220,.19,'triangle',.08,115);
    if (name === 'hurt') playTone(230,.36,'sawtooth',.045,88);
    if (name === 'checkpoint') { playTone(540,.17,'sine',.065,760); playTone(950,.26,'sine',.03,1100); }
    if (name === 'start') { playTone(430,.21,'sine',.05,625); playTone(660,.25,'sine',.05,900); }
    if (name === 'win') { playTone(600,.37,'triangle',.055,940); playTone(900,.43,'sine',.048,1230); }
  }

  function updateSoundButton() {
    soundBtn.classList.toggle('sound-muted', muted);
    soundBtn.setAttribute('aria-pressed', String(muted));
    soundBtn.setAttribute('aria-label', muted ? 'Unmute sound' : 'Mute sound');
    soundBtn.title = muted ? 'Unmute (M)' : 'Mute (M)';
  }
  function toggleMute() { muted = !muted;safeSet('luma-hop-muted', muted);updateSoundButton();if(!muted)playSfx('star'); }

  function isJumpDown() { return key.jump || touch.jump; }
  function setPressed(which, pressed, source) {
    const hadJump = isJumpDown();
    source[which] = pressed;
    if (which === 'jump' && pressed && !hadJump) jumpRequested = true;
  }
  const codeToDirection = (code) => {
    if (code === 'ArrowLeft' || code === 'KeyA') return 'left';
    if (code === 'ArrowRight' || code === 'KeyD') return 'right';
    if (code === 'Space' || code === 'ArrowUp' || code === 'KeyW' || code === 'KeyK') return 'jump';
    return null;
  };
  window.addEventListener('keydown', (event) => {
    const code = event.code;
    const direction = codeToDirection(code);
    if (direction) { event.preventDefault();setPressed(direction,true,key);return; }
    if (event.repeat) return;
    if (code === 'Escape' || code === 'KeyP') { event.preventDefault();togglePause(); }
    if (code === 'KeyM') toggleMute();
    if (code === 'KeyR') startGame();
    if (code === 'Enter') {
      if (mode === 'menu' || mode === 'gameOver' || mode === 'victory') startGame();
      else if (mode === 'paused') resumeGame();
      else if (mode === 'levelComplete') nextLevel();
    }
  });
  window.addEventListener('keyup', (event) => {
    const direction = codeToDirection(event.code);
    if (direction) { event.preventDefault();setPressed(direction,false,key); }
  });
  window.addEventListener('blur', () => { if (mode === 'playing') pauseGame(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && mode === 'playing') pauseGame(); });

  function installTouchButton(id, which) {
    const button = document.getElementById(id);
    const pointerIds = new Set();
    button.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      pointerIds.add(event.pointerId);
      try { button.setPointerCapture(event.pointerId); } catch (_) {}
      button.classList.add('pressed');
      setPressed(which, true, touch);
    });
    function release(event) {
      if (!pointerIds.has(event.pointerId)) return;
      event.preventDefault();
      pointerIds.delete(event.pointerId);
      if (pointerIds.size === 0) {
        button.classList.remove('pressed');
        setPressed(which,false,touch);
      }
    }
    button.addEventListener('pointerup',release);
    button.addEventListener('pointercancel',release);
    button.addEventListener('lostpointercapture',release);
    // Fallback when virtual buttons are used with a keyboard / assistive click.
    button.addEventListener('click', () => {
      if (which === 'jump' && mode === 'playing' && !pointerIds.size) jumpRequested = true;
    });
  }
  installTouchButton('leftBtn','left');
  installTouchButton('rightBtn','right');
  installTouchButton('jumpBtn','jump');

  screenCard.addEventListener('click', async (event) => {
    const b = event.target.closest('[data-action]');
    if (!b) return;
    const action = b.dataset.action;
    if (action === 'start' || action === 'restart') startGame();
    else if (action === 'next') nextLevel();
    else if (action === 'resume') resumeGame();
    else if (action === 'share') {
      const url = /^https?:$/.test(location.protocol) ? ` Play it here: ${location.href.split('#')[0]}` : '';
      const shareText = `I scored ${runScore.toLocaleString()} points and collected ${runStars} stars in Luma Hop! ✦ Can you beat me?${url}`;
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(shareText);
        } else {
          const el = document.createElement('textarea');
          el.value = shareText;
          el.style.position = 'fixed';el.style.opacity = '0';
          document.body.appendChild(el);el.select();
          const copied = document.execCommand('copy');el.remove();
          if (!copied) throw Error('Clipboard unavailable');
        }
        b.textContent = 'Copied! Share with your friends ✓';
      } catch (_) {
        b.textContent = `Your score: ${runScore.toLocaleString()} ✦`;
      }
    }
  });
  soundBtn.addEventListener('click', toggleMute);
  pauseBtn.addEventListener('click', togglePause);
  document.getElementById('fullscreenBtn').addEventListener('click', async () => {
    try {
      const panel = document.querySelector('.game-panel');
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (panel.requestFullscreen) await panel.requestFullscreen();
    } catch (_) { /* unavailable in some embedded browsers */ }
  });

  initCanvas();
  window.addEventListener('resize', initCanvas);
  loadLevel(0);
  updateSoundButton();
  showScreen('menu');
  requestAnimationFrame(frame);
})();
