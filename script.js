const board = new Array(9).fill(null);
let playerOneName;
let playerTwoName;
let currentPlayer;
let gameOver = false;

const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

document.getElementById('game-start').addEventListener('click', startGame)
document.getElementById('restart-btn').addEventListener('click', restartGame);

function startGame() {
    playerOneName = document.getElementById('player1').value;

    playerTwoName = document.getElementById('player2').value;

    currentPlayer = playerOneName;

    // Coloca na tela qual é o jogador da vez
    document.getElementById('current-player').innerText = currentPlayer;

    // Adiciona o evento de clique em todas as células
    document.querySelectorAll('.cell').forEach(function(cell) {
    cell.addEventListener('click', handleClick);
    });
}

function handleClick(ev) {
    if (gameOver) return;
    const cell = ev.currentTarget;
    const index = cell.dataset.index;

    // Se a célula já estiver ocupada, não faz nada
    if (board[index] !== null) {
        return;
    }

    // Marca a célula no array e na tela
    if (currentPlayer === playerOneName) {
        board[index] = currentPlayer;
        cell.innerText = 'X';
    } else {
        board[index] = currentPlayer;
        cell.innerText = 'O';
    }
    // Checar se há vencedor:
    checkWinner();
    checkDraw();
    
    // Trocar o turno após a jogada
    if (currentPlayer === playerOneName) {
    currentPlayer = playerTwoName;
    } else {
     currentPlayer = playerOneName;
    }

    document.getElementById('current-player').innerText = currentPlayer;


}

function checkWinner() {
    winningCombinations.forEach(function(combination) {
        const a = combination[0];
        const b = combination[1];
        const c = combination[2];

        if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
            // Colocando o nome do vencedor:
            document.getElementById('result-text').innerText = `O vencedor foi ${currentPlayer}`;
            gameOver = true;

            document.querySelector(`[data-index="${a}"]`).classList.add('winner-cell');
            document.querySelector(`[data-index="${b}"]`).classList.add('winner-cell');
            document.querySelector(`[data-index="${c}"]`).classList.add('winner-cell');
        }
    });
}

function checkDraw() {
    // O .every() percorre todos os itens do array e verifica se TODOS satisfazem a condição

    // Se todas as células forem diferentes de null, significa que o tabuleiro está cheio
    if (board.every(function(cell) { return cell !== null }) && !gameOver) {
        
        // Se o tabuleiro estiver cheio e ninguém ganhou, é empate
        document.getElementById('result-text').innerText = 'Empatou!';
        
        // Encerra o jogo
        gameOver = true;
    }
}

function restartGame() {
    // Resetando todas as informações do jogo:

    // Tirando as escritas
    board.fill(null);
    gameOver = false;

    // Retirando o texto
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
    document.getElementById('result-text').innerText = '';
    document.getElementById('current-player').innerText = '';
    document.querySelectorAll('.cell').forEach(function(cell) {
         cell.innerText = ''
     })

    // Tirando as cores vencedoras
    document.querySelectorAll('.cell').forEach(function(cell) {
        cell.innerText = '';
        cell.classList.remove('winner-cell');
    })
}