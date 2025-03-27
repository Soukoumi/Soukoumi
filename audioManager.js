// Gestionnaire audio global
class AudioManager {
    constructor() {
        this.audio = new Audio('C418 - Sweden (Caution & Crisis Remix).mp3');
        this.audio.loop = true;
        this.isMuted = localStorage.getItem('isMuted') === 'true';
        this.volume = parseFloat(localStorage.getItem('volume')) || 0.5;
        this.previousVolume = this.volume;
        
        // Initialiser l'audio
        this.audio.volume = this.volume;
        this.audio.muted = this.isMuted;
    }

    // Sauvegarder l'état dans le localStorage
    saveState() {
        localStorage.setItem('isMuted', this.isMuted);
        localStorage.setItem('volume', this.volume);
        localStorage.setItem('previousVolume', this.previousVolume);
    }

    // Mettre à jour le volume
    setVolume(volume) {
        this.volume = volume;
        this.audio.volume = volume;
        this.saveState();
    }

    // Basculer le mute
    toggleMute() {
        this.isMuted = !this.isMuted;
        this.audio.muted = this.isMuted;
        
        if (this.isMuted) {
            this.previousVolume = this.volume;
            this.setVolume(0);
        } else {
            this.setVolume(this.previousVolume);
        }
        
        this.saveState();
    }

    // Démarrer la musique
    play() {
        if (!this.audio.paused) return;
        this.audio.play().catch(console.error);
    }

    // Arrêter la musique
    pause() {
        this.audio.pause();
    }
}

// Créer une instance globale
const audioManager = new AudioManager();

// Exporter pour utilisation dans d'autres fichiers
window.audioManager = audioManager; 
