
document.addEventListener("DOMContentLoaded", function () {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const backToTopButton = document.getElementById('back-to-top');

    // Toggle mobile navigation
    hamburgerMenu.addEventListener('click', function () {
        try {
            mobileNav.classList.toggle('open');
        } catch (error) {
            console.error("Error toggling mobile navigation:", error);
        }
    });

    // Show/hide back-to-top button
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Smooth scroll to top
    backToTopButton.addEventListener('click', function () {
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error("Error scrolling to top:", error);
        }
    });
});
