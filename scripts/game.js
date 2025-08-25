// Get elements
const startBtn = document.getElementById("start-btn");
const roundForm = document.getElementById("round-form");
const roundSetup = document.getElementById("round-setup");
const gameArea = document.getElementById("game-area");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const resultEl = document.getElementById("round-result");
const restartBtn = document.getElementById("restart-btn");
const optionBtns = document.querySelectorAll(".option-btn");

// Game state
let totalRounds = 0;
let playerScore = 0;
let computerScore = 0;
let roundsPlayed = 0;

// Start game
startBtn.onclick = function() {
  const selected = document.querySelector("input[name='rounds']:checked");
  if (!selected) {
    alert("Please select rounds!");
    return;
  }

  totalRounds = parseInt(selected.value);
  playerScore = 0;
  computerScore = 0;
  roundsPlayed = 0;

  playerScoreEl.textContent = 0;
  computerScoreEl.textContent = 0;
  resultEl.textContent = "Game started! Choose Rock, Paper, or Scissors.";

  roundSetup.style.display = "none";
  gameArea.style.display = "block";
}

// Random computer choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

// Play one round
function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  let message = "";

  if (playerChoice === computerChoice) {
    message = "It's a tie! Both chose " + playerChoice;
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    playerScore++;
    message = "You win! " + playerChoice + " beats " + computerChoice;
  } else {
    computerScore++;
    message = "Computer wins! " + computerChoice + " beats " + playerChoice;
  }

  roundsPlayed++;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  resultEl.textContent = message + " (" + roundsPlayed + "/" + totalRounds + ")";

  if (roundsPlayed === totalRounds) {
    endGame();
  }
}

// End game
function endGame() {
  let finalMsg = "";
  if (playerScore > computerScore) finalMsg = "You won the game!";
  else if (playerScore < computerScore) finalMsg = "Computer won the game!";
  else finalMsg = "It's a draw!";

  resultEl.textContent = finalMsg + " Final score: You " + playerScore + " - Computer " + computerScore;
  restartBtn.style.display = "inline-block";
}

// Restart
restartBtn.onclick = function() {
  roundSetup.style.display = "block";
  gameArea.style.display = "none";
}

// Player buttons
optionBtns.forEach(function(btn) {
  btn.onclick = function() {
    playRound(btn.getAttribute("data-choice"));
  }
});
