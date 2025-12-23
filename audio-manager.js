// ================================
// AUDIO MANAGER - SOULS-LIKE SOUNDTRACK
// Real Audio Playback System
// ================================

class AudioManager {
    constructor() {
        // Audio context for Web Audio API
        this.audioContext = null;
        this.masterGain = null;

        // Audio elements
        this.bgMusic = null;
        this.currentTrack = null;

        // Volume settings
        this.masterVolume = 0.6;
        this.musicVolume = 0.5;
        this.sfxVolume = 0.7;

        // Track references (placeholder paths - you can replace with actual audio files)
        this.tracks = {
            intro: 'assets/audio/intro_ambient.mp3',
            normalLevel: 'assets/audio/level_ambient.mp3',
            bossLevel: 'assets/audio/boss_battle.mp3',
            syntaxSentinel: 'assets/audio/boss_sentinel.mp3',
            iterativeHydra: 'assets/audio/boss_hydra.mp3',
            objectArchmage: 'assets/audio/boss_archmage.mp3',
            voidCompiler: 'assets/audio/boss_void.mp3',
            victory: 'assets/audio/victory.mp3',
            death: 'assets/audio/death.mp3',
            finalVictory: 'assets/audio/final_victory.mp3'
        };

        // Sound effect references
        this.sfx = {
            levelStart: 'assets/audio/sfx/level_start.mp3',
            codeSubmit: 'assets/audio/sfx/code_submit.mp3',
            success: 'assets/audio/sfx/success.mp3',
            failure: 'assets/audio/sfx/failure.mp3',
            abilityUse: 'assets/audio/sfx/ability.mp3',
            bossEntrance: 'assets/audio/sfx/boss_entrance.mp3',
            screenShake: 'assets/audio/sfx/rumble.mp3'
        };

        this.initialized = false;
        this.isMuted = false;
    }

    // Initialize audio system (must be called after user interaction)
    async init() {
        if (this.initialized) return;

        try {
            // Create main background music element
            this.bgMusic = new Audio();
            this.bgMusic.loop = true;
            this.bgMusic.volume = this.musicVolume * this.masterVolume;

            // Try to initialize Web Audio API for better control
            if (window.AudioContext || window.webkitAudioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.masterGain = this.audioContext.createGain();
                this.masterGain.gain.value = this.masterVolume;
                this.masterGain.connect(this.audioContext.destination);
            }

            this.initialized = true;
            console.log('%c🎵 Audio System Initialized', 'color: #00ff41; font-size: 12px;');
        } catch (error) {
            console.warn('Audio initialization failed:', error);
            // Continue without audio
        }
    }

    // Play background music
    playMusic(trackKey, fadeIn = true) {
        if (!this.initialized || this.isMuted) return;

        const trackPath = this.tracks[trackKey];
        if (!trackPath) {
            console.warn(`Track not found: ${trackKey}`);
            return;
        }

        // If same track is playing, don't restart
        if (this.currentTrack === trackKey && !this.bgMusic.paused) {
            return;
        }

        // Fade out current track
        if (fadeIn && this.bgMusic && !this.bgMusic.paused) {
            this.fadeOut(this.bgMusic, 1000, () => {
                this.startNewTrack(trackPath, trackKey, fadeIn);
            });
        } else {
            this.startNewTrack(trackPath, trackKey, fadeIn);
        }
    }

    // Start a new track
    startNewTrack(trackPath, trackKey, fadeIn) {
        this.currentTrack = trackKey;

        // Check if file exists by trying to play it
        this.bgMusic.src = trackPath;
        this.bgMusic.volume = fadeIn ? 0 : this.musicVolume * this.masterVolume;

        this.bgMusic.play().then(() => {
            if (fadeIn) {
                this.fadeIn(this.bgMusic, 2000, this.musicVolume * this.masterVolume);
            }
        }).catch(error => {
            // If audio file doesn't exist, generate tone instead
            console.warn(`Audio file not found: ${trackPath}, using generated ambient`);
            this.generateAmbientSound(trackKey);
        });
    }

    // Play sound effect
    playSFX(sfxKey, volume = 1.0) {
        if (!this.initialized || this.isMuted) return;

        const sfxPath = this.sfx[sfxKey];
        if (!sfxPath) return;

        const sfxAudio = new Audio(sfxPath);
        sfxAudio.volume = this.sfxVolume * this.masterVolume * volume;
        sfxAudio.play().catch(error => {
            // Silently fail if SFX not available
        });
    }

