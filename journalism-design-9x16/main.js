/*
 * journalism.design — animation de présentation 9:16 (GSAP 3)
 * Direction artistique : design system « Synth. ».
 *
 * TOUS LES TEXTES SONT DANS CONTENT, CI-DESSOUS.
 * Les formulations des services sont des propositions à valider :
 * elles n'ont pas pu être vérifiées sur jd.snth.ch (site inaccessible lors de la rédaction).
 */

const CONTENT = {
  hook: {
    line1: "Une information.",
    line2: "Mille façons de la raconter.",
  },
  formats: [
    "article long",
    "vidéo verticale",
    "newsletter",
    "podcast",
    "datavisualisation",
    "live",
    "carrousel",
    "récit interactif",
    "IA générative",
    "jeu d'info",
  ],
  question: "Laquelle sert vraiment votre public ?",
  brand: {
    line1: "journalism",
    line2: "design", // le point cyan est dessiné entre les deux lignes
    positioning: "Innovation éditoriale", // affiché entre accolades
    claim: "On aide les rédactions à inventer leurs formats.",
  },
  services: [
    { title: "Veille", text: "Une newsletter qui décrypte l'innovation dans les médias." },
    { title: "Formation", text: "Des ateliers pratiques pour les rédactions et les écoles." },
    { title: "Conseil", text: "Stratégie éditoriale et accompagnement de vos projets." },
    { title: "Prototypage", text: "Des formats conçus, testés et livrés avec vos équipes." },
  ],
  cta: {
    say: "Parlons de votre projet.",
    url: "journalism.design",
  },
};

const SCENES = ["Ouverture", "Formats", "Marque", "Services", "Contact"];

/* ---------- Construction de la scène ---------- */

