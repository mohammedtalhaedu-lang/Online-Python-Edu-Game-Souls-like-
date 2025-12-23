// ================================
// THE PYTHON SOULWEAVER - GAME ENGINE
// Main Game Logic & State Management
// ================================

class GameEngine {
    constructor() {
        this.currentLevel = 1;
        this.deaths = 0;
        this.soulsCollected = 0;
        this.gameStarted = false;

        // Initialize managers
        this.abilityManager = new AbilityManager();
        this.audioManager = new AudioManager();
        this.particleSystem = null;
        this.codeEditor = null;

        // Load saved state
        this.loadState();

        // Initialize
        this.init();
    }

    init() {
        // Initialize particle system
        this.particleSystem = new ParticleSystem('particle-canvas');
        this.particleSystem.start();

        // Initialize code editor
        this.codeEditor = new CodeEditor('code-editor', 'line-numbers');

        // Setup event listeners
        this.setupEventListeners();

        // Update UI
        this.updateHUD();
        this.abilityManager.updateAbilityUI();
    }

    setupEventListeners() {
        // Begin journey button
        document.getElementById('begin-journey')?.addEventListener('click', async () => {
            // Initialize audio on first user interaction
            await this.audioManager.init();
            this.startGame();
        });

        // Submit code button
        document.getElementById('submit-code')?.addEventListener('click', () => {
            this.submitCode();
        });

        // Reset code button
        document.getElementById('reset-code')?.addEventListener('click', () => {
            this.resetCode();
        });

        // Ability buttons
        document.getElementById('ability-eye')?.addEventListener('click', () => {
            this.useAbility('eye');
        });

        document.getElementById('ability-grimoire')?.addEventListener('click', () => {
            this.useAbility('grimoire');
        });

        document.getElementById('ability-flame')?.addEventListener('click', () => {
            this.useAbility('flame');
        });

        // Modal buttons
        document.getElementById('accept-death')?.addEventListener('click', () => {
            this.acceptDeath();
        });

        document.getElementById('use-flame-ability')?.addEventListener('click', () => {
            this.useFlameOnDeath();
        });

        document.getElementById('next-level')?.addEventListener('click', () => {
            this.advanceLevel();
        });

        document.getElementById('restart-game')?.addEventListener('click', () => {
            this.restartGame();
        });

        // Code editor updates
        document.getElementById('code-editor')?.addEventListener('input', () => {
            updateLineNumbers();
        });
    }

    startGame() {
        this.gameStarted = true;
        this.currentLevel = 1;
        this.deaths = 0;
        this.soulsCollected = 0;

        // Hide intro, show game
        document.getElementById('intro-section')?.classList.remove('active');
        document.getElementById('game-section')?.classList.add('active');

        // Load first level
        this.loadLevel(1);

        // Start intro/level music
        this.audioManager.playLevelMusic(false);

        // Log to console
        console.log('%c⚔️ THE JOURNEY BEGINS ⚔️', 'color: #ff6b35; font-size: 20px; font-weight: bold;');
        this.audioManager.logSoundtrack(1, false);
    }

    loadLevel(levelNumber) {
        const level = LEVELS[levelNumber - 1];
        if (!level) {
            console.error('Level not found:', levelNumber);
            return;
        }

        this.currentLevel = levelNumber;

        // Update level title
        document.getElementById('level-title').textContent = level.title;

        // Update atmosphere
        document.getElementById('atmosphere-text').textContent = level.atmosphere;

        // Boss indicator
        const bossIndicator = document.getElementById('boss-indicator');
        const bossSection = document.getElementById('boss-section');

        if (level.isBoss) {
            bossIndicator?.classList.remove('hidden');
            bossSection?.classList.remove('hidden');

            // Update boss info
            document.getElementById('boss-name').textContent = level.bossName;
            document.getElementById('boss-dialogue').textContent = level.bossDialogue;
            document.getElementById('boss-soundtrack').textContent = level.bossSoundtrack;

            // Boss image (placeholder path)
            const bossImage = document.getElementById('boss-image');
            bossImage.src = `assets/images/bosses/${level.bossImage}`;
            bossImage.alt = level.bossName;

            // Activate boss mode particles
            this.particleSystem.bossModeActivate();
            createBossEntranceEffect();

            // Play boss music
            const bossKey = level.bossName.toLowerCase().replace(/\s+/g, '').replace(/the/g, '');
            this.audioManager.playLevelMusic(true, bossKey);
            this.audioManager.logSoundtrack(levelNumber, true, bossKey);
        } else {
            bossIndicator?.classList.add('hidden');
            bossSection?.classList.add('hidden');

            // Normal particles
            this.particleSystem.normalMode();

            // Play normal level music
            this.audioManager.playLevelMusic(false);
            this.audioManager.logSoundtrack(levelNumber, false);
        }

        // Update challenge
        document.getElementById('challenge-description').innerHTML =
            level.challenge.description.replace(/\n/g, '<br>');

        // Reset hint
        document.getElementById('challenge-hint')?.classList.add('hidden');

        // Set starter code
        if (this.codeEditor) {
            this.codeEditor.setValue(level.challenge.starterCode || '');
        }

        // Clear console
        this.clearConsole();
        showConsoleMessage('The Abyssal Compiler awaits your code...', 'ready');

        // Update HUD
        this.updateHUD();

        // Save state
        this.saveState();
    }

