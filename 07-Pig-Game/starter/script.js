'use strict';

// When we want to select an ID elemet, we have two methods to get it.
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// When starting...
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');

let currentScore, activePlayer, scores, playing;

// The initial function
function init() {
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    // if winner has been chosen, then the status will turn to false, and then we could only click the "New Game" button.
    playing = true;

    dice.classList.add('hidden');
    document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
    }`;
    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;

    // if the class name is already in the class list, JS won't process it and won't return error.
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}

init();

// define the Switch Player function
function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 1 ? 0 : 1; // switch player
    currentScore = 0;
    // ⬇️ toggle means if the class name exists in the classlist, it will be removed. Otherwise, will be added.
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // Generating a random dice roll
        const diceNum = Math.trunc(Math.random() * 6) + 1;

        // display the dice
        dice.classList.remove('hidden');
        dice.src = `dice-${diceNum}.png`;

        // check for rolled 1: if true, switch to next player
        if (diceNum !== 1) {
            // Add dice number to current score
            currentScore += diceNum;
            document.querySelector(`#current--${activePlayer}`).textContent =
                currentScore;
        } else switchPlayer();
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        // Check if player's score >= 100
        if (scores[activePlayer] >= 20) {
            playing = false;
            // Finish the game and check the winner
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            // display the winner
            document.getElementById(`name--${activePlayer}`).textContent =
                'Winner';
            dice.classList.add('hidden');
        } else {
            // Switch to the other player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);
