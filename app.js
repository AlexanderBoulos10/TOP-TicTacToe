const resetBoard = document.querySelector(".restart");
const cells = [...document.querySelectorAll(".cell")];
const winningText = document.querySelector(".winnerText");
const mySound = new Audio("blockSound.mp3");
const victorySound = new Audio("victorySound.mp3");
let currentPlayer = 1;

const winningSequences = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const Player = (symbol) => {
	const getSymbol = () => {
		return symbol;
	};
	return { getSymbol };
};

const GameBoard = (() => {
	let isWinner = false;
	const resetBoard = () => {
		for (let cell of cells) {
			cell.textContent = "";
			cell.classList.remove("winningCombo");
			winningText.textContent = "";
		}
		if (isWinner) {
			console.log("toggle");
			isWinner = false;
			toggleClick();
		}
		console.log("reset");
		currentPlayer = 1;
	};

	const isFull = () => {
		let count = 0;
		for (let cell of cells) {
			if (cell.textContent !== "") {
				count++;
			} else {
				count = 0;
			}
		}
		if (count === 9) {
			return true;
		}
	};

	const addPlayerSymbol = (symbol, cell) => {
		if (cell.textContent == "") {
			cell.textContent = symbol;
			mySound.play();
		}
	};

	const checkForWinner = () => {
		console.log("here");
		for (let combo of winningSequences) {
			let [a, b, c] = combo;
			if (
				cells[a].textContent === cells[b].textContent &&
				cells[a].textContent === cells[c].textContent &&
				cells[a].textContent != ""
			) {
				cells[a].classList.add("winningCombo");
				cells[b].classList.add("winningCombo");
				cells[c].classList.add("winningCombo");
				isWinner = true;
				return true;
			}
		}
		return false;
	};

	const toggleClick = () => {
		for (let cell of cells) {
			cell.classList.toggle("toggleClick");
		}
	};

	return { resetBoard, addPlayerSymbol, isFull, checkForWinner, toggleClick };
})();

const Gameplay = () => {
	const resetBoard = document.querySelector(".restart");
	resetBoard.addEventListener("click", GameBoard.resetBoard);
	const playerX = Player("X");
	const playerO = Player("O");

	for (let cell of cells) {
		cell.addEventListener("click", () => {
			console.log(currentPlayer);
			if (currentPlayer === 1) {
				GameBoard.addPlayerSymbol(playerX.getSymbol(), cell);
				currentPlayer = currentPlayer * -1;
			} else if (currentPlayer === -1) {
				GameBoard.addPlayerSymbol(playerO.getSymbol(), cell);
				currentPlayer *= -1;
				console.log("O");
			}
			if (GameBoard.checkForWinner()) {
				currentPlayer *= -1;
				let winner = currentPlayer == 1 ? playerX : playerO;
				victorySound.play();
				winningText.textContent = `Player ${winner.getSymbol()} is the Winner!`;
				GameBoard.toggleClick();
				return;
			} else if (GameBoard.isFull()) {
				winningText.textContent = `It is a Draw!`;
			}
		});
	}
};

Gameplay();
