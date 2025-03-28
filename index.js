"use strict";
// SELECTING ELEMENTS:
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
let scores , currentScore , activePlayer , playing ;
//STARTING CONDITIONS:
const init = function () {
  
   scores = [0, 0];
 currentScore = 0;
 activePlayer = 0;
 playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

//ROLLING A DICE FUNCTIONALITY:
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. GENERATION FOR RANDOM DICE:
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. DISPLAY DICE:
    diceEl.classList.remove("hidden");
    diceEl.src = `./images/dice-${dice}.png`;

    //3.CHECK FOR ROLL 1:
    if (dice !== 1) {
      //ADD DICE TO CURRENT SCORE:
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //SWITCH TO NEXT PLAYER:
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 50
    if (scores[activePlayer] >= 50) {
      // Finish the game
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

//reset a game:
btnNew.addEventListener("click", init );
