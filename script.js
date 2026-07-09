// Dán URL Web App sau khi deploy Google Apps Script (xem hướng dẫn kèm theo)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw7P1nQhWlrbYUmipuZi74efA0_JhvPvz55E9co4XK5G7RJPKdTY3gkzakvYDoxZYrw/exec";

const form = document.getElementById("rsvp-form");
const thanks = document.getElementById("rsvp-thanks");
const messageInput = document.getElementById("guest-message");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const submitter = event.submitter;
  const answer = submitter ? submitter.dataset.answer : "yes";
  const guestMessage = messageInput.value.trim();

  if (GOOGLE_SCRIPT_URL.includes("YOUR_DEPLOYMENT_ID") === false) {
    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        attending: answer,
        message: guestMessage,
      }),
    }).catch(() => {});
  }

  thanks.textContent =
    answer === "yes"
      ? `Cảm ơn bạn đã xác nhận tham dự! Hẹn gặp lại tại lễ tốt nghiệp 🎓`
      : `Cảm ơn bạn đã phản hồi. Rất tiếc vì không thể gặp bạn hôm đó`;

  thanks.classList.remove("hidden");
  form.classList.add("hidden");
});

const EVENT_DATE = new Date("2026-07-24T08:30:00+07:00");
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
