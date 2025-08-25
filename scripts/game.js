// DOM elements
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

// 🎯 Start Game
startBtn.addEventListener("click", () => {
  const selectedRounds = roundForm.querySelector("input[name='rounds']:checked");

  if (!selectedRounds) {
    alert("Please select the number of rounds to play!");
    return;
  }

  totalRounds = parseInt(selectedRounds.value);
  playerScore = 0;
  computerScore = 0;
  roundsPlayed = 0;

  // Reset UI
  playerScoreEl.textContent = "0";
  computerScoreEl.textContent = "0";
  resultEl.textContent = "Game started! Choose Rock, Paper, or Scissors.";
  restartBtn.classList.add("hidden");

  // Show game, hide setup
  roundSetup.classList.add("hidden");
  gameArea.classList.remove("hidden");
});

// 🎲 Computer random choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

// 🏆 Play one round
function playRound(playerChoice) {
  if (roundsPlayed >= totalRounds) return; // stop if game is over

  const computerChoice = getComputerChoice();
  let roundResult = "";

  if (playerChoice === computerChoice) {
    roundResult = `It's a tie! You both chose ${playerChoice}.`;
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    playerScore++;
    roundResult = `You win! ${playerChoice} beats ${computerChoice}.`;
  } else {
    computerScore++;
    roundResult = `Computer wins! ${computerChoice} beats ${playerChoice}.`;
  }

  roundsPlayed++;

  // Update scores
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;

  // Show result
  resultEl.textContent = `${roundResult} (Round ${roundsPlayed}/${totalRounds})`;

  // End game if finished
  if (roundsPlayed === totalRounds) {
    endGame();
  }
}

// 🎮 End Game
function endGame() {
  let finalMessage = "";

  if (playerScore > computerScore) {
    finalMessage = `🎉 You won the game! Final Score: ${playerScore} - ${computerScore}`;
  } else if (playerScore < computerScore) {
    finalMessage = `💻 Computer won the game! Final Score: ${computerScore} - ${playerScore}`;
  } else {
    finalMessage = `🤝 It's a draw! Final Score: ${playerScore} - ${computerScore}`;
  }

  resultEl.textContent = finalMessage;
  restartBtn.classList.remove("hidden");
}

// 🔁 Restart Game
restartBtn.addEventListener("click", () => {
  roundSetup.classList.remove("hidden");
  gameArea.classList.add("hidden");
});

// 🎯 Player clicks Rock / Paper / Scissors
optionBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const playerChoice = btn.getAttribute("data-choice");
    playRound(playerChoice);
  });
});
