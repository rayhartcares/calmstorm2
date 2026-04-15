/* ═══════════════════════════════════════════════════════════════════
   CALM THE STORM — script.js
   Brave Feelings Lab | Flagship Program
   Session 2: Navigation Engine, localStorage, Login Routing, Menu
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

// ── CONFIGURATION ────────────────────────────────────────────────────────
const CONFIG = {
  PASSWORD: 'Ephesians4:31$',

  // localStorage keys — never change these once deployed
  KEYS: {
    FIRST_LOGIN:    'cts_firstLogin',
    LAST_SCREEN:    'cts_lastScreen',
    PROGRESS:       'cts_progress',
    STORM_HISTORY:  'cts_stormHistory',
    WEEKLY_SCORES:  'cts_weeklyScores',
    VALUES:         'cts_values',
    USER_NAME:      'cts_userName',
  },

  // Screen order — the canonical navigation sequence
  SCREEN_ORDER: [
    'S0','S1','S3',
    'M1','M2','M3','M4','M5','M6','M7','M8','M9','M10',
    'M11','M12','M13','M14','M15','M16','M17','M18',
    'M19','M20','M21','M22','M23','M24','M25','M26','M27','M28','M29','M30',
    'M31','M32','M33','M34','M35','M36','M37','M38','M39','M40',
    'M41','M42','M43','M44','M45','M46','M47','M48','M49','M50',
    'M51','M52','M53','M54','M55','M56','M57','M58','M59','M60',
    'M61','M62','M63','M64','M65','M66','M67','M68','M69','M70',
    'M71','M72','M73','M74','M75','M76','M77','M78','M79','M80',
    'M81','M82','M83','M84','M85','M86','M87','M88','M89','M90',
    'M91','M92','M93','M94','M95','M96','M97','M98','M99','M100','M101',
    'S5','S6'
  ],

  // Phase map — screen ID → phase metadata
  PHASES: {
    system: {
      label: 'System',
      screens: ['S0','S1','S3','S4','S5','S6'],
      color: '#4A5568'
    },
    phase1: {
      label: 'Phase 1 — Understand the Storm',
      shortLabel: 'Understand the Storm',
      screens: ['M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11','M12','M13','M14','M15','M16','M17','M18'],
      color: '#2A7F7F'
    },
    phase2: {
      label: 'Phase 2 — Challenge the Thoughts',
      shortLabel: 'Challenge the Thoughts',
      screens: ['M19','M20','M21','M22','M23','M24','M25','M26','M27','M28','M29','M30'],
      color: '#1A6B8A'
    },
    phase3: {
      label: 'Phase 3 — Speak & Act Wisely',
      shortLabel: 'Speak & Act Wisely',
      screens: ['M31','M32','M33','M34','M35','M36','M37','M38','M39','M40','M41','M42','M43','M44','M45','M46','M47','M48','M49','M50'],
      color: '#3A5FA0'
    },
    phase4: {
      label: 'Phase 4 — Repair & Rebuild',
      shortLabel: 'Repair & Rebuild',
      screens: ['M51','M52','M53','M54','M55','M56','M57','M58','M59','M60','M61','M62','M63','M64','M65','M66','M67','M68','M69','M70'],
      color: '#6B3A7D'
    },
    phase5: {
      label: 'Phase 5 — Measure & Maintain',
      shortLabel: 'Measure & Maintain',
      screens: ['M71','M72','M73','M74','M75','M76','M77','M78','M79','M80','M81','M82','M83','M84','M85','M86','M87','M88','M89','M90','M91','M92','M93','M94','M95','M96','M97','M98','M99','M100','M101'],
      color: '#C9A84C'
    }
  },

  // Screen titles — used in side menu
  SCREEN_TITLES: {
    'S0': 'Password Gate',
    'S1': 'Welcome — Benne Hart',
    'S3': 'Safety Check-in',
    'S5': 'Progress Dashboard',
    'S6': 'Certificate & Graduation',
    'M1':  'What Anger Is',
    'M2':  'Your Storm Meter',
    'M3':  'Buildup Cues',
    'M4':  'Trigger Stack',
    'M5':  'Safety First',
    'M6':  'The Pause',
    'M7':  'Long Exhale',
    'M8':  'PMR Quick Set',
    'M9':  'Step Away Safely',
    'M10': 'Calm Menu',
    'M11': 'Venting Myth',
    'M12': 'Rumination Trap',
    'M13': 'Aggression Cycle',
    'M14': 'Aftermath Repair',
    'M15': 'Ask for Help',
    'M16': 'Hot vs Cool Thoughts',
    'M17': 'Cognitive Distortions',
    'M18': 'A-B-C-D Model',
    'M19': 'Thought Stopping',
    'M20': 'Reappraise Early',
    'M21': 'Emotion Respect',
    'M22': 'Name the Feeling',
    'M23': 'Mindful Attention',
    'M24': 'Urge Surfing',
    'M25': 'Values Compass',
    'M26': 'Assertive vs Aggressive',
    'M27': 'Conflict Resolution',
    'M28': 'I Feel / I Need',
    'M29': 'Deep Listening',
    'M30': 'Repair Attempt',
    'M31': 'Family Patterns',
    'M32': 'Trauma Overlay',
    'M33': 'DAR-5 Screen',
    'M34': 'Forgiveness vs Trust',
    'M35': 'Exposure Practice',
    'M36': 'Assertiveness Track',
    'M37': 'Digital Anger',
    'M38': 'Parenting Anger',
    'M39': 'Workplace Scripts',
    'M40': 'Anger in the Body',
    'M41': 'Suppression Trap',
    'M42': 'Contempt Warning',
    'M43': 'Time Perspective',
    'M44': 'Gratitude Counter',
    'M45': 'Compassion Practice',
    'M46': 'Repair Ritual',
    'M47': 'Anger & Justice',
    'M48': 'Confession & Ownership',
    'M49': 'Accountability Partner',
    'M50': 'Time-Out Contract',
    'M51': 'Soft Start Script',
    'M52': 'Reflective Listening',
    'M53': 'Problem-Solving Steps',
    'M54': 'Conflict Ritual',
    'M55': 'Workplace Anger Scripts',
    'M56': 'Digital Anger Protocol',
    'M57': 'Parenting Anger Script',
    'M58': 'Sibling/Peer Conflict',
    'M59': 'Trauma-Aware Anger',
    'M60': 'DAR-5 Reassessment',
    'M61': 'Relapse Prevention Plan',
    'M62': 'High-Risk Situations',
    'M63': 'Early Warning Signs',
    'M64': 'Stress Management',
    'M65': 'Sleep & Anger',
    'M66': 'Exercise Protocol',
    'M67': 'Nutrition Basics',
    'M68': 'Support Network Map',
    'M69': 'Spiritual Maintenance',
    'M70': 'DAR-5 Final Measurement',
    'M71': 'Why Measurement Matters',
    'M72': 'PROMIS Anger Short Form',
    'M73': 'Storm Score Trends',
    'M74': 'STAXI-2 Explanation',
    'M75': 'Repair Time Tracking',
    'M76': 'Self-Control Habit',
    'M77': 'Conflict Rehearsal',
    'M78': 'Relapse Prevention Map',
    'M79': 'Weekly Check-In',
    'M80': 'Sleep & Irritability',
    'M81': 'Substance & Anger',
    'M82': 'Medication Education',
    'M83': 'Family Anger Map',
    'M84': 'Accountability Review',
    'M85': 'Maintenance Plan',
    'M86': 'Gratitude Streak',
    'M87': 'Progress Reflection',
    'M88': 'Peer Support Plan',
    'M89': 'Spiritual Formation Review',
    'M90': 'Anger Styles Review',
    'M91': 'Forgiveness Milestone',
    'M92': 'Relationship Trust Tracker',
    'M93': 'Contemplation of Anger',
    'M94': 'Emergency Calm Card',
    'M95': 'Conflict Resolution Review',
    'M96': 'Anger & Identity',
    'M97': 'Committed Action Plan',
    'M98': 'Final PROMIS Check',
    'M99': "Mentor's Final Words",
    'M100':'Reflection & Testimony',
    'M101':'Graduation & Certificate',
  },

  // Benne bubble messages per screen
  BENNE_MESSAGES: {
    'S3': 'Your honesty here protects you. There\'s no wrong answer — only the right next step.',
    'M1': 'Anger is not the enemy. It is a signal. Let\'s learn to read it.',
    'M2': 'Knowing your storm level is the first act of wisdom. You can\'t navigate what you can\'t name.',
    'M3': 'Catching the cues early — before the storm peaks — is where real change begins.',
    'M4': 'A trigger alone rarely causes the storm. It\'s the trigger plus the load you were already carrying.',
    'M5': 'If any question felt close to home, please reach out before continuing. That is not weakness — it is wisdom.',
    'M6': 'The pause is not passive. It is the bravest move you can make in an angry moment.',
    'M7': 'Six counts in, eight counts out. Your exhale is your emergency brake.',
    'M8': 'Anger lives in your muscles. Releasing physical tension is releasing part of the storm.',
    'M9': 'A time-out is not giving up. It\'s buying time for wisdom to arrive.',
    'M10': 'Build your calm menu before the storm. You can\'t shop for tools in a hurricane.',
    'default': 'Take your time. There\'s no rush here. Every screen is a step forward.'
  }
};

// ── STATE ────────────────────────────────────────────────────────────────
let state = {
  currentScreen: 'S0',
  authenticated: false,
  progress: {},
  stormHistory: [],
  isFirstLogin: true,
};

// ── DOM REFS ─────────────────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);

const DOM = {
  // Password
  passwordForm:    $('passwordForm'),
  passwordInput:   $('passwordInput'),
  pwToggle:        $('pwToggle'),
  pwError:         $('pwError'),
  pwSubmit:        $('pwSubmit'),

  // Navigation
  progressWrapper: $('progressBarWrapper'),
  progressFill:    $('progressFill'),
  progressLabel:   $('progressLabel'),
  hamburgerBtn:    $('hamburgerBtn'),

  // Side menu
  sideMenuOverlay: $('sideMenuOverlay'),
  sideMenu:        $('sideMenu'),
  sideMenuClose:   $('sideMenuClose'),
  sideMenuPhases:  $('sideMenuPhases'),
  menuLogOff:      $('menuLogOff'),
  menuExit:        $('menuExit'),
  menuRestart:     $('menuRestart'),

  // Modals
  restartModal:    $('restartModal'),
  restartCancel:   $('restartCancel'),
  restartConfirm:  $('restartConfirm'),
  resumeModal:     $('resumeModal'),
  resumeContinue:  $('resumeContinue'),
  resumeRestart:   $('resumeRestart'),

  // Benne bubble (persistent)
  benneBubble:     $('benneBubble'),
  benneBubbleText: $('benneBubbleText'),

  // Welcome
  welcomeBeginBtn: $('welcomeBeginBtn'),
  welcomeNextBtn:  $('welcomeNextBtn'),

  // Safety gate
  safetyQuestions: $('safetyQuestions'),
  safetyReferral:  $('safetyReferral'),
  safetyProceed:   $('safetyProceed'),
  safetyRetry:     $('safetyRetry'),
  safetyProceedBtn:$('safetyProceedBtn'),
};

// ── LOCALSTORAGE HELPERS ─────────────────────────────────────────────────
function lsGet(key) {
  try { return localStorage.getItem(key); }
  catch(e) { return null; }
}

function lsSet(key, val) {
  try { localStorage.setItem(key, val); return true; }
  catch(e) { return false; }
}

function lsGetJSON(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

function lsSetJSON(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); return true; }
  catch(e) { return false; }
}

function lsClear() {
  try {
    Object.values(CONFIG.KEYS).forEach(k => localStorage.removeItem(k));
  } catch(e) {}
}

// ── SCREEN NAVIGATION ───────────────────────────────────────────────────
function goTo(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(s => s.hidden = true);

  // Show target
  const target = $(`screen-${screenId}`);
  if (!target) {
    console.warn(`Screen not found: screen-${screenId}`);
    return;
  }

  target.hidden = false;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  state.currentScreen = screenId;

  // Mark progress
  markProgress(screenId);

  // Update UI chrome
  updateProgressBar(screenId);
  updateBenneBubble(screenId);
  updateSideMenuActiveState(screenId);

  // Show/hide chrome based on screen
  const isPasswordScreen = screenId === 'S0';
  const showBar = !isPasswordScreen && state.authenticated;
  DOM.progressWrapper.classList.toggle('visible', showBar);
  DOM.benneBubble.style.display = (!isPasswordScreen && screenId !== 'S1') ? 'flex' : 'none';

  // Save last screen
  if (state.authenticated && screenId !== 'S0') {
    lsSet(CONFIG.KEYS.LAST_SCREEN, screenId);
  }

  // Close menu if open
  closeMenu();

  // Focus management for accessibility
  const heading = target.querySelector('h1, h2');
  if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
}

// ── PROGRESS TRACKING ───────────────────────────────────────────────────
function markProgress(screenId) {
  if (screenId === 'S0') return;
  const progress = lsGetJSON(CONFIG.KEYS.PROGRESS) || {};
  if (!progress[screenId]) {
    progress[screenId] = { completed: true, timestamp: new Date().toISOString() };
    lsSetJSON(CONFIG.KEYS.PROGRESS, progress);
    state.progress = progress;
  }
}

function getProgressPercent() {
  const therapeutic = CONFIG.SCREEN_ORDER.filter(s => !['S0','S1','S3','S5','S6'].includes(s));
  const completed = Object.keys(state.progress).filter(s => therapeutic.includes(s));
  return Math.round((completed.length / therapeutic.length) * 100);
}

function getCurrentPhaseLabel(screenId) {
  for (const [, phase] of Object.entries(CONFIG.PHASES)) {
    if (phase.screens.includes(screenId)) {
      return phase.shortLabel || phase.label;
    }
  }
  return 'Calm the Storm';
}

function updateProgressBar(screenId) {
  if (screenId === 'S0') return;
  const pct = getProgressPercent();
  DOM.progressFill.style.width = `${Math.max(pct, 2)}%`;
  DOM.progressLabel.textContent = getCurrentPhaseLabel(screenId);
}

// ── BENNE BUBBLE ─────────────────────────────────────────────────────────
function updateBenneBubble(screenId) {
  const msg = CONFIG.BENNE_MESSAGES[screenId] || CONFIG.BENNE_MESSAGES['default'];
  if (DOM.benneBubbleText) DOM.benneBubbleText.textContent = msg;
}

// ── SIDE MENU ────────────────────────────────────────────────────────────
function buildSideMenu() {
  if (!DOM.sideMenuPhases) return;
  DOM.sideMenuPhases.innerHTML = '';

  const phaseKeys = ['phase1','phase2','phase3','phase4','phase5'];
  const progress  = lsGetJSON(CONFIG.KEYS.PROGRESS) || {};

  phaseKeys.forEach(key => {
    const phase = CONFIG.PHASES[key];

    // Phase group header
    const groupTitle = document.createElement('div');
    groupTitle.className = 'phase-group-title';
    groupTitle.textContent = phase.label;
    groupTitle.style.color = phase.color + 'CC';
    DOM.sideMenuPhases.appendChild(groupTitle);

    phase.screens.forEach(screenId => {
      const title     = CONFIG.SCREEN_TITLES[screenId] || screenId;
      const isCompleted = !!progress[screenId];
      const isActive  = screenId === state.currentScreen;
      const screenNum = getScreenNumber(screenId); // null for non-M screens

      const btn = document.createElement('button');
      btn.className = 'phase-nav-item' +
        (isActive    ? ' active'    : '') +
        (isCompleted ? ' completed' : '');

      // Screen number badge + title
      const numHtml = screenNum
        ? `<span class="nav-screen-num">${screenNum}</span>`
        : `<span class="phase-nav-dot"></span>`;
      const checkHtml = isCompleted ? `<span class="nav-check">✓</span>` : '';

      btn.innerHTML = `${numHtml}<span class="nav-title-text">${title}</span>${checkHtml}`;
      btn.setAttribute('aria-label', `Screen ${screenNum || ''}: ${title}`);

      // Always navigable — no lock
      btn.addEventListener('click', () => {
        goTo(screenId);
        closeMenu();
      });

      DOM.sideMenuPhases.appendChild(btn);
    });
  });
}

function getNextScreen() {
  const idx = CONFIG.SCREEN_ORDER.indexOf(state.currentScreen);
  return CONFIG.SCREEN_ORDER[idx + 1] || state.currentScreen;
}

function openMenu() {
  buildSideMenu();
  DOM.sideMenu.classList.add('open');
  DOM.sideMenu.setAttribute('aria-hidden', 'false');
  DOM.sideMenuOverlay.classList.add('open');
  DOM.sideMenuOverlay.setAttribute('aria-hidden', 'false');
  DOM.hamburgerBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  DOM.sideMenuClose.focus();
}

function closeMenu() {
  DOM.sideMenu.classList.remove('open');
  DOM.sideMenu.setAttribute('aria-hidden', 'true');
  DOM.sideMenuOverlay.classList.remove('open');
  DOM.sideMenuOverlay.setAttribute('aria-hidden', 'true');
  DOM.hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function updateSideMenuActiveState(screenId) {
  document.querySelectorAll('.phase-nav-item').forEach(item => {
    item.classList.toggle('active', item.textContent.trim() === (CONFIG.SCREEN_TITLES[screenId] || ''));
  });
}

// ── AUTHENTICATION ───────────────────────────────────────────────────────
function handleLogin(password) {
  if (password !== CONFIG.PASSWORD) {
    showPasswordError();
    return;
  }

  state.authenticated = true;

  // Load existing progress
  state.progress = lsGetJSON(CONFIG.KEYS.PROGRESS) || {};
  state.stormHistory = lsGetJSON(CONFIG.KEYS.STORM_HISTORY) || [];

  // First-login detection
  const firstLoginFlag = lsGet(CONFIG.KEYS.FIRST_LOGIN);
  state.isFirstLogin = (firstLoginFlag === null || firstLoginFlag === undefined);

  // Clear any previous error
  hidePasswordError();

  // Route: first time → S1 Welcome directly
  // Returning user → show Resume/Restart modal first
  if (state.isFirstLogin) {
    goTo('S1');
  } else {
    goTo('S1');
    showResumeModal();
  }
}

function showPasswordError() {
  DOM.passwordInput.classList.add('error');
  DOM.pwError.hidden = false;
  DOM.passwordInput.focus();
  DOM.passwordInput.select();

  // Remove shake class after animation
  setTimeout(() => DOM.passwordInput.classList.remove('error'), 500);
}

function hidePasswordError() {
  DOM.pwError.hidden = true;
  DOM.passwordInput.classList.remove('error');
}

function logout() {
  state.authenticated = false;
  state.currentScreen = 'S0';
  closeMenu();
  // Clear session-level state but keep progress
  goTo('S0');
  // Clear the input
  if (DOM.passwordInput) {
    DOM.passwordInput.value = '';
    hidePasswordError();
  }
}

function fullRestart() {
  // Clear all progress
  lsClear();
  state.progress = {};
  state.stormHistory = [];
  state.isFirstLogin = true;
  closeResumeModal();
  closeRestartConfirmModal();
  closeMenu();
  goTo('S1');
}

// ── MODALS ───────────────────────────────────────────────────────────────
function showResumeModal() {
  DOM.resumeModal.hidden = false;
  DOM.resumeContinue.focus();
}

function closeResumeModal() {
  DOM.resumeModal.hidden = true;
}

function showRestartConfirmModal() {
  DOM.restartModal.hidden = false;
  DOM.restartCancel.focus();
}

function closeRestartConfirmModal() {
  DOM.restartModal.hidden = true;
}

// ── SAFETY GATE LOGIC ────────────────────────────────────────────────────
let safetyAnswers = {};

function initSafetyGate() {
  safetyAnswers = {};

  document.querySelectorAll('.safety-btn').forEach(btn => {
    btn.classList.remove('selected');
  });

  document.querySelectorAll('.safety-q').forEach(q => {
    q.classList.remove('answered-yes', 'answered-no');
  });

  if (DOM.safetyReferral)  DOM.safetyReferral.hidden = true;
  if (DOM.safetyProceed)   DOM.safetyProceed.hidden = true;

  document.querySelectorAll('.safety-btn').forEach(btn => {
    btn.addEventListener('click', handleSafetyAnswer);
  });
}

function handleSafetyAnswer(e) {
  const btn = e.currentTarget;
  const qIndex = parseInt(btn.dataset.q);
  const val = btn.dataset.val;

  safetyAnswers[qIndex] = val;

  // Update UI for this question
  const questionEl = document.querySelector(`.safety-q[data-index="${qIndex}"]`);
  if (questionEl) {
    questionEl.classList.remove('answered-yes', 'answered-no');
    questionEl.classList.add(val === 'yes' ? 'answered-yes' : 'answered-no');
    questionEl.querySelectorAll('.safety-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  }

  // Check if all 4 answered
  if (Object.keys(safetyAnswers).length === 4) {
    evaluateSafetyAnswers();
  }
}

function evaluateSafetyAnswers() {
  const anyYes = Object.values(safetyAnswers).some(v => v === 'yes');

  if (anyYes) {
    DOM.safetyReferral.hidden = false;
    DOM.safetyProceed.hidden = true;
  } else {
    DOM.safetyReferral.hidden = true;
    DOM.safetyProceed.hidden = false;
    DOM.safetyProceedBtn.focus();
  }
}

// ── PASSWORD SHOW/HIDE TOGGLE ────────────────────────────────────────────
function initPasswordToggle() {
  if (!DOM.pwToggle || !DOM.passwordInput) return;

  DOM.pwToggle.addEventListener('click', () => {
    const showing = DOM.passwordInput.type === 'text';

    // Toggle input type
    DOM.passwordInput.type = showing ? 'password' : 'text';

    // Update button label and icon
    DOM.pwToggle.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
    DOM.pwToggle.setAttribute('aria-pressed', String(!showing));
    DOM.pwToggle.innerHTML = showing
      ? '<span class="pw-eye">👁</span>'
      : '<span class="pw-eye">🙈</span>';

    // Keep focus on input
    DOM.passwordInput.focus();
  });
}

// ── KEYBOARD NAVIGATION ──────────────────────────────────────────────────
function initKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      closeResumeModal();
      closeRestartConfirmModal();
    }
  });
}

// ── GLOBAL goTo (accessible from inline onclick in placeholder screens) ──
window.goTo = goTo;

// ── EVENT LISTENERS ──────────────────────────────────────────────────────
function initEventListeners() {

  // ── Password form
  if (DOM.passwordForm) {
    DOM.passwordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = DOM.passwordInput.value.trim();
      if (!val) {
        showPasswordError();
        return;
      }
      handleLogin(val);
    });
  }

  // Clear error on type
  if (DOM.passwordInput) {
    DOM.passwordInput.addEventListener('input', hidePasswordError);
  }

  // ── Hamburger menu
  if (DOM.hamburgerBtn) {
    DOM.hamburgerBtn.addEventListener('click', openMenu);
  }

  if (DOM.sideMenuClose) {
    DOM.sideMenuClose.addEventListener('click', closeMenu);
  }

  if (DOM.sideMenuOverlay) {
    DOM.sideMenuOverlay.addEventListener('click', closeMenu);
  }

  // ── Menu actions
  if (DOM.menuLogOff) {
    DOM.menuLogOff.addEventListener('click', logout);
  }

  if (DOM.menuExit) {
    DOM.menuExit.addEventListener('click', logout);
  }

  if (DOM.menuRestart) {
    DOM.menuRestart.addEventListener('click', () => {
      closeMenu();
      showRestartConfirmModal();
    });
  }

  // ── Restart modal
  if (DOM.restartCancel) {
    DOM.restartCancel.addEventListener('click', closeRestartConfirmModal);
  }

  if (DOM.restartConfirm) {
    DOM.restartConfirm.addEventListener('click', fullRestart);
  }

  // ── Resume modal
  if (DOM.resumeContinue) {
    DOM.resumeContinue.addEventListener('click', () => {
      closeResumeModal();
      const lastScreen = lsGet(CONFIG.KEYS.LAST_SCREEN);
      if (lastScreen && CONFIG.SCREEN_ORDER.includes(lastScreen)) {
        goTo(lastScreen);
      } else {
        goTo('S3');
      }
    });
  }

  if (DOM.resumeRestart) {
    DOM.resumeRestart.addEventListener('click', () => {
      closeResumeModal();
      fullRestart();
    });
  }

  // ── Welcome screen begin button
  if (DOM.welcomeBeginBtn) {
    DOM.welcomeBeginBtn.addEventListener('click', () => {
      lsSet(CONFIG.KEYS.FIRST_LOGIN, 'false');
      state.isFirstLogin = false;
      goTo('S3');
    });
  }

  if (DOM.welcomeNextBtn) {
    DOM.welcomeNextBtn.addEventListener('click', () => {
      lsSet(CONFIG.KEYS.FIRST_LOGIN, 'false');
      state.isFirstLogin = false;
      goTo('S3');
    });
  }

  // ── Safety gate
  if (DOM.safetyRetry) {
    DOM.safetyRetry.addEventListener('click', () => {
      safetyAnswers = {};
      DOM.safetyReferral.hidden = true;
      DOM.safetyProceed.hidden = true;
      document.querySelectorAll('.safety-btn').forEach(b => b.classList.remove('selected'));
      document.querySelectorAll('.safety-q').forEach(q => q.classList.remove('answered-yes', 'answered-no'));
    });
  }

  if (DOM.safetyProceedBtn) {
    DOM.safetyProceedBtn.addEventListener('click', () => {
      goTo('M1');
    });
  }
}

// ── INIT ─────────────────────────────────────────────────────────────────
function init() {
  // Always start on password screen
  goTo('S0');

  // Initialize components
  initPasswordToggle();
  initKeyboardNav();
  initEventListeners();
  initSafetyGate();

  // Initially hide persistent Benne bubble
  if (DOM.benneBubble) DOM.benneBubble.style.display = 'none';

  console.log('Calm the Storm — initialized. 108 screens mapped.');
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ── DASHBOARD RENDERER ───────────────────────────────────────────────────
function renderDashboard() {
  const progress = lsGetJSON(CONFIG.KEYS.PROGRESS) || {};
  const stormHistory = lsGetJSON(CONFIG.KEYS.STORM_HISTORY) || [];
  const therapeutic = CONFIG.SCREEN_ORDER.filter(s =>
    !['S0','S1','S3','S4','S5','S6'].includes(s)
  );
  const completedScreens = Object.keys(progress).filter(s => therapeutic.includes(s));
  const pct = Math.round((completedScreens.length / therapeutic.length) * 100);

  // Stat cards
  const statScreens = document.getElementById('statScreens');
  const statPercent = document.getElementById('statPercent');
  const statAvgStorm = document.getElementById('statAvgStorm');
  const statAvgSub = document.getElementById('statAvgSub');
  const statPhaseName = document.getElementById('statPhaseName');
  const statScreensFill = document.getElementById('statScreensFill');
  const statPercentFill = document.getElementById('statPercentFill');

  if (statScreens) statScreens.textContent = completedScreens.length;
  if (statPercent) statPercent.textContent = pct + '%';
  if (statScreensFill) statScreensFill.style.width = Math.min(pct, 100) + '%';
  if (statPercentFill) statPercentFill.style.width = Math.min(pct, 100) + '%';

  // Average storm score
  if (stormHistory.length > 0) {
    const avg = (stormHistory.reduce((a, b) => a + (b.pre || 0), 0) / stormHistory.length).toFixed(1);
    if (statAvgStorm) statAvgStorm.textContent = avg;
    if (statAvgSub) statAvgSub.textContent = `From ${stormHistory.length} rating${stormHistory.length !== 1 ? 's' : ''}`;
  }

  // Current phase
  const currentScreen = lsGet(CONFIG.KEYS.LAST_SCREEN) || 'M1';
  const phaseLabel = getCurrentPhaseLabel(currentScreen);
  if (statPhaseName) statPhaseName.textContent = phaseLabel;

  // Phase progress bars
  const phaseList = document.getElementById('phaseProgressList');
  if (phaseList) {
    phaseList.innerHTML = '';
    const phaseData = [
      { key: 'phase1', label: 'Understand the Storm',  color: '#2A7F7F', num: '1' },
      { key: 'phase2', label: 'Challenge the Thoughts', color: '#1A6B8A', num: '2' },
      { key: 'phase3', label: 'Speak & Act Wisely',     color: '#3A5FA0', num: '3' },
      { key: 'phase4', label: 'Repair & Rebuild',       color: '#6B3A7D', num: '4' },
      { key: 'phase5', label: 'Measure & Maintain',     color: '#C9A84C', num: '5' },
    ];

    phaseData.forEach(ph => {
      const phase = CONFIG.PHASES[ph.key];
      const total = phase.screens.length;
      const done  = phase.screens.filter(s => progress[s]).length;
      const phasePct = total > 0 ? Math.round((done / total) * 100) : 0;

      const item = document.createElement('div');
      item.className = 'phase-progress-item';
      item.innerHTML = `
        <div class="phase-progress-num" style="background:${ph.color}">${ph.num}</div>
        <div class="phase-progress-info">
          <div class="phase-progress-label">${ph.label}</div>
          <div class="phase-progress-bar">
            <div class="phase-progress-fill" style="width:${phasePct}%;background:${ph.color}"></div>
          </div>
        </div>
        <div class="phase-progress-pct">${phasePct}%</div>
      `;
      phaseList.appendChild(item);
    });
  }

  // Storm chart
  renderStormChart(stormHistory);
}

function renderStormChart(history) {
  const canvas = document.getElementById('stormChart');
  const empty  = document.getElementById('stormChartEmpty');
  if (!canvas) return;

  if (!history || history.length === 0) {
    canvas.style.display = 'none';
    if (empty) empty.style.display = 'flex';
    return;
  }

  if (empty) empty.style.display = 'none';
  canvas.style.display = 'block';

  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || 600;
  const H = canvas.offsetHeight || 160;
  canvas.width = W;
  canvas.height = H;

  const pad = { top: 16, right: 24, bottom: 32, left: 32 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  ctx.clearRect(0, 0, W, H);

  const points = history.slice(-20); // Last 20 entries
  const maxVal = 10;

  // Grid lines
  ctx.strokeStyle = 'rgba(0,0,0,0.06)';
  ctx.lineWidth = 1;
  [0, 2, 4, 6, 8, 10].forEach(v => {
    const y = pad.top + chartH - (v / maxVal) * chartH;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + chartW, y);
    ctx.stroke();
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.font = '10px DM Sans, sans-serif';
    ctx.fillText(v, pad.left - 24, y + 4);
  });

  if (points.length < 2) {
    // Single dot
    const x = pad.left + chartW / 2;
    const y = pad.top + chartH - ((points[0].pre || 0) / maxVal) * chartH;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#2A7F7F';
    ctx.fill();
    return;
  }

  // Gradient fill
  const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
  grad.addColorStop(0, 'rgba(42,127,127,0.25)');
  grad.addColorStop(1, 'rgba(42,127,127,0)');

  const xStep = chartW / (points.length - 1);

  // Fill path
  ctx.beginPath();
  points.forEach((p, i) => {
    const x = pad.left + i * xStep;
    const y = pad.top + chartH - ((p.pre || 0) / maxVal) * chartH;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  const lastX = pad.left + (points.length - 1) * xStep;
  ctx.lineTo(lastX, pad.top + chartH);
  ctx.lineTo(pad.left, pad.top + chartH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.strokeStyle = '#2A7F7F';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  points.forEach((p, i) => {
    const x = pad.left + i * xStep;
    const y = pad.top + chartH - ((p.pre || 0) / maxVal) * chartH;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Dots
  points.forEach((p, i) => {
    const x = pad.left + i * xStep;
    const y = pad.top + chartH - ((p.pre || 0) / maxVal) * chartH;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#2A7F7F';
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });
}

// ── CERTIFICATE POPULATOR ────────────────────────────────────────────────
function populateCertificate() {
  const certDate = document.getElementById('certDate');
  const certScreens = document.getElementById('certScreens');
  const certName = document.getElementById('certName');

  if (certDate) {
    certDate.textContent = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  const progress = lsGetJSON(CONFIG.KEYS.PROGRESS) || {};
  const therapeutic = CONFIG.SCREEN_ORDER.filter(s =>
    !['S0','S1','S3','S4','S5','S6'].includes(s)
  );
  const done = Object.keys(progress).filter(s => therapeutic.includes(s)).length;
  if (certScreens) certScreens.textContent = done;

  const userName = lsGet(CONFIG.KEYS.USER_NAME);
  if (certName && userName) certName.textContent = userName;
}

// ── HOOK DASHBOARD + CERT INTO goTo ─────────────────────────────────────
// Extend goTo to trigger renders on specific screens
const _originalGoTo = goTo;
window.goTo = function(screenId) {
  _originalGoTo(screenId);
  if (screenId === 'S5') {
    setTimeout(renderDashboard, 80);
  }
  if (screenId === 'S6') {
    setTimeout(populateCertificate, 80);
  }
};

// ── MODULE INTERACTION HANDLERS ──────────────────────────────────────────

// Storm slider labels
const STORM_LABELS = [
  'Calm — No anger present',
  'Very mild — Barely noticeable',
  'Mild — Slight irritation',
  'Mild-moderate — Tension building',
  'Moderate — Clearly noticeable',
  'Moderate — Difficult to ignore',
  'High — Thinking is harder',
  'High — Strong urge to react',
  'Very high — Hard to control',
  'Severe — Barely holding back',
  'Peak — Flooding, loss of control'
];

function initStormSlider(sliderId, numId, labelId) {
  const slider = document.getElementById(sliderId);
  const num    = document.getElementById(numId);
  const label  = document.getElementById(labelId);
  if (!slider) return;
  const update = () => {
    const v = parseInt(slider.value);
    if (num)   num.textContent = v;
    if (label) label.textContent = STORM_LABELS[v] || '';
    // Color thumb by level
    if (v <= 3)       slider.style.setProperty('--thumb-color', '#2A7F7F');
    else if (v <= 6)  slider.style.setProperty('--thumb-color', '#C9A84C');
    else              slider.style.setProperty('--thumb-color', '#8B1A1A');
  };
  slider.addEventListener('input', update);
  update();
}

// Cue checklist counter
function initCueChecklist(listId, countId) {
  const list  = document.getElementById(listId);
  const count = document.getElementById(countId);
  if (!list || !count) return;
  list.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      const n = list.querySelectorAll('input:checked').length;
      count.textContent = `${n} cue${n !== 1 ? 's' : ''} selected`;
      count.style.color = n > 0 ? 'var(--teal)' : 'var(--slate-light)';
    });
  });
}

// M5 safety confirm — enables Next button only when checked
function initSafetyConfirm() {
  const checkbox = document.getElementById('m5SafetyConfirm');
  const nextBtn  = document.getElementById('m5NextBtn');
  if (!checkbox || !nextBtn) return;
  checkbox.addEventListener('change', () => {
    nextBtn.disabled = !checkbox.checked;
  });
}

// saveAndGoTo — marks screen complete, saves storm rating if present, navigates
function saveAndGoTo(currentScreen, nextScreen) {
  // Save completion
  const progress = lsGetJSON(CONFIG.KEYS.PROGRESS) || {};
  if (!progress[currentScreen]) {
    progress[currentScreen] = { completed: true, timestamp: new Date().toISOString() };
  }

  // Save storm pre-rating if slider present
  const slider = document.getElementById(`${currentScreen.toLowerCase()}StormSlider`)
               || document.getElementById(`m1StormSlider`);
  if (slider && currentScreen === 'M1') {
    progress[currentScreen].stormPre = parseInt(slider.value);
    // Also log to storm history
    const history = lsGetJSON(CONFIG.KEYS.STORM_HISTORY) || [];
    history.push({ date: new Date().toISOString().split('T')[0], pre: parseInt(slider.value) });
    lsSetJSON(CONFIG.KEYS.STORM_HISTORY, history);
  }

  lsSetJSON(CONFIG.KEYS.PROGRESS, progress);
  lsSet(CONFIG.KEYS.LAST_SCREEN, currentScreen);
  goTo(nextScreen);
}

// Expose globally
window.saveAndGoTo = saveAndGoTo;

// ── SCREEN-SPECIFIC INIT (called when screen becomes visible) ────────────
function initScreenInteractions(screenId) {
  switch(screenId) {
    case 'M1':
      initStormSlider('m1StormSlider', 'm1StormNum', 'm1StormLabel');
      break;
    case 'M2':
      // No sliders — just text inputs, no special init needed
      break;
    case 'M3':
      initCueChecklist('m3CueChecklist', 'm3CueCount');
      break;
    case 'M5':
      initSafetyConfirm();
      break;
    case 'M6':
      initStormSlider('m6PauseSlider', 'm6PauseNum', 'm6PauseLabel');
      break;
  }
}

// Hook into goTo to init interactions
const _goToWithInit = window.goTo;
window.goTo = function(screenId) {
  _goToWithInit(screenId);
  setTimeout(() => initScreenInteractions(screenId), 50);
};

// ── FIX 1: INTERACTIVE BODY CUE MAP ─────────────────────────────────────
function initBodyCueMap() {
  const svg      = document.getElementById('bodyMapSvg');
  const panel    = document.getElementById('bodyCueInfoPanel');
  const labelEl  = document.getElementById('bcipLabel');
  const descEl   = document.getElementById('bcipDesc');
  if (!svg || !panel) return;

  // Zone data
  const zones = {
    'jaw': {
      label: 'Jaw & Face',
      desc: 'Teeth clenching hard · jaw muscles tightening · face flushing hot · temples beginning to pound · forehead creasing',
      icon: '😤'
    },
    'chest': {
      label: 'Chest & Breathing',
      desc: 'Chest tightening or pressure · breath quickening or going shallow · heart pounding harder · stomach knotting up',
      icon: '💓'
    },
    'fist-l': {
      label: 'Hands & Fists',
      desc: 'Hands clenching into fists · fingers gripping tightly · arms going rigid · shoulders pulling up toward ears',
      icon: '✊'
    },
    'fist-r': {
      label: 'Hands & Fists',
      desc: 'Hands clenching into fists · fingers gripping tightly · arms going rigid · shoulders pulling up toward ears',
      icon: '✊'
    },
    'shoulders': {
      label: 'Shoulders & Neck',
      desc: 'Shoulders rising toward ears · neck stiffening · upper back tightening · head pulling forward and down',
      icon: '💪'
    },
    'pacing': {
      label: 'Legs & Pacing',
      desc: 'Strong urge to pace · legs feeling restless or twitchy · wanting to leave the room · fidgeting · foot tapping',
      icon: '🚶'
    }
  };

  let activeZone = null;

  const iconEl = document.getElementById('bcipIcon');
  const hintEl = document.getElementById('bcipHint');

  function activateZone(zoneName) {
    if (!zones[zoneName]) return;

    // Clear previous active states
    svg.querySelectorAll('.body-zone.active').forEach(el => el.classList.remove('active'));
    svg.querySelectorAll('.hotspot-dot.active').forEach(el => el.classList.remove('active'));

    // Activate matching zones and dots
    svg.querySelectorAll('[data-zone="' + zoneName + '"]').forEach(el => el.classList.add('active'));
    svg.querySelectorAll('.hotspot-dot[data-zone="' + zoneName + '"]').forEach(el => el.classList.add('active'));

    // Update info panel content
    const z = zones[zoneName];
    if (iconEl)  iconEl.textContent  = z.icon;
    if (labelEl) labelEl.textContent = z.label;
    if (descEl)  descEl.textContent  = z.desc;

    // Hide tap hint once user has interacted
    if (activeZone && hintEl) hintEl.style.display = 'none';

    panel.classList.add('active');
    activeZone = zoneName;
  }

  // Attach click/touch to all body zones
  svg.querySelectorAll('.body-zone, .hotspot-dot').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      const zone = el.getAttribute('data-zone');
      if (zone) activateZone(zone);
    });
    el.addEventListener('touchstart', e => {
      e.preventDefault();
      const zone = el.getAttribute('data-zone');
      if (zone) activateZone(zone);
    }, { passive: false });
  });

  // Auto-cycle through zones every 3s if no interaction yet
  const zoneCycle = ['jaw','chest','fist-l','fist-r','pacing'];
  let cycleIdx = 0;
  let cycleTimer = setInterval(() => {
    if (activeZone) { clearInterval(cycleTimer); return; }
    activateZone(zoneCycle[cycleIdx % zoneCycle.length]);
    cycleIdx++;
  }, 2500);

  // Activate jaw first
  setTimeout(() => activateZone('jaw'), 400);
}

// ── PAGINATION ───────────────────────────────────────────────────────────
function getScreenNumber(screenId) {
  if (screenId && screenId.startsWith('M')) return parseInt(screenId.slice(1));
  return null;
}

// Single function — updates or creates the top-bar pagination display
function renderPagination(screenId) {
  const num = getScreenNumber(screenId);

  // Update the top nav bar screen counter
  const counterEl = document.getElementById('navScreenCounter');
  if (counterEl && num) {
    counterEl.innerHTML = `<span class="nav-counter-num">${num}</span><span class="nav-counter-sep">/</span><span class="nav-counter-total">101</span>`;
  }
  // Update phase label
  const barLabel = document.getElementById('progressLabel');
  if (barLabel) {
    barLabel.textContent = num ? getCurrentPhaseLabel(screenId) : 'Calm the Storm';
  }
  // Update progress bar fill
  if (DOM.progressFill && num) {
    DOM.progressFill.style.width = Math.max(Math.round((num/101)*100), 1) + '%';
  }

  // Update or create inline pagination badge on the screen
  const total = 101;
  if (!num) return;
  const pct = Math.round((num / total) * 100);
  const html = `<div class="pagination-badge">
      <span class="pag-num">${num}</span>
      <span class="pag-sep">/</span>
      <span class="pag-total">101</span>
    </div>
    <div class="pagination-bar">
      <div class="pagination-bar-fill" style="width:${pct}%"></div>
    </div>
    <span class="pagination-pct">${pct}%</span>`;

  // Try existing element first
  let el = document.getElementById('pagination' + screenId);
  if (el) { el.innerHTML = html; return; }

  // Inject into placeholder screens
  const screen = document.getElementById('screen-' + screenId);
  if (!screen) return;
  const phaseDiv = screen.querySelector('.module-ph-phase, .module-phase-tag');
  if (!phaseDiv) return;
  if (phaseDiv.nextElementSibling?.classList.contains('module-pagination')) return;
  const pag = document.createElement('div');
  pag.className = 'module-pagination';
  pag.id = 'pagination' + screenId;
  pag.innerHTML = html;
  phaseDiv.insertAdjacentElement('afterend', pag);
}

// Legacy stub — no longer used separately
function injectPlaceholderPagination() {}

// ── HOOK ALL FIXES INTO goTo ─────────────────────────────────────────────
const _goToFinal = window.goTo;
window.goTo = function(screenId) {
  _goToFinal(screenId);
  setTimeout(() => {
    // Pagination — X / 101 counter everywhere
    renderPagination(screenId);

    // Body cue map (M3 only)
    if (screenId === 'M3') initBodyCueMap();
  }, 60);
};

// ── M7: BREATH TIMER ────────────────────────────────────────────────────
let breathInterval = null;
let breathSessionCount = 0;

function startBreathTimer() {
  const circle   = document.getElementById('m7BreathCircle');
  const phaseEl  = document.getElementById('m7PhaseText');
  const countEl  = document.getElementById('m7CountText');
  const startBtn = document.getElementById('m7StartBtn');
  const stopBtn  = document.getElementById('m7StopBtn');
  const sessionEl= document.getElementById('m7SessionCount');
  if (!circle || breathInterval) return;

  startBtn.style.display = 'none';
  stopBtn.style.display  = 'inline-flex';

  let round  = 0;    // 0=inhale, 1=exhale
  let count  = 6;    // start on inhale count
  let cycles = 0;
  const INHALE = 6, EXHALE = 8;

  function tick() {
    if (round === 0) {
      // Inhale
      phaseEl.textContent = 'INHALE';
      phaseEl.style.color = '#2A7F7F';
      circle.className = 'breath-circle inhale';
      countEl.textContent = count;
      count--;
      if (count < 0) { round = 1; count = EXHALE; }
    } else {
      // Exhale
      phaseEl.textContent = 'EXHALE';
      phaseEl.style.color = '#C9A84C';
      circle.className = 'breath-circle exhale';
      countEl.textContent = count;
      count--;
      if (count < 0) {
        round = 0; count = INHALE; cycles++;
        breathSessionCount++;
        if (sessionEl) sessionEl.textContent = breathSessionCount;
        if (cycles >= 4) { stopBreathTimer(); return; }
      }
    }
  }

  tick();
  breathInterval = setInterval(tick, 1000);
}

function stopBreathTimer() {
  if (breathInterval) { clearInterval(breathInterval); breathInterval = null; }
  const circle   = document.getElementById('m7BreathCircle');
  const phaseEl  = document.getElementById('m7PhaseText');
  const countEl  = document.getElementById('m7CountText');
  const startBtn = document.getElementById('m7StartBtn');
  const stopBtn  = document.getElementById('m7StopBtn');
  if (circle)   { circle.className = 'breath-circle'; }
  if (phaseEl)  phaseEl.textContent = 'READY';
  if (countEl)  countEl.textContent = '✓';
  if (startBtn) startBtn.style.display = 'inline-flex';
  if (stopBtn)  stopBtn.style.display  = 'none';
}

window.startBreathTimer = startBreathTimer;
window.stopBreathTimer  = stopBreathTimer;

// ── M8: PMR SEQUENCE ────────────────────────────────────────────────────
let pmrCurrentStep = 0;
let pmrDone = [false, false, false];

function initPmrSequence() {
  const cards = document.querySelectorAll('.pmr-step-card');
  if (!cards.length) return;

  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      if (idx !== pmrCurrentStep || pmrDone[idx]) return;
      activatePmrStep(idx);
    });
  });
  // Activate first step
  activatePmrStep(0);
}

function activatePmrStep(idx) {
  const cards    = document.querySelectorAll('.pmr-step-card');
  const statusEl = document.getElementById(`pmrStatus${idx}`);
  if (!cards[idx]) return;

  cards[idx].classList.remove('pmr-step-locked');
  cards[idx].classList.add('pmr-step-active');
  if (statusEl) statusEl.textContent = '⏱ Hold 3 seconds...';

  // 3s hold, then release
  setTimeout(() => {
    if (statusEl) statusEl.textContent = '✓ Release! Feel the difference.';
    cards[idx].classList.remove('pmr-step-active');
    cards[idx].classList.add('pmr-step-done');
    pmrDone[idx] = true;

    // Unlock next step
    setTimeout(() => {
      pmrCurrentStep = idx + 1;
      if (pmrCurrentStep < cards.length) {
        const next = document.getElementById(`pmrStep${pmrCurrentStep}`);
        const nextStatus = document.getElementById(`pmrStatus${pmrCurrentStep}`);
        if (next) next.classList.remove('pmr-step-locked');
        if (nextStatus) nextStatus.textContent = 'Tap to begin';
        activatePmrStep(pmrCurrentStep);
      }
    }, 1500);
  }, 3000);
}

// ── M10: CALM MENU BUILDER ──────────────────────────────────────────────
function initCalmMenu() {
  const grid    = document.getElementById('calmOptionsGrid');
  const countEl = document.getElementById('calmSelectedCount');
  const customWrap = document.getElementById('calmCustomWrap');
  if (!grid) return;

  let selected = [];

  grid.querySelectorAll('.calm-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.val;

      if (val === 'custom') {
        customWrap.style.display = customWrap.style.display === 'none' ? 'block' : 'none';
        btn.classList.toggle('selected');
        return;
      }

      if (btn.classList.contains('selected')) {
        btn.classList.remove('selected');
        selected = selected.filter(v => v !== val);
      } else {
        if (selected.length >= 5) return;
        btn.classList.add('selected');
        selected.push(val);
      }

      const n = selected.length + (document.querySelector('.calm-option[data-val="custom"].selected') ? 1 : 0);
      if (countEl) {
        countEl.textContent = `${Math.min(n,5)} of 5 selected`;
        countEl.style.color = n >= 5 ? 'var(--teal)' : 'var(--slate-light)';
      }

      // Disable unselected if max reached
      grid.querySelectorAll('.calm-option').forEach(b => {
        if (!b.classList.contains('selected')) {
          b.classList.toggle('max-reached', selected.length >= 5);
        }
      });
    });
  });
}

// ── SCREEN-SPECIFIC INIT FOR SESSION 5 ──────────────────────────────────
const _goToSession5 = window.goTo;
window.goTo = function(screenId) {
  _goToSession5(screenId);
  setTimeout(() => {
    switch(screenId) {
      case 'M7':
        initStormSlider('m7SliderPre','m7NumPre','m7LabelPre');
        break;
      case 'M8':
        initPmrSequence();
        initStormSlider('m8TensionSlider','m8TensionNum','m8TensionLabel');
        break;
      case 'M10':
        initCalmMenu();
        break;
      case 'M11':
        initCueChecklist('m11MythCheck', null);
        break;
      case 'M12':
        initCueChecklist('m12RumTimes', null);
        break;
    }
  }, 60);
};

// ── SESSION 6 JS ─────────────────────────────────────────────────────────

// M14: Apology preview
function previewApology() {
  const a1 = document.getElementById('apology1')?.value.trim();
  const a2 = document.getElementById('apology2')?.value.trim();
  const a3 = document.getElementById('apology3')?.value.trim();
  const preview = document.getElementById('apologyPreview');
  if (!preview) return;
  if (!a1 && !a2 && !a3) {
    preview.hidden = true; return;
  }
  preview.hidden = false;
  preview.innerHTML = `
    ${a1 ? `<p>"I am sorry for ${a1}.</p>` : ''}
    ${a2 ? `<p>It affected you by ${a2}.</p>` : ''}
    ${a3 ? `<p>My plan going forward is ${a3}."</p>` : ''}
  `;
}
window.previewApology = previewApology;

// M17: Distortion selector
const DISTORTION_DATA = {
  always_never:   { label:'Always / Never Thinking', desc:'Using absolute language (always, never, everyone, nobody) that makes a specific event feel universal and permanent. This maximises emotional intensity.' },
  mind_reading:   { label:'Mind Reading', desc:'Assuming you know what another person intended — usually assuming the worst — without evidence. "They did it on purpose" is almost never certain.' },
  catastrophising:{ label:'Catastrophising', desc:'Treating a specific setback as a total disaster. "This ruins everything" escalates the emotional response far beyond the actual event.' },
  labelling:      { label:'Labelling', desc:'Reducing a person to a single trait or behaviour. "They\'re just selfish" closes off curiosity and locks in hostility.' },
  demandingness:  { label:'Demandingness', desc:'Rigid rules about how others must behave. "They must respect me" sets a standard that, when violated, feels like a moral catastrophe rather than a disappointment.' },
  personalising:  { label:'Personalising', desc:'Interpreting everything as being about you. Most of what other people do is about them — not you. Personalising amplifies the sense of threat.' }
};

function selectDistortion(btn) {
  document.querySelectorAll('.distortion-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const key = btn.dataset.dist;
  const data = DISTORTION_DATA[key];
  if (!data) return;
  const result = document.getElementById('distortionResult');
  const label  = document.getElementById('distResultLabel');
  const desc   = document.getElementById('distResultDesc');
  if (result) result.hidden = false;
  if (label)  label.textContent = '⚡ ' + data.label;
  if (desc)   desc.textContent  = data.desc;
}
window.selectDistortion = selectDistortion;

// M18: ABCD completion
function checkAbcd() {
  const a = document.getElementById('abcdA')?.value.trim();
  const d = document.getElementById('abcdD')?.value.trim();
  const complete = document.getElementById('abcdComplete');
  if (!complete) return;
  if (a && d) {
    complete.hidden = false;
    complete.scrollIntoView({ behavior:'smooth', block:'nearest' });
  } else {
    alert('Please complete at least the Activating Event (A) and Dispute (D) to finish this exercise.');
  }
}
window.checkAbcd = checkAbcd;

// Screen init for Session 6
const _goToS6 = window.goTo;
window.goTo = function(screenId) {
  _goToS6(screenId);
  // No special init needed for M13-M18 beyond what's already wired
};

// ── INLINE VISUAL ENRICHMENT ─────────────────────────────────────────────
// Automatically injects visual breaks into long content columns
// so no section runs as a bare wall of text.

const DIVIDER_ICONS = {
  'M1':  '⚡', 'M2':  '🌩', 'M3':  '💪', 'M4':  '🪣',
  'M5':  '🛡', 'M6':  '⏸', 'M7':  '💨', 'M8':  '💆',
  'M9':  '🚶', 'M10': '🌿', 'M11': '🔥', 'M12': '🔄',
  'M13': '💥', 'M14': '💛', 'M15': '🤝', 'M16': '🧊',
  'M17': '🏷', 'M18': '🎓',
};

// Key insights — one per screen, injected between teach card and quote card
const KEY_INSIGHTS = {
  'M1':  { label: 'The Core Distinction', text: 'Anger is a feeling. Aggression is a behaviour. You can control the second — not the first.' },
  'M2':  { label: 'Why the Meter Matters', text: 'Above level 7, your brain\'s rational decision-making is significantly impaired. Catch it at 5.' },
  'M3':  { label: 'The First Skill', text: 'Cue awareness is the gateway to every other skill. You cannot interrupt a storm you haven\'t noticed.' },
  'M4':  { label: 'The Real Cause', text: 'It was never just the spilled drink. The trigger was the last gram on a scale already full.' },
  'M5':  { label: 'Know the Limit', text: 'This program supports professional care. It does not replace it when safety is at risk.' },
  'M6':  { label: 'The Gap', text: 'Between stimulus and response there is a space. That space is everything.' },
  'M7':  { label: 'The Physiology', text: 'A longer exhale activates the vagus nerve — your body\'s own emergency brake system.' },
  'M8':  { label: 'Where Anger Lives', text: 'Anger parks itself in the jaw, shoulders, and fists first. PMR empties all three deliberately.' },
  'M9':  { label: 'The Difference', text: 'An unplanned exit is abandonment. A time-out with a return commitment is wisdom.' },
  'M10': { label: 'The Rule', text: 'You cannot shop for tools in a hurricane. Build the calm menu now — execute it later.' },
  'M11': { label: 'The Evidence', text: 'Doing nothing was more effective than venting. The flame is fed — not extinguished — by expression.' },
  'M12': { label: 'The Loop', text: 'Rumination rehearses the grievance. Every replay strengthens the neural pathway of the wound.' },
  'M13': { label: 'The Window', text: 'The buildup phase is the only intervention window. The explosion is too late. Learn the buildup.' },
  'M14': { label: 'What Heals', text: 'Specific + accountable + forward-looking. Without all three, an apology is performance, not repair.' },
  'M15': { label: 'The Protector', text: 'Social support is not weakness — it is one of the most robust protective factors in emotion research.' },
  'M16': { label: 'The Discovery', text: 'The event did not cause the anger. The hot thought about the event did.' },
  'M17': { label: 'The Signal', text: 'When you hear always, never, must, should, everyone, or nobody — a distortion is operating.' },
  'M18': { label: 'The Whole Model', text: 'Change B, and C changes. The event does not have to change. Your interpretation does.' },
};

function enrichContentColumn(screenId) {
  const screen = document.getElementById('screen-' + screenId);
  if (!screen) return;

  const col = screen.querySelector('.module-content-col');
  if (!col) return;

  // Don't enrich if already done
  if (col.dataset.enriched === '1') return;
  col.dataset.enriched = '1';

  const icon = DIVIDER_ICONS[screenId] || '⚓';
  const insight = KEY_INSIGHTS[screenId];

  // 1. Add visual divider between benne bubble and teach card
  const benneBubble = col.querySelector('.module-benne-bubble');
  const teachCard   = col.querySelector('.module-teach-card');

  if (benneBubble && teachCard && benneBubble.nextElementSibling === teachCard) {
    const divider = document.createElement('div');
    divider.className = 'inline-visual-divider';
    divider.innerHTML = `<span class="inline-visual-divider-icon">${icon}</span>`;
    col.insertBefore(divider, teachCard);
  }

  // 2. Inject key insight box between teach card and quote card
  const quoteCard = col.querySelector('.module-quote-card');
  if (insight && teachCard && quoteCard && teachCard.nextElementSibling === quoteCard) {
    const insightBox = document.createElement('div');
    insightBox.className = 'key-insight';
    insightBox.innerHTML = `
      <div class="key-insight-label">Key Insight</div>
      <div class="key-insight-text">${insight.text}</div>
    `;
    col.insertBefore(insightBox, quoteCard);
  }

  // 3. Add visual divider between quote and scripture
  const scriptureCard = col.querySelector('.module-scripture-card');
  if (quoteCard && scriptureCard && quoteCard.nextElementSibling === scriptureCard) {
    const divider2 = document.createElement('div');
    divider2.className = 'inline-visual-divider';
    divider2.innerHTML = `<span class="inline-visual-divider-icon">✦</span>`;
    col.insertBefore(divider2, scriptureCard);
  }

  // 4. For M18 specifically — add phase completion badge before exercise
  if (screenId === 'M18') {
    const exerciseCard = col.querySelector('.module-exercise-card');
    if (exerciseCard) {
      const badge = document.createElement('div');
      badge.className = 'phase-complete-badge';
      badge.innerHTML = `
        <span class="badge-icon">🎓</span>
        Phase 1 Complete — Understand the Storm
        <span class="badge-icon">⚓</span>
      `;
      col.insertBefore(badge, exerciseCard);
    }
  }
}

// Hook into goTo — enrich each screen when first visited
const _goToEnrich = window.goTo;
window.goTo = function(screenId) {
  _goToEnrich(screenId);
  setTimeout(() => enrichContentColumn(screenId), 80);
};

/* ═══════════════════════════════════════════
   DAR-5 SCORING — M60 Phase 4 Reassessment
═══════════════════════════════════════════ */
const _dar5p4 = { d4r1: 0, d4r2: 0, d4r3: 0, d4r4: 0, d4r5: 0 };