    submitCode() {
        const level = LEVELS[this.currentLevel - 1];
        if (!level) return;

        const code = this.codeEditor.getValue().trim();

        if (!code) {
            showConsoleMessage('⚠️ ERROR: The void cannot compile emptiness.\n\nWrite your code before submitting.', 'error');
            return;
        }

        // Play submit SFX
        this.audioManager.playSFX('codeSubmit', 0.6);

        // Validate code
        const result = level.challenge.validate(code);

        if (result.success) {
            // SUCCESS!
            this.handleSuccess(result.message);
        } else {
            // FAILURE - Death
            this.handleFailure(result.error);
        }
    }

    handleSuccess(message) {
        const level = LEVELS[this.currentLevel - 1];

        showConsoleMessage(`✨ SUCCESS!\n\n${message}`, 'success');

        // Increment souls
        this.soulsCollected++;
        this.updateHUD();

        // Reduce ability cooldowns
        this.abilityManager.advanceLevel();

        // Play victory music
        if (this.currentLevel === 10) {
            this.audioManager.playVictory(true);
            this.showFinalVictory();
        } else {
            this.audioManager.playVictory(false);
            this.showVictoryModal(level.isBoss);
        }

        // Victory effect
        createVictoryEffect();

        // Save state
        this.saveState();
    }

    handleFailure(errorMessage) {
        showConsoleMessage(`💀 FAILURE\n\n${errorMessage}\n\nYour soul is crushed...`, 'error');

        // Increment deaths
        this.deaths++;
        this.updateHUD();

        // Play death music
        this.audioManager.playDeath();

        // Show death modal
        this.showDeathModal();

        // Death effect
        createDeathEffect();

        // Save state
        this.saveState();
    }

    showVictoryModal(isBoss = false) {
        const modal = document.getElementById('victory-modal');
        const text = document.getElementById('victory-text');

        if (isBoss) {
            text.textContent = 'The boss falls before you. Your mastery grows. The next trial awaits...';
        } else {
            text.textContent = 'You have proven your understanding. The path forward reveals itself...';
        }

        modal?.classList.remove('hidden');
    }

    showDeathModal() {
        const modal = document.getElementById('death-modal');
        const flameButton = document.getElementById('use-flame-ability');

        // Show flame button if available
        if (this.abilityManager.isAvailable('flame')) {
            flameButton?.classList.remove('hidden');
        } else {
            flameButton?.classList.add('hidden');
        }

        modal?.classList.remove('hidden');
    }

    showFinalVictory() {
        const modal = document.getElementById('final-victory-modal');
        document.getElementById('final-deaths').textContent = this.deaths;
        document.getElementById('final-souls').textContent = this.soulsCollected;

        modal?.classList.remove('hidden');

        // Epic particle effect
        createVictoryEffect();
        setTimeout(() => createVictoryEffect(), 1000);

        console.log('%c👑 CONGRATULATIONS! 👑', 'color: #ffd700; font-size: 24px; font-weight: bold;');
        console.log('%cYou have mastered Python and conquered the Abyss!', 'color: #00ff41; font-size: 16px;');
    }

    advanceLevel() {
        document.getElementById('victory-modal')?.classList.add('hidden');

        if (this.currentLevel < 10) {
            this.loadLevel(this.currentLevel + 1);
        }
    }

    acceptDeath() {
        document.getElementById('death-modal')?.classList.add('hidden');

        // PERMADEATH: Reset to Level 1
        this.currentLevel = 1;
        this.loadLevel(1);

        showConsoleMessage(
            '💀 YOUR SOUL HAS BEEN RESET\n\n' +
            'You awaken at the beginning, your knowledge erased.\n' +
            'The journey begins anew...',
            'error'
        );
    }

