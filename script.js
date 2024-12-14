const countdown = document.getElementById('countdown');
const previewBtn = document.getElementById('preview-btn');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const suggestionText = document.getElementById('suggestion-text');
const newYearWish = document.getElementById('dynamicWish');
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

// Predefined Data for Suggestions and Wishes
const suggestions = [
  "Learn a new skill",
  "Watch 'Inception'",
  "Cook a gourmet meal",
  "Write your goals for the year",
  "Plan a trip to the mountains",
  "Try intermittent fasting",
  "Explore a new book genre",
  "Join a fitness class"
];

const wishes = [
  "May this year bring joy to your life!",
  "Wishing you peace and success in the New Year!",
  "Cheers to a prosperous year ahead!",
  "Let your dreams take flight this New Year!",
  "A new chapter of joy and success awaits!",
  "May your aspirations come true!",
  "Wishing you love and laughter this New Year!"
];

// Confetti Settings
let confettiArray = [];
const confettiCount = 200;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Countdown Timer
function updateTimer() {
  const now = new Date();
  const nextYear = new Date(new Date().getFullYear() + 1, 0, 1);
  const diff = nextYear - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  countdown.textContent = `${days}:${hours}:${minutes}:${seconds}`;

  // Automatically trigger celebration when the countdown ends
  if (diff <= 0) {
    triggerPartyPooper();
    startCelebration();
  }
}

// Rotate Suggestions Dynamically
let suggestionIndex = 0;
setInterval(() => {
  suggestionText.textContent = ` ${suggestions[suggestionIndex]}`;
  suggestionIndex = (suggestionIndex + 1) % suggestions.length;
}, 3000);

// Display Random Wish on Page 2
function displayRandomWish() {
  const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
  newYearWish.textContent = randomWish;
}

// Confetti Constructor
class Confetti {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = Math.random() * 5 + 2;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 + 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Initialize Confetti
function createConfetti() {
  const colors = ['#FFD700', '#FF4500', '#00FF00', '#00BFFF', '#FF69B4'];
  for (let i = 0; i < confettiCount; i++) {
    confettiArray.push(
      new Confetti(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        colors[Math.floor(Math.random() * colors.length)]
      )
    );
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiArray.forEach((confetti) => {
    confetti.update();
    confetti.draw();
  });
  requestAnimationFrame(drawConfetti);
}

// Party Pooper Burst Effect
function triggerPartyPooper() {
  const burst = document.createElement('div');
  burst.className = 'party-pooper';
  burst.style.position = 'fixed';
  burst.style.top = 0;
  burst.style.left = 0;
  burst.style.width = '100vw';
  burst.style.height = '100vh';
  burst.style.background = "radial-gradient(circle, #FFD700, transparent)";
  burst.style.zIndex = 9999;
  burst.style.pointerEvents = 'none';
  document.body.appendChild(burst);

  // Remove burst effect after animation
  setTimeout(() => {
    document.body.removeChild(burst);
  }, 1000);

  // Start confetti
  createConfetti();
  drawConfetti();
}

// Switch to Celebration Page
function startCelebration() {
  page1.classList.remove('active');
  page2.classList.add('active');
  displayRandomWish();
}

// Event Listeners
previewBtn.addEventListener('click', () => {
  triggerPartyPooper();
  startCelebration();
});
const rickrollBtn = document.getElementById('gift-btn');

// Add Rickroll functionality
rickrollBtn.addEventListener('click', () => {
  // Redirects to the Rickroll YouTube link
  window.open('https://www.youtube.com/watch?v=xvFZjo5PgG0', '_blank');
});

// Initialize
setInterval(updateTimer, 1000);
createConfetti();
