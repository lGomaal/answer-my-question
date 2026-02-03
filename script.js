"use strict";
const getClientDeviceType = () => {
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) {
    return "mobile";
  }
  return "desktop";
};

const yesButton = document.querySelector(".card__yes-button");
const noButton = document.querySelector(".card__no-button");
const card = document.querySelector(".card");
const loseCard = document.querySelector(".lose-card");
const winCard = document.querySelector(".win-card");
const deviceType = getClientDeviceType();
const thresholdDistanceForDesktop = 100;
const maxOffset = 100;

const desktopFlow = (e) => {
  const cardRect = card.getBoundingClientRect();

  // Mouse position relative to card
  const mouseX = e.clientX - cardRect.left;
  const mouseY = e.clientY - cardRect.top;

  // Button position relative to card
  const btnRect = noButton.getBoundingClientRect();
  const buttonX = btnRect.left - cardRect.left + btnRect.width / 2;
  const buttonY = btnRect.top - cardRect.top + btnRect.height / 2;

  const dx = buttonX - mouseX;
  const dy = buttonY - mouseY;
  const distance = Math.hypot(dx, dy);

  if (distance < thresholdDistanceForDesktop) {
    // Normalize vector
    const magnitude = Math.hypot(dx, dy);
    const offsetX = (dx / magnitude) * maxOffset;
    const offsetY = (dy / magnitude) * maxOffset;

    // Apply movement visually with transform (layout intact)
    noButton.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    if (Math.random() < 0.5) {
      noButton.style.scale = (Math.random() * 0.5 + 0.5).toString();
      yesButton.style.scale = (Math.random() * 1 + 1).toString();
    }
  } else {
    // Reset position
    if (
      mouseX < 0 ||
      mouseY < 0 ||
      mouseX > cardRect.width ||
      mouseY > cardRect.height
    ) {
      noButton.style.transform = "translate(0, 0)";
      noButton.style.scale = "1";
      yesButton.style.scale = "1";
    }
  }
};

const mobileFlow = () => {
  const cardRect = document.body.getBoundingClientRect();
  const btnRect = noButton.getBoundingClientRect();

  // Calculate maximum movement area (keep button visible)
  const maxX = (cardRect.width - btnRect.width) / 2;
  const maxY = (cardRect.height - btnRect.height) / 2;

  // Generate random position
  const randomX = Math.random() * (maxX * 2) - maxX;
  const randomY = Math.random() * (maxY * 2) - maxY;

  // Apply movement with animation
  noButton.style.transform = `translate(${randomX}px, ${randomY}px)`;

  // Optional: Random scale change sometimes
  if (Math.random() < 0.3) {
    noButton.style.scale = (Math.random() * 0.4 + 0.3).toString();
    yesButton.style.scale = (Math.random() * 1 + 1).toString();
  }
};

if (deviceType === "desktop") {
  document.addEventListener("mousemove", desktopFlow);
} else {
  setInterval(() => {
    mobileFlow();
  }, 250);
}

yesButton.addEventListener("click", () => {
  card.style.display = "none";
  loseCard.style.display = "block";
});

noButton.addEventListener("click", () => {
  card.style.display = "none";
  winCard.style.display = "block";
});
