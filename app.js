// Trivia Time — kid-friendly multi-topic trivia.
// Topics: geography (flag/shape/symbol/clue), animals (picture/sound/baby/clue).
// Vanilla, no dependencies.

const TOTAL_QUESTIONS = 10;
const CHOICE_COUNT = 4;

const PRAISE = ["Great job!", "Awesome!", "You got it!", "Nice!", "Woohoo!", "Fantastic!"];
const TRY_AGAIN = ["Oops, try again!", "Not quite!", "Almost!", "Keep going!"];

// ---------- Topic registry ----------
const TOPICS = {
  geography: {
    name: "Geography",
    icon: "🌍",
    data: COUNTRIES,
    modes: [
      { id: "flag",   label: "Flags",   icon: "🚩" },
      { id: "shape",  label: "Shapes",  icon: "🗺️" },
      { id: "symbol", label: "Symbols", icon: "🎎" },
      { id: "clue",   label: "Clues",   icon: "🔍" },
    ],
  },
  animals: {
    name: "Animals",
    icon: "🐾",
    data: ANIMALS,
    modes: [
      { id: "picture", label: "Pictures", icon: "📷" },
      { id: "cropped", label: "Zoomed",   icon: "🔎" },
      { id: "baby",    label: "Babies",   icon: "🐣" },
      { id: "clue",    label: "Clues",    icon: "🔍" },
    ],
  },
};

const screens = {
  topics:  document.getElementById("topics"),
  home:    document.getElementById("home"),
  quiz:    document.getElementById("quiz"),
  results: document.getElementById("results"),
};

const els = {
  homeTitle:     document.getElementById("home-title"),
  modeGrid:      document.getElementById("mode-grid"),
  questionText:  document.getElementById("question-text"),
  questionMedia: document.getElementById("question-media"),
  choices:       document.getElementById("choices"),
  feedback:      document.getElementById("feedback"),
  nextBtn:       document.getElementById("next-btn"),
  micBtn:        document.getElementById("mic-btn"),
  qNumber:       document.getElementById("q-number"),
  qTotal:        document.getElementById("q-total"),
  score:         document.getElementById("score"),
  resultTitle:   document.getElementById("result-title"),
  resultStars:   document.getElementById("result-stars"),
  resultScore:   document.getElementById("result-score"),
};

const state = {
  topic: null,
  mode: null,
  queue: [],
  index: 0,
  score: 0,
  current: null,
  locked: false,
};

// ---------- Wikipedia photo fetcher (used by Animals: Pictures + Habitat) ----------
// Uses the action=query / prop=pageimages endpoint with `origin=*` for
// explicit CORS support — more reliable than the REST summary endpoint.
// Results are cached per session; failures fall back to the animal's emoji.
const photoCache = {};
const photoPending = {};
function fetchWikiPhoto(article) {
  if (!article) return Promise.resolve(null);
  if (article in photoCache) return Promise.resolve(photoCache[article]);
  if (photoPending[article]) return photoPending[article];

  const apiUrl =
    "https://en.wikipedia.org/w/api.php" +
    "?action=query&prop=pageimages&format=json" +
    "&pithumbsize=640&redirects=1&origin=*" +
    "&titles=" + encodeURIComponent(article);

  photoPending[article] = fetch(apiUrl)
    .then((r) => (r.ok ? r.json() : null))
    .then((j) => {
      const pages = j && j.query && j.query.pages;
      const page = pages ? Object.values(pages)[0] : null;
      const src = page && page.thumbnail && page.thumbnail.source;
      photoCache[article] = src || null;
      return src || null;
    })
    .catch(() => {
      photoCache[article] = null;
      return null;
    });
  return photoPending[article];
}

function preloadAnimalPhotos() {
  for (const a of ANIMALS) {
    if (a.wiki) fetchWikiPhoto(a.wiki);
  }
}

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

// ---------- Speech synthesis (read clues / sounds aloud) ----------
const speechSupported = "speechSynthesis" in window;

// Android Chrome quirk: speechSynthesis.getVoices() returns [] until the
// voiceschanged event has fired. Speaking before voices load can silently
// drop the utterance. Cache them as soon as they're available and re-poll.
let speechVoices = [];
function refreshVoices() {
  if (!speechSupported) return;
  const v = speechSynthesis.getVoices();
  if (v && v.length) speechVoices = v;
}
if (speechSupported) {
  refreshVoices();
  speechSynthesis.onvoiceschanged = refreshVoices;
}
function pickEnglishVoice() {
  if (!speechVoices.length) return null;
  return (
    speechVoices.find((v) => v.lang === "en-US") ||
    speechVoices.find((v) => /^en[-_]/i.test(v.lang)) ||
    speechVoices[0]
  );
}

