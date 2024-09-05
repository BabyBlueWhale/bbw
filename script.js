document.addEventListener("DOMContentLoaded", function () {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavLinks = mobileNav.querySelectorAll('a');

    function toggleMenu() {
        if (mobileNav && hamburgerMenu) {
            mobileNav.classList.toggle('open');
            hamburgerMenu.classList.toggle('open');
        }
    }

    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', function (event) {
            event.stopPropagation();
            toggleMenu();
        });

        // Close the mobile nav when clicking outside the menu
        document.addEventListener('click', function (event) {
            if (!mobileNav.contains(event.target) && !hamburgerMenu.contains(event.target)) {
                mobileNav.classList.remove('open');
                hamburgerMenu.classList.remove('open');
            }
        });

        // Close the mobile nav when clicking a link
        mobileNav.addEventListener('click', function () {
            mobileNav.classList.remove('open');
            hamburgerMenu.classList.remove('open');
        });
    }

    // Show/hide back-to-top button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Smooth scroll to top
    backToTopButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Video carousel functionality for "Story of Bubbles" section
    const videos = [
        "videos/chapter-1.mp4",
        "videos/Chapter-2.mp4",
        "videos/Chapter-3.mp4",
        "videos/chapter-4.mp4",
        "videos/Chapter-5.mp4",
        "videos/chapter6.mp4",
        "videos/Chapter-7.mp4",
        "videos/Chapter-8.mp4",
        "videos/Chapter-9.mp4",
        "videos/Chapter-10.mp4"
    ];

    let currentVideoIndex = 0;
    const currentVideoElement = document.getElementById("current-video");
    const prevButton = document.getElementById("prev-video");
    const nextButton = document.getElementById("next-video");

    // Update video source and play
    function updateVideo() {
        currentVideoElement.style.transform = 'translateX(-100%)';
        setTimeout(() => {
            currentVideoElement.src = videos[currentVideoIndex];
            currentVideoElement.load();
            currentVideoElement.play(); // Ensure the next video plays automatically
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

    // Autoplay and loop through the videos in sequence
    currentVideoElement.addEventListener('ended', function () {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        updateVideo();
    });

    // Ensure the video is muted and can be unmuted by the user
    currentVideoElement.muted = true;
    currentVideoElement.autoplay = true;
    currentVideoElement.playsinline = true;
    currentVideoElement.loop = false; // We'll handle looping manually for sequence playback

    // EmailJS form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        emailjs.sendForm('service_6i07kfc', 'template_dbd3dv8', this)
            .then(function () {
                alert('Enquiry sent successfully!');
                contactForm.reset();
            }, function (error) {
                alert('Failed to send enquiry. Please try again.');
            });
    });

    // Additional "read more" functionality
    const readMoreLink = document.getElementById("read-more-link");
    const moreText = document.getElementById("more-text");

    if (readMoreLink && moreText) {
        readMoreLink.addEventListener("click", function(event) {
            event.preventDefault();
            moreText.style.display = "inline";
            readMoreLink.style.display = "none";
        });
    }

    // Modal code
    const modal = document.getElementById("explanation-modal");
    const link = document.getElementById("explanation-link");
    const closeBtn = document.getElementsByClassName("close")[0];

    if (link && modal) {
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
    }
});
