// Dán URL Web App sau khi deploy Google Apps Script (xem hướng dẫn kèm theo)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw7P1nQhWlrbYUmipuZi74efA0_JhvPvz55E9co4XK5G7RJPKdTY3gkzakvYDoxZYrw/exec";

const form = document.getElementById("rsvp-form");
const thanks = document.getElementById("rsvp-thanks");
const messageInput = document.getElementById("guest-message");
const sendButton = form.querySelector(".btn-primary");

const CONFETTI_EMOJI = ["🎉", "🎓", "✨", "💫", "🎊"];

function launchConfetti(originEl) {
  const rect = originEl.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  for (let i = 0; i < 18; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = CONFETTI_EMOJI[Math.floor(Math.random() * CONFETTI_EMOJI.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 110;
    const tx1 = Math.cos(angle) * distance;
    const ty1 = Math.sin(angle) * distance - 40;
    const rot = (Math.random() * 360 - 180).toFixed(0) + "deg";

    piece.style.setProperty("--tx0", "0px");
    piece.style.setProperty("--ty0", "0px");
    piece.style.setProperty("--tx1", `${tx1}px`);
    piece.style.setProperty("--ty1", `${ty1}px`);
    piece.style.setProperty("--rot", rot);
    piece.style.left = `${originX}px`;
    piece.style.top = `${originY}px`;
    piece.style.animationDelay = `${Math.random() * 0.15}s`;

    document.body.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const guestMessage = messageInput.value.trim();

  if (GOOGLE_SCRIPT_URL.includes("YOUR_DEPLOYMENT_ID") === false) {
    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        attending: "yes",
        message: guestMessage,
      }),
    }).catch(() => {});
  }

  sendButton.classList.add("is-sending");
  launchConfetti(sendButton);

  setTimeout(() => {
    thanks.textContent = "Cảm ơn bạn! Lời nhắn đã được gửi đến KNN 🎓";
    thanks.classList.remove("hidden");
    form.classList.add("hidden");
  }, 350);
});

const EVENT_DATE = new Date("2026-07-24T09:15:00+07:00");
const cdDays = document.getElementById("cd-days");
const cdHours = document.getElementById("cd-hours");
const cdMins = document.getElementById("cd-mins");
const cdSecs = document.getElementById("cd-secs");
const countdownEl = document.getElementById("countdown");

function updateCountdown() {
  const diff = EVENT_DATE.getTime() - Date.now();

  if (diff <= 0) {
    countdownEl.innerHTML = '<p class="countdown-done">🎉 Hôm nay là ngày trọng đại!</p>';
    clearInterval(countdownTimer);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  cdDays.textContent = String(days).padStart(2, "0");
  cdHours.textContent = String(hours).padStart(2, "0");
  cdMins.textContent = String(mins).padStart(2, "0");
  cdSecs.textContent = String(secs).padStart(2, "0");
}

updateCountdown();
const countdownTimer = setInterval(updateCountdown, 1000);