let currentSpeakBtn = null;
function setSpeakBtnState(btn, on) {
  if (!btn) return;
  btn.classList.toggle("speaking", on);
  btn.textContent = on ? "⏸ Stop" : "🔊 Read aloud";
}

function speak(text, btn) {
  if (!speechSupported || !text) return;
  refreshVoices();
  if (speechSynthesis.speaking || speechSynthesis.pending) {
    speechSynthesis.cancel();
  }
  if (currentSpeakBtn) setSpeakBtnState(currentSpeakBtn, false);
  currentSpeakBtn = btn || null;

  const u = new SpeechSynthesisUtterance(text);
  const voice = pickEnglishVoice();
  if (voice) u.voice = voice;
  u.lang = (voice && voice.lang) || "en-US";
  u.rate = 0.92;
  u.pitch = 1.05;
  u.onstart = () => setSpeakBtnState(btn, true);
  u.onend = () => {
    if (currentSpeakBtn === btn) currentSpeakBtn = null;
    setSpeakBtnState(btn, false);
  };
  u.onerror = (e) => {
    console.warn("speech error:", e && e.error);
    setSpeakBtnState(btn, false);
  };

  // Defeat Chrome's "paused after cancel" bug: resume() right before speak.
  speechSynthesis.resume();
  speechSynthesis.speak(u);
}

function stopSpeech() {
  if (!speechSupported) return;
  if (speechSynthesis.speaking || speechSynthesis.pending) {
    speechSynthesis.cancel();
  }
  if (currentSpeakBtn) setSpeakBtnState(currentSpeakBtn, false);
  currentSpeakBtn = null;
}

// ---------- Speech recognition (shout-the-answer) ----------
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognitionSupported = !!SR;
let recognition = null;
let listening = false;
let micDisabled = false;

function setupRecognition() {
  if (!recognitionSupported || recognition) return;
  recognition = new SR();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 4;
  recognition.onresult = onSpeechResult;
  recognition.onerror = onSpeechError;
  recognition.onend = () => setListeningUI(false);
}

function setListeningUI(on) {
  listening = on;
  if (!els.micBtn) return;
  els.micBtn.classList.toggle("listening", on);
  els.micBtn.querySelector(".mic-label").textContent = on ? "Listening…" : "Say it!";
  els.micBtn.querySelector(".mic-icon").textContent = on ? "👂" : "🎤";
}

function startListening() {
  if (!recognitionSupported || micDisabled || state.locked) return;
  setupRecognition();
  stopSpeech();
  try {
    recognition.start();
    setListeningUI(true);
  } catch (_) {
    recognition.stop();
  }
}

function onSpeechError(e) {
  setListeningUI(false);
  if (e.error === "not-allowed" || e.error === "service-not-allowed") {
    micDisabled = true;
    if (els.micBtn) els.micBtn.classList.add("hidden");
  }
}

function normalize(s) {
  return s.toLowerCase().replace(/[^a-z\s]/g, " ").replace(/\s+/g, " ").trim();
}

function phraseMatchesItem(phrase, item) {
  const p = " " + normalize(phrase) + " ";
  const candidates = [item.name, ...(item.aliases || [])];
  for (const cand of candidates) {
    const c = " " + normalize(cand) + " ";
    if (p.includes(c)) return true;
  }
  return false;
}

function onSpeechResult(event) {
  setListeningUI(false);
  if (state.locked) return;

  const heard = [];
  for (const result of event.results) {
    for (let i = 0; i < result.length; i++) heard.push(result[i].transcript);
  }
  if (heard.length === 0) return;

  const pool = TOPICS[state.topic].data;
  const buttons = Array.from(els.choices.querySelectorAll(".choice"));
  const candidates = buttons.map((b) => {
    const name = (b.querySelector(".choice-label")?.textContent || b.textContent || "").trim();
    return { btn: b, item: pool.find((x) => x.name === name) };
  }).filter((x) => x.item);

  for (const phrase of heard) {
    for (const { btn, item } of candidates) {
      if (phraseMatchesItem(phrase, item)) {
        btn.click();
        return;
      }
    }
  }

  els.feedback.textContent = `I heard "${heard[0]}". Try again!`;
  els.feedback.className = "feedback bad";
  setTimeout(() => {
    if (!state.locked && els.feedback.textContent.startsWith("I heard")) {
      els.feedback.textContent = "";
      els.feedback.className = "feedback";
    }
  }, 1800);
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
  if (name !== "quiz") stopSpeech();
  Object.values(screens).forEach((s) => s.classList.remove("active"));
  screens[name].classList.add("active");
}

