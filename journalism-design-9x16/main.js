/*
 * journalism.design — animation de présentation 9:16 (GSAP 3)
 *
 * TOUS LES TEXTES SONT DANS CONTENT, CI-DESSOUS.
 * Les formulations des services sont des propositions à valider :
 * elles n'ont pas pu être vérifiées sur le site journalism.design.
 */

const CONTENT = {
  hook: {
    line1: "Une information.",
    line2: "{Mille} façons de la raconter.", // {…} = mot en magenta
  },
  formats: [
    { label: "article long", style: "fill" },
    { label: "vidéo verticale" },
    { label: "newsletter", style: "dash" },
    { label: "podcast" },
    { label: "datavisualisation", style: "fill" },
    { label: "live" },
    { label: "carrousel", style: "dash" },
    { label: "récit interactif", style: "hot" },
    { label: "IA générative" },
    { label: "jeu d'info", style: "fill" },
    { label: "audio", style: "dash" },
  ],
  question: "Laquelle sert vraiment votre public ?",
  brand: {
    line1: "journalism",
    line2: "design", // le point est dessiné : c'est lui qui fait la transition
    kicker: "Innovation éditoriale",
    claim: "On aide les rédactions à inventer leurs formats.",
  },
  services: [
    {
      title: "Veille",
      text: "Une newsletter qui décrypte l'innovation dans les médias.",
      tags: ["tendances", "outils", "cas d'école"],
    },
    {
      title: "Formation",
      text: "Des ateliers pratiques pour les rédactions et les écoles.",
      tags: ["formats", "IA", "méthodes"],
    },
    {
      title: "Conseil",
      text: "Stratégie éditoriale et accompagnement de vos projets.",
      tags: ["audit", "stratégie", "audiences"],
    },
    {
      title: "Prototypage",
      text: "Des formats conçus, testés et livrés avec vos équipes.",
      tags: ["design", "code", "tests lecteurs"],
    },
  ],
  cta: {
    say: "Parlons de votre projet.",
    url: "journalism.design",
  },
  slug: "journalism.design · épreuve 1080 × 1920",
};

/* ---------- Construction de la scène ---------- */

