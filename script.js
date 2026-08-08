const board = document.getElementById("board");

const rollButton = document.getElementById("rollButton");
const restartButton = document.getElementById("restartButton");

const diceText = document.getElementById("dice");
const turnText = document.getElementById("turn");
const messageText = document.getElementById("message");

const position1Text = document.getElementById("position1");
const position2Text = document.getElementById("position2");

let player1Position = 1;
let player2Position = 1;

let currentPlayer = 1;
let gameOver = false;

// Snakes
const snakes = {
98: 78,
95: 75,
92: 72,
88: 48,
64: 44,
62: 22,
49: 11,
47: 26,
25: 5
};

// Ladders
const ladders = {
2: 23,
7: 29,
8: 34,
15: 45,
21: 42,
28: 55,
36: 57,
51: 67,
71: 91,
80: 99
};

// Create board
function createBoard() {

```
board.innerHTML = "";

for (let row = 9; row >= 0; row--) {

    let start = row * 10 + 1;
    let numbers = [];

    for (let i = 0; i < 10; i++) {
        numbers.push(start + i);
    }

    // Alternate direction of rows
    if (row % 2 === 1) {
        numbers.reverse();
    }

    numbers.forEach(number => {

        const cell = document.createElement("div");

        cell.classList.add("cell");
        cell.id = "cell-" + number;

        cell.textContent = number;

        if (snakes[number]) {
            cell.classList.add("snake");
        }

        if (ladders[number]) {
            cell.classList.add("ladder");
        }

        board.appendChild(cell);
    });
}

updatePlayers();
```

}

// Update player positions
function updatePlayers() {

```
document.querySelectorAll(".player1, .player2").forEach(player => {
    player.remove();
});

const cell1 = document.getElementById("cell-" + player1Position);
const cell2 = document.getElementById("cell-" + player2Position);

const player1 = document.createElement("div");
player1.classList.add("player1");

const player2 = document.createElement("div");
player2.classList.add("player2");

cell1.appendChild(player1);
cell2.appendChild(player2);

position1Text.textContent = player1Position;
position2Text.textContent = player2Position;
```

}

// Roll dice
rollButton.addEventListener("click", function() {

```
if (gameOver) {
    return;
}

const dice = Math.floor(Math.random() * 6) + 1;

diceText.textContent = dice;

let currentPosition;

if (currentPlayer === 1) {
    currentPosition = player1Position;
} else {
    currentPosition = player2Position;
}

let newPosition = currentPosition + dice;

// Player cannot go beyond 100
if (newPosition > 100) {

    messageText.textContent =
        "You need the exact number to reach 100!";

} else {

    // Check ladder
    if (ladders[newPosition]) {

        newPosition = ladders[newPosition];

        messageText.textContent =
            "🪜 Ladder! You climbed to " + newPosition;

    }

    // Check snake
    else if (snakes[newPosition]) {

        newPosition = snakes[newPosition];

        messageText.textContent =
            "🐍 Snake! You went down to " + newPosition;

    }

    else {

        messageText.textContent =
            "Player " + currentPlayer +
            " moved to " + newPosition;
    }


    if (currentPlayer === 1) {
        player1Position = newPosition;
    } else {
        player2Position = newPosition;
    }

    updatePlayers();


    // Check winner
    if (newPosition === 100) {

        gameOver = true;

        messageText.textContent =
            "🏆 Player " + currentPlayer + " Wins!";

        turnText.textContent =
            "🎉 Game Over!";

        return;
    }
}


// Change player
if (currentPlayer === 1) {

    currentPlayer = 2;

} else {

    currentPlayer = 1;
}

turnText.textContent =
    "Player " + currentPlayer + "'s Turn";
```

});

// Restart game
restartButton.addEventListener("click", function() {

```
player1Position = 1;
player2Position = 1;

currentPlayer = 1;

gameOver = false;

diceText.textContent = "-";

turnText.textContent = "Player 1's Turn";

messageText.textContent =
    "Player 1, roll the dice!";

createBoard();
```

});

// Start
createBoard();
