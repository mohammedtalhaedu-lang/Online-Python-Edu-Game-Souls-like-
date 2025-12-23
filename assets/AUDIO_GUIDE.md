# 🎵 Audio Guide for The Python Soulweaver

The game now has a **fully functional audio system** that can play Souls-like soundtracks and sound effects!

## 🎼 Audio System Features

✅ **Background Music** with seamless crossfading  
✅ **Boss-Specific Themes** for each boss encounter  
✅ **Sound Effects** for actions (victory, death, abilities)  
✅ **Procedural Audio** fallback using Web Audio API  
✅ **Volume Control** and mute functionality  
✅ **Fade In/Out** transitions between tracks  

---

## 📁 Required Audio Files

Place your audio files in the following structure:

```
assets/
└── audio/
    ├── intro_ambient.mp3          # Hero screen atmospheric music
    ├── level_ambient.mp3           # Normal level background music
    ├── boss_battle.mp3             # Generic boss battle music
    ├── boss_sentinel.mp3           # Level 3: Syntax Sentinel theme
    ├── boss_hydra.mp3              # Level 6: Iterative Hydra theme
    ├── boss_archmage.mp3           # Level 9: Object Archmage theme
    ├── boss_void.mp3               # Level 10: Void Compiler theme
    ├── victory.mp3                 # Victory celebration
    ├── death.mp3                   # Death/failure sound
    ├── final_victory.mp3           # Final boss victory
    └── sfx/
        ├── level_start.mp3         # Level transition
        ├── code_submit.mp3         # Code submission
        ├── success.mp3             # Challenge success
        ├── failure.mp3             # Challenge failure
        ├── ability.mp3             # Ability activation
        ├── boss_entrance.mp3       # Boss appearance
        └── rumble.mp3              # Screen shake/impact
```

---

## 🎹 Where to Get Souls-Like Music (FREE & ROYALTY-FREE)

### Recommended Sources:

1. **Incompetech** (Kevin MacLeod)
   - URL: https://incompetech.com
   - License: Creative Commons
   - Recommended tracks:
     - "Dark Descent" (boss battles)
     - "Curse of the Scarab" (ambient)
     - "Danse Macabre" (boss themes)

2. **Free Music Archive**
   - URL: https://freemusicarchive.org
   - Search for: "dark ambient", "orchestral", "epic"
   - Filter by: CC0 or Attribution licenses

3. **Pixabay Music**
   - URL: https://pixabay.com/music
   - Search: "epic", "dark", "orchestral"
   - License: Free for commercial use

4. **YouTube Audio Library**
   - URL: https://youtube.com/audiolibrary
   - Categories: Cinematic, Ambient
   - Download as MP3

5. **OpenGameArt.org**
   - URL: https://opengameart.org
   - Search: "dark fantasy", "souls"
   - Great for SFX too!

---

## 🎮 Recommended Track Moods

### Intro/Hero Screen
- **Mood**: Mysterious, ominous, slow build
- **Instruments**: Deep cellos, choir pads, distant bells
- **Tempo**: 60-80 BPM
- **Example**: Dark ambient drone

### Normal Levels (1, 2, 4, 5, 7, 8)
- **Mood**: Melancholic, atmospheric, contemplative
- **Instruments**: Piano, strings, ethereal pads
- **Tempo**: 70-90 BPM
- **Example**: Sad medieval theme

### Boss Battles

#### Level 3: Syntax Sentinel
- **Mood**: Mechanical, rhythmic, industrial
- **Instruments**: War drums, metallic percussion
- **Tempo**: 120-140 BPM
- **Example**: Industrial action music

#### Level 6: Iterative Hydra
- **Mood**: Chaotic, frantic, layers building
- **Instruments**: Fast violins, multiple overlapping melodies
- **Tempo**: 150-180 BPM
- **Example**: Intense orchestral chase

#### Level 9: Object Archmage
- **Mood**: Mystical, ancient, building complexity
- **Instruments**: Pipe organ, choir, bells
- **Tempo**: 100-120 BPM
- **Example**: Gothic cathedral organ piece

#### Level 10: Void Compiler (FINAL BOSS)
- **Mood**: Reality-breaking, glitchy, epic
- **Instruments**: Full orchestra + electronic glitches
- **Tempo**: Variable (90-160 BPM with changes)
- **Example**: Epic boss battle with electronic elements

### Victory
- **Mood**: Triumphant, uplifting
- **Instruments**: Brass fanfare, strings
- **Duration**: 10-15 seconds
- **Example**: Short victory jingle

### Death
- **Mood**: Tragic, fading, mournful
- **Instruments**: Reversed cymbals, low strings
- **Duration**: 5-10 seconds
- **Example**: Game over sting

### Final Victory
- **Mood**: Epic, euphoric, accomplished
- **Instruments**: Full orchestra, choir
- **Duration**: 30-60 seconds
- **Example**: Credits music

---

## 🔧 Technical Requirements

### File Formats
- **Primary**: MP3 (best compatibility)
- **Alternative**: OGG, WAV (larger files)
- **Avoid**: FLAC, AAC (limited browser support)

### File Sizes
- **Background Music**: 2-5 MB per track (3-5 minutes, 128-192 kbps)
- **Boss Themes**: 3-6 MB per track (4-6 minutes, 192 kbps)
- **Sound Effects**: 50-500 KB per file (<10 seconds, 128 kbps)

### Quality Settings
- **Music**: 192 kbps MP3, 44.1 kHz
- **SFX**: 128 kbps MP3, 44.1 kHz
- **Loop-able**: Ensure smooth loop points (use Audacity)

---

## ⚡ If You Don't Have Audio Files

The audio system will **automatically fallback** to:
1. **Procedural generation** using Web Audio API (creates atmospheric drones)
2. **Silent mode** (game still fully functional)

The procedural audio creates:
- **Boss battles**: Dissonant low frequencies (ominous)
- **Normal levels**: Harmonic drones (peaceful)

---

## 🛠️ How to Add Your Own Music

1. **Download** royalty-free music from sources above
2. **Rename** files to match the structure (e.g., `boss_sentinel.mp3`)
3. **Place** files in `assets/audio/` folder
4. **Refresh** the game - music will play automatically!

---

## 🎛️ Volume Control

The audio system includes:
- **Master Volume**: 60% by default
- **Music Volume**: 50% of master
- **SFX Volume**: 70% of master

To adjust volumes, modify in `audio-manager.js`:
```javascript
this.masterVolume = 0.6;  // 60%
this.musicVolume = 0.5;   // 50%
this.sfxVolume = 0.7;     // 70%
```

---

## 🔇 Mute Button (Optional Enhancement)

Add this HTML to your interface:
```html
<button id="mute-toggle" class="btn-secondary-small">🔊 Mute</button>
```

Add this JavaScript to `game.js`:
```javascript
document.getElementById('mute-toggle')?.addEventListener('click', () => {
    const muted = audioManager.toggleMute();
    document.getElementById('mute-toggle').textContent = muted ? '🔇 Unmute' : '🔊 Mute';
});
```

---

## 📝 License Notes

When using royalty-free music:
- ✅ **Always check the specific license** for each track
- ✅ **Provide attribution** if required (usually in credits)
- ✅ **Don't sell the music itself** (only use in your game)
- ✅ **Read terms** for commercial vs. personal use

---

## 🎵 Quick Start (3 Steps)

1. **Visit Incompetech.com**
2. **Download** 10-15 dark/epic tracks
3. **Rename and place** in `assets/audio/` folder

**Game will automatically start playing music!**

---

**⚔️ May your soundtrack be as epic as your code! ⚔️**
