let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let isAI = false;

function startGame(mode) {
    resetGame();
    isAI = mode === "ai";
    document.getElementById("status").innerText = `Player X's turn`;
}

function handleClick(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        updateBoard();

        if (checkWinner()) {
            displayResult(currentPlayer === "X" ? "win" : "lose");
            return;
        }

        if (!board.includes("")) {
            document.getElementById("status").innerText = "It's a tie!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        document.getElementById("status").innerText = `Player ${currentPlayer}'s turn`;

        if (isAI && currentPlayer === "O") {
            setTimeout(aiMove, 500);
        }
    }
}

function aiMove() {
    if (!gameActive) return;
    
    let emptyCells = board.map((val, idx) => (val === "" ? idx : null)).filter(v => v !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    if (randomIndex !== undefined) {
        board[randomIndex] = "O";
        updateBoard();

        if (checkWinner()) {
            displayResult("lose");
            return;
        }

        if (!board.includes("")) {
            document.getElementById("status").innerText = "It's a tie!";
            gameActive = false;
            return;
        }

        currentPlayer = "X";
        document.getElementById("status").innerText = `Player X's turn`;
    }
}

function updateBoard() {
    document.querySelectorAll(".cell").forEach((cell, index) => {
        cell.innerText = board[index];
        cell.classList.remove("x", "o");

        if (board[index] === "X") {
            cell.classList.add("x");
        } else if (board[index] === "O") {
            cell.classList.add("o");
        }
    });
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => 
        board[pattern[0]] !== "" && 
        board[pattern[0]] === board[pattern[1]] && 
        board[pattern[1]] === board[pattern[2]]
    );
}

function displayResult(result) {
    gameActive = false;
    const overlay = document.createElement("div");
    overlay.classList.add(result === "win" ? "win-overlay" : "lose-overlay");
    overlay.innerText = result === "win" ? "You Won!" : "You Lost!";
    document.body.appendChild(overlay);
    setTimeout(() => {
        overlay.remove();
        resetGame();
    }, 3000);
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("x", "o");
    });
    document.getElementById("status").innerText = "Player X's turn";
}
