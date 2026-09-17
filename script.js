const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
const mensaje = document.getElementById("mensaje");

let W, H, cx, cy, scale;
let particles = [];
const TEXT = "I love you";
const NUM_PARTICLES = 130;

function heartX(t) {
  return 16 * Math.pow(Math.sin(t), 3);
}

function heartY(t) {
  return 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
}

function setup() {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  cx = W / 2;
  cy = H * 0.42;
  scale = Math.min(W, H) / 32;

  mensaje.style.top = (cy + 17 * scale + 20) + "px";

  particles = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const t = (i / NUM_PARTICLES) * Math.PI * 2;

    const jitterX = (Math.random() - 0.5) * scale * 0.6;
    const jitterY = (Math.random() - 0.5) * scale * 0.6;

    const x = heartX(t) * scale + jitterX;
    const y = -heartY(t) * scale + jitterY;

    particles.push({
      x: x,
      y: y,
      phase: Math.random() * Math.PI * 2,
      speed: 0.0006 + Math.random() * 0.0009,
      size: 11 + Math.random() * 6,
      minOp: 0.15 + Math.random() * 0.15
    });
  }
}

function draw(time) {
  ctx.clearRect(0, 0, W, H);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (const p of particles) {
    const wave = (Math.sin(time * p.speed + p.phase) + 1) / 2;
    const opacity = p.minOp + wave * (1 - p.minOp);

    const px = cx + p.x;
    const py = cy + p.y;

    ctx.globalAlpha = opacity;
    ctx.font = `bold ${p.size}px Georgia, serif`;
    ctx.shadowBlur = 6 + opacity * 18;
    ctx.shadowColor = `hsl(340, 100%, 70%)`;
    ctx.fillStyle = `hsl(340, 100%, ${55 + opacity * 40}%)`;
    ctx.fillText(TEXT, px, py);
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}

setup();
requestAnimationFrame(draw);

window.addEventListener("resize", setup);