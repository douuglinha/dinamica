// Lista de palavras a serem encontradas
const words = ['XIAOMI', 'MANUTENCAO', 'APPLE', 'ATENDIMENTO', 'DINAMICA'];

// Criação de uma grade vazia
let wordSearchGrid = Array(12).fill().map(() => Array(12).fill(''));

// Armazenar as posições das palavras
let wordPositions = {};

// Células selecionadas pelo usuário
let selectedCells = [];

// Função para colocar palavras na grade
function placeWordsInGrid() {
    words.forEach(word => {
        let placed = false;

        while (!placed) {
            const row = Math.floor(Math.random() * wordSearchGrid.length);
            const col = Math.floor(Math.random() * wordSearchGrid[0].length);
            const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
            let canPlace = true;
            let positions = [];

            if (direction === 'horizontal' && col + word.length <= wordSearchGrid[0].length) {
                for (let i = 0; i < word.length; i++) {
                    let currentLetter = wordSearchGrid[row][col + i];
                    if (currentLetter !== '' && currentLetter !== word[i]) {
                        canPlace = false;
                        break;
                    }
                    positions.push({ row: row, col: col + i });
                }
            } else if (direction === 'vertical' && row + word.length <= wordSearchGrid.length) {
                for (let i = 0; i < word.length; i++) {
                    let currentLetter = wordSearchGrid[row + i][col];
                    if (currentLetter !== '' && currentLetter !== word[i]) {
                        canPlace = false;
                        break;
                    }
                    positions.push({ row: row + i, col: col });
                }
            } else {
                canPlace = false;
            }

            if (canPlace) {
                // Coloca a palavra na grade
                for (let i = 0; i < word.length; i++) {
                    if (direction === 'horizontal') {
                        wordSearchGrid[row][col + i] = word[i];
                    } else {
                        wordSearchGrid[row + i][col] = word[i];
                    }
                }
                wordPositions[word] = positions;
                placed = true;
            }
        }
    });
}

// Preencher espaços vazios com letras aleatórias
function fillEmptySpaces() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < wordSearchGrid.length; i++) {
        for (let j = 0; j < wordSearchGrid[i].length; j++) {
            if (!wordSearchGrid[i][j]) {
                wordSearchGrid[i][j] = alphabet[Math.floor(Math.random() * alphabet.length)];
            }
        }
    }
}

// Renderizar a grade na página e adicionar eventos de clique
function renderWordSearch() {
    const table = document.getElementById('word-search');
    table.innerHTML = ''; // Limpa o conteúdo anterior

    wordSearchGrid.forEach((row, rowIndex) => {
        const tableRow = document.createElement('tr');
        row.forEach((letter, colIndex) => {
            const tableCell = document.createElement('td');
            tableCell.textContent = letter;
            tableCell.dataset.row = rowIndex;
            tableCell.dataset.col = colIndex;

            // Adicionar evento de clique para alternar a classe "selected"
            tableCell.addEventListener('click', function () {
                tableCell.classList.toggle('selected'); // Alterna a cor verde da célula clicada
                toggleSelectedCell(rowIndex, colIndex);
            });

            tableRow.appendChild(tableCell);
        });
        table.appendChild(tableRow);
    });
}

// Alternar célula selecionada
function toggleSelectedCell(row, col) {
    const cellPosition = `${row}-${col}`;
    const index = selectedCells.indexOf(cellPosition);
    if (index === -1) {
        selectedCells.push(cellPosition);
    } else {
        selectedCells.splice(index, 1); // Remove a célula selecionada se clicada novamente
    }
}

// Função para verificar se as palavras foram encontradas
function checkWordsFound() {
    let foundWords = [];

    for (let word in wordPositions) {
        let positions = wordPositions[word].map(pos => `${pos.row}-${pos.col}`);
        let allSelected = positions.every(pos => selectedCells.includes(pos));

        if (allSelected) {
            foundWords.push(word);
            // Destacar a palavra encontrada
            positions.forEach(pos => {
                let [row, col] = pos.split('-');
                let cell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
                if (cell) {
                    cell.classList.add('found'); // Mantém as letras verdes permanentemente
                }
            });
        }
    }

    if (foundWords.length === words.length) {
        document.getElementById('codigo-secreto').style.display = 'block';
        document.getElementById('codigo').textContent = 'VOCE GANHOU UM PIRU';
        document.getElementById('message').style.display = 'none';
    } else {
        document.getElementById('message').style.display = 'block';
        document.getElementById('message').textContent = 'Você ainda não encontrou todas as palavras!';
    }
}

// Adicionar evento ao botão "Verificar"
document.getElementById('verify-btn').addEventListener('click', checkWordsFound);

// Inicializar o jogo
placeWordsInGrid();
fillEmptySpaces();
renderWordSearch();
