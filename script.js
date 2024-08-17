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

    // Video carousel functionality
    const videos = [
        "videos/chapter-1.mp4",
        "videos/Chapter-2.mp4",
        "videos/Chapter-3.mp4",
        "videos/chapter-4.mp4",
        "videos/Chapter-5.mp4",
        "videos/chapter6.mp4"
    ];

    let currentVideoIndex = 0;
    const currentVideoElement = document.getElementById("current-video");
    const prevButton = document.getElementById("prev-video");
    const nextButton = document.getElementById("next-video");

    function updateVideo() {
        currentVideoElement.style.transform = 'translateX(-100%)';
        setTimeout(() => {
            currentVideoElement.src = videos[currentVideoIndex];
            currentVideoElement.load();
            currentVideoElement.style.transform = 'translateX(0)';
        }, 500);
    }

    prevButton.addEventListener("click", function () {
        currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
        updateVideo();
    });

    nextButton.addEventListener("click", function () {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        updateVideo();
    });

    // EmailJS form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Send form data to EmailJS
        emailjs.sendForm('service_6i07kfc', 'template_dbd3dv8', this)
            .then(function () {
                alert('Enquiry sent successfully!');
                contactForm.reset();
            }, function (error) {
                console.error('Failed to send enquiry:', error);
                alert('Failed to send enquiry. Please try again.');
            });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const readMoreLink = document.getElementById("read-more-link");
    const moreText = document.getElementById("more-text");

    readMoreLink.addEventListener("click", function(event) {
        event.preventDefault();
        moreText.style.display = "inline";
        readMoreLink.style.display = "none";
    });
    
    // Modal code as previously implemented
    const modal = document.getElementById("explanation-modal");
    const link = document.getElementById("explanation-link");
    const closeBtn = document.getElementsByClassName("close")[0];

    link.onclick = function() {
        modal.style.display = "block";
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

