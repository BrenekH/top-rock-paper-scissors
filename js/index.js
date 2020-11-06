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
			console.log(`Computer played: ${computerSelection}. No one wins.`)
		} else {
			console.log(`Computer played: ${computerSelection}. You lose.`);
			computerScore++;
		}
	}
	console.log(`You won ${playerScore} times.\nComputer won ${computerScore} times.`)
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
