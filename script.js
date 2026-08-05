/* ==========================================================================
   CONFIG — edit these to personalize
   ========================================================================== */
const BIRTHDAY_DATE = "2026-08-06T00:00:00"; // August 6 birthday
const BIRTHDAY_AGE = 23;
const SECRET_PASSWORD = "ourlove";

const LOVE_LETTER = `My love,

I don't have a box to wrap or a bow to tie, so I built you this instead  every line of it made with you in mind.

I want you to know that you make ordinary days feel like something worth remembering. Your laugh is my favorite sound. Your hand in mine still feels like the safest place in the world. Every single thing about you the big things and the small, quiet ones makes me fall for you all over again.

Today is about celebrating you: the person who showed up for me, who makes me laugh until I can't breathe, who loves me on my best days and my worst.

So happy birthday, my love. Here's to another year of choosing each other, on purpose, every day.

Forever yours.`;

const REASONS = [
  "Your smile","Your kindness","Your patience","Your hugs","Your laugh",
  "Your support? usahay dili man tanan hehe","The way you listen? ambot lang naminaw!","Your silly jokes","Your determination",
  "How you make me feel safe","Your honesty. Honest kaha? HAHA","Your eyes","The way you care for me",
  "Your voice","How you remember little things? limtanon man HAHA","Your strength","Your warmth",
  "The way you say my name","bisan makalagot ka ","ily gihapon chee",
  "Happy Birthday loves","Unta dili nako nimo palaguton hehe"," MWAAAHHHHH"
];

const COUPONS = [
  "One Free Hug","Unlimited Kisses","Massage Coupon"
];

const GALLERY = [
  {src:"img/1.jpg", caption:""},
  {src:"img/2.jpg", caption:""},
  {src:"img/3.png", caption:""},
  {src:"img/4.jpg", caption:""},
  {src:"img/5.jpg", caption:""},
  {src:"img/6.png", caption:""},
  {src:"img/7.jpg", caption:""},
  {src:"img/8.png", caption:""},
  {src:"img/9.jpg", caption:""},
  {src:"img/10.png", caption:""},
  {src:"img/Grad.png", caption:""},
  {src:"img/hold.png", caption:""},
];

const KISSES = [
  {src:"img/K1.jpg", label:"Kiss 1"},
  {src:"img/K2.jpg", label:"Kiss 2"},
  {src:"img/K3.jpg", label:"Kiss 3"},
  {src:"img/K4.jpg", label:"Kiss 4"},
  {src:"img/K5.png", label:"Kiss 5"},
  {src:"img/K6.jpg", label:"Kiss 6"},
  {src:"img/K7.jpg", label:"Kiss 7"},
  {src:"img/K8.jpg", label:"Kiss 8"},
  {src:"img/K9.jpg", label:"Kiss 9"},
  {src:"img/K10.jpg", label:"Kiss 10"},
  {src:"img/K11.jpg", label:"Kiss 11"},
  {src:"img/K12.jpg", label:"Kiss 12"},
  {src:"img/K13.jpg", label:"Kiss 13"},
  {src:"img/K14.jpg", label:"Kiss 14"},
  {src:"img/K15.jpg", label:"Kiss 15"},
  {src:"img/K16.jpg", label:"Kiss 16"},
  {src:"img/K17.jpg", label:"Kiss 17"},
  {src:"img/K18.jpg", label:"Kiss 18"},
  {src:"img/K19.jpg", label:"Kiss 19"},
  {src:"img/K20.jpg", label:"Kiss 20"},
  {src:"img/K21.jpg", label:"Kiss 21"},
  {src:"img/K22.jpg", label:"Kiss 22"},
  {src:"img/K23.jpg", label:"Kiss 23"},
];

const COMPLIMENTS = [
  "You're my happiness pag dili maglagot ❤️","You're my favorite person ❤️","You're my forever ❤️",
  "You make everything better ❤️","I love you ❤️"
];

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const MOBILE_VIEW = window.matchMedia("(max-width: 768px)").matches;
const LOW_POWER = MOBILE_VIEW || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