    // Fade in audio
    fadeIn(audioElement, duration, targetVolume) {
        const steps = 20;
        const stepDuration = duration / steps;
        const volumeStep = targetVolume / steps;
        let currentStep = 0;

        const fadeInterval = setInterval(() => {
            currentStep++;
            audioElement.volume = Math.min(volumeStep * currentStep, targetVolume);

            if (currentStep >= steps) {
                clearInterval(fadeInterval);
            }
        }, stepDuration);
    }

    // Fade out audio
    fadeOut(audioElement, duration, callback) {
        const steps = 20;
        const stepDuration = duration / steps;
        const startVolume = audioElement.volume;
        const volumeStep = startVolume / steps;
        let currentStep = 0;

        const fadeInterval = setInterval(() => {
            currentStep++;
            audioElement.volume = Math.max(startVolume - (volumeStep * currentStep), 0);

            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                audioElement.pause();
                if (callback) callback();
            }
        }, stepDuration);
    }

    // Stop all music
    stopMusic(fadeOut = true) {
        if (this.bgMusic) {
            if (fadeOut) {
                this.fadeOut(this.bgMusic, 1000, () => {
                    this.bgMusic.pause();
                    this.currentTrack = null;
                });
            } else {
                this.bgMusic.pause();
                this.currentTrack = null;
            }
        }
    }

    // Toggle mute
    toggleMute() {
        this.isMuted = !this.isMuted;

        if (this.bgMusic) {
            this.bgMusic.muted = this.isMuted;
        }

        return this.isMuted;
    }

    // Set volume (0-1)
    setVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));

        if (this.bgMusic) {
            this.bgMusic.volume = this.musicVolume * this.masterVolume;
        }

        if (this.masterGain) {
            this.masterGain.gain.value = this.masterVolume;
        }
    }

    // Generate procedural ambient sound using Web Audio API
    generateAmbientSound(trackKey) {
        if (!this.audioContext) return;

        // Stop any existing generated sounds
        this.stopGeneratedSounds();

        // Create oscillators for atmospheric drone
        const osc1 = this.audioContext.createOscillator();
        const osc2 = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        // Configure based on track type
        if (trackKey.includes('boss') || trackKey === 'bossLevel') {
            // Ominous low drone for boss battles
            osc1.frequency.value = 55; // Low A
            osc2.frequency.value = 58.27; // A# for dissonance
            osc1.type = 'sawtooth';
            osc2.type = 'sawtooth';
        } else {
            // Ethereal ambient for normal levels
            osc1.frequency.value = 110; // A
            osc2.frequency.value = 164.81; // E (perfect fifth)
            osc1.type = 'sine';
            osc2.type = 'triangle';
        }

        // Connect nodes
        gainNode.gain.value = 0.05; // Very quiet ambient
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(this.masterGain || this.audioContext.destination);

        // Start oscillators
        osc1.start();
        osc2.start();

        // Store for cleanup
        this.generatedSounds = { osc1, osc2, gainNode };

        console.log('%c🎵 Playing generated ambient sound', 'color: #00d9ff; font-size: 11px;');
    }

    // Stop generated sounds
    stopGeneratedSounds() {
        if (this.generatedSounds) {
            try {
                this.generatedSounds.osc1.stop();
                this.generatedSounds.osc2.stop();
            } catch (e) {
                // Already stopped
            }
            this.generatedSounds = null;
        }
    }

    // Helper: Play intro music
    playIntro() {
        this.playMusic('intro', true);
    }

    // Helper: Play level music
    playLevelMusic(isBoss = false, bossKey = null) {
        this.playSFX('levelStart', 0.5);

        if (isBoss && bossKey && this.tracks[bossKey]) {
            this.playSFX('bossEntrance', 0.8);
            this.playMusic(bossKey, true);
        } else if (isBoss) {
            this.playMusic('bossLevel', true);
        } else {
            this.playMusic('normalLevel', true);
        }
    }

    // Helper: Play victory music
    playVictory(isFinal = false) {
        this.playSFX('success');
        this.playMusic(isFinal ? 'finalVictory' : 'victory', false);
    }

    // Helper: Play death sound
    playDeath() {
        this.playSFX('failure');
        this.playMusic('death', false);
    }

    // Log soundtrack info to console
    logSoundtrack(levelNumber, isBoss = false, bossKey = null) {
        console.log(`%c♪ LEVEL ${levelNumber} SOUNDTRACK ♪`, 'color: #00ff41; font-size: 14px; font-weight: bold;');
        if (isBoss && bossKey) {
            console.log(`%c🎵 Boss Theme: ${bossKey}`, 'color: #dc143c; font-size: 12px;');
        } else {
            console.log(`%c🎵 Ambient music playing...`, 'color: #00d9ff; font-size: 12px;');
        }
    }
}

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioManager;
}
