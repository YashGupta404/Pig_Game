'use strict';

// Selecting elements
const player0el = document.querySelector('.player--0');
const player1el = document.querySelector('.player--1');
const score0el = document.querySelector('#score--0'); // el means element
const score1el = document.getElementById('score--1');
const current0el = document.getElementById('current--0');
const current1el = document.getElementById('current--1');
const diceel = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

let scores, currentScore, activePlayer, playing;

//switch to next player function
const switchToNextPLayer = () => {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0el.classList.toggle('player--active');
  player1el.classList.toggle('player--active');
};

// Restart Game Function
const init = function () {
  score0el.textContent = 0;
  score1el.textContent = 0;
  current0el.textContent = 0;
  current1el.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  diceel.classList.add('hidden');
  player0el.classList.remove('player--winner');
  player1el.classList.remove('player--winner');
  player0el.classList.add('player--active');
  player1el.classList.remove('player--active');
  document.getElementById(`name--0`).textContent = `Player 1`;
  document.getElementById(`name--1`).textContent = `Player 2`;
};
// Starting Condition
init();

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  //  Random Number Generation
  let dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);
  //   Display Dice
  diceel.classList.remove('hidden');
  diceel.src = `dice-${dice}.png`;

  //   Check for rolled 1
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    // Switch to next player
    switchToNextPLayer();
  }
});

// Hold button functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      playing = false;
      diceel.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document;

      document.getElementById(`name--${activePlayer}`).textContent = 'Winner🎉';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchToNextPLayer();
    }
  }
});

// New Button Functionality
btnNew.addEventListener('click', init);
