// ================================
// THE PYTHON SOULWEAVER - ABILITIES
// Hallowed Trinket System
// ================================

class AbilityManager {
    constructor() {
        this.abilities = {
            eye: {
                name: "All-Seeing Eye",
                icon: "👁️",
                cooldown: 3,
                currentCooldown: 0,
                maxUses: Infinity,
                usesLeft: Infinity,
                description: "Reveals the full solution to the current challenge"
            },
            grimoire: {
                name: "Warded Grimoire",
                icon: "📖",
                cooldown: 5,
                currentCooldown: 0,
                maxUses: Infinity,
                usesLeft: Infinity,
                description: "Provides a 3-step hint and reveals the specific line of error"
            },
            flame: {
                name: "Echo of the First Flame",
                icon: "🔥",
                cooldown: Infinity, // Only once per run
                currentCooldown: 0,
                maxUses: 1,
                usesLeft: 1,
                description: "If you fail, stay at your current level instead of resetting to Level 1"
            }
        };
    }

    // Check if ability is available
    isAvailable(abilityKey) {
        const ability = this.abilities[abilityKey];
        return ability.currentCooldown === 0 && ability.usesLeft > 0;
    }

    // Use an ability
    use(abilityKey, currentLevel) {
        const ability = this.abilities[abilityKey];

        if (!this.isAvailable(abilityKey)) {
            return { success: false, message: "Ability not available!" };
        }

        ability.currentCooldown = ability.cooldown;
        ability.usesLeft--;

        // Update UI
        this.updateAbilityUI();

        return { success: true, ability: ability };
    }

    // Reduce cooldowns when advancing levels
    advanceLevel() {
        for (let key in this.abilities) {
            const ability = this.abilities[key];
            if (ability.currentCooldown > 0) {
                ability.currentCooldown--;
            }
        }
        this.updateAbilityUI();
    }

    // Update the UI to reflect cooldown status
    updateAbilityUI() {
        for (let key in this.abilities) {
            const ability = this.abilities[key];
            const button = document.getElementById(`ability-${key}`);
            const cooldownText = document.getElementById(`cooldown-${key}`);

            if (!button || !cooldownText) continue;

            // Check availability
            if (!this.isAvailable(key)) {
                button.disabled = true;

                if (ability.usesLeft === 0) {
                    cooldownText.textContent = "EXHAUSTED";
                    button.style.opacity = "0.3";
                } else {
                    cooldownText.textContent = `Cooldown: ${ability.currentCooldown}`;
                }
            } else {
                button.disabled = false;
                cooldownText.textContent = "";
                button.style.opacity = "1";
            }

            // Special styling for flame ability
            if (key === 'flame' && ability.usesLeft === 0) {
                button.style.borderColor = "var(--color-ash)";
            }
        }
    }

    // Reset for new game
    reset() {
        for (let key in this.abilities) {
            this.abilities[key].currentCooldown = 0;
            this.abilities[key].usesLeft = this.abilities[key].maxUses;
        }
        this.updateAbilityUI();
    }

    // Get ability data
    getAbility(key) {
        return this.abilities[key];
    }

    // Restore flame ability uses (for new game+)
    restoreFlame() {
        this.abilities.flame.usesLeft = 1;
        this.updateAbilityUI();
    }
}

// ================================
// ABILITY HANDLERS
// ================================

// All-Seeing Eye - Reveal Solution
function activateAllSeeingEye(level, abilityManager) {
    const result = abilityManager.use('eye', level.number);

    if (!result.success) {
        showConsoleMessage("The Eye is clouded. It cannot see.", 'error');
        return false;
    }

    // Show the solution in the code editor
    const editor = document.getElementById('code-editor');
    editor.value = level.challenge.solution;

    // Update line numbers
    updateLineNumbers();

    // Show message
    showConsoleMessage(
        "👁️ THE ALL-SEEING EYE OPENS\n\n" +
        "The solution materializes before you. The veil of ignorance lifts.\n" +
        "Use this knowledge wisely, Seeker.",
        'info'
    );

    // Visual effect
    createAbilityEffect('eye');

    return true;
}

// Warded Grimoire - Show Hints
function activateWardedGrimoire(level, abilityManager) {
    const result = abilityManager.use('grimoire', level.number);

    if (!result.success) {
        showConsoleMessage("The Grimoire's pages are sealed.", 'error');
        return false;
    }

    // Display hints
    const hintBox = document.getElementById('challenge-hint');
    const hints = level.challenge.hints;

    let hintHTML = "<strong>📖 THE WARDED GRIMOIRE SPEAKS:</strong><br><br>";
    hints.forEach((hint, index) => {
        hintHTML += `<strong>Rune ${index + 1}:</strong> ${hint}<br><br>`;
    });

    hintBox.innerHTML = hintHTML;
    hintBox.classList.remove('hidden');

    // Show in console too
    showConsoleMessage(
        "📖 THE WARDED GRIMOIRE REVEALS ITS SECRETS\n\n" +
        "Ancient knowledge flows into your mind...",
        'info'
    );

    // Visual effect
    createAbilityEffect('grimoire');

    return true;
}

// Echo of the First Flame - Prevent Death
function activateEchoOfFirstFlame(abilityManager, currentLevelNumber) {
    const result = abilityManager.use('flame', currentLevelNumber);

    if (!result.success) {
        return false;
    }

    showConsoleMessage(
        "🔥 THE ECHO OF THE FIRST FLAME IGNITES!\n\n" +
        "Death has been cheated. Your soul remains intact.\n" +
        "You stay at your current level, but the flame is now extinguished forever.",
        'success'
    );

    // Visual effect
    createAbilityEffect('flame');

    return true;
}

// ================================
// VISUAL EFFECTS
// ================================

function createAbilityEffect(abilityType) {
    const effects = {
        eye: {
            color: 'rgba(0, 217, 255, 0.8)',
            count: 50,
            symbol: '👁'
        },
        grimoire: {
            color: 'rgba(0, 255, 65, 0.8)',
            count: 40,
            symbol: '📖'
        },
        flame: {
            color: 'rgba(255, 107, 53, 0.8)',
            count: 60,
            symbol: '🔥'
        }
    };

    const effect = effects[abilityType];
    const container = document.body;

    // Create particle burst
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.fontSize = '2rem';
        particle.textContent = effect.symbol;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.animation = `burstEffect ${1 + Math.random()}s ease-out forwards`;

        const angle = (Math.PI * 2 * i) / 20;
        const distance = 100 + Math.random() * 200;
        particle.style.setProperty('--burst-x', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--burst-y', `${Math.sin(angle) * distance}px`);

        container.appendChild(particle);

        setTimeout(() => particle.remove(), 1000);
    }

    // Screen flash
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = effect.color;
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '9998';
    flash.style.animation = 'flashEffect 0.5s ease-out forwards';
    container.appendChild(flash);
    setTimeout(() => flash.remove(), 500);

    // Add CSS for animations if not already present
    if (!document.getElementById('ability-effects-styles')) {
        const style = document.createElement('style');
        style.id = 'ability-effects-styles';
        style.textContent = `
            @keyframes burstEffect {
                to {
                    transform: translate(var(--burst-x), var(--burst-y));
                    opacity: 0;
                }
            }
            @keyframes flashEffect {
                from {
                    opacity: 0.6;
                }
                to {
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AbilityManager;
}
