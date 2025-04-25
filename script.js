function luhnCheck(cardNumber) {
  let sum = 0;
  let shouldDouble = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i));
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

function toggleExpiry() {
  const useExpiry = document.getElementById('useExpiry').checked;
  const expiryOptions = document.getElementById('expiryOptions');
  expiryOptions.classList.toggle('hidden', !useExpiry);
}

function generateCards() {
  const bin = document.getElementById('bin').value.replace(/[^0-9]/g, '');
  const quantity = parseInt(document.getElementById('quantity').value);
  const includeCVV = document.getElementById('cvv').checked;
  const useExpiry = document.getElementById('useExpiry').checked;
  const expMonthInput = document.getElementById('expMonth').value;
  const expYearInput = document.getElementById('expYear').value;
  const output = document.getElementById('output');

  let result = '';
  for (let i = 0; i < quantity; i++) {
    let card = bin;
    while (card.length < 15) {
      card += Math.floor(Math.random() * 10);
    }
    for (let j = 0; j < 10; j++) {
      const trialCard = card + j;
      if (luhnCheck(trialCard)) {
        card = trialCard;
        break;
      }
    }

    let line = card;

    if (includeCVV) {
      const cvv = String(Math.floor(100 + Math.random() * 900));
      line += `|${cvv}`;
    }

    if (useExpiry) {
      const month = expMonthInput || String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
      const year = expYearInput || String(Math.floor(Math.random() * 5) + 2025);
      line += `|${month}/${year}`;
    }

    result += line + "\n";
  }
  output.value = result;
}

function copyToClipboard() {
  const output = document.getElementById('output');
  output.select();
  document.execCommand('copy');
  alert('Copied to clipboard!');
}
