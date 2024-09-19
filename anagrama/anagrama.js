const anagramas = [
    { word: 'XIAOMI', scrambled: 'IAOMXI' },
    { word: 'MANUTENCAO', scrambled: 'ATUNENOMAC' },
    { word: 'APPLE', scrambled: 'PAPLE' },
    { word: 'ATENDIMENTO', scrambled: 'EMTANDIOTNE' },
    { word: 'DINAMICA', scrambled: 'ANIDMACI' }
];

let currentAnagramIndex = 0;
let totalAnagrams = anagramas.length;

// Função para carregar o próximo anagrama
function loadAnagram() {
    const scrambledWordElement = document.getElementById('scrambled-word');
    
    if (currentAnagramIndex < totalAnagrams) {
        let currentAnagrama = anagramas[currentAnagramIndex];
        scrambledWordElement.textContent = currentAnagrama.scrambled;
    } else {
        // Se o usuário tiver completado todos os anagramas
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').textContent = 'Parabéns! Você acertou todos os anagramas!';
        
        // Mostra o código secreto
        document.getElementById('codigo-secreto').style.display = 'block';
        document.getElementById('codigo').textContent = 'CÓDIGO: VENCEDOR123'; // Coloque o código de premiação aqui
    }
}

function updateProgress() {
    const progressElement = document.getElementById('progress');
    progressElement.textContent = `Anagrama ${currentAnagramIndex + 1} de ${totalAnagrams}`;
}

// Chame a função `updateProgress` no início de `loadAnagram`
function loadAnagram() {
    const scrambledWordElement = document.getElementById('scrambled-word');
    
    if (currentAnagramIndex < totalAnagrams) {
        let currentAnagrama = anagramas[currentAnagramIndex];
        scrambledWordElement.textContent = currentAnagrama.scrambled;
        updateProgress(); // Atualiza o progresso
    } else {
        // Se o usuário tiver completado todos os anagramas
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').textContent = 'Parabéns! Você acertou todos os anagramas!';
        
        // Mostra o código secreto
        document.getElementById('codigo-secreto').style.display = 'block';
        document.getElementById('codigo').textContent = 'CÓDIGO: VENCEDOR123'; // Coloque o código de premiação aqui
    }
}


// Verifica se o DOM foi completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    loadAnagram(); // Carrega o primeiro anagrama
    
    document.getElementById('check-answer').addEventListener('click', function() {
        let answer = document.getElementById('answer-input').value.toUpperCase();
        let currentAnagrama = anagramas[currentAnagramIndex];
        let messageElement = document.getElementById('message');
        
        if (answer === currentAnagrama.word) {
            messageElement.style.color = 'green';
            messageElement.textContent = 'Correto!';
            currentAnagramIndex++; // Passa para o próximo anagrama

            // Limpa o campo de entrada e carrega o próximo anagrama
            document.getElementById('answer-input').value = '';
            setTimeout(function() {
                messageElement.textContent = ''; // Limpa a mensagem de sucesso após 1 segundo
                loadAnagram(); // Carrega o próximo anagrama
            }, 1000);

        } else {
            messageElement.style.color = 'red';
            messageElement.textContent = 'Tente novamente!';
        }
    });
});
