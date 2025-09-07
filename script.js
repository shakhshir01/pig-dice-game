'use strict';

/* ================================
   🎲 Pig Game
   Two players take turns rolling a dice. 
   - Roll: Add dice value to current score. 
   - Roll a 1: Lose current score, switch turn.
   - Hold: Save current score to total. 
   - First to reach 50 points wins. 
================================ */

// 🎮 Select elements
const playerEls = [document.querySelector('.player--0'), document.querySelector('.player--1')];
const scoreEls = [document.getElementById('score--0'), document.getElementById('score--1')];
const currentEls = [document.getElementById('current--0'), document.getElementById('current--1')];

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// 🏆 Game state
let scores, currentScore, activePlayer, playing;

// 🔄 Initialize game
function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Reset UI
  scoreEls.forEach(score => (score.textContent = 0));
  currentEls.forEach(current => (current.textContent = 0));
  playerEls.forEach(player => {
    player.classList.remove('player--winner', 'player--active');
  });

  playerEls[0].classList.add('player--active');
  diceEl.classList.add('hidden');
}

init();

// 🔀 Switch player
function switchPlayer() {
  currentEls[activePlayer].textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  playerEls.forEach(player => player.classList.toggle('player--active'));
}

// 🎲 Roll dice
btnRoll.addEventListener('click', () => {
  if (!playing) return;

  const dice = Math.trunc(Math.random() * 6) + 1;

  // Show dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    // Add to current score
    currentScore += dice;
    currentEls[activePlayer].textContent = currentScore;
  } else {
    // Switch player
    switchPlayer();
  }
});

// 📥 Hold score
btnHold.addEventListener('click', () => {
  if (!playing) return;

  // Save score
  scores[activePlayer] += currentScore;
  scoreEls[activePlayer].textContent = scores[activePlayer];

  // Check win
  if (scores[activePlayer] >= 50) {
    playing = false;
    diceEl.classList.add('hidden');
    playerEls[activePlayer].classList.add('player--winner');
    playerEls[activePlayer].classList.remove('player--active');
  } else {
    switchPlayer();
  }
});

// 🔄 New game
btnNew.addEventListener('click', init);
