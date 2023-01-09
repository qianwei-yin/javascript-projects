"use strict";

// define the secret secret number
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;

// define some functions
function displayMessage(message) {
    document.querySelector(".message").textContent = message;
}

function displayScore(score) {
    document.querySelector(".score").textContent = score;
}

document.querySelector(".check").addEventListener("click", function () {
    const guess = Number(document.querySelector(".guess").value);

    // When there is no input
    if (!guess) {
        displayMessage("⛔️ No number!");
    } else if (score === 1 && guess !== secretNumber) {
        displayMessage("💥 You lost!");
        displayScore(--score);
    } else if (guess === secretNumber) {
        document.querySelector(".number").textContent = secretNumber;
        displayMessage("🎉 Correct number!");
        // ⬇️ The content after = must have quotes "", that is must be a string
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width = "30rem";
        if (score > document.querySelector(".best-score").textContent) {
            document.querySelector(".best-score").textContent = score;
        }
    } else if (guess !== secretNumber) {
        displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
        displayScore(--score);
    }
});

document.querySelector(".again").addEventListener("click", function () {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    displayScore(score);
    document.querySelector("body").style.backgroundColor = "#222";
    displayMessage("Start guessing...");
    document.querySelector(".number").textContent = "?";
    document.querySelector(".number").style.width = "15rem";
    document.querySelector(".guess").value = "";
});