    useFlameOnDeath() {
        if (!this.abilityManager.isAvailable('flame')) {
            showConsoleMessage('The flame has already been extinguished.', 'error');
            return;
        }

        const success = activateEchoOfFirstFlame(this.abilityManager, this.currentLevel);

        if (success) {
            document.getElementById('death-modal')?.classList.add('hidden');

            // Stay at current level
            showConsoleMessage(
                '🔥 THE ECHO SAVES YOU\n\n' +
                'You remain at your current level, but the flame is gone forever.',
                'info'
            );
        }
    }

    useAbility(abilityKey) {
        const level = LEVELS[this.currentLevel - 1];

        switch (abilityKey) {
            case 'eye':
                this.audioManager.playSFX('abilityUse');
                activateAllSeeingEye(level, this.abilityManager);
                break;
            case 'grimoire':
                this.audioManager.playSFX('abilityUse');
                activateWardedGrimoire(level, this.abilityManager);
                break;
            case 'flame':
                showConsoleMessage(
                    '🔥 The Echo of the First Flame can only be used upon death.\n\n' +
                    'It will prevent your soul from being reset to Level 1.',
                    'info'
                );
                break;
        }
    }

    resetCode() {
        const level = LEVELS[this.currentLevel - 1];
        if (this.codeEditor && level) {
            this.codeEditor.setValue(level.challenge.starterCode || '');
            showConsoleMessage('Code reset to starter template.', 'info');
        }
    }

    clearConsole() {
        const consoleOutput = document.getElementById('console-output');
        if (consoleOutput) {
            consoleOutput.innerHTML = '';
        }
    }

    updateHUD() {
        document.getElementById('current-level').textContent = `${this.currentLevel}/10`;
        document.getElementById('death-count').textContent = this.deaths;
        document.getElementById('souls-collected').textContent = this.soulsCollected;
    }

    restartGame() {
        document.getElementById('final-victory-modal')?.classList.add('hidden');

        // Reset everything
        this.currentLevel = 1;
        this.deaths = 0;
        this.soulsCollected = 0;
        this.abilityManager.reset();

        // Reload first level
        this.loadLevel(1);

        showConsoleMessage('🔄 NEW GAME STARTED\n\nYour journey begins anew...', 'info');
    }

    // State Management
    saveState() {
        const state = {
            currentLevel: this.currentLevel,
            deaths: this.deaths,
            soulsCollected: this.soulsCollected,
            abilities: {
                eye: this.abilityManager.abilities.eye.currentCooldown,
                grimoire: this.abilityManager.abilities.grimoire.currentCooldown,
                flame: this.abilityManager.abilities.flame.usesLeft
            }
        };

        localStorage.setItem('pythonSoulweaverState', JSON.stringify(state));
    }

    loadState() {
        const saved = localStorage.getItem('pythonSoulweaverState');
        if (saved) {
            try {
                const state = JSON.parse(saved);
                this.currentLevel = state.currentLevel || 1;
                this.deaths = state.deaths || 0;
                this.soulsCollected = state.soulsCollected || 0;

                if (state.abilities) {
                    this.abilityManager.abilities.eye.currentCooldown = state.abilities.eye || 0;
                    this.abilityManager.abilities.grimoire.currentCooldown = state.abilities.grimoire || 0;
                    this.abilityManager.abilities.flame.usesLeft = state.abilities.flame ?? 1;
                }
            } catch (e) {
                console.error('Failed to load saved state:', e);
            }
        }
    }
}

// ================================
// UTILITY FUNCTIONS
// ================================

function showConsoleMessage(message, type = 'info') {
    const consoleOutput = document.getElementById('console-output');
    if (!consoleOutput) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `console-${type}`;
    messageDiv.textContent = message;

    consoleOutput.appendChild(messageDiv);

    // Auto-scroll to bottom
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// ================================
// INITIALIZE GAME
// ================================

let game;

window.addEventListener('DOMContentLoaded', () => {
    game = new GameEngine();

    console.log('%c⚔️ THE PYTHON SOULWEAVER ⚔️', 'color: #ff6b35; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px #000;');
    console.log('%cA Dark Fantasy Journey to Master Python', 'color: #c0c0c0; font-size: 14px;');
    console.log('%c\nControls:', 'color: #00ff41; font-size: 12px; font-weight: bold;');
    console.log('%c- Write Python code in the editor', 'color: #6c757d; font-size: 11px;');
    console.log('%c- Press "Submit to the Void" to test your code', 'color: #6c757d; font-size: 11px;');
    console.log('%c- Use Hallowed Trinkets (abilities) when needed', 'color: #6c757d; font-size: 11px;');
    console.log('%c- Beware: Failure means PERMADEATH (reset to Level 1)', 'color: #dc143c; font-size: 11px; font-weight: bold;');
});