// ---------- Topic & home screens ----------
function showTopics() {
  state.topic = null;
  show("topics");
}

function openTopic(topicId) {
  const topic = TOPICS[topicId];
  if (!topic) return;
  state.topic = topicId;
  els.homeTitle.textContent = `${topic.name} ${topic.icon}`;
  els.modeGrid.innerHTML = "";
  for (const m of topic.modes) {
    const btn = document.createElement("button");
    btn.className = "mode-card";
    btn.dataset.mode = m.id;
    btn.innerHTML = `<span class="mode-icon" aria-hidden="true">${m.icon}</span>` +
                    `<span class="mode-label">${m.label}</span>`;
    btn.addEventListener("click", () => startQuiz(m.id));
    els.modeGrid.appendChild(btn);
  }
  if (topicId === "animals") preloadAnimalPhotos();
  show("home");
}

// ---------- Quiz setup ----------
function startQuiz(mode) {
  state.mode = mode;
  const pool = TOPICS[state.topic].data;
  state.queue = shuffle(pool).slice(0, TOTAL_QUESTIONS);
  state.index = 0;
  state.score = 0;
  els.qTotal.textContent = state.queue.length;
  els.score.textContent = "0";
  show("quiz");
  ensureAudio();
  renderQuestion();
}

function buildChoices(correct) {
  const pool = TOPICS[state.topic].data;
  let candidates = pool.filter((x) => x.name !== correct.name);

  // Babies mode: don't put two animals with the same baby name in one question.
  if (state.mode === "baby" && correct.baby) {
    candidates = candidates.filter((x) => x.baby !== correct.baby);
  }

  // Smart distractors: prefer same-group (mammal vs mammal) so the kid can't
  // eliminate by category alone. Fill remaining slots with other groups.
  if (correct.group) {
    const same = shuffle(candidates.filter((x) => x.group === correct.group));
    const other = shuffle(candidates.filter((x) => x.group !== correct.group));
    candidates = [...same, ...other];
  } else {
    candidates = shuffle(candidates);
  }

  const others = candidates.slice(0, CHOICE_COUNT - 1);
  return shuffle([correct, ...others]);
}

function renderQuestion() {
  state.locked = false;
  stopSpeech();
  els.feedback.textContent = "";
  els.feedback.className = "feedback";
  els.nextBtn.classList.add("hidden");
  if (els.micBtn) {
    if (recognitionSupported && !micDisabled) els.micBtn.classList.remove("hidden");
    setListeningUI(false);
  }

  const item = state.queue[state.index];
  state.current = item;
  els.qNumber.textContent = state.index + 1;

  const choices = buildChoices(item);
  els.questionMedia.innerHTML = "";

  if (state.topic === "geography") renderGeographyQuestion(item, choices);
  else if (state.topic === "animals") renderAnimalQuestion(item, choices);
}

// ---------- Geography modes ----------
function renderGeographyQuestion(country, choices) {
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
  } else if (state.mode === "clue") {
    els.questionText.textContent = "Which country am I?";
    els.questionMedia.appendChild(buildClueCard(country));
    renderFlagChoices(choices);
  }
}

// ---------- Animal modes ----------
function renderAnimalQuestion(animal, choices) {
  if (state.mode === "picture") {
    els.questionText.textContent = "Which animal is this?";
    showAnimalPhoto(animal);
    renderTextChoices(choices);
  } else if (state.mode === "cropped") {
    els.questionText.textContent = "Zoom in! Which animal am I?";
    showCroppedPhoto(animal);
    renderTextChoices(choices);
  } else if (state.mode === "baby") {
    els.questionText.textContent = "Whose baby am I?";
    const card = buildBigTextCard(
      animal.baby,
      "baby-text",
      `My baby is called ${animal.baby}.`,
      "My baby is called…"
    );
    els.questionMedia.appendChild(card);
    renderTextChoices(choices);
  } else if (state.mode === "clue") {
    els.questionText.textContent = "Which animal am I?";
    els.questionMedia.appendChild(buildClueCard(animal));
    renderTextChoices(choices);
  }
}

