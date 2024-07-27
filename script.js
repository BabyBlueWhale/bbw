document.addEventListener("DOMContentLoaded", function() {
    // Audio control
    const audio = document.getElementById("background-audio");
    const playBtn = document.getElementById("play-btn");

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playBtn.textContent = "Pause";
        } else {
            audio.pause();
            playBtn.textContent = "Play";
        }
    });

    // Mobile navigation toggle
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');

    hamburgerMenu.addEventListener('click', function() {
        if (mobileNav.style.display === 'none' || mobileNav.style.display === '') {
            mobileNav.style.display = 'flex';
        } else {
            mobileNav.style.display = 'none';
        }
    });
});

function comingSoon() {
    alert("Coming soon");
}
