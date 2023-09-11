const board = document.getElementById('board');
const cells = [];
const status = document.getElementById('status');
const restartButton = document.getElementById('restart-button');
let currentPlayer = 'X';
let winner = null;

for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cells.push(cell);
    cell.addEventListener('click', () => handleCellClick(i));
    board.appendChild(cell);
}

function handleCellClick(index) {
    if (cells[index].innerHTML || winner) return; 
    cells[index].innerHTML = currentPlayer;
    cells[index].classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
        winner = currentPlayer;
        status.innerHTML = `Player ${winner} wins!`;
        status.style.color = winner === 'X' ? '#e74c3c' : '#3498db';
        restartButton.style.display = 'block'; 
    } else if (cells.every(cell => cell.innerHTML)) {
        status.innerHTML = 'It\'s a draw!';
        restartButton.style.display = 'block';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.innerHTML = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (cells[a].innerHTML && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {
            cells[a].style.backgroundColor = '#2ecc71';
            cells[b].style.backgroundColor = '#2ecc71';
            cells[c].style.backgroundColor = '#2ecc71';
            return true;
        }
    }       
    return false;
}

function restartGame() {
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('x', 'o');
        cell.style.backgroundColor = '#fff';
    });
    status.innerHTML = 'Player X\'s turn';
    winner = null;
    currentPlayer = 'X';
    restartButton.style.display = 'none'; 
}
