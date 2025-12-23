// ================================
// THE PYTHON SOULWEAVER - PARTICLES
// Atmospheric Background Effects
// ================================

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;

        this.resize();
        this.init();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.3,
                type: Math.random() > 0.7 ? 'code' : 'ember',
                char: this.getRandomChar(),
                hue: Math.random() * 60 + 0 // Red to orange range
            });
        }
    }

    getRandomChar() {
        const chars = ['0', '1', '{', '}', '(', ')', '[', ']', ':', ';', 'def', 'if', 'for', 'λ', 'π', '∑'];
        return chars[Math.floor(Math.random() * chars.length)];
    }

    update() {
        this.particles.forEach(particle => {
            // Move particle
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Wrap around edges
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;

            // Subtle opacity pulse
            particle.opacity += (Math.random() - 0.5) * 0.02;
            particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
        });
    }

    draw() {
        // Clear with slight trail effect
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;

            if (particle.type === 'ember') {
                // Draw glowing ember
                const gradient = this.ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 3
                );
                gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, 1)`);
                gradient.addColorStop(0.5, `hsla(${particle.hue}, 100%, 50%, 0.5)`);
                gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 40%, 0)`);

                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                // Draw code symbol
                this.ctx.fillStyle = `rgba(0, 255, 65, ${particle.opacity})`;
                this.ctx.font = `${particle.size * 4}px 'Source Code Pro', monospace`;
                this.ctx.fillText(particle.char, particle.x, particle.y);
            }

            this.ctx.restore();
        });
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    start() {
        this.animate();
    }

    // Add intense particles for boss encounters
    bossModeActivate() {
        this.particleCount = 150;
        this.init();

        // Make particles more aggressive
        this.particles.forEach(p => {
            p.speedX *= 2;
            p.speedY *= 2;
            p.hue = 0; // Pure red
        });
    }

    // Reset to normal
    normalMode() {
        this.particleCount = 80;
        this.init();
    }
}

// ================================
// SPECIAL EFFECTS
// ================================

// Screen shake effect
function screenShake(duration = 500, intensity = 10) {
    const container = document.querySelector('.container');
    if (!container) return;

    const originalTransform = container.style.transform;
    const startTime = Date.now();

    function shake() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        if (progress < 1) {
            const currentIntensity = intensity * (1 - progress);
            const x = (Math.random() - 0.5) * currentIntensity;
            const y = (Math.random() - 0.5) * currentIntensity;
            container.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(shake);
        } else {
            container.style.transform = originalTransform;
        }
    }

    shake();
}

// Victory particles
function createVictoryEffect() {
    const symbols = ['⚔️', '✨', '👑', '🏆', '⭐'];
    const container = document.body;

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            particle.style.position = 'fixed';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = '-50px';
            particle.style.fontSize = (Math.random() * 30 + 20) + 'px';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.animation = 'fallDown 3s ease-in-out forwards';

            container.appendChild(particle);

            setTimeout(() => particle.remove(), 3000);
        }, i * 100);
    }

    // Add animation if not present
    if (!document.getElementById('victory-effect-styles')) {
        const style = document.createElement('style');
        style.id = 'victory-effect-styles';
        style.textContent = `
            @keyframes fallDown {
                to {
                    transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Death effect
function createDeathEffect() {
    const container = document.body;

    // Red screen overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'radial-gradient(circle, rgba(139, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.95) 100%)';
    overlay.style.zIndex = '999';
    overlay.style.pointerEvents = 'none';
    overlay.style.animation = 'deathFade 2s ease-out forwards';

    container.appendChild(overlay);

    // Screen shake
    screenShake(800, 15);

    // Falling skulls
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const skull = document.createElement('div');
            skull.textContent = '💀';
            skull.style.position = 'fixed';
            skull.style.left = Math.random() * window.innerWidth + 'px';
            skull.style.top = '-50px';
            skull.style.fontSize = (Math.random() * 40 + 30) + 'px';
            skull.style.pointerEvents = 'none';
            skull.style.zIndex = '1000';
            skull.style.animation = 'fallDown 2s ease-in-out forwards';

            container.appendChild(skull);

            setTimeout(() => skull.remove(), 2000);
        }, i * 50);
    }

    setTimeout(() => overlay.remove(), 2000);

    // Add animation
    if (!document.getElementById('death-effect-styles')) {
        const style = document.createElement('style');
        style.id = 'death-effect-styles';
        style.textContent = `
            @keyframes deathFade {
                0% { opacity: 0; }
                50% { opacity: 1; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Boss entrance effect
function createBossEntranceEffect() {
    screenShake(1000, 20);

    const container = document.body;
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = 'radial-gradient(circle, rgba(220, 20, 60, 0.9) 0%, rgba(0, 0, 0, 0) 70%)';
    flash.style.zIndex = '999';
    flash.style.pointerEvents = 'none';
    flash.style.animation = 'bossFlashEffect 1.5s ease-out forwards';

    container.appendChild(flash);
    setTimeout(() => flash.remove(), 1500);

    if (!document.getElementById('boss-effect-styles')) {
        const style = document.createElement('style');
        style.id = 'boss-effect-styles';
        style.textContent = `
            @keyframes bossFlashEffect {
                0% { opacity: 0; }
                20% { opacity: 1; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ParticleSystem,
        screenShake,
        createVictoryEffect,
        createDeathEffect,
        createBossEntranceEffect
    };
}
