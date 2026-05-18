// Timer functionality
const startTime = new Date();
const timerElement = document.getElementById("elapsed-time");

function updateTimer() {
  const currentTime = new Date();
  const diff = Math.floor((currentTime - startTime) / 1000);
  const minutes = Math.floor(diff / 60);
  const seconds = diff % 60;
  timerElement.textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}
setInterval(updateTimer, 1000);

// Animation suggestion cards
document.querySelectorAll(".suggestion-card").forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  setTimeout(() => {
    card.style.transition = "all 0.6s ease";
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  }, 200 * (index + 1));
});

// Random quotes functionality
const quotes = [
  "Le temps est la ressource la plus précieuse, car c'est la seule qu'on ne peut pas récupérer.",
  "Chaque minute passée à se plaindre est une minute perdue pour s'améliorer.",
  "Le succès n'est pas un accident, c'est un travail acharné.",
  "La productivité n'est pas une question de temps, mais de choix.",
  "Concentrez-vous sur le progrès, pas la perfection.",
];
const quoteElement = document.querySelector(".quote");
setInterval(() => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteElement.style.opacity = "0";
  setTimeout(() => {
    quoteElement.textContent = randomQuote;
    quoteElement.style.opacity = "1";
  }, 500);
}, 10000);