/* ==========================================================================
   INITIAL SETUP
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({ duration: REDUCED_MOTION ? 400 : 900, once: true, offset: 60, disable: REDUCED_MOTION });

  const initializers = [
    runLoadingScreen,
    initCustomCursor,
    initScrollProgress,
    initStarsCanvas,
    initFallingHearts,
    initFloatingCompliments,
    initBackToTop,
    initMusicPlayer,
    initHeroBalloons,
    initConstellationHeart,
    initCountdown,
    buildReasons,
    initReasonSectionAudio,
    buildKisses,
    buildGallery,
    initBabyPhotoZoom,
    buildCoupons,
    initCake,
    initLoveMeter,
    initGiftBox,
    initSecretMessage,
    initChatbot,
    initCelebrateAndFireworks,
    initOpenSurpriseButton
  ];

  initializers.forEach((initializer) => {
    try {
      initializer();
    } catch (error) {
      console.error(`Failed to initialize ${initializer.name}.`, error);
    }
  });
});

/* ==========================================================================
   1. LOADING SCREEN
   ========================================================================== */
function runLoadingScreen(){
  const screen = document.getElementById("loadingScreen");
  const fill = document.getElementById("loadingBarFill");
  let progress = 0;
  const timer = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100){
      progress = 100;
      clearInterval(timer);
      setTimeout(() => screen.classList.add("hide"), 400);
    }
    fill.style.width = progress + "%";
  }, 180);
}

/* ==========================================================================
   CUSTOM CURSOR
   ========================================================================== */
function initCustomCursor(){
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (REDUCED_MOTION || LOW_POWER) return;
  let rx = 0, ry = 0;
  window.addEventListener("mousemove", (e) => {
    dot.style.left = e.clientX + "px"; dot.style.top = e.clientY + "px";
    rx = e.clientX; ry = e.clientY;
  });
  function loop(){
    ring.style.left = rx + "px"; ring.style.top = ry + "px";
    requestAnimationFrame(loop);
  }
  loop();
  document.querySelectorAll("a,button,.coupon,.gallery-item,.reason-card,.giftbox-wrap").forEach(el => {
    el.addEventListener("mouseenter", () => { ring.style.width="50px"; ring.style.height="50px"; ring.style.borderColor="var(--pink)"; });
    el.addEventListener("mouseleave", () => { ring.style.width="32px"; ring.style.height="32px"; ring.style.borderColor="var(--gold)"; });
  });
}

/* ==========================================================================
   SCROLL PROGRESS + BACK TO TOP
   ========================================================================== */
function initScrollProgress(){
  const bar = document.getElementById("scrollProgressBar");
  let ticking = false;

  const updateBar = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = scrolled + "%";
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateBar);
    }
  }, { passive: true });
}
function initBackToTop(){
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  let ticking = false;
  const updateButton = () => {
    btn.classList.toggle("show", window.scrollY > 600);
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateButton);
    }
  }, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ==========================================================================
   ANIMATED STAR FIELD (background, whole page)
   ========================================================================== */
