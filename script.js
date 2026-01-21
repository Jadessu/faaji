// Splash Screen Handler
window.addEventListener('load', () => {
    const splashScreen = document.querySelector('.splash-screen');

    setTimeout(() => {
        splashScreen.classList.add('fade-out');

        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 800);
    }, 2500);
});

// Audio Player Handler
const audioToggle = document.getElementById('audioToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const audioWaves = document.querySelector('.audio-waves');
const audioMutedIcon = document.querySelector('.audio-muted');
let isPlaying = false;

// Set initial volume to 20%
backgroundMusic.volume = 0.2;

// Try to autoplay immediately and after splash screen
const tryAutoplay = () => {
    backgroundMusic.play()
        .then(() => {
            isPlaying = true;
            audioWaves.classList.remove('hidden');
            audioMutedIcon.classList.add('hidden');
            console.log('Audio started playing');
        })
        .catch(error => {
            console.log('Autoplay prevented, user interaction required:', error);
            isPlaying = false;
            audioWaves.classList.add('hidden');
            audioMutedIcon.classList.remove('hidden');
        });
};

// Try autoplay on page load
window.addEventListener('load', () => {
    tryAutoplay();
});

// Try again after splash screen
setTimeout(() => {
    if (!isPlaying) {
        tryAutoplay();
    }
}, 2600);

// Try on any user interaction if autoplay failed
document.addEventListener('click', function startOnInteraction() {
    if (!isPlaying) {
        tryAutoplay();
        document.removeEventListener('click', startOnInteraction);
    }
}, { once: true });

audioToggle.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        audioWaves.classList.add('hidden');
        audioMutedIcon.classList.remove('hidden');
        isPlaying = false;
    } else {
        backgroundMusic.play().catch(error => {
            console.log('Audio playback failed:', error);
        });
        audioWaves.classList.remove('hidden');
        audioMutedIcon.classList.add('hidden');
        isPlaying = true;
    }
});

function getNextFriday() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
    
    const nextFriday = new Date(now);
    nextFriday.setDate(now.getDate() + daysUntilFriday);
    nextFriday.setHours(22, 0, 0, 0);
    
    // If it's Friday but before 10 PM, target is today
    if (dayOfWeek === 5 && now.getHours() < 22) {
        nextFriday.setDate(now.getDate());
    }
    
    return nextFriday;
}

function updateCountdown() {
    const now = new Date();
    const nextFriday = getNextFriday();
    const diff = nextFriday - now;

    if (diff <= 0) {
        // Event is happening now, show next week
        nextFriday.setDate(nextFriday.getDate() + 7);
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Initial update
updateCountdown();

// Update every second
setInterval(updateCountdown, 1000);