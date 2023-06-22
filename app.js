const resetBoard = document.querySelector(".restart");
const cells = [...document.querySelectorAll(".cell")];
const winningText = document.querySelector(".winnerText");
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
	const resetBoard = () => {
		for (let cell of cells) {
			cell.textContent = "";
			winningText.textContent = "";
		}
		GameBoard.toggleClick();
		console.log("reset");
		currentPlayer = 1;
	};

	const isFull = () => {
		for (let cell of cells) {
			cell.textContent != "";
		}
	};

	const addPlayerSymbol = (symbol, cell) => {
		if (cell.textContent == "") {
			cell.textContent = symbol;
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
			if (GameBoard.checkForWinner() === true) {
				currentPlayer *= -1;
				let winner = currentPlayer == 1 ? playerX : playerO;
				winningText.textContent = `Player ${winner.getSymbol()} is the Winner!`;
				GameBoard.toggleClick();
				return;
			}
		});
	}
};

Gameplay();