function initStarsCanvas(){
  const canvas = document.getElementById("starsCanvas");
  const ctx = canvas.getContext("2d");
  let stars = [];
  const targetFps = REDUCED_MOTION || LOW_POWER ? 24 : 60;
  let lastFrame = 0;

  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;
    const starCount = Math.max(40, Math.floor((canvas.width * canvas.height) / 22000));
    stars = Array.from({length: Math.min(starCount, LOW_POWER ? 90 : 160)}, () => ({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*1.2+.25,
      speed: Math.random()*.5+.12,
      phase: Math.random()*Math.PI*2
    }));
  }
  resize();
  window.addEventListener("resize", resize);

  let t = 0;
  function draw(ts){
    if (ts - lastFrame >= 1000 / targetFps) {
      t += 0.02;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for (const s of stars){
        const twinkle = (Math.sin(t*s.speed + s.phase)+1)/2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${0.2+twinkle*0.6})`;
        ctx.fill();
      }
      lastFrame = ts;
    }
    requestAnimationFrame(draw);
  }
  draw(0);
}

/* ==========================================================================
   FALLING HEARTS (continuous, background)
   ========================================================================== */
function initFallingHearts(){
  if (REDUCED_MOTION || LOW_POWER) return;

  const container = document.getElementById("fallingHearts");
  const symbols = ["❤","💗","💕","💓"];
  let activeHearts = 0;
  const maxHearts = MOBILE_VIEW ? 8 : 16;

  const spawnHeart = () => {
    if (activeHearts >= maxHearts) return;
    activeHearts += 1;

    const heart = document.createElement("span");
    heart.className = "falling-heart";
    heart.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    const size = 12 + Math.random()*22;
    const left = Math.random()*100;
    const duration = 6 + Math.random()*8;
    const drift = (Math.random()*80-40) + "px";
    heart.style.left = left + "vw";
    heart.style.fontSize = size + "px";
    heart.style.setProperty("--drift", drift);
    heart.style.animationDuration = duration + "s";
    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
      activeHearts = Math.max(0, activeHearts - 1);
    }, duration * 1000);
  };

  setInterval(spawnHeart, 900);
}

/* ==========================================================================
   FLOATING COMPLIMENTS (random every few seconds)
   ========================================================================== */
function initFloatingCompliments(){
  if (REDUCED_MOTION || LOW_POWER) return;

  const container = document.getElementById("floatingCompliments");
  let activeBubbles = 0;
  const maxBubbles = MOBILE_VIEW ? 3 : 5;

  const spawnBubble = () => {
    if (activeBubbles >= maxBubbles) return;
    activeBubbles += 1;

    const bubble = document.createElement("div");
    bubble.className = "compliment-bubble";
    bubble.textContent = COMPLIMENTS[Math.floor(Math.random()*COMPLIMENTS.length)];
    bubble.style.left = (10 + Math.random()*70) + "vw";
    bubble.style.top = (15 + Math.random()*65) + "vh";
    container.appendChild(bubble);
    setTimeout(() => {
      bubble.remove();
      activeBubbles = Math.max(0, activeBubbles - 1);
    }, 5000);
  };

  setInterval(spawnBubble, 9000);
}

/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */
/* ==========================================================================
   MUSIC PLAYER
   ========================================================================== */
function initMusicPlayer(){
  const audio = document.getElementById("bgMusic");
  const toggle = document.getElementById("musicToggle");
  const icon = document.getElementById("musicIcon");
  const volume = document.getElementById("volumeSlider");
  if (!audio || !toggle || !icon || !volume) return;
  audio.volume = 0.5;
  let playing = false;

  toggle.addEventListener("click", () => {
    if (!playing){
      audio.play().catch(() => { /* no audio file present or user gesture blocked */ });
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => {
    icon.innerHTML = '<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>';
    playing = true;
  });

  audio.addEventListener("pause", () => {
    icon.innerHTML = '<path d="M8 5v14l11-7z"/>';
    playing = false;
  });

  volume.addEventListener("input", () => audio.volume = parseFloat(volume.value));
}

function initReasonSectionAudio(){
  const shapeAudio = document.getElementById("shapeAudio");
  const reasonsSection = document.getElementById("reasons");
  const trigger = document.getElementById("shapeAudioTrigger");
  const hint = document.getElementById("shapeAudioHint");
  if (!shapeAudio || !reasonsSection) return;

  let played = false;
  let gestureSeen = false;
  let sectionVisible = false;
  let observer = null;

  const audioUrl = new URL("Shape.mp3", window.location.href).toString();
  shapeAudio.src = audioUrl;
  shapeAudio.volume = 0.65;
  shapeAudio.preload = "auto";
  shapeAudio.setAttribute("playsinline", "");
  shapeAudio.setAttribute("webkit-playsinline", "");

  const setHint = (message) => {
    if (hint) hint.textContent = message;
  };

  const showTrigger = () => {
    if (trigger && !played) trigger.hidden = false;
  };

  const hideTrigger = () => {
    if (trigger) trigger.hidden = true;
  };

  const finishPlayback = () => {
    played = true;
    hideTrigger();
    setHint("Now playing: Shape of My Heart.");
    if (observer) observer.unobserve(reasonsSection);
  };

  const tryPlayShapeAudio = () => {
    if (played || !sectionVisible) return;
    shapeAudio.currentTime = 0;

    if (shapeAudio.readyState === 0) {
      shapeAudio.load();
    }

    const playPromise = shapeAudio.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.then(finishPlayback).catch((error) => {
        console.warn("Unable to start Shape.mp3 playback:", error);
        showTrigger();
        setHint("Tap the button below to play the song. Mobile browsers may need a tap first.");
      });
    } else {
      finishPlayback();
    }
  };

  const handleGesture = () => {
    gestureSeen = true;
    if (sectionVisible && !played) {
      tryPlayShapeAudio();
    }
  };

  document.addEventListener("pointerdown", handleGesture, { passive: true });
  document.addEventListener("touchstart", handleGesture, { passive: true });
  document.addEventListener("keydown", handleGesture);

  reasonsSection.addEventListener("click", () => {
    if (!played) {
      tryPlayShapeAudio();
    }
  });

  if (trigger) {
    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      tryPlayShapeAudio();
    });
  }

  shapeAudio.addEventListener("canplaythrough", () => {
    if (gestureSeen && sectionVisible && !played) {
      tryPlayShapeAudio();
    }
  });

  shapeAudio.addEventListener("error", () => {
    showTrigger();
    setHint("The song could not be loaded. Please refresh the page and tap the button again.");
  });

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      sectionVisible = entry.isIntersecting;
      if (sectionVisible && !played) {
        if (gestureSeen) {
          tryPlayShapeAudio();
        } else {
          showTrigger();
        }
      }
    });
  }, { threshold: 0.35 });

  observer.observe(reasonsSection);
}

/* ==========================================================================
   HERO: FLOATING BALLOONS
   ========================================================================== */
function initHeroBalloons(){
  if (REDUCED_MOTION || LOW_POWER) return;

  const container = document.getElementById("heroBalloons");
  const colors = ["#FF4FA3","#7C5CFF","#F4C466","#C9A6FF","#FF8FC7"];
  const initialCount = MOBILE_VIEW ? 4 : 6;
  function spawn(){
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    const color = colors[Math.floor(Math.random()*colors.length)];
    balloon.style.background = `radial-gradient(circle at 30% 30%, ${color}, ${color}CC)`;
    balloon.style.left = Math.random()*90 + "vw";
    balloon.style.setProperty("--sway", (Math.random()*60-30)+"px");
    const duration = 10 + Math.random()*8;
    balloon.style.animationDuration = duration + "s";
    balloon.style.pointerEvents = "auto";
    balloon.style.cursor = "pointer";
    balloon.addEventListener("click", () => popBalloon(balloon));
    container.appendChild(balloon);
    setTimeout(() => balloon.remove(), duration*1000);
  }
  for (let i=0;i<initialCount;i++) setTimeout(spawn, i*900);
  setInterval(spawn, MOBILE_VIEW ? 3200 : 2200);
}
function popBalloon(balloon){
  balloon.style.transition = "transform .15s, opacity .15s";
  balloon.style.transform = "scale(1.6)";
  balloon.style.opacity = "0";
  setTimeout(() => balloon.remove(), 150);
}

/* ==========================================================================
   HERO: CONSTELLATION HEART (signature element)
   Traces a heart shape out of connected, twinkling stars in the night sky.
   ========================================================================== */
function initConstellationHeart(){
  if (REDUCED_MOTION || LOW_POWER) return;

  const canvas = document.getElementById("constellationCanvas");
  const ctx = canvas.getContext("2d");
  const hero = document.getElementById("hero");

  function resize(){
    canvas.width = hero.clientWidth;
    canvas.height = hero.clientHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  // Generate heart-shaped point cloud using the parametric heart equation
  function heartPoints(count){
    const pts = [];
    for (let i=0;i<count;i++){
      const t = (i/count) * Math.PI * 2;
      const x = 16*Math.pow(Math.sin(t),3);
      const y = -(13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t));
      pts.push({x,y});
    }
    return pts;
  }
  const rawPoints = heartPoints(MOBILE_VIEW ? 16 : 26);

  let progress = 0; // draw-on reveal 0 -> 1
  let startTime = null;

  function layout(){
    const scale = Math.min(canvas.width, canvas.height) * 0.018;
    const cx = canvas.width/2;
    const cy = canvas.height*0.42;
    return rawPoints.map(p => ({ x: cx + p.x*scale, y: cy + p.y*scale }));
  }

  function draw(ts){
    if (!startTime) startTime = ts;
    progress = Math.min(1, (ts-startTime)/2600);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const pts = layout();
    const visibleCount = Math.floor(pts.length * progress);

    ctx.strokeStyle = "rgba(255,143,199,0.55)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    for (let i=0;i<visibleCount;i++){
      const p = pts[i];
      if (i===0) ctx.moveTo(p.x,p.y); else ctx.lineTo(p.x,p.y);
    }
    if (visibleCount === pts.length) ctx.closePath();
    ctx.stroke();

    for (let i=0;i<visibleCount;i++){
      const p = pts[i];
      const twinkle = 0.6 + 0.4*Math.sin(ts/500 + i);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.4, 0, Math.PI*2);
      ctx.fillStyle = `rgba(244,196,102,${twinkle})`;
      ctx.shadowColor = "#F4C466";
      ctx.shadowBlur = 10;
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

/* ==========================================================================
   4. LIVE COUNTDOWN
   ========================================================================== */
function initCountdown(){
  const target = new Date(BIRTHDAY_DATE).getTime();
  const heading = document.getElementById("countdownHeading");
  const grid = document.getElementById("countdownGrid");
  const note = document.getElementById("countdownNote");

  function tick(){
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0){
      heading.textContent = "Birthday Started! 🎉";
      grid.style.display = "none";
      note.textContent = `Happy ${BIRTHDAY_AGE}th birthday! It's your day. I hope it's as wonderful as you are.`;
      clearInterval(interval);
      return;
    }
    const d = Math.floor(diff/(1000*60*60*24));
    const h = Math.floor((diff/(1000*60*60))%24);
    const m = Math.floor((diff/(1000*60))%60);
    const s = Math.floor((diff/1000)%60);
    document.getElementById("cdDays").textContent = String(d).padStart(2,"0");
    document.getElementById("cdHours").textContent = String(h).padStart(2,"0");
    document.getElementById("cdMinutes").textContent = String(m).padStart(2,"0");
    document.getElementById("cdSeconds").textContent = String(s).padStart(2,"0");
  }
  tick();
  const interval = setInterval(tick, 1000);
}

/* ==========================================================================
   5. TYPEWRITER LOVE LETTER
   ========================================================================== */
let typewriterStarted = false;
function typewriterStart(){
  if (typewriterStarted) return;
  typewriterStarted = true;
  const el = document.getElementById("typewriterText");
  let i = 0;
  function type(){
    if (i <= LOVE_LETTER.length){
      el.textContent = LOVE_LETTER.slice(0, i);
      i++;
      setTimeout(type, 22);
    } else {
      document.getElementById("typeCursor").style.display = "none";
    }
  }
  type();
}
// Also auto-start once the letter section scrolls into view (in case user didn't click hero button)
const letterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) typewriterStart(); });
}, { threshold: 0.4 });
document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("letter");
  if (target) letterObserver.observe(target);
});

/* ==========================================================================
   6. REASONS I LOVE YOU — flip cards
   ========================================================================== */
function buildReasons(){
  const grid = document.getElementById("reasonsGrid");
  if (!grid) return;
  REASONS.forEach((reason, idx) => {
    const card = document.createElement("div");
    card.className = "reason-card";
    card.setAttribute("data-aos","zoom-in");
    card.setAttribute("data-aos-delay", (idx%10)*50);
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Show reason ${idx + 1}`);
    card.innerHTML = `
      <div class="reason-card-inner">
        <div class="reason-face reason-front">
          <div class="heart-icon">❤️</div>
          <div>#${idx+1}</div>
        </div>
        <div class="reason-face reason-back">${reason}</div>
      </div>`;

    const toggleFlip = () => {
      card.classList.toggle("is-flipped");
    };

    card.addEventListener("click", toggleFlip);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleFlip();
      }
    });

    grid.appendChild(card);
  });
}