function m60Score(btn, val, rowId) {
  // Highlight selected button in the row
  const row = document.getElementById(rowId);
  if (!row) return;
  row.querySelectorAll('.dar5-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  _dar5p4[rowId] = val;

  // Recalculate and display if all five answered
  const scores = Object.values(_dar5p4);
  if (scores.every(s => s > 0)) {
    const total = scores.reduce((a, b) => a + b, 0);
    const resultEl = document.getElementById('dar5p4result');
    const scoreEl  = document.getElementById('dar5p4score');
    const bandEl   = document.getElementById('dar5p4band');
    if (!resultEl || !scoreEl || !bandEl) return;

    scoreEl.textContent = total;

    let band = '';
    if (total <= 9) {
      band = 'Low concern (5–9) — Anger responses are within a manageable range. Continue maintenance work in Phase 5.';
    } else if (total <= 14) {
      band = 'Mild concern (10–14) — Anger management is improving. Specific skills may still need reinforcement.';
    } else if (total <= 19) {
      band = 'Moderate concern (15–19) — Progress is visible but sustained Phase 5 work is important.';
    } else {
      band = 'High concern (20–25) — Significant anger responses remain. Continue all Phase 5 skills and consider professional support alongside this program.';
    }
    bandEl.textContent = band;
    resultEl.style.display = 'flex';

    // Persist score to localStorage for later comparison
    try {
      const saved = JSON.parse(localStorage.getItem('cts_dar5') || '{}');
      saved.phase4 = total;
      localStorage.setItem('cts_dar5', JSON.stringify(saved));
    } catch(e) {}
  }
}

/* ═══════════════════════════════════════════
   DAR-5 SCORING — M70 Phase 5 Final Measurement
═══════════════════════════════════════════ */
const _dar5p5 = { d5r1: 0, d5r2: 0, d5r3: 0, d5r4: 0, d5r5: 0 };

function m70Score(btn, val, rowId) {
  const row = document.getElementById(rowId);
  if (!row) return;
  row.querySelectorAll('.dar5-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  _dar5p5[rowId] = val;

  const scores = Object.values(_dar5p5);
  if (scores.every(s => s > 0)) {
    const total = scores.reduce((a, b) => a + b, 0);
    const resultEl  = document.getElementById('dar5p5result');
    const scoreEl   = document.getElementById('dar5p5score');
    const bandEl    = document.getElementById('dar5p5band');
    const summaryEl = document.getElementById('dar5p5summary');
    if (!resultEl || !scoreEl || !bandEl) return;

    scoreEl.textContent = total;

    let band = '';
    if (total <= 9) {
      band = 'Low concern (5–9) — Anger responses are within a well-managed range. Maintenance work is your focus from here.';
    } else if (total <= 14) {
      band = 'Mild concern (10–14) — Significant improvement achieved. Continue the Phase 5 practices to consolidate the gains.';
    } else if (total <= 19) {
      band = 'Moderate concern (15–19) — Real progress has been made. Continued deliberate practice of Phase 3–5 skills will continue the improvement.';
    } else {
      band = 'High concern (20–25) — The journey requires continued effort. Consider additional professional support alongside the maintenance practices.';
    }
    bandEl.textContent = band;

    // Compare to Phase 4 score if available
    try {
      const saved = JSON.parse(localStorage.getItem('cts_dar5') || '{}');
      if (saved.phase4) {
        const diff = saved.phase4 - total;
        const direction = diff > 0 ? `↓ ${diff} points from Phase 4` : diff < 0 ? `↑ ${Math.abs(diff)} points from Phase 4` : 'No change from Phase 4';
        if (summaryEl) summaryEl.textContent = `Phase 4 score: ${saved.phase4}/25 → Phase 5 score: ${total}/25 — ${direction}.`;
      }
      saved.phase5 = total;
      localStorage.setItem('cts_dar5', JSON.stringify(saved));
    } catch(e) {}

    resultEl.style.display = 'flex';
  }
}

// ─── PROMIS ANGER SHORT FORM — M72 (Intake) ────────────────────────────────
const m72Answers = {};

function m72Select(btn) {
  const q = btn.getAttribute('data-q');
  const v = parseInt(btn.getAttribute('data-v'));
  // Clear sibling selections
  btn.closest('.dar5-options').querySelectorAll('.dar5-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  m72Answers[q] = v;
}

function m72Score() {
  const required = ['p1','p2','p3','p4','p5'];
  const missing = required.filter(q => !m72Answers[q]);
  if (missing.length > 0) {
    alert('Please answer all 5 items before calculating your score.');
    return;
  }

  const rawScore = required.reduce((sum, q) => sum + m72Answers[q], 0);
  // Approximate T-score conversion (linear mapping for 5-item form: raw 5–25 → T 35–80)
  const tScore = Math.round(35 + ((rawScore - 5) / 20) * 45);

  let band = '';
  let bandColor = '';
  if (tScore < 40) {
    band = 'Low — anger rarely interferes with functioning.';
    bandColor = '#2A9F6F';
  } else if (tScore < 50) {
    band = 'Mild — occasional frustration, manageable.';
    bandColor = '#80AF60';
  } else if (tScore < 60) {
    band = 'Moderate — regular episodes with some functional impact.';
    bandColor = '#C9A84C';
  } else if (tScore < 70) {
    band = 'High — significant daily interference with functioning.';
    bandColor = '#E08030';
  } else {
    band = 'Very High — clinical consultation recommended.';
    bandColor = '#C03030';
  }

  const displayEl = document.getElementById('promisIntakeDisplay');
  const labelEl   = document.getElementById('promisIntakeLabel');
  const bandEl    = document.getElementById('promisIntakeBand');
  const resultEl  = document.getElementById('promisIntakeResult');

  if (displayEl) displayEl.textContent = tScore;
  if (labelEl)   labelEl.textContent   = `Approximate T-Score (Raw: ${rawScore}/25)`;
  if (bandEl) {
    bandEl.textContent = band;
    bandEl.style.color = bandColor;
  }

  // Store to localStorage for M98 comparison
  try {
    const saved = JSON.parse(localStorage.getItem('cts_promis') || '{}');
    saved.intake = tScore;
    saved.intakeRaw = rawScore;
    localStorage.setItem('cts_promis', JSON.stringify(saved));
  } catch(e) {}

  if (resultEl) resultEl.style.display = 'flex';
}

// ─── PROMIS ANGER — M98 Final Check ────────────────────────────────────────
const m98Answers = {};

function m98Select(btn) {
  const q = btn.getAttribute('data-q');
  btn.closest('.dar5-options').querySelectorAll('.dar5-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  m98Answers[q] = parseInt(btn.getAttribute('data-v'));
}

function m98Score() {
  const required = ['f1','f2','f3','f4','f5'];
  const missing = required.filter(q => !m98Answers[q]);
  if (missing.length > 0) {
    alert('Please answer all 5 items before calculating your score.');
    return;
  }

  const rawScore = required.reduce((sum, q) => sum + m98Answers[q], 0);
  const tScore = Math.round(35 + ((rawScore - 5) / 20) * 45);

  let band = '';
  let bandColor = '';
  if (tScore < 40)      { band = 'Low — anger rarely interferes with functioning.';          bandColor = '#2A9F6F'; }
  else if (tScore < 50) { band = 'Mild — occasional frustration, manageable.';               bandColor = '#80AF60'; }
  else if (tScore < 60) { band = 'Moderate — regular episodes with some functional impact.'; bandColor = '#C9A84C'; }
  else if (tScore < 70) { band = 'High — significant daily interference with functioning.';  bandColor = '#E08030'; }
  else                  { band = 'Very High — clinical consultation recommended.';            bandColor = '#C03030'; }

  const displayEl     = document.getElementById('promisFinalDisplay');
  const labelEl       = document.getElementById('promisFinalLabel');
  const bandEl        = document.getElementById('promisFinalBand');
  const compEl        = document.getElementById('promisFinalComparison');
  const resultEl      = document.getElementById('promisFinalResult');

  if (displayEl) displayEl.textContent = tScore;
  if (labelEl)   labelEl.textContent   = `Final T-Score (Raw: ${rawScore}/25)`;
  if (bandEl)  { bandEl.textContent = band; bandEl.style.color = bandColor; }

  // Compare to intake score
  try {
    const saved = JSON.parse(localStorage.getItem('cts_promis') || '{}');
    if (saved.intake) {
      const diff = saved.intake - tScore;
      if (diff > 0) {
        compEl.textContent = `↓ ${diff} points from intake score of ${saved.intake} — clinically meaningful improvement.`;
      } else if (diff < 0) {
        compEl.textContent = `↑ ${Math.abs(diff)} points from intake score of ${saved.intake} — review your maintenance plan.`;
      } else {
        compEl.textContent = `Score unchanged from intake (${saved.intake}) — continue maintenance work.`;
      }
    }
    saved.final = tScore;
    saved.finalRaw = rawScore;
    localStorage.setItem('cts_promis', JSON.stringify(saved));
  } catch(e) {}

  if (resultEl) resultEl.style.display = 'flex';
}

// ─── GRADUATION CERTIFICATE PRINT ──────────────────────────────────────────
function printCertificate() {
  const name = document.getElementById('m101Name') ? document.getElementById('m101Name').value.trim() : '';
  const date = document.getElementById('m101Date') ? document.getElementById('m101Date').value.trim() : '';
  const word = document.getElementById('m101Word') ? document.getElementById('m101Word').value.trim() : '';

  const certHTML = `<!DOCTYPE html><html><head><title>Calm the Storm — Certificate of Completion</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;600&display=swap');
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#FDF8F0; display:flex; justify-content:center; align-items:center; min-height:100vh; font-family:'DM Sans',sans-serif; }
    .cert { width:760px; padding:60px; border:3px solid #C9A84C; background:#FDF8F0; text-align:center; position:relative; }
    .cert::before { content:''; position:absolute; inset:12px; border:1px solid #C9A84C; opacity:0.4; pointer-events:none; }
    .org { font-size:11px; letter-spacing:0.25em; color:#2A7F7F; font-weight:600; text-transform:uppercase; margin-bottom:20px; }
    .title { font-family:'EB Garamond',serif; font-size:42px; color:#1A2B5E; margin-bottom:6px; }
    .subtitle { font-size:13px; color:#4A5568; letter-spacing:0.1em; margin-bottom:32px; }
    .divider { width:120px; height:2px; background:#C9A84C; margin:0 auto 32px; }
    .certifies { font-size:14px; color:#4A5568; margin-bottom:8px; }
    .recipient { font-family:'EB Garamond',serif; font-size:36px; color:#1A2B5E; font-style:italic; margin-bottom:8px; border-bottom:1px solid #C9A84C; display:inline-block; padding:0 40px 6px; }
    .desc { font-size:13px; color:#4A5568; margin:24px 0; line-height:1.8; }
    .programme { font-family:'EB Garamond',serif; font-size:22px; color:#1A2B5E; font-weight:700; }
    .stats { font-size:11px; color:#4A5568; margin-bottom:32px; letter-spacing:0.08em; }
    .word-seal { display:inline-block; border:2px solid #C9A84C; border-radius:50%; width:90px; height:90px; line-height:90px; font-family:'EB Garamond',serif; font-size:13px; color:#C9A84C; font-style:italic; margin:8px 0 24px; }
    .date { font-size:13px; color:#4A5568; }
    .footer { margin-top:32px; font-size:10px; color:#A0A8B0; letter-spacing:0.1em; }
    @media print { body { background:white; } }
  </style></head><body>
  <div class="cert">
    <div class="org">Brave Feelings Lab</div>
    <div class="title">Certificate of Completion</div>
    <div class="subtitle">Adult Anger Management Programme</div>
    <div class="divider"></div>
    <div class="certifies">This certifies that</div>
    <div class="recipient">${name || '_______________________________'}</div>
    <div class="desc">has successfully completed all 101 therapeutic screens<br>across five clinical phases of</div>
    <div class="programme">Calm the Storm</div>
    <div class="stats">CBT · DBT · ACT · Biblical Principles · Five Clinical Phases</div>
    <div class="word-seal">${word || 'Regulated'}</div>
    <div class="date">Completed: ${date || '_______________'}</div>
    <div class="footer">BRAVE FEELINGS LAB · bravefeelings.com · calmthestorm.bravefeelings.com</div>
  </div></body></html>`;

  const win = window.open('', '_blank');
  if (win) {
    win.document.write(certHTML);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 800);
  }
}
