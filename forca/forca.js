// Lista de palavras e suas dicas correspondentes sobre as principais comemorações do ano
const wordsForForca = [
    { word: 'NATAL', dica: 'Comemoração cristã celebrada em 25 de dezembro.' },
    { word: 'CARNAVAL', dica: 'Festa popular com desfiles e fantasias, celebrada em fevereiro ou março.' },
    { word: 'PASCOA', dica: 'Comemoração cristã que celebra a ressurreição de Jesus Cristo.' },
    { word: 'DIADASMAES', dica: 'Celebrado no segundo domingo de maio, em homenagem às mães.' },
    { word: 'REVEILLON', dica: 'Comemoração da passagem de ano, em 31 de dezembro.' }
];

// Seleciona uma palavra aleatória e sua dica
let selectedEntry = wordsForForca[Math.floor(Math.random() * wordsForForca.length)];
let selectedWord = selectedEntry.word;
let remainingAttempts = 6;
let guessedLetters = [];
let wordDisplay = Array(selectedWord.length).fill('_');

// Exibe a dica e a palavra inicial
document.getElementById('dica').textContent = `Dica: ${selectedEntry.dica}`;
document.getElementById('word-display').textContent = wordDisplay.join(' ');

// Evento ao clicar no botão de adivinhar
document.getElementById('submit-guess').addEventListener('click', function() {
    let guess = document.getElementById('guess-input').value.toUpperCase();
    document.getElementById('guess-input').value = ''; // Limpa o campo de entrada

    // Verifica se a letra já foi adivinhada ou se é inválida
    if (guess && !guessedLetters.includes(guess)) {
        guessedLetters.push(guess);

        if (selectedWord.includes(guess)) {
            // Atualiza a exibição da palavra
            for (let i = 0; i < selectedWord.length; i++) {
                if (selectedWord[i] === guess) {
                    wordDisplay[i] = guess;
                }
            }
            document.getElementById('word-display').textContent = wordDisplay.join(' ');
        } else {
            remainingAttempts--;
            document.getElementById('remaining-attempts').textContent = remainingAttempts;
        }

        // Verifica se o jogador ganhou ou perdeu
        if (wordDisplay.join('') === selectedWord) {
            document.getElementById('message-forca').textContent = 'Você ganhou!';
        } else if (remainingAttempts === 0) {
            document.getElementById('message-forca').textContent = 'Você perdeu! A palavra era: ' + selectedWord;
        }
    } else {
        document.getElementById('message-forca').textContent = 'Letra já usada ou inválida!';
    }
});