function showAnimalPhoto(animal) {
  const wrap = document.createElement("div");
  wrap.className = "animal-display";

  const slot = document.createElement("div");
  slot.className = "photo-slot";
  const spinner = document.createElement("div");
  spinner.className = "photo-spinner";
  spinner.setAttribute("aria-label", "Loading photo");
  slot.appendChild(spinner);
  wrap.appendChild(slot);

  els.questionMedia.appendChild(wrap);

  const token = animal.id + ":" + state.index;
  slot.dataset.token = token;

  const showEmojiFallback = () => {
    if (slot.dataset.token !== token) return;
    slot.innerHTML = "";
    const big = document.createElement("div");
    big.className = "emoji-big";
    big.textContent = animal.emoji || "🐾";
    slot.appendChild(big);
  };

  fetchWikiPhoto(animal.wiki).then((url) => {
    if (slot.dataset.token !== token) return;
    if (!url) {
      showEmojiFallback();
      return;
    }
    const img = new Image();
    img.alt = animal.name;
    img.className = "animal-photo";
    img.onload = () => {
      if (slot.dataset.token !== token) return;
      slot.innerHTML = "";
      slot.appendChild(img);
    };
    img.onerror = showEmojiFallback;
    img.src = url;
  });
}

function showCroppedPhoto(animal) {
  const wrap = document.createElement("div");
  wrap.className = "animal-display";

  const frame = document.createElement("div");
  frame.className = "crop-frame";
  const spinner = document.createElement("div");
  spinner.className = "photo-spinner";
  frame.appendChild(spinner);
  wrap.appendChild(frame);
  els.questionMedia.appendChild(wrap);

  const token = animal.id + ":" + state.index;
  frame.dataset.token = token;

  // Random crop parameters — picked once per question so the same animal
  // hits a different feature on different rounds.
  const zoom = 2.6 + Math.random() * 0.9;        // 2.6x – 3.5x
  const cx = 0.32 + Math.random() * 0.36;        // 0.32 – 0.68 (avoid edges)
  const cy = 0.28 + Math.random() * 0.40;        // bias slightly upward so
                                                 // faces/heads are favored

  const showEmojiFallback = () => {
    if (frame.dataset.token !== token) return;
    frame.innerHTML = "";
    const big = document.createElement("div");
    big.className = "emoji-big crop-emoji-fallback";
    big.textContent = animal.emoji || "🐾";
    frame.appendChild(big);
  };

  fetchWikiPhoto(animal.wiki).then((url) => {
    if (frame.dataset.token !== token) return;
    if (!url) {
      showEmojiFallback();
      return;
    }
    const img = new Image();
    img.alt = animal.name;
    img.className = "crop-img";
    img.onload = () => {
      if (frame.dataset.token !== token) return;
      positionCropped(frame, img, zoom, cx, cy);
      frame.innerHTML = "";
      frame.appendChild(img);
    };
    img.onerror = showEmojiFallback;
    img.src = url;
  });
}

function positionCropped(frame, img, zoom, cx, cy) {
  // Sized after layout — read the frame's actual rendered box so the math
  // stays correct across phone/tablet sizes.
  const rect = frame.getBoundingClientRect();
  const fw = rect.width || 240;
  const fh = rect.height || 240;
  const aspect = img.naturalWidth / img.naturalHeight || 1;
  let scaledW, scaledH;
  if (aspect >= 1) {
    scaledH = fh * zoom;
    scaledW = scaledH * aspect;
  } else {
    scaledW = fw * zoom;
    scaledH = scaledW / aspect;
  }
  // Clamp so the scaled image always covers the frame.
  const minLeft = fw - scaledW;
  const minTop = fh - scaledH;
  let left = -(cx * scaledW) + fw / 2;
  let top = -(cy * scaledH) + fh / 2;
  if (left > 0) left = 0;
  if (left < minLeft) left = minLeft;
  if (top > 0) top = 0;
  if (top < minTop) top = minTop;
  img.style.width = scaledW + "px";
  img.style.height = scaledH + "px";
  img.style.left = left + "px";
  img.style.top = top + "px";
}

// ---------- Shared question cards ----------
function buildClueCard(item) {
  const wrap = document.createElement("div");
  wrap.className = "clue-card";

  const list = document.createElement("ul");
  list.className = "clue-list";
  for (const text of item.clues) {
    const li = document.createElement("li");
    li.textContent = text;
    list.appendChild(li);
  }
  wrap.appendChild(list);

  if (speechSupported) {
    wrap.appendChild(makeSpeakBtn(item.clues.join(". "), "Read clues aloud"));
  }
  return wrap;
}

