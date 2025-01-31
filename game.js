class RingGame {
    constructor() {
        this.questions = [
            // Cultura Chinesa
            { culture: 'Chinês', symbol: '道', finger: 'thumb', meaning: 'Tao - Caminho Espiritual' },
            { culture: 'Chinês', symbol: '陰陽', finger: 'index', meaning: 'Equilíbrio e Dualidade' },
            { culture: 'Chinês', symbol: '龍', finger: 'middle', meaning: 'Dragão - Poder e Sabedoria' },
            { culture: 'Chinês', symbol: '福', finger: 'ring', meaning: 'Felicidade e Sorte' },
            { culture: 'Chinês', symbol: '壽', finger: 'pinky', meaning: 'Longevidade e Saúde' },
            
            // Cultura Nórdica
            { culture: 'Nórdico', symbol: 'ᚦ', finger: 'thumb', meaning: 'Thurisaz - Proteção Divina' },
            { culture: 'Nórdico', symbol: 'ᚠ', finger: 'index', meaning: 'Fehu - Riqueza e Prosperidade' },
            { culture: 'Nórdico', symbol: 'ᛟ', finger: 'middle', meaning: 'Othala - Herança e Família' },
            { culture: 'Nórdico', symbol: 'ᛏ', finger: 'ring', meaning: 'Tiwaz - Justiça e Coragem' },
            { culture: 'Nórdico', symbol: 'ᚨ', finger: 'pinky', meaning: 'Ansuz - Comunicação e Sabedoria' },
            
            // Cultura Cigana
            { culture: 'Cigano', symbol: '☾', finger: 'thumb', meaning: 'Lua - Intuição e Mistério' },
            { culture: 'Cigano', symbol: '🔥', finger: 'index', meaning: 'Fogo - Paixão e Transformação' },
            { culture: 'Cigano', symbol: '🔮', finger: 'middle', meaning: 'Cristal - Profecia e Destino' },
            { culture: 'Cigano', symbol: '🧿', finger: 'ring', meaning: 'Olho Místico - Proteção contra o mal' },
            { culture: 'Cigano', symbol: '🎵', finger: 'pinky', meaning: 'Música - Liberdade e Expressão' },
            
            // Cultura Tibetana
            { culture: 'Tibetano', symbol: '卍', finger: 'thumb', meaning: 'Eternidade e Harmonia' },
            { culture: 'Tibetano', symbol: 'ॐ', finger: 'index', meaning: 'Om - Consciência Cósmica' },
            { culture: 'Tibetano', symbol: 'ཨ', finger: 'middle', meaning: 'Sagrado A - Energia Criativa' },
            { culture: 'Tibetano', symbol: 'ཀི', finger: 'ring', meaning: 'Kī - Poder Espiritual' },
            { culture: 'Tibetano', symbol: 'དངོས', finger: 'pinky', meaning: 'Realidade Suprema' },
            
            // Cultura Havaiana
            { culture: 'Havaiano', symbol: '🌋', finger: 'thumb', meaning: 'Pele - Energia Vulcânica' },
            { culture: 'Havaiano', symbol: '🌊', finger: 'index', meaning: 'Kanaloa - Fluxo e Sabedoria' },
            { culture: 'Havaiano', symbol: '🌿', finger: 'middle', meaning: 'Lono - Paz e Fertilidade' },
            { culture: 'Havaiano', symbol: '🔥', finger: 'ring', meaning: 'Kāne - Força Criativa' },
            { culture: 'Havaiano', symbol: '🌺', finger: 'pinky', meaning: 'Aloha - Amor e União' },
            
            // Cultura Celta
            { culture: 'Celta', symbol: '☘', finger: 'thumb', meaning: 'Triskelion - Movimento e Crescimento' },
            { culture: 'Celta', symbol: '🌳', finger: 'index', meaning: 'Árvore Sagrada - Conexão com a Natureza' },
            { culture: 'Celta', symbol: '🌀', finger: 'middle', meaning: 'Espiral - Evolução e Transformação' },
            { culture: 'Celta', symbol: '⚔', finger: 'ring', meaning: 'Espada - Coragem e Proteção' },
            { culture: 'Celta', symbol: '🔗', finger: 'pinky', meaning: 'Nós Celtas - Laços e Destino' },
            
            // Cultura Egípcia
            { culture: 'Egípcio', symbol: '𓂀', finger: 'thumb', meaning: 'Olho de Hórus - Proteção e Visão' },
            { culture: 'Egípcio', symbol: '𓆣', finger: 'index', meaning: 'Ankh - Vida e Imortalidade' },
            { culture: 'Egípcio', symbol: '𓏏', finger: 'middle', meaning: 'Djed - Estabilidade e Força' },
            { culture: 'Egípcio', symbol: '𓂻', finger: 'ring', meaning: 'Escaravelho - Renascimento e Transformação' },
            { culture: 'Egípcio', symbol: '𓃭', finger: 'pinky', meaning: 'Leão - Poder e Liderança' },
            
            // Cultura Grega
            { culture: 'Grego', symbol: 'Δ', finger: 'thumb', meaning: 'Delta - Mudança e Evolução' },
            { culture: 'Grego', symbol: 'Ω', finger: 'index', meaning: 'Ômega - Plenitude e Fim' },
            { culture: 'Grego', symbol: '🏛', finger: 'middle', meaning: 'Coluna - Estrutura e Conhecimento' },
            { culture: 'Grego', symbol: '⚖', finger: 'ring', meaning: 'Balança - Justiça e Equilíbrio' },
            { culture: 'Grego', symbol: '🔥', finger: 'pinky', meaning: 'Fogo Olímpico - Espírito e Determinação' }
        ];

        this.currentQuestion = 0;
        this.score = 0;
        this.activeStone = null;
        this.init();
    }

    init() {
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        
        // Configurar slots
        document.querySelectorAll('.ring-slot').forEach(slot => {
            // Eventos mouse
            slot.addEventListener('dragover', e => e.preventDefault());
            slot.addEventListener('drop', e => this.handleDrop(e));
            
            // Eventos touch
            slot.addEventListener('touchstart', e => this.handleTouchPlace(e));
        });

        // Prevenir zoom
        document.addEventListener('touchstart', e => {
            if (e.touches.length > 1) e.preventDefault();
        }, { passive: false });
    }

    handleTouchPlace(e) {
        e.preventDefault();
        if (!this.activeStone) return;

        const slot = e.target.closest('.ring-slot');
        const correctFinger = this.activeStone.dataset.finger;
        const targetFinger = slot.dataset.finger;

        if (correctFinger === targetFinger) {
            this.handleCorrect(slot);
        } else {
            this.handleIncorrect();
        }
        
        // Resetar pedra ativa
        this.activeStone.classList.remove('active');
        this.activeStone = null;
    }

    startGame() {
        document.getElementById('start-btn').classList.add('hidden');
        document.getElementById('question-panel').classList.remove('hidden');
        this.showQuestion();
    }

    showQuestion() {
        const question = this.questions[this.currentQuestion];
        const questionPanel = document.getElementById('current-question');
        const symbolsContainer = document.getElementById('symbols-container');
        
        questionPanel.textContent = `Coloque o símbolo ${question.culture} no dedo correto: ${question.meaning}`;
        symbolsContainer.innerHTML = '';

        const stone = document.createElement('div');
        stone.className = 'symbol-stone';
        stone.textContent = question.symbol;
        stone.draggable = true;
        stone.dataset.finger = question.finger;
        
        // Eventos mouse
        stone.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', question.finger);
        });

        // Eventos touch
        stone.addEventListener('touchstart', e => {
            e.preventDefault();
            if (this.activeStone) this.activeStone.classList.remove('active');
            this.activeStone = stone;
            stone.classList.add('active');
        });

        symbolsContainer.appendChild(stone);
    }

    handleDrop(e) {
        e.preventDefault();
        const correctFinger = e.dataTransfer.getData('text/plain');
        const targetFinger = e.target.closest('.ring-slot').dataset.finger;

        if (correctFinger === targetFinger) {
            this.handleCorrect(e.target.closest('.ring-slot'));
        } else {
            this.handleIncorrect();
        }
    }

    handleCorrect(slot) {
        slot.classList.add('correct');
        this.score += 100;
        document.querySelector('#score span').textContent = this.score;

        setTimeout(() => {
            slot.classList.remove('correct');
            this.currentQuestion++;
            
            if (this.currentQuestion < this.questions.length) {
                this.showQuestion();
            } else {
                this.endGame();
            }
        }, 1000);
    }

    handleIncorrect() {
        alert('Esta não é a posição correta! Tente novamente.');
        this.score = Math.max(0, this.score - 50);
        document.querySelector('#score span').textContent = this.score;
    }

    endGame() {
        document.getElementById('question-panel').classList.add('hidden');
        const resultPanel = document.getElementById('result-panel');
        resultPanel.classList.remove('hidden');
        
        document.getElementById('result-title').textContent = 
            `Jornada Concluída! Pontuação Final: ${this.score}`;
        document.getElementById('result-message').textContent = 
            'Você dominou os segredos dos anéis ancestrais!';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new RingGame();
    document.getElementById('restart-btn').addEventListener('click', () => {
        window.location.reload();
    });
});