/* ==========================================================================
   8. LOVE GALLERY
   ========================================================================== */
function buildGallery(){
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  GALLERY.forEach((item, idx) => {
    const el = document.createElement("div");
    el.className = "gallery-item";
    el.setAttribute("data-aos","zoom-in");
    el.setAttribute("data-aos-delay", (idx%6)*50);
    el.innerHTML = `
      <div class="gallery-item-inner">
        <img src="${item.src}" alt="${item.caption}" loading="lazy" decoding="async">
      </div>
      <div class="gallery-caption">${item.caption}</div>`;
    el.addEventListener("click", () => openGalleryModal(item));
    grid.appendChild(el);
  });
}

function buildKisses(){
  const grid = document.getElementById("kissesGrid");
  if (!grid) return;

  const updateColumns = () => {
    const width = window.innerWidth;
    if (width < 600) grid.style.gridTemplateColumns = "1fr";
    else if (width < 960) grid.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
    else if (width < 1280) grid.style.gridTemplateColumns = "repeat(3, minmax(0, 1fr))";
    else grid.style.gridTemplateColumns = "repeat(4, minmax(0, 1fr))";
  };

  updateColumns();
  window.addEventListener("resize", updateColumns);

  KISSES.forEach((item, idx) => {
    const card = document.createElement("div");
    card.className = "kiss-card";
    card.setAttribute("data-aos", "zoom-in");
    card.setAttribute("data-aos-delay", 100 + idx * 25);

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.label;
    img.loading = "lazy";
    img.decoding = "async";
    img.sizes = "(max-width: 600px) 100vw, (max-width: 960px) 48vw, (max-width: 1280px) 31vw, 23vw";

    const overlay = document.createElement("div");
    overlay.className = "kiss-card-overlay";
    overlay.innerHTML = `<span class="kiss-label">${item.label}</span>`;

    const reaction = document.createElement("div");
    reaction.className = "kiss-reactions";
    for (let i = 0; i < 3; i++) {
      const emoji = document.createElement("span");
      emoji.className = "kiss-reaction";
      emoji.textContent = "💋";
      reaction.appendChild(emoji);
    }

    card.appendChild(img);
    card.appendChild(overlay);
    card.appendChild(reaction);

    card.addEventListener("click", () => {
      document.querySelectorAll(".kiss-card").forEach((allCard) => {
        allCard.classList.add("kiss-reacted");
      });
      card.classList.add("kiss-active");

      setTimeout(() => {
        document.querySelectorAll(".kiss-card").forEach((allCard) => {
          allCard.classList.remove("kiss-reacted");
        });
        card.classList.remove("kiss-active");
      }, 1200);
    });

    grid.appendChild(card);
  });
}

