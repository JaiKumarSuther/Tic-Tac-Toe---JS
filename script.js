const boxes = document.querySelectorAll('.box');

const gameInfo = document.querySelector('.game-info');

const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

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


// let's create a function  to initialize the game

function initGame() {
    currentPlayer = 'X';
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    boxes.forEach((box, index) => {
        box.innerHTML = '';
        box.style.pointerEvents = 'all';
        // one more thing is missing? initialize initial css properties again
        box.classList = `box box${index+1}`;
    })

    newGameBtn.classList.remove('active');
    gameInfo.classList.remove('tied');
    gameInfo.classList.remove('winner');
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

initGame();

function swapTurn() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}


boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
        console.log('hi')
    });
});

let type = true;

function handleClick(index) {
    if (!boxes[index].innerText) {
        boxes[index].innerText= currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = 'none';
        // swap turn
        swapTurn();
        // check koi jheet to nahin gaya
        checkGameOver();

        console.log(gameGrid)


    }
}

function checkGameOver() {
    let answer = '';

    winningPositions.forEach((position) => {
        // all three boxes should be non-empty and exactly same in value
        if ((gameGrid[position[0]] !== '' || gameGrid[position[1]] !== '' || gameGrid[position[2]] !== '' )
        && (gameGrid[position[0]] == (gameGrid[position[1]])) &&  (gameGrid[position[1]] == (gameGrid[position[2]]))) {
            // check if winner is x
            if(gameGrid[position[0]] === 'X') {
                answer = 'X';
            } else {
                answer = 'O';
            }

            // disable pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = 'none';
            })

            // now we know the winner
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');


        }
    });
    // it means we have a winner
    if (answer !== '') {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add('active'); 
        gameInfo.classList.add('winner');
        return;
    }
    
    // when there is a tie
    if (!gameGrid.includes('')) {

        gameInfo.textContent = 'Game Tied !';
        gameInfo.classList.add('tied')
        newGameBtn.classList.add('active'); 
    }
}



newGameBtn.addEventListener('click', () => initGame());