const stage = document.getElementById("stage");
const frame = document.getElementById("frame");
const EXPORT = /(^|[?&#])export\b/.test(location.search + location.hash);
if (EXPORT) document.documentElement.classList.add("is-export");

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

// Découpe un texte en lettres. Les mots restent insécables pour que les retours à la ligne tombent juste.
function chars(text) {
  return text
    .split(/(\s+)/)
    .map((part) =>
      /^\s+$/.test(part)
        ? `<span class="ch"> </span>`
        : `<span class="w">${[...part].map((c) => `<span class="ch">${esc(c)}</span>`).join("")}</span>`
    )
    .join("");
}

// Découpe en mots ; {mot} est mis en évidence.
function words(text) {
  return text
    .split(/\s+/)
    .map((w) => {
      const hl = /^\{(.+)\}(.*)$/.exec(w);
      return hl ? `<span class="w"><span class="hl">${esc(hl[1])}</span>${esc(hl[2])}</span>` : `<span class="w">${esc(w)}</span>`;
    })
    .join(" ");
}

const regCross = (color, dx, dy) => `
  <svg viewBox="0 0 64 64" style="transform:translate(${dx}px,${dy}px)" aria-hidden="true">
    <circle cx="32" cy="32" r="16" fill="none" stroke="${color}" stroke-width="2.5"/>
    <path d="M32 2V62M2 32H62" stroke="${color}" stroke-width="2.5"/>
  </svg>`;

const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

stage.innerHTML = `
  <div class="guides" aria-hidden="true">${'<div class="guide"></div>'.repeat(6)}</div>
  <div class="marks" aria-hidden="true">
    <div class="crop tl"></div><div class="crop tr"></div><div class="crop bl"></div><div class="crop br"></div>
    <div class="reg">${regCross(css("--cyan"), -2, 1)}${regCross(css("--accent"), 2, -1)}${regCross(css("--yellow"), 0, 2)}</div>
    <div class="slug">${esc(CONTENT.slug)}</div>
  </div>

  <section class="scene" id="s1">
    <div class="l1">${chars(CONTENT.hook.line1)}<span class="caret"></span></div>
    <div class="l2">${words(CONTENT.hook.line2)}</div>
  </section>

  <section class="scene" id="s2">
    <div class="tiles">${CONTENT.formats.map((f) => `<span class="tile ${f.style || ""}">${esc(f.label)}</span>`).join("")}</div>
    <div class="question">${words(CONTENT.question)}</div>
  </section>

  <section class="scene" id="s3">
    <div class="logo-wrap">
      <div class="logo" aria-label="${esc(CONTENT.brand.line1 + "." + CONTENT.brand.line2)}">
        <span class="line">${chars(CONTENT.brand.line1)}</span>
        <span class="line"><span class="dot"></span>${chars(CONTENT.brand.line2)}</span>
      </div>
    </div>
  </section>

  <section class="scene" id="s4">
    <div id="tag">
      <div class="kicker">${esc(CONTENT.brand.kicker)}</div>
      <div class="claim">${words(CONTENT.brand.claim)}</div>
    </div>
  </section>

  <section class="scene" id="s5">
    <div class="cards">
      ${CONTENT.services
        .map(
          (s, i) => `
        <article class="card">
          <div class="eyebrow"><span>Service</span><span class="n">${i + 1}/${CONTENT.services.length}</span></div>
          <div class="bar"></div>
          <h2>${esc(s.title)}</h2>
          <p>${words(s.text)}</p>
          <div class="tags">${s.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        </article>`
        )
        .join("")}
    </div>
  </section>

  <section class="scene" id="s6">
    <div class="cta">
      <div class="say">${words(CONTENT.cta.say)}</div>
      <div class="url">${esc(CONTENT.cta.url)}<span class="underline"></span></div>
      <div class="list">${CONTENT.services.map((s) => esc(s.title)).join(" · ")}</div>
    </div>
  </section>
`;

/* ---------- Mise à l'échelle 1080 × 1920 → cadre ---------- */

function fit() {
  stage.style.transform = `scale(${frame.clientWidth / 1080})`;
}
new ResizeObserver(fit).observe(frame);
fit();

/* ---------- Timeline ---------- */

const q = (sel) => stage.querySelectorAll(sel);
const cards = [...q(".card")];

// États de départ des scènes qui arrivent plus tard
gsap.set(["#s2", "#s3", "#s4", "#s5", "#s6"], { autoAlpha: 0 });
gsap.set(".dot", { scale: 0 });
gsap.set(cards, { autoAlpha: 0 });

const tl = gsap.timeline({
  paused: true,
  repeat: EXPORT ? 0 : -1,
  repeatDelay: 0.8,
  defaults: { ease: "power3.out" },
  onUpdate: syncUI,
});

/* 1. OUVERTURE — la page blanche se met en place, une phrase se tape */
tl.addLabel("Ouverture")
  .from(".guide", { scaleY: 0, transformOrigin: "50% 0%", duration: 0.9, stagger: 0.07, ease: "power4.out" })
  .from(".crop", { autoAlpha: 0, scale: 0.4, duration: 0.4, stagger: 0.06 }, "<0.2")
  .from(".reg svg", { autoAlpha: 0, rotation: -90, duration: 0.6, stagger: 0.08 }, "<")
  .from(".slug", { autoAlpha: 0, duration: 0.4 }, "<")
  .from("#s1 .l1 .ch", { autoAlpha: 0, duration: 0.01, stagger: 0.055, ease: "none" }, "-=0.1")
  .from("#s1 .l2 .w", { yPercent: 80, autoAlpha: 0, duration: 0.55, stagger: 0.08 }, "+=0.25")
  .from("#s1 .l2 .hl", { color: css("--paper-dim"), duration: 0.4 }, "<0.1")
  .to("#s1", { autoAlpha: 0, y: -90, duration: 0.45, ease: "power2.in" }, "+=1.1");

/* 2. FORMATS — la profusion, puis la question */
tl.addLabel("Formats")
  .set("#s2", { autoAlpha: 1 })
  .fromTo(
    "#s2 .tile",
    { autoAlpha: 0, scale: 0.3, rotation: () => gsap.utils.random(-18, 18) },
    { autoAlpha: 1, scale: 1, rotation: () => gsap.utils.random(-4, 4), duration: 0.5, stagger: { each: 0.075, from: "random" }, ease: "back.out(1.9)" }
  )
  .from("#s2 .question .w", { yPercent: 70, autoAlpha: 0, duration: 0.5, stagger: 0.06 }, "+=0.15")
  .to("#s2 .tile", { y: () => gsap.utils.random(-30, 30), x: () => gsap.utils.random(-16, 16), duration: 1.4, ease: "sine.inOut" }, "<");

/* 3. MARQUE — le point magenta envahit tout, puis se range dans « .design » */
tl.addLabel("Marque", "+=0.6")
  .set("#s3", { autoAlpha: 1 }, "Marque")
  .to(".dot", { scale: 1.6, duration: 0.3, ease: "back.out(3)" }, "Marque")
  .to(".dot", { scale: 110, duration: 0.65, ease: "power3.in" })
  .set(["#s2", "#s1"], { autoAlpha: 0 })
  .to(".dot", { scale: 1, duration: 0.95, ease: "expo.inOut" }, "+=0.12")
  .from("#s3 .logo .ch", { y: 70, autoAlpha: 0, duration: 0.55, stagger: 0.025, ease: "power4.out" }, "<0.5")
  .set("#s4", { autoAlpha: 1 })
  .from("#tag .kicker", { autoAlpha: 0, x: -40, duration: 0.5 }, "+=0.15")
  .from("#tag .claim .w", { yPercent: 60, autoAlpha: 0, duration: 0.5, stagger: 0.05 }, "<0.15");

/* 4. SERVICES — le logo devient en-tête, les épreuves s'empilent */
tl.addLabel("Services", "+=1.6")
  .to("#s4", { autoAlpha: 0, y: 60, duration: 0.4, ease: "power2.in" }, "Services")
  .to("#s3 .logo-wrap", { y: -470, scale: 0.42, transformOrigin: "0% 0%", duration: 0.85, ease: "power3.inOut" }, "Services")
  .set("#s5", { autoAlpha: 1 });

cards.forEach((card, i) => {
  const at = i === 0 ? "-=0.25" : "+=1.25";
  tl.fromTo(
    card,
    { autoAlpha: 0, y: 420, rotation: i % 2 ? -5 : 5 },
    { autoAlpha: 1, y: 0, rotation: (i % 2 ? -1 : 1) * 0.8, duration: 0.65, ease: "power4.out" },
    at
  )
    .from(card.querySelector(".bar"), { scaleX: 0, transformOrigin: "0% 50%", duration: 0.5 }, "<0.25")
    .from(card.querySelectorAll("p .w"), { y: 24, autoAlpha: 0, duration: 0.4, stagger: 0.035 }, "<0.05")
    .from(card.querySelectorAll(".tags span"), { scale: 0.6, autoAlpha: 0, duration: 0.35, stagger: 0.06, ease: "back.out(2)" }, "<0.2");
  // l'épreuve précédente recule dans la pile
  if (i > 0) {
    tl.to(cards.slice(0, i), { y: (j) => -(i - j) * 34, scale: (j) => 1 - (i - j) * 0.04, filter: "brightness(0.82)", duration: 0.6, ease: "power3.out" }, "<-0.55");
  }
});

/* 5. CONTACT — la pile s'en va, la marque revient, l'adresse se souligne */
tl.addLabel("Contact", "+=1.4")
  .to(cards, { y: 1600, autoAlpha: 0, rotation: (i) => (i % 2 ? -8 : 8), duration: 0.7, stagger: { each: 0.06, from: "end" }, ease: "power3.in" }, "Contact")
  .to("#s3 .logo-wrap", { y: -200, scale: 0.78, duration: 0.9, ease: "power3.inOut" }, "Contact+=0.35")
  .set("#s6", { autoAlpha: 1 })
  .from("#s6 .say .w", { yPercent: 70, autoAlpha: 0, duration: 0.55, stagger: 0.07 }, "-=0.3")
  .from("#s6 .url", { autoAlpha: 0, y: 30, duration: 0.5 }, "-=0.2")
  .from("#s6 .url .underline", { scaleX: 0, duration: 0.7, ease: "expo.out" }, "-=0.15")
  .from("#s6 .list", { autoAlpha: 0, duration: 0.6 }, "-=0.3")
  .to(".dot", { scale: 1.5, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.inOut" }, "-=0.2")
  .to({}, { duration: 2.6 }) // temps de lecture final
  .to(stage, { autoAlpha: 0, duration: 0.5, ease: "power1.in" });

/* ---------- Contrôles ---------- */

const playBtn = document.getElementById("play");
const scrub = document.getElementById("scrub");
const timeEl = document.getElementById("time");
const chaptersEl = document.getElementById("chapters");
const fmt = (s) => s.toFixed(1).replace(".", ",") + " s";

function syncUI() {
  scrub.value = tl.progress();
  timeEl.textContent = `${fmt(tl.time())} / ${fmt(tl.duration())}`;
}

function setPlaying(on) {
  on ? tl.play() : tl.pause();
  playBtn.textContent = on ? "Pause" : "Lecture";
  playBtn.setAttribute("aria-pressed", String(on));
}

playBtn.addEventListener("click", () => setPlaying(tl.paused()));
document.getElementById("restart").addEventListener("click", () => {
  tl.restart();
  setPlaying(true);
});
scrub.addEventListener("input", () => {
  setPlaying(false);
  tl.progress(Number(scrub.value));
  syncUI();
});

Object.keys(tl.labels).forEach((name) => {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = name;
  b.addEventListener("click", () => {
    tl.seek(name);
    syncUI();
  });
  chaptersEl.append(b);
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && e.target === document.body) {
    e.preventDefault();
    setPlaying(tl.paused());
  }
});

// Mouvement réduit : on affiche l'image finale, la lecture reste possible à la demande.
if (!EXPORT && matchMedia("(prefers-reduced-motion: reduce)").matches) {
  tl.seek(tl.duration() - 0.6);
  setPlaying(false);
  syncUI();
} else {
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => setPlaying(true));
}

// Pour un export image par image (Playwright, Puppeteer…) : window.seekTo(secondes)
window.jdTimeline = tl;
window.seekTo = (s) => {
  setPlaying(false);
  tl.seek(s, false);
  syncUI();
};