function initBabyPhotoZoom(){
  const cards = document.querySelectorAll(".baby-photo-card");
  if (!cards.length) return;

  cards.forEach((card, index) => {
    const image = card.querySelector("img");
    if (!image) return;

    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open baby photo ${index + 1}`);

    const openPhoto = () => {
      openGalleryModal({
        src: image.getAttribute("src"),
        caption: image.getAttribute("alt") || `Baby photo ${index + 1}`
      });
    };

    card.addEventListener("click", openPhoto);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPhoto();
      }
    });
  });
}

function openGalleryModal(item){
  const modalImageBox = document.getElementById("modalImageBox");
  modalImageBox.style.background = "transparent";
  modalImageBox.innerHTML = `<img src="${item.src}" alt="${item.caption}">`;
  document.getElementById("modalCaption").textContent = item.caption;
  const modal = new bootstrap.Modal(document.getElementById("galleryModal"));
  modal.show();
}

/* ==========================================================================
   9. LOVE COUPONS
   ========================================================================== */
function buildCoupons(){
  const grid = document.getElementById("couponsGrid");
  if (!grid) return;
  COUPONS.forEach((title, idx) => {
    const el = document.createElement("div");
    el.className = "coupon";
    el.setAttribute("data-aos","fade-up");
    el.setAttribute("data-aos-delay", idx*70);
    el.innerHTML = `
      <div class="coupon-title">${title}</div>
      <div class="coupon-sub">Tap to redeem</div>
      <div class="coupon-burst">🎉</div>`;
    el.addEventListener("click", () => {
      el.classList.add("redeemed");
      el.querySelector(".coupon-sub").textContent = "Redeemed with love";
      setTimeout(() => el.classList.remove("redeemed"), 700);
    });
    grid.appendChild(el);
  });
}

/* ==========================================================================
   10. BIRTHDAY CAKE — blow the candles
   ========================================================================== */
function initCake(){
  const btn = document.getElementById("blowCandlesBtn");
  const note = document.getElementById("cakeNote");
  if (!note) return;

  const blowCandles = () => {
    const candles = document.querySelectorAll(".candle");
    if (candles.length === 0) return;
    candles.forEach((c, i) => {
      setTimeout(() => c.classList.add("blown"), i * 220);
    });
    note.textContent = "Make a wish... 🎂✨";
    launchConfettiBurst();
  };

  if (btn) {
    btn.type = "button";
    btn.addEventListener("click", blowCandles);
  }
}

/* ==========================================================================
   16. LOVE METER
   ========================================================================== */
function initLoveMeter(){
  const fill = document.getElementById("meterFill");
  const percentEl = document.getElementById("meterPercent");
  const circumference = 2 * Math.PI * 85;
  fill.style.strokeDasharray = circumference;
  fill.style.strokeDashoffset = circumference;

  const section = document.getElementById("meter");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        fill.style.strokeDashoffset = 0;
        animateCount(percentEl, 0, 1000000000, 2400, (v) => v.toLocaleString() + "%");
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });
  observer.observe(section);
}
function animateCount(el, from, to, duration, formatter){
  const start = performance.now();
  function step(ts){
    const p = Math.min(1, (ts-start)/duration);
    const eased = 1 - Math.pow(1-p, 3);
    const value = Math.floor(from + (to-from)*eased);
    el.textContent = formatter ? formatter(value) : value;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ==========================================================================
   18. DIGITAL GIFT BOX
   ========================================================================== */
function initGiftBox(){
  const wrap = document.getElementById("giftboxWrap") || document.querySelector(".giftbox-wrap");
  const hint = document.getElementById("giftHint");
  const reveal = document.getElementById("giftReveal");
  if (!wrap || !hint || !reveal) return;

  const toggleGift = () => {
    const opening = !wrap.classList.contains("opened");
    wrap.classList.toggle("opened");
    wrap.classList.toggle("revealed", opening);
    hint.textContent = opening ? "Surprise!" : "Tap the box to open it";
    if (opening){
      reveal.classList.add("show");
      launchConfettiBurst();
    } else {
      reveal.classList.remove("show");
    }
  };

  wrap.tabIndex = 0;
  wrap.addEventListener("click", toggleGift);
  wrap.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleGift();
    }
  });
}

/* ==========================================================================
   15. SECRET MESSAGE
   ========================================================================== */
function initSecretMessage(){
  const btn = document.getElementById("secretBtn");
  const reveal = document.getElementById("secretReveal");
  const modalEl = document.getElementById("secretModal");
  const form = document.getElementById("secretForm");
  const input = document.getElementById("secretInput");
  const error = document.getElementById("secretError");
  if (!btn || !reveal || !modalEl || !form || !input || !error) return;

  const modal = new bootstrap.Modal(modalEl);

  btn.addEventListener("click", () => {
    error.textContent = "";
    input.value = "";
    modal.show();
  });

  modalEl.addEventListener("shown.bs.modal", () => {
    input.focus();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim().toLowerCase();

    if (value === SECRET_PASSWORD){
      reveal.classList.add("show");
      btn.textContent = "Unlocked ❤️";
      error.textContent = "";
      modal.hide();
      return;
    }

    error.textContent = "That's not quite it - think about us. 😉";
    input.focus();
    input.select();
  });
}

/* ==========================================================================
   CHATBOT ABOUT BRILIAN
   ========================================================================== */
function initChatbot(){
  const form = document.getElementById("chatbotForm");
  const input = document.getElementById("chatbotInput");
  const messages = document.getElementById("chatbotMessages");
  if (!form || !input || !messages) return;

  const knowledge = [
    {
      pattern: /(birthday|born|august 6|2003|date)/i,
      answer: "Brilian C. Galon was born on August 6, 2003, and that makes his birthday extra precious. He is the kind of person who deserves all the love, laughter, and celebration in the world."
    },
    {
      pattern: /(love|loved|adore|sweet|special|beautiful|heart)/i,
      answer: "Aww, that’s so lovely. Brilian is sweet, beautiful in spirit, and so special that loving him feels like the easiest and happiest thing in the world."
    },
    {
      pattern: /(kind|caring|personality|character|gentle|thoughtful)/i,
      answer: "Brilian is kind, thoughtful, caring, and gentle. He has a beautiful soul and a heart that makes people feel safe, seen, and cherished."
    },
    {
      pattern: /(smile|laugh|funny|joke|joy)/i,
      answer: "His smile and laugh are pure sunshine. He has a way of making even ordinary moments feel warm, happy, and full of joy."
    },
    {
      pattern: /(home|forever|future|stay|always)/i,
      answer: "He feels like home—someone you want to treasure, celebrate, and love forever. He is the kind of person you never want to let go of."
    },
    {
      pattern: /(hello|hi|hey|who are you|what are you)/i,
      answer: "Hi love 💖 I’m your sweet little birthday chatbot for Brilian C. Galon. Ask me about his birthday, his heart, or why he is so amazing."
    },
    {
      pattern: /(name|brilian c. galon|brilian)/i,
      answer: "Brilian C. Galon is the sweetest person ever—full of love, warmth, and charm. He deserves every lovely thing in the world on his birthday and every day after."
    }
  ];

  const fallbacks = [
    "Brilian is the kind of person who makes every ordinary moment feel meaningful and loved.",
    "He is warm, lovable, and deeply treasured. That is why he is so special to the heart.",
    "He has a gentle soul and a beautiful heart that makes people feel at ease and adored.",
    "His presence feels comforting, precious, and full of love—just like a perfect birthday blessing.",
    "He is someone you can love deeply, celebrate proudly, and cherish forever."
  ];

  const addMessage = (text, sender) => {
    const bubble = document.createElement("div");
    bubble.className = `message ${sender}`;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  };

  const getReply = (text) => {
    const match = knowledge.find((item) => item.pattern.test(text));
    if (match) return match.answer;
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";
    setTimeout(() => addMessage(getReply(text), "bot"), 180);
  });
}

/* ==========================================================================
   CELEBRATE BUTTON + CANVAS FIREWORKS + FINAL CELEBRATION
   ========================================================================== */
function initCelebrateAndFireworks(){
  const canvas = document.getElementById("fireworksCanvas");
  const celebrateBtn = document.getElementById("celebrateBtn");
  const endingSection = document.getElementById("ending");
  const iLoveYou = document.getElementById("iLoveYouFinal");
  const audio = document.getElementById("bgMusic");
  if (!canvas || !celebrateBtn || !endingSection || !iLoveYou || !audio) return;
  const ctx = canvas.getContext("2d");
  function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener("resize", resize);

  let particles = [];
  let animationFrame = null;

  function launchFirework(x, y){
    const count = LOW_POWER ? 36 : 60;
    const hueBase = Math.random()*360;
    for (let i=0;i<count;i++){
      const angle = (Math.PI*2*i)/count;
      const speed = LOW_POWER ? 1.4 + Math.random()*1.8 : 2 + Math.random()*3;
      particles.push({
        x, y,
        vx: Math.cos(angle)*speed,
        vy: Math.sin(angle)*speed,
        life: LOW_POWER ? 45 + Math.random()*12 : 60 + Math.random()*20,
        hue: hueBase + Math.random()*40 - 20
      });
    }
    if (!animationFrame) animationFrame = requestAnimationFrame(loop);
  }

  function loop(){
    if (particles.length === 0) {
      animationFrame = null;
      return;
    }

    ctx.fillStyle = "rgba(5,6,20,0.12)";
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.life -= 1;
      ctx.beginPath();
      ctx.arc(p.x,p.y,LOW_POWER ? 1.4 : 2.2,0,Math.PI*2);
      ctx.fillStyle = `hsla(${p.hue},90%,65%,${Math.max(p.life/80,0)})`;
      ctx.fill();
    });
    particles = particles.filter(p => p.life > 0);
    animationFrame = requestAnimationFrame(loop);
  }

  celebrateBtn.addEventListener("click", () => {
    for (let i=0;i<5;i++){
      setTimeout(() => {
        launchFirework(Math.random()*canvas.width, canvas.height*0.25 + Math.random()*canvas.height*0.35);
      }, i*220);
    }
    launchConfettiBurst();
  });

  window.launchFirework = launchFirework; // exposed for final celebration

  // Final celebration when ending section is reached
  let finalTriggered = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !finalTriggered){
        finalTriggered = true;
        for (let i=0;i<6;i++){
          setTimeout(() => launchFirework(Math.random()*canvas.width, canvas.height*0.3), i*300);
        }
        launchConfettiBurst();
        setTimeout(() => iLoveYou.classList.add("show"), 900);
        if (!audio.paused) audio.volume = Math.min(1, audio.volume + 0.2);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(endingSection);
}

/* ==========================================================================
   CONFETTI EXPLOSION
   ========================================================================== */
function launchConfettiBurst(){
  const colors = ["#FF4FA3","#F4C466","#7C5CFF","#C9A6FF","#FF8FC7"];
  const count = LOW_POWER ? 36 : 60;
  for (let i=0;i<count;i++){
    const piece = document.createElement("div");
    const size = 6 + Math.random()*6;
    piece.style.position = "fixed";
    piece.style.zIndex = "2500";
    piece.style.width = size+"px";
    piece.style.height = size*0.4+"px";
    piece.style.background = colors[Math.floor(Math.random()*colors.length)];
    piece.style.left = (Math.random()*100)+"vw";
    piece.style.top = "-10px";
    piece.style.opacity = "0.95";
    piece.style.borderRadius = "2px";
    piece.style.pointerEvents = "none";
    piece.style.transform = `rotate(${Math.random()*360}deg)`;
    document.body.appendChild(piece);
    const duration = 2500 + Math.random()*2000;
    const drift = (Math.random()*200-100);
    piece.animate([
      { transform: `translate(0,0) rotate(0deg)`, opacity: 1 },
      { transform: `translate(${drift}px, 100vh) rotate(${Math.random()*720}deg)`, opacity: 0.2 }
    ], { duration, easing: "ease-out" });
    setTimeout(() => piece.remove(), duration);
  }
}

/* ==========================================================================
   OPEN SURPRISE BUTTON — initial confetti kickoff handled inline above
   ========================================================================== */
function initOpenSurpriseButton(){
  const btn = document.getElementById("openSurpriseBtn");
  if (!btn) return;
  btn.type = "button";
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("countdown").scrollIntoView({ behavior: "smooth" });
    typewriterStart();
    launchConfettiBurst();
  });
}
