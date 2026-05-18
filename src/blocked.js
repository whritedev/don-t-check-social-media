/**
 * Timer functionality to track time spent since redirection.
 */
class Timer {
  constructor(elementId) {
    this.startTime = new Date();
    this.element = document.getElementById(elementId);
    this.init();
  }

  update() {
    const currentTime = new Date();
    const diff = Math.floor((currentTime - this.startTime) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    this.element.textContent = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  init() {
    setInterval(() => this.update(), 1000);
  }
}

/**
 * Manages random quotes display.
 */
class QuoteManager {
  constructor(elementSelector, quotes, interval = 10000) {
    this.element = document.querySelector(elementSelector);
    this.quotes = quotes;
    this.interval = interval;
    this.init();
  }

  showRandom() {
    const randomQuote =
      this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.element.style.opacity = "0";

    setTimeout(() => {
      this.element.textContent = randomQuote;
      this.element.style.opacity = "1";
    }, 500);
  }

  init() {
    setInterval(() => this.showRandom(), this.interval);
  }
}

/**
 * Handles simple entrance animations.
 */
function initAnimations() {
  document.querySelectorAll(".suggestion-card").forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    setTimeout(() => {
      card.style.transition = "all 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 200 * (index + 1));
  });
}

// Initialize components when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new Timer("elapsed-time");

  const quotes = [
    "Le temps est la ressource la plus précieuse, car c'est la seule qu'on ne peut pas récupérer.",
    "Chaque minute passée à se plaindre est une minute perdue pour s'améliorer.",
    "Le succès n'est pas un accident, c'est un travail acharné.",
    "La productivité n'est pas une question de temps, mais de choix.",
    "Concentrez-vous sur le progrès, pas la perfection.",
  ];
  new QuoteManager(".quote", quotes);

  initAnimations();
});
