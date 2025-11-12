// Background music functionality
const backgroundMusic = {
    audio: null,
    isPlaying: false,
    currentTime: 0,

    init() {
        // Create audio element
        this.audio = new Audio('background-music.mp3');
        this.audio.loop = true;
        
        // Load saved state
        const savedTime = localStorage.getItem('musicTime');
        const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
        
        if (savedTime) {
            this.audio.currentTime = parseFloat(savedTime);
        }
        
        // Save state before page unload
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('musicTime', this.audio.currentTime);
            localStorage.setItem('musicPlaying', this.isPlaying);
        });

        // Start playing if it was playing before
        if (wasPlaying) {
            this.play();
        }
    },

    play() {
        if (this.audio) {
            this.audio.play();
            this.isPlaying = true;
            localStorage.setItem('musicPlaying', 'true');
        }
    },

    pause() {
        if (this.audio) {
            this.audio.pause();
            this.isPlaying = false;
            localStorage.setItem('musicPlaying', 'false');
        }
    },

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    backgroundMusic.init();

    // Inject a global, consistent music toggle button if not present
    if (!document.getElementById('musicToggle')) {
        const btn = document.createElement('button');
        btn.id = 'musicToggle';
        btn.setAttribute('aria-label', 'Toggle background music');
        // Minimal consistent styling across pages (no external CSS dependency)
        btn.style.position = 'fixed';
        btn.style.bottom = '16px';
        btn.style.right = '16px';
        btn.style.width = '52px';
        btn.style.height = '52px';
        btn.style.borderRadius = '50%';
        btn.style.border = '1px solid rgba(236, 72, 153, 0.2)';
        btn.style.background = 'rgba(255,255,255,0.85)';
        btn.style.backdropFilter = 'blur(8px)';
        btn.style.boxShadow = '0 8px 20px rgba(236, 72, 153, 0.25)';
        btn.style.fontSize = '22px';
        btn.style.cursor = 'pointer';
        btn.style.zIndex = '9999';

        function updateIcon() {
            btn.textContent = backgroundMusic.isPlaying ? '🔊' : '🔇';
            btn.title = backgroundMusic.isPlaying ? 'Music on' : 'Music off';
        }

        btn.addEventListener('click', () => {
            backgroundMusic.toggle();
            updateIcon();
        });

        document.body.appendChild(btn);
        updateIcon();
        window.__musicToggleEl = btn;
    }
}); 
