var playerScore = 0;
var computerScore = 0;

let setupComplete = false;

let rockButton = null;
let paperButton = null;
let scissorsButton = null;

let compRock = null;
let compPaper = null;
let compScissors = null;

let playAgainButton = null;

let hidingButtons = null;

let showingResults = false;

function setup() {
	// Sets up global variables and event listeners

	// Player buttons
	rockButton = document.getElementById("rock");
	paperButton = document.getElementById("paper");
	scissorsButton = document.getElementById("scissors");

	rockButton.addEventListener("click", () => { playGame("rock"); });
	paperButton.addEventListener("click", () => { playGame("paper"); });
	scissorsButton.addEventListener("click", () => { playGame("scissors"); });

	// Computer buttons
	compRock = document.getElementById("comp-result-rock");
	compPaper = document.getElementById("comp-result-paper");
	compScissors = document.getElementById("comp-result-scissors");

	playAgainButton = document.getElementById("play-again-button");
	playAgainButton.addEventListener("click", reset);

	hidingButtons = [rockButton, paperButton, scissorsButton, compRock, compPaper, compScissors];

	setupComplete = true;
}

function playGame(playerSelection) {
	if (showingResults) return;
	showingResults = true;
	if (!setupComplete) setup();
	let computerSelection = computerPlay();

	hideButton(playerSelection, true);
	hideButton(computerSelection, false);

	rockButton.classList.remove("clickable-button");
	paperButton.classList.remove("clickable-button");
	scissorsButton.classList.remove("clickable-button");

	document.getElementById("computer-result").style.visibility = "visible";
	document.getElementById("status-text").textContent = "vs";

	playAgainButton.style.visibility = "visible";

	// Determine winner
	let playerWins = doesPlayerWin(playerSelection, computerSelection);
	if (playerWins === null) return;

	if (playerWins) {
		playerScore++;
	} else {
		computerScore++;
	}
	renderScores(playerScore, computerScore);
}

function reset() {
	if (!setupComplete) setup();
	document.getElementById("computer-result").style.visibility = "hidden";
	document.getElementById("status-text").textContent = "Select one:";

	hidingButtons.forEach((b) => {
		b.style.visibility = "inherit";
	});

	rockButton.classList.add("clickable-button");
	paperButton.classList.add("clickable-button");
	scissorsButton.classList.add("clickable-button");

	playAgainButton.style.visibility = "hidden";
	showingResults = false;
}

function hideButton(buttonName="rock", playerButtons=true) {
	// Hides all buttons except for buttonName. playerButtons is a boolean describing whether to operate on the player or computer's buttons
	let rock;
	let paper;
	let scissors;

	if (playerButtons) {
		rock = rockButton;
		paper = paperButton;
		scissors = scissorsButton;
	} else {
		rock = compRock;
		paper = compPaper;
		scissors = compScissors;
	}

	switch (buttonName) {
		case "rock":
			paper.style.visibility = "hidden";
			scissors.style.visibility = "hidden";
			break;
		case "paper":
			rock.style.visibility = "hidden";
			scissors.style.visibility = "hidden";
			break;
		case "scissors":
			rock.style.visibility = "hidden";
			paper.style.visibility = "hidden";
			break;
		default:
			throw "Unknown buttonName passed to hideButton. Must be either 'rock', 'paper', or 'scissors'.";
	}
}

function renderScores(pScore, cScore) {
	document.getElementById("player-score").textContent = `Your Score: ${pScore}`;
	document.getElementById("comp-score").textContent = `Opponent Score: ${cScore}`;
}

function game() {
	// Plays a 5 round game of Rock, Paper, Scissors
	let playerScore = 0;
	let computerScore = 0;
	for (let i = 0; i < 5; i++) {
		let playerSelection = prompt("Rock, Paper, or Scissors?");
		let computerSelection = computerPlay();
		let result = doesPlayerWin(playerSelection, computerSelection);
		if (result) {
			console.log(`Computer played: ${computerSelection}. You win.`);
			playerScore++;
		} else if (result === null) {
			console.log(`Computer played: ${computerSelection}. No one wins.`);
		} else {
			console.log(`Computer played: ${computerSelection}. You lose.`);
			computerScore++;
		}
	}
	console.log(`You won ${playerScore} times.\nComputer won ${computerScore} times.`);
}

function doesPlayerWin(playerSelection, computerSelection) {
	// Returns a boolean based on if the player wins or not
	let pS = playerSelection.toLowerCase();
	let cS = computerSelection.toLowerCase();
	if (pS === "rock" && cS === "scissors") return true;
	if (pS === "paper" && cS === "rock") return true;
	if (pS === "scissors" && cS === "paper") return true;
	if (pS === cS) return null;
	return false;
}

function computerPlay() {
	switch (Math.floor(Math.random()*3)) {
		case 0:
			return "rock";
		case 1:
			return "paper";
		case 2:
			return "scissors";
		default:
			console.log("ComputerPlay invalid number");
	}
}
