class RingGame {
    constructor() {
        this.questions = [
            {
                culture: 'Chinês',
                symbol: '道',
                finger: 'ring',
                meaning: 'Tao - Caminho Espiritual'
            },
            {
                culture: 'Nórdico',
                symbol: 'ᚦ',
                finger: 'index',
                meaning: 'Thurisaz - Proteção Divina'
            },
            {
                culture: 'Cigano',
                symbol: '☾',
                finger: 'pinky',
                meaning: 'Lua - Intuição e Mistério'
            },
            {
                culture: 'Tibetano',
                symbol: '卍',
                finger: 'middle',
                meaning: 'Eternidade e Harmonia'
            },
            {
                culture: 'Havaiano',
                symbol: '🌋',
                finger: 'thumb',
                meaning: 'Pele - Energia Vulcânica'
            }
        ];

        this.currentQuestion = 0;
        this.score = 0;
        this.selectedFinger = null;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.init();
    }

    init() {
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        const slots = document.querySelectorAll('.ring-slot');
        
        slots.forEach(slot => {
            // Eventos mouse
            slot.addEventListener('dragover', e => e.preventDefault());
            slot.addEventListener('drop', e => this.handleDrop(e));
            
            // Eventos touch
            slot.addEventListener('touchstart', e => this.handleTouchStart(e));
            slot.addEventListener('touchend', e => this.handleTouchEnd(e));
        });
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchEnd(e) {
        const dx = Math.abs(e.changedTouches[0].clientX - this.touchStartX);
        const dy = Math.abs(e.changedTouches[0].clientY - this.touchStartY);
        
        if (dx < 10 && dy < 10) { // Considera apenas toques, não deslizes
            const targetFinger = e.target.closest('.ring-slot').dataset.finger;
            if (this.selectedFinger) {
                if (this.selectedFinger === targetFinger) {
                    this.handleCorrect(e.target.closest('.ring-slot'));
                } else {
                    this.handleIncorrect();
                }
                this.selectedFinger = null;
                document.querySelectorAll('.symbol-stone').forEach(s => s.classList.remove('active'));
            }
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
        stone.draggable = true;
        
        // Eventos mouse
        stone.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', question.finger);
        });

        // Eventos touch
        stone.addEventListener('touchstart', e => {
            e.preventDefault();
            this.selectedFinger = question.finger;
            stone.classList.add('active');
        });

        stone.addEventListener('touchend', e => e.preventDefault());
        
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
