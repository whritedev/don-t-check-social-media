/**
 * Smart Timer to track time spent away from distractions with adaptive units.
 */
class SmartTimer {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
    this.storageKey = "lastDistractionTime";
    this.init();
  }

  async init() {
    const result = await chrome.storage.local.get([this.storageKey]);
    if (result[this.storageKey]) {
      this.startTime = new Date(result[this.storageKey]);
    } else {
      this.startTime = new Date();
      await chrome.storage.local.set({ [this.storageKey]: this.startTime.toISOString() });
    }

    this.update();
    setInterval(() => this.update(), 1000);
  }

  formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (months > 0) return `${months} mois`;
    if (weeks > 0) return `${weeks} semaine${weeks > 1 ? "s" : ""}`;
    if (days > 0) return `${days} jour${days > 1 ? "s" : ""}`;
    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }

  update() {
    const now = new Date();
    const diff = now - this.startTime;
    if (this.element) {
      this.element.textContent = this.formatDuration(diff);
    }
  }
}

/**
 * Manages inspirational quotes with separate text and author.
 */
class QuoteManager {
  constructor(textSelector, authorSelector) {
    this.textElement = document.querySelector(textSelector);
    this.authorElement = document.querySelector(authorSelector);
    this.quotes = [
      { text: "Ce que nous faisons dans la vie a un écho dans l'éternité.", author: "Marc Aurèle" },
      { text: "La concentration est la racine de toutes les capacités humaines.", author: "Bruce Lee" },
      { text: "Faites la chose que vous pensez ne pas pouvoir faire.", author: "Eleanor Roosevelt" },
      { text: "Le secret pour avancer, c'est de commencer.", author: "Mark Twain" },
      { text: "La qualité n'est jamais un accident ; c'est toujours le résultat d'un effort intelligent.", author: "John Ruskin" },
      { text: "Le moment présent sera toujours ce qu'il aura été.", author: "Anonyme" },
      { text: "Chaque instant est une chance que l'on ne retrouvera plus.", author: "Anonyme" },
    ];
    this.init();
  }

  showRandom() {
    const q = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    
    if (this.textElement) {
      this.textElement.style.opacity = "0";
      if (this.authorElement) this.authorElement.style.opacity = "0";

      setTimeout(() => {
        this.textElement.textContent = `“${q.text}”`;
        if (this.authorElement) this.authorElement.textContent = `— ${q.author}`;
        this.textElement.style.opacity = "1";
        if (this.authorElement) this.authorElement.style.opacity = "1";
      }, 500);
    }
  }

  init() {
    this.showRandom();
    setInterval(() => this.showRandom(), 18000);
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new SmartTimer("elapsed-time");
  new QuoteManager("#quote-text", "#quote-author");
});