function buildBigTextCard(text, textClass, speakText, captionText) {
  const wrap = document.createElement("div");
  wrap.className = "big-text-card";

  if (captionText) {
    const cap = document.createElement("div");
    cap.className = "big-text-caption";
    cap.textContent = captionText;
    wrap.appendChild(cap);
  }

  const big = document.createElement("div");
  big.className = "big-text " + textClass;
  big.textContent = text;
  wrap.appendChild(big);

  if (speechSupported && speakText) {
    wrap.appendChild(makeSpeakBtn(speakText, "Read aloud"));
  }
  return wrap;
}

function makeSpeakBtn(textToSpeak, ariaLabel) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "speak-btn";
  btn.setAttribute("aria-label", ariaLabel);
  btn.textContent = "🔊 Read aloud";
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    // Tapping the same button while it's reading aloud cancels playback.
    if (btn.classList.contains("speaking")) {
      stopSpeech();
      return;
    }
    speak(textToSpeak, btn);
  });
  return btn;
}

// ---------- Choice renderers ----------
function renderTextChoices(choices) {
  els.choices.innerHTML = "";
  for (const c of choices) {
    const btn = document.createElement("button");
    btn.className = "choice text-only";
    const label = document.createElement("span");
    label.className = "choice-label";
    label.textContent = c.name;
    btn.appendChild(label);
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
    label.className = "choice-label";
    label.textContent = c.name;
    btn.appendChild(img);
    btn.appendChild(label);
    btn.addEventListener("click", () => onAnswer(btn, c));
    els.choices.appendChild(btn);
  }
}

// ---------- Answer handling ----------
function onAnswer(btn, item) {
  if (state.locked) return;
  state.locked = true;
  const buttons = els.choices.querySelectorAll(".choice");
  buttons.forEach((b) => (b.disabled = true));

  const correctName = state.current.name;
  const correctLabel = state.current.name;

  if (item.name === correctName) {
    btn.classList.add("correct");
    state.score += 1;
    els.score.textContent = state.score;
    els.feedback.textContent = pick(PRAISE) + " It's " + correctLabel + "!";
    els.feedback.classList.add("good");
    soundCorrect();
  } else {
    btn.classList.add("wrong");
    buttons.forEach((b) => {
      const choiceName = b.querySelector(".choice-label")?.textContent || b.textContent;
      if (choiceName === correctName) b.classList.add("correct");
    });
    els.feedback.textContent = pick(TRY_AGAIN) + " It was " + correctLabel + ".";
    els.feedback.classList.add("bad");
    soundWrong();
  }
  els.nextBtn.classList.remove("hidden");
  if (els.micBtn) {
    if (listening && recognition) try { recognition.stop(); } catch (_) {}
    els.micBtn.classList.add("hidden");
  }
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
  const total = state.queue.length;
  const score = state.score;
  const stars = Math.max(1, Math.round((score / total) * 5));
  els.resultStars.textContent = "⭐".repeat(stars) + "☆".repeat(5 - stars);
  els.resultTitle.textContent =
    score === total ? "Perfect! 🎉"
    : score >= Math.ceil(total * 0.7) ? "Amazing! 🌟"
    : score >= Math.ceil(total * 0.4) ? "Good try! 👍"
    : "Nice try! 💪";
  els.resultScore.textContent = "You got " + score + " out of " + total + "!";
  show("results");
  soundFinish();
}

// ---------- Wire up ----------
document.querySelectorAll("#topic-grid .mode-card").forEach((card) => {
  card.addEventListener("click", () => openTopic(card.dataset.topic));
});
document.getElementById("topics-btn").addEventListener("click", showTopics);
els.nextBtn.addEventListener("click", nextQuestion);
if (els.micBtn) {
  els.micBtn.addEventListener("click", () => {
    if (listening && recognition) {
      try { recognition.stop(); } catch (_) {}
      setListeningUI(false);
    } else {
      startListening();
    }
  });
}
document.getElementById("home-btn").addEventListener("click", () => {
  if (state.topic) openTopic(state.topic);
  else showTopics();
});
document.getElementById("play-again").addEventListener("click", () => startQuiz(state.mode));
document.getElementById("back-home").addEventListener("click", () => {
  if (state.topic) openTopic(state.topic);
  else showTopics();
});
