let player1 = prompt("Enter player 1 Name")
while (player1 == "" || player1 == null) {
    player1 = prompt("Enter a valid name for player 1")
}

let player2 = prompt("Enter player 2 Name");
while (player2 == "" || player2 == null) {
    player2 = prompt("Enter a valid name for player 2")
}

let maxRounds = prompt("Enter total round required to win(only integer numbers allowed) ");
while (isNaN(maxRounds) || maxRounds == 0) {
    maxRounds = prompt("invalid input!! Enter total round in integer numbers only");
}

const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const scoreText = document.querySelector('#scoreText');
const roundStatus = document.querySelector('#roundStatus');
const totalRoundStatus = document.querySelector('#totalRoundStatus');

const restartBtn = document.querySelector('#restartBtn');
const nextRoundBtn = document.querySelector('#nextRoundBtn');
const restartFullBtn = document.querySelector('#restartFullBtn')
const restartWithChangingRounds = document.querySelector('#restartWithChangingRounds')

totalRoundStatus.textContent = maxRounds == 1 ? `${maxRounds} round required to win` : `${maxRounds} rounds required to win`;
let p1score = 0;
let p2score = 0;
let roundNo = 1;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = player1;
let currentPlayerSign = 'X';
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked))
    restartBtn.addEventListener('click', restartGame);
    restartFullBtn.addEventListener('click', restartFullMatch)
    restartWithChangingRounds.addEventListener('click', restartMatchChangeRound)
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] != "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
    if (running) changePlayer();
}

function updateCell(cell, index) {
    options[index] = currentPlayerSign;
    cell.textContent = currentPlayerSign;
}

function changePlayer() {
    currentPlayer = (currentPlayer == player1) ? player2 : player1;
    currentPlayerSign = (currentPlayerSign == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]
        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        ++roundNo;
        running = false;
        statusText.textContent = `${currentPlayer} won this round`
        if (currentPlayer == player1) {
            p1score = p1score + 1;
            scoreText.textContent = `${p1score}-${p2score}`
        }

        else if (currentPlayer == player2) {
            p2score = p2score + 1;
            scoreText.textContent = `${p1score}-${p2score}`
        }

        nextRoundBtn.disabled = false;
        nextRoundBtn.classList.add('enabledButton')
        nextRoundBtn.addEventListener('click', () => {
            options = ["", "", "", "", "", "", "", "", ""];
            statusText.textContent = `${currentPlayer}'s turn`;
            cells.forEach(cell => cell.textContent = "");
            running = true;
            nextRoundBtn.disabled = true;
            nextRoundBtn.classList.remove('enabledButton')
            roundStatus.textContent = `Round ${roundNo}`
        })
    }

    else if (!options.includes("")) {
        running = false;
        ++roundNo;
        statusText.textContent = `Draw!`
        nextRoundBtn.disabled = false;
        nextRoundBtn.classList.add('enabledButton')
        nextRoundBtn.addEventListener('click', () => {
            options = ["", "", "", "", "", "", "", "", ""];
            statusText.textContent = `${currentPlayer}'s turn`;
            cells.forEach(cell => cell.textContent = "");
            running = true;
            nextRoundBtn.disabled = true;
            nextRoundBtn.classList.remove('enabledButton')
            roundStatus.textContent = `Round ${roundNo}`
        })
    }

    if (p1score == maxRounds || p2score == maxRounds) {
        running = false;
        nextRoundBtn.disabled = true;
        nextRoundBtn.classList.remove('enabledButton')
        if (p1score == maxRounds) {
            statusText.textContent = `${player1} won the match`
        }
        else if (p2score == maxRounds) {
            statusText.textContent = `${player2} won the match`
        }
    }
}

function restartGame() {
    restartData();
}

function restartFullMatch() {
    player1 = prompt("Enter player 1 Name")
    while (player1 == "" || player1 == null) {
        player1 = prompt("Enter a valid name for player 1")
    }

    player2 = prompt("Enter player 2 Name");
    while (player2 == "" || player2 == null) {
        player2 = prompt("Enter a valid name for player 2")
    }

    maxRounds = prompt("Enter total round required to win(only integer numbers allowed) ");
    while (isNaN(maxRounds) || maxRounds == 0) {
        maxRounds = prompt("invalid input!! Enter total round in integer numbers only");
    }
    restartData();
}

function restartMatchChangeRound() {
    maxRounds = prompt("Enter total round numbers required to win ");
    while (isNaN(maxRounds)) {
        maxRounds = prompt("Enter a valid number");
    }

    restartData()

}

function restartData() {
    currentPlayer = player1;
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
    p1score = 0;
    p2score = 0;
    scoreText.textContent = '0-0'

    roundStatus.textContent = `Round 1`;
    roundNo = 1;

    if (maxRounds == 1) {
        totalRoundStatus.textContent = `${maxRounds} round required to win`
    }

    else {
        totalRoundStatus.textContent = `${maxRounds} rounds required to win`
    }
}