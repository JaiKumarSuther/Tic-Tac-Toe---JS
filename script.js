// Select all elements with the class 'box' and assign them to the variable 'boxes'
const boxes = document.querySelectorAll('.box');

// Select the element with the class 'game-info' and assign it to the variable 'gameInfo'
const gameInfo = document.querySelector('.game-info');

// Select the element with the class 'btn' and assign it to the variable 'newGameBtn'
const newGameBtn = document.querySelector('.btn');

let currentPlayer;  // Variable to keep track of the current player
let gameGrid;       // Variable to keep track of the game grid

// Array of winning positions on the tic-tac-toe grid
const winningPositions = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
];

// Function to initialize the game
function initGame() {
    currentPlayer = 'X';  // Set the current player to 'X'
    gameGrid = ["", "", "", "", "", "", "", "", ""];  // Initialize the game grid with empty strings

    // Set up each box for a new game
    boxes.forEach((box, index) => {
        box.innerHTML = '';  // Clear the box content
        box.style.pointerEvents = 'all';  // Enable pointer events
        box.classList = `box box${index + 1}`;  // Reset the box class
    });

    newGameBtn.classList.remove('active');  // Deactivate the new game button
    gameInfo.classList.remove('tied');  // Remove the 'tied' class from game info
    gameInfo.classList.remove('winner');  // Remove the 'winner' class from game info
    gameInfo.innerText = `Current Player - ${currentPlayer}`;  // Display the current player
}

// Call the initGame function to start the game
initGame();

// Function to swap the turn between players
function swapTurn() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';  // Swap the current player
    gameInfo.innerText = `Current Player - ${currentPlayer}`;  // Update the game info
}

// Add event listeners to each box for handling clicks
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);  // Call handleClick function when a box is clicked
    });
});

// Function to handle a box click
function handleClick(index) {
    if (!boxes[index].innerText) {  // Check if the box is empty
        boxes[index].innerText = currentPlayer;  // Set the box content to the current player
        gameGrid[index] = currentPlayer;  // Update the game grid
        boxes[index].style.pointerEvents = 'none';  // Disable pointer events for the clicked box
        swapTurn();  // Swap the turn
        checkGameOver();  // Check if the game is over
    }
}

// Function to check if the game is over
function checkGameOver() {
    let answer = '';  // Variable to store the winner

    // Check each winning position
    winningPositions.forEach((position) => {
        // Check if all three boxes in the position are non-empty and have the same value
        if ((gameGrid[position[0]] !== '' || gameGrid[position[1]] !== '' || gameGrid[position[2]] !== '') &&
            (gameGrid[position[0]] == gameGrid[position[1]]) && (gameGrid[position[1]] == gameGrid[position[2]])) {
            // Determine the winner
            if (gameGrid[position[0]] === 'X') {
                answer = 'X';
            } else {
                answer = 'O';
            }

            // Disable pointer events for all boxes
            boxes.forEach((box) => {
                box.style.pointerEvents = 'none';
            });

            // Highlight the winning boxes
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
        }
    });

    // If there is a winner
    if (answer !== '') {
        gameInfo.innerText = `Winner Player - ${answer}`;  // Display the winner
        newGameBtn.classList.add('active');  // Activate the new game button
        gameInfo.classList.add('winner');  // Add the 'winner' class to game info
        return;
    }

    // If the game is tied
    if (!gameGrid.includes('')) {
        gameInfo.textContent = 'Game Tied!';  // Display the tie message
        gameInfo.classList.add('tied');  // Add the 'tied' class to game info
        newGameBtn.classList.add('active');  // Activate the new game button
    }
}

// Add event listener to the new game button to initialize the game
newGameBtn.addEventListener('click', () => initGame());