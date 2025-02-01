class RingGame {
    constructor() {
        this.questions = this.fisherYatesShuffle([
            // Cultura Chinesa
            { culture: 'Chinês', symbol: '道', finger: 'polegar', meaning: 'Tao - Caminho Espiritual' },
            { culture: 'Chinês', symbol: '陰陽', finger: 'indicador', meaning: 'Equilíbrio e Dualidade' },
            { culture: 'Chinês', symbol: '龍', finger: 'médio', meaning: 'Dragão - Poder e Sabedoria' },
            { culture: 'Chinês', symbol: '福', finger: 'anelar', meaning: 'Felicidade e Sorte' },
            { culture: 'Chinês', symbol: '壽', finger: 'mindinho', meaning: 'Longevidade e Saúde' },

            // Cultura Nórdica
            { culture: 'Nórdico', symbol: 'ᚦ', finger: 'polegar', meaning: 'Thurisaz - Proteção Divina' },
            { culture: 'Nórdico', symbol: 'ᚠ', finger: 'indicador', meaning: 'Fehu - Riqueza e Prosperidade' },
            { culture: 'Nórdico', symbol: 'ᛟ', finger: 'médio', meaning: 'Othala - Herança e Família' },
            { culture: 'Nórdico', symbol: 'ᛏ', finger: 'anelar', meaning: 'Tiwaz - Justiça e Coragem' },
            { culture: 'Nórdico', symbol: 'ᚨ', finger: 'mindinho', meaning: 'Ansuz - Comunicação e Sabedoria' },

            // Cultura Cigana
            { culture: 'Cigano', symbol: '☾', finger: 'polegar', meaning: 'Lua - Intuição e Mistério' },
            { culture: 'Cigano', symbol: '🔥', finger: 'indicador', meaning: 'Fogo - Paixão e Transformação' },
            { culture: 'Cigano', symbol: '🔮', finger: 'médio', meaning: 'Cristal - Profecia e Destino' },
            { culture: 'Cigano', symbol: '🧿', finger: 'anelar', meaning: 'Olho Místico - Proteção contra o mal' },
            { culture: 'Cigano', symbol: '🎵', finger: 'mindinho', meaning: 'Música - Liberdade e Expressão' },

            // Cultura Tibetana
            { culture: 'Tibetano', symbol: '卍', finger: 'polegar', meaning: 'Eternidade e Harmonia' },
            { culture: 'Tibetano', symbol: 'ॐ', finger: 'indicador', meaning: 'Om - Consciência Cósmica' },
            { culture: 'Tibetano', symbol: 'ཨ', finger: 'médio', meaning: 'Sagrado A - Energia Criativa' },
            { culture: 'Tibetano', symbol: 'ཀི', finger: 'anelar', meaning: 'Kī - Poder Espiritual' },
            { culture: 'Tibetano', symbol: 'དངོས', finger: 'mindinho', meaning: 'Realidade Suprema' },

            // Cultura Havaiana
            { culture: 'Havaiano', symbol: '🌋', finger: 'polegar', meaning: 'Pele - Energia Vulcânica' },
            { culture: 'Havaiano', symbol: '🌊', finger: 'indicador', meaning: 'Kanaloa - Fluxo e Sabedoria' },
            { culture: 'Havaiano', symbol: '🌿', finger: 'médio', meaning: 'Lono - Paz e Fertilidade' },
            { culture: 'Havaiano', symbol: '🔥', finger: 'anelar', meaning: 'Kāne - Força Criativa' },
            { culture: 'Havaiano', symbol: '🌺', finger: 'mindinho', meaning: 'Aloha - Amor e União' },

            // Cultura Celta
            { culture: 'Celta', symbol: '☘', finger: 'polegar', meaning: 'Triskelion - Movimento e Crescimento' },
            { culture: 'Celta', symbol: '🌳', finger: 'indicador', meaning: 'Árvore Sagrada - Conexão com a Natureza' },
            { culture: 'Celta', symbol: '🌀', finger: 'médio', meaning: 'Espiral - Evolução e Transformação' },
            { culture: 'Celta', symbol: '⚔', finger: 'anelar', meaning: 'Espada - Coragem e Proteção' },
            { culture: 'Celta', symbol: '🔗', finger: 'mindinho', meaning: 'Nós Celtas - Laços e Destino' },

            // Cultura Egípcia
            { culture: 'Egípcio', symbol: '𓂀', finger: 'polegar', meaning: 'Olho de Hórus - Proteção e Visão' },
            { culture: 'Egípcio', symbol: '𓆣', finger: 'indicador', meaning: 'Ankh - Vida e Imortalidade' },
            { culture: 'Egípcio', symbol: '𓏏', finger: 'médio', meaning: 'Djed - Estabilidade e Força' },
            { culture: 'Egípcio', symbol: '𓂻', finger: 'anelar', meaning: 'Escaravelho - Renascimento e Transformação' },
            { culture: 'Egípcio', symbol: '𓃭', finger: 'mindinho', meaning: 'Leão - Poder e Liderança' },

            // Cultura Grega
            { culture: 'Grego', symbol: 'Δ', finger: 'polegar', meaning: 'Delta - Mudança e Evolução' },
            { culture: 'Grego', symbol: 'Ω', finger: 'indicador', meaning: 'Ômega - Plenitude e Fim' },
            { culture: 'Grego', symbol: '🏛', finger: 'médio', meaning: 'Coluna - Estrutura e Conhecimento' },
            { culture: 'Grego', symbol: '⚖', finger: 'anelar', meaning: 'Balança - Justiça e Equilíbrio' },
            { culture: 'Grego', symbol: '🔥', finger: 'mindinho', meaning: 'Fogo Olímpico - Espírito e Determinação' }
        ]);

        this.currentQuestion = 0;
        this.score = 0;
        this.streak = 0;
        this.activeStone = null;
        this.init();
    }

    fisherYatesShuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    init() {
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        
        document.querySelectorAll('.ring-slot').forEach(slot => {
            slot.addEventListener('click', e => this.handleSlotClick(e));
        });

        document.addEventListener('touchstart', e => {
            if (e.touches.length > 1) e.preventDefault();
        }, { passive: false });
    }

    handleSlotClick(e) {
        const slot = e.target.closest('.ring-slot');
        if (!slot) return;
        
        const currentFinger = this.questions[this.currentQuestion].finger;
        const selectedFinger = slot.dataset.finger;

        if (selectedFinger === currentFinger) {
            this.handleCorrect(slot);
        } else {
            slot.classList.add('incorrect');
            setTimeout(() => slot.classList.remove('incorrect'), 500);
            this.handleIncorrect();
        }
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
        stone.dataset.finger = question.finger;
        
        stone.addEventListener('click', e => {
            e.stopPropagation();
            if (this.activeStone) this.activeStone.classList.remove('active');
            this.activeStone = stone;
            stone.classList.add('active');
        });

        symbolsContainer.appendChild(stone);
    }

    handleCorrect(slot) {
        this.streak++;
        const bonus = Math.min(this.streak * 20, 100);
        this.score += 100 + bonus;
        document.querySelector('#score span').textContent = this.score;
        
        // Atualização segura da barra de progresso
        const progressBar = document.getElementById('progress-bar');
        if(progressBar) {
            progressBar.style.width = 
                `${((this.currentQuestion + 1) / this.questions.length) * 100}%`;
        }
    
        slot.classList.add('correct');
        this.activeStone?.classList.add('correct');
    
        setTimeout(() => {
            slot.classList.remove('correct');
            this.activeStone?.classList.remove('correct');
            this.currentQuestion++;
            
            if (this.currentQuestion < this.questions.length) {
                this.showQuestion();
            } else {
                this.endGame();
            }
        }, 1000);
    }
    handleIncorrect() {
        this.streak = 0;
        this.score = Math.max(0, this.score - 50);
        document.querySelector('#score span').textContent = this.score;
    }

    endGame() {
        const highScore = localStorage.getItem('highScore') || 0;
        if (this.score > highScore) {
            localStorage.setItem('highScore', this.score);
        }

        document.getElementById('question-panel').classList.add('hidden');
        const resultPanel = document.getElementById('result-panel');
        resultPanel.classList.remove('hidden');
        
        document.getElementById('result-title').textContent = 
            `Jornada Concluída! Pontuação Final: ${this.score}`;
        document.getElementById('result-message').textContent = 
            `Recorde: ${localStorage.getItem('highScore') || 0} | Sua Pontuação: ${this.score}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new RingGame();
    document.getElementById('restart-btn').addEventListener('click', () => {
        window.location.reload();
    });
});