const stage = document.getElementById("stage");
const frame = document.getElementById("frame");
const EXPORT = /(^|[?&#])export\b/.test(location.search + location.hash);
if (EXPORT) document.documentElement.classList.add("is-export");

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const pad = (n) => String(n).padStart(2, "0");

// Lettres (pour la frappe) ; les mots restent insécables.
const chars = (text) =>
  text
    .split(/(\s+)/)
    .map((part) =>
      /^\s+$/.test(part)
        ? `<span class="ch"> </span>`
        : `<span class="w">${[...part].map((c) => `<span class="ch">${esc(c)}</span>`).join("")}</span>`
    )
    .join("");

const words = (text) => text.split(/\s+/).map((w) => `<span class="w">${esc(w)}</span>`).join(" ");

const wordmark = () => `
  <div class="wordmark" aria-label="${esc(CONTENT.brand.line1 + "." + CONTENT.brand.line2)}">
    <span class="line">${chars(CONTENT.brand.line1)}</span>
    <span class="line"><span class="dot"></span>${chars(CONTENT.brand.line2)}</span>
  </div>`;

// Motif de losanges : un réseau en quinconce, valeurs tirées entre #000 et #141414 comme la bannière Synth.
function diamonds() {
  const step = 96, half = step / 2, out = [];
  for (let row = -1; row * half < 1920 + step; row++) {
    for (let col = -1; col * step < 1080 + step; col++) {
      const x = col * step + (row % 2 ? half : 0) - 34;
      const y = row * half - 34;
      const v = Math.round(Math.pow(Math.random(), 2.2) * 20);
      out.push(`<i class="diamond" style="left:${x}px;top:${y}px;background:rgb(${v},${v},${v})"></i>`);
    }
  }
  return out.join("");
}

stage.innerHTML = `
  <div class="diamonds" aria-hidden="true">${diamonds()}</div>

  <div class="topbar" aria-hidden="true">
    <span>${esc(CONTENT.cta.url)}</span>
    <span class="count">01 / ${pad(SCENES.length)}</span>
  </div>
  <div class="progress" aria-hidden="true"><span></span></div>

  <section class="scene" id="s1">
    <div class="l1">${chars(CONTENT.hook.line1)}<span class="caret"></span></div>
    <div class="l2">${words(CONTENT.hook.line2)}</div>
  </section>

  <section class="scene" id="s2">
    <ul class="log">
      ${CONTENT.formats.map((f, i) => `<li><span class="p">${pad(i + 1)}</span><span>${esc(f)}</span></li>`).join("")}
    </ul>
    <div class="question">${words(CONTENT.question)}<span class="caret"></span></div>
  </section>

  <section class="scene" id="s3">
    ${wordmark()}
    <div class="pos">
      <div class="braces">{ ${esc(CONTENT.brand.positioning)} }</div>
      <div class="claim">${words(CONTENT.brand.claim)}</div>
    </div>
  </section>

  <section class="scene" id="s4">
    <div class="cards">
      ${CONTENT.services
        .map(
          (s, i) => `
        <article class="card">
          <div class="eyebrow">Service ${pad(i + 1)}</div>
          <h2>${esc(s.title)}.</h2>
          <p>${esc(s.text)}</p>
        </article>`
        )
        .join("")}
    </div>
  </section>

  <section class="scene" id="s5">
    ${wordmark()}
    <div class="cta">
      <div class="say">${words(CONTENT.cta.say)}</div>
      <div class="url">${esc(CONTENT.cta.url)}</div>
      <div class="braces">{ ${CONTENT.services.map((s) => esc(s.title)).join(" · ")} }</div>
    </div>
  </section>
`;

/* ---------- Mise à l'échelle 1080 × 1920 → cadre ---------- */

const fit = () => (stage.style.transform = `scale(${frame.clientWidth / 1080})`);
new ResizeObserver(fit).observe(frame);
fit();

/* ---------- Timeline ---------- */

// Synth. : « Fast and mechanical. Fades and 8px rises; no bounce, no spring, no scale-in. »
// Les montées sont un peu plus longues qu'en interface (la scène fait 1080 px de large).
const RISE = 20;
const cards = [...stage.querySelectorAll(".card")];
const count = stage.querySelector(".topbar .count");
const setCount = (i) => () => (count.textContent = `${pad(i)} / ${pad(SCENES.length)}`);

gsap.set(["#s2", "#s3", "#s4", "#s5"], { autoAlpha: 0 });

const tl = gsap.timeline({
  paused: true,
  repeat: EXPORT ? 0 : -1,
  repeatDelay: 0.6,
  defaults: { ease: "power3.out", duration: 0.32 },
  onUpdate: syncUI,
});

/* 1. OUVERTURE — le motif s'allume, une phrase se tape */
tl.addLabel("Ouverture")
  .call(setCount(1))
  .from(".diamond", { opacity: 0, duration: 0.5, stagger: { amount: 1.1, grid: "auto", from: "center" }, ease: "none" })
  .from([".topbar", ".progress"], { opacity: 0, y: -RISE / 2 }, 0.3)
  .from("#s1 .l1 .ch", { opacity: 0, duration: 0.01, stagger: 0.06, ease: "none" }, 0.7)
  .from("#s1 .l2 .w", { opacity: 0, y: RISE, stagger: 0.07 }, "+=0.3")
  .to("#s1", { opacity: 0, duration: 0.22, ease: "power2.in" }, "+=1.2");

/* 2. FORMATS — la liste s'imprime ligne à ligne, puis la question */
tl.addLabel("Formats")
  .call(setCount(2))
  .set("#s2", { autoAlpha: 1 })
  .from("#s2 .log li", { opacity: 0, duration: 0.01, stagger: 0.13, ease: "none" })
  .to("#s2 .log li", { color: getComputedStyle(document.documentElement).getPropertyValue("--gray-600").trim(), duration: 0.3, ease: "none" }, "+=0.2")
  .from("#s2 .question .w", { opacity: 0, y: RISE, stagger: 0.06 }, "<")
  .from("#s2 .question .caret", { opacity: 0, duration: 0.01 }, ">")
  .to("#s2", { opacity: 0, duration: 0.22, ease: "power2.in" }, "+=1.5");

/* 3. MARQUE — le point cyan apparaît seul, puis le nom se tape autour */
tl.addLabel("Marque")
  .call(setCount(3))
  .set("#s3", { autoAlpha: 1 })
  .from("#s3 .dot", { opacity: 0, duration: 0.01 })
  .to("#s3 .dot", { opacity: 0, duration: 0.01, repeat: 3, yoyo: true, repeatDelay: 0.22 }, "+=0.2")
  .from("#s3 .ch", { opacity: 0, duration: 0.01, stagger: 0.05, ease: "none" }, "+=0.3")
  .from("#s3 .braces", { opacity: 0, y: RISE }, "+=0.25")
  .from("#s3 .claim .w", { opacity: 0, y: RISE, stagger: 0.05 }, "<0.15")
  .to(".diamond", { opacity: 0.35, duration: 0.6, stagger: { amount: 0.6, grid: "auto", from: "start" }, ease: "none" }, "<")
  .to("#s3", { opacity: 0, duration: 0.22, ease: "power2.in" }, "+=1.6");

/* 4. SERVICES — les cartes arrivent, puis chacune est sélectionnée à son tour */
tl.addLabel("Services")
  .call(setCount(4))
  .set("#s4", { autoAlpha: 1 })
  .from(cards, { opacity: 0, y: RISE, stagger: 0.09 });

cards.forEach((card, i) => {
  const eyebrow = card.querySelector(".eyebrow");
  const at = i === 0 ? "+=0.1" : "+=1.25";
  tl.to(card, { borderColor: "#00ffe0", backgroundColor: "#141414", duration: 0.14, ease: "none" }, at)
    .to(eyebrow, { color: "#00ffe0", duration: 0.14, ease: "none" }, "<")
    .from(card.querySelector("p"), { opacity: 0.35, duration: 0.22 }, "<");
  if (i > 0) {
    tl.to(cards[i - 1], { borderColor: "rgba(255,255,255,.10)", backgroundColor: "#101010", duration: 0.14, ease: "none" }, "<")
      .to(cards[i - 1].querySelector(".eyebrow"), { color: "#7a7a7a", duration: 0.14, ease: "none" }, "<");
  }
});
tl.to("#s4", { opacity: 0, duration: 0.22, ease: "power2.in" }, "+=1.4");

/* 5. CONTACT — la marque revient, l'adresse s'écrit */
tl.addLabel("Contact")
  .call(setCount(5))
  .set("#s5", { autoAlpha: 1 })
  .to(".diamond", { opacity: 1, duration: 0.4, ease: "none" }, "<")
  .from("#s5 .wordmark .ch, #s5 .wordmark .dot", { opacity: 0, duration: 0.01, stagger: 0.035, ease: "none" })
  .from("#s5 .say .w", { opacity: 0, y: RISE, stagger: 0.07 }, "+=0.15")
  .from("#s5 .url", { opacity: 0, y: RISE }, "+=0.1")
  .from("#s5 .braces", { opacity: 0 }, "+=0.1")
  .to({}, { duration: 3 }); // temps de lecture final

// Filet de progression sur toute la durée
tl.fromTo(".progress span", { scaleX: 0 }, { scaleX: 1, duration: tl.duration(), ease: "none" }, 0);

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

SCENES.forEach((name) => {
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
  tl.seek(tl.duration() - 0.1);
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
