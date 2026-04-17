// Geography Quiz — kid-friendly, no dependencies.
// Modes: flag (show flag, pick country), shape (show silhouette, pick country),
//        symbol (show cultural emoji, pick country).

const TOTAL_QUESTIONS = 10;
const CHOICE_COUNT = 4;

const PRAISE = ["Great job!", "Awesome!", "You got it!", "Nice!", "Woohoo!", "Fantastic!"];
const TRY_AGAIN = ["Oops, try again!", "Not quite!", "Almost!", "Keep going!"];

const screens = {
  home:    document.getElementById("home"),
  quiz:    document.getElementById("quiz"),
  results: document.getElementById("results"),
};

const els = {
  questionText:  document.getElementById("question-text"),
  questionMedia: document.getElementById("question-media"),
  choices:       document.getElementById("choices"),
  feedback:      document.getElementById("feedback"),
  nextBtn:       document.getElementById("next-btn"),
  qNumber:       document.getElementById("q-number"),
  qTotal:        document.getElementById("q-total"),
  score:         document.getElementById("score"),
  resultTitle:   document.getElementById("result-title"),
  resultStars:   document.getElementById("result-stars"),
  resultScore:   document.getElementById("result-score"),
};

const state = {
  mode: null,
  queue: [],
  index: 0,
  score: 0,
  current: null,
  locked: false,
};

// ---------- Audio (simple beeps via Web Audio API) ----------
let audioCtx = null;
function ensureAudio() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) audioCtx = new Ctx();
  }
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}
function playTone(freq, duration = 0.18, type = "sine", gain = 0.12, when = 0) {
  const ctx = ensureAudio();
  if (!ctx) return;
  const t0 = ctx.currentTime + when;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}
function soundCorrect() {
  playTone(660, 0.14, "triangle", 0.14, 0);
  playTone(880, 0.18, "triangle", 0.14, 0.12);
  playTone(1175, 0.22, "triangle", 0.14, 0.26);
}
function soundWrong() {
  playTone(300, 0.18, "square", 0.08, 0);
  playTone(220, 0.22, "square", 0.08, 0.14);
}
function soundFinish() {
  [523, 659, 784, 1046].forEach((f, i) => playTone(f, 0.22, "triangle", 0.14, i * 0.14));
}

// ---------- Utils ----------
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ---------- Screen switching ----------
function show(name) {
  Object.values(screens).forEach((s) => s.classList.remove("active"));
  screens[name].classList.add("active");
}

// ---------- Quiz setup ----------
function startQuiz(mode) {
  state.mode = mode;
  state.queue = shuffle(COUNTRIES).slice(0, TOTAL_QUESTIONS);
  state.index = 0;
  state.score = 0;
  els.qTotal.textContent = TOTAL_QUESTIONS;
  els.score.textContent = "0";
  show("quiz");
  ensureAudio();
  renderQuestion();
}

function buildChoices(correct) {
  const others = shuffle(COUNTRIES.filter((c) => c.code !== correct.code)).slice(0, CHOICE_COUNT - 1);
  return shuffle([correct, ...others]);
}

function renderQuestion() {
  state.locked = false;
  els.feedback.textContent = "";
  els.feedback.className = "feedback";
  els.nextBtn.classList.add("hidden");

  const country = state.queue[state.index];
  state.current = country;
  els.qNumber.textContent = state.index + 1;

  const choices = buildChoices(country);
  els.questionMedia.innerHTML = "";

  if (state.mode === "flag") {
    els.questionText.textContent = "Which country is this?";
    const img = new Image();
    img.src = FLAG_URL(country.code);
    img.alt = "Flag to identify";
    els.questionMedia.appendChild(img);
    renderTextChoices(choices);
  } else if (state.mode === "shape") {
    els.questionText.textContent = "Which country has this shape?";
    const wrap = document.createElement("div");
    wrap.className = "shape-wrap";
    const img = new Image();
    img.src = SHAPE_URL(country.code);
    img.alt = "Country shape to identify";
    wrap.appendChild(img);
    els.questionMedia.appendChild(wrap);
    renderFlagChoices(choices);
  } else if (state.mode === "symbol") {
    els.questionText.textContent = "Where is this from?";
    const big = document.createElement("div");
    big.className = "emoji-big";
    big.textContent = pick(country.symbols);
    els.questionMedia.appendChild(big);
    renderFlagChoices(choices);
  }
}

function renderTextChoices(choices) {
  els.choices.innerHTML = "";
  for (const c of choices) {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = c.name;
    btn.addEventListener("click", () => onAnswer(btn, c));
    els.choices.appendChild(btn);
  }
}

function renderFlagChoices(choices) {
  els.choices.innerHTML = "";
  for (const c of choices) {
    const btn = document.createElement("button");
    btn.className = "choice";
    const img = new Image();
    img.src = FLAG_URL(c.code);
    img.alt = c.name + " flag";
    const label = document.createElement("span");
    label.textContent = c.name;
    btn.appendChild(img);
    btn.appendChild(label);
    btn.addEventListener("click", () => onAnswer(btn, c));
    els.choices.appendChild(btn);
  }
}

function onAnswer(btn, country) {
  if (state.locked) return;
  state.locked = true;
  const buttons = els.choices.querySelectorAll(".choice");
  buttons.forEach((b) => (b.disabled = true));

  if (country.code === state.current.code) {
    btn.classList.add("correct");
    state.score += 1;
    els.score.textContent = state.score;
    els.feedback.textContent = pick(PRAISE) + " It's " + state.current.name + ".";
    els.feedback.classList.add("good");
    soundCorrect();
  } else {
    btn.classList.add("wrong");
    // Highlight the correct one so the child learns.
    buttons.forEach((b, i) => {
      const choiceName = b.querySelector("span")?.textContent || b.textContent;
      if (choiceName === state.current.name) b.classList.add("correct");
    });
    els.feedback.textContent = pick(TRY_AGAIN) + " It was " + state.current.name + ".";
    els.feedback.classList.add("bad");
    soundWrong();
  }
  els.nextBtn.classList.remove("hidden");
  els.nextBtn.scrollIntoView({ behavior: "smooth", block: "end" });
}

function nextQuestion() {
  state.index += 1;
  if (state.index >= state.queue.length) {
    finishQuiz();
  } else {
    renderQuestion();
  }
}

function finishQuiz() {
  const score = state.score;
  const stars = Math.max(1, Math.round((score / TOTAL_QUESTIONS) * 5));
  els.resultStars.textContent = "⭐".repeat(stars) + "☆".repeat(5 - stars);
  els.resultTitle.textContent =
    score === TOTAL_QUESTIONS ? "Perfect! 🎉"
    : score >= 7 ? "Amazing! 🌟"
    : score >= 4 ? "Good try! 👍"
    : "Nice try! 💪";
  els.resultScore.textContent = "You got " + score + " out of " + TOTAL_QUESTIONS + "!";
  show("results");
  soundFinish();
}

// ---------- Wire up ----------
document.querySelectorAll(".mode-card").forEach((card) => {
  card.addEventListener("click", () => startQuiz(card.dataset.mode));
});
els.nextBtn.addEventListener("click", nextQuestion);
document.getElementById("home-btn").addEventListener("click", () => show("home"));
document.getElementById("play-again").addEventListener("click", () => startQuiz(state.mode));
document.getElementById("back-home").addEventListener("click", () => show("home"));
