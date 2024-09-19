const crosswordGrid = [
    ['', '', '', '', '', '', '', '', 'P', '', '', ''],
    ['', '', '', 'I', 'P', 'H', 'O', 'N', 'E', '', '', ''], 
    ['', '', '', '', '', '', '', '', 'L', '', '', ''],
    ['', '', '', '', '', '', '', '', 'I', '', '', ''],
    ['', '', '', '', '', '', '', '', 'C', '', '', ''],
    ['', '', '', '', '', '', '', '', 'U', '', '', ''],
    ['', '', '', '', '', '', '', '', 'L', '', '', 'C'], 
    ['', '', '', '', '', '', '', '', 'A', 'L', 'F', 'A'],
    ['', '', '', '', '', '', '', '', '', '', '', 'R'], 
    ['', '', '', '', '', '', '', '', '', '', '', 'R'],
    ['', '', '', '', '', '', '', '', '', '', '', 'E'],
    ['', '', '', '', '', 'S', 'A', 'M', 'S', 'U', 'N', 'G'],
    ['', '', '', '', '', '', '', '', '', '', '', 'A'],
    ['', '', '', '', '', '', '', '', '', '', '', 'D'],
    ['', '', '', '', '', '', '', '', '', '', '', 'O'],
    ['', '', '', '', '', '', '', '', '', '', '', 'R'], 
];

const crosswordWords = {
    across: {
        1: { word: 'IPHONE', row: 1, col: 3 },
        2: { word: 'ALFA', row: 7, col: 8 },
        3: { word: 'SAMSUNG', row: 11, col: 5 },
    },
    down: {
        1: { word: 'PELICULA', row: 0, col: 8 },
        2: { word: 'CARREGADOR', row: 6, col: 11 },
    },
};

let foundWords = [];
const totalWords = Object.keys(crosswordWords.across).length + Object.keys(crosswordWords.down).length;

function generateCrossword() {
    const table = document.getElementById('crossword');
    table.innerHTML = '';

    for (let i = 0; i < crosswordGrid.length; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < crosswordGrid[i].length; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');

            if (crosswordGrid[i][j] === '') {
                input.disabled = true;
                input.style.backgroundColor = '#ddd'; // Disabled cells
            } else {
                input.maxLength = 1;
            }

            cell.appendChild(input);
            row.appendChild(cell);
        }

        table.appendChild(row);
    }
}

// Função para verificar se o jogo está completo e correto
function verifyGame() {
    foundWords = []; // Limpar as palavras encontradas
    let allCorrect = true;

    // Verifica palavras horizontais
    for (let key in crosswordWords.across) {
        let wordObj = crosswordWords.across[key];
        const userWord = getWordFromInput(wordObj.row, wordObj.col, 'across', wordObj.word.length);
        
        console.log(`Palavra Horizontal Esperada: ${wordObj.word}, Digitada: ${userWord}`); // Log para debug

        if (userWord !== wordObj.word.toUpperCase()) {
            allCorrect = false;
        } else {
            foundWords.push(userWord);
        }
    }

    // Verifica palavras verticais
    for (let key in crosswordWords.down) {
        let wordObj = crosswordWords.down[key];
        const userWord = getWordFromInput(wordObj.row, wordObj.col, 'down', wordObj.word.length);
        
        console.log(`Palavra Vertical Esperada: ${wordObj.word}, Digitada: ${userWord}`); // Log para debug

        if (userWord !== wordObj.word.toUpperCase()) {
            allCorrect = false;
        } else {
            foundWords.push(userWord);
        }
    }

    if (allCorrect) {
        console.log("Todas as palavras estão corretas! Gerando código..."); // Log para debug
        showSecretCode();
    } else {
        console.log("Nem todas as palavras estão corretas."); // Log para debug
        displayMessage("Está quase lá, mas não está correto.");
    }
}

// Função para capturar as palavras digitadas (horizontal e vertical)
function getWordFromInput(startRow, startCol, direction, length) {
    let word = '';
    for (let i = 0; i < length; i++) {
        let input;
        if (direction === 'across') {
            input = document.querySelector(`#crossword tr:nth-child(${startRow + 1}) td:nth-child(${startCol + 1 + i}) input`);
        } else if (direction === 'down') {
            input = document.querySelector(`#crossword tr:nth-child(${startRow + 1 + i}) td:nth-child(${startCol + 1}) input`);
        }
        if (input && input.value) {
            word += input.value.toUpperCase(); // Garante que seja comparado em maiúsculas
        } else {
            word += '_'; // Para palavras não preenchidas, colocamos um marcador
        }
    }
    return word;
}





function isWordComplete(word, row, col, direction) {
    for (let i = 0; i < word.length; i++) {
        const input = document.querySelector(`#crossword tr:nth-child(${row + 1 + (direction === 'down' ? i : 0)}) td:nth-child(${col + 1 + (direction === 'across' ? i : 0)}) input`);
        if (!input || input.value.toUpperCase() !== word[i]) {
            return false;
        }
    }
    return true;
}

function showSecretCode() {
    const codigoSecreto = generateSecretCode();
    document.getElementById('codigo').innerText = codigoSecreto;
    document.getElementById('codigo-secreto').style.display = 'block'; // Exibe o código secreto
    document.getElementById('message').style.display = 'none'; // Esconde a mensagem de erro, se houver
}

function generateSecretCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

function displayMessage(msg) {
    const messageElement = document.getElementById('message');
    messageElement.innerText = msg;
    messageElement.style.display = 'block';
}

// Associa a função ao botão de verificar
document.getElementById('verify-btn').addEventListener('click', verifyGame);

window.onload = generateCrossword;
