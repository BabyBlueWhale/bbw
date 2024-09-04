document.addEventListener("DOMContentLoaded", function () {
    // Define the toggleMenu function
    function toggleMenu() {
        const mobileNav = document.getElementById('mobile-nav');
        const hamburgerMenu = document.getElementById('hamburger-menu');
        if (mobileNav && hamburgerMenu) {
            mobileNav.classList.toggle('open');
            hamburgerMenu.classList.toggle('open');
        }
    }

    // Attach event listeners
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (hamburgerMenu && mobileNav) {
        const mobileNavLinks = mobileNav.querySelectorAll('a');

        hamburgerMenu.addEventListener('click', function (event) {
            event.stopPropagation();
            toggleMenu();
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileNav.classList.remove('open');
                hamburgerMenu.classList.remove('open');
            });
        });

        document.addEventListener('click', function(event) {
            if (!mobileNav.contains(event.target) && !hamburgerMenu.contains(event.target)) {
                mobileNav.classList.remove('open');
                hamburgerMenu.classList.remove('open');
            }
        });
    }

    // Back to Top Button functionality
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Video Carousel Functionality
    const currentVideoElement = document.getElementById("current-video");
    if (currentVideoElement) {
        const videos = [
            "videos/chapter-1.mp4",
            "videos/Chapter-2.mp4",
            "videos/Chapter-3.mp4",
            "videos/chapter-4.mp4",
            "videos/Chapter-5.mp4",
            "videos/chapter6.mp4",
            "videos/Chapter-7.mp4",
            "videos/Chapter-8.mp4",
            "videos/chapter-9.mp4",
            "videos/Chapter-10.mp4"
        ];

        let currentVideoIndex = 0;
        const prevButton = document.getElementById("prev-video");
        const nextButton = document.getElementById("next-video");

        function updateVideo() {
            currentVideoElement.style.transform = 'translateX(-100%)';
            setTimeout(() => {
                currentVideoElement.src = videos[currentVideoIndex];
                currentVideoElement.load();
                currentVideoElement.play();
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

        currentVideoElement.addEventListener('ended', function () {
            currentVideoIndex = (currentVideoIndex + 1) % videos.length;
            updateVideo();
        });

        currentVideoElement.muted = true;
        currentVideoElement.autoplay = true;
        currentVideoElement.playsinline = true;
        currentVideoElement.loop = false;
    }

    // EmailJS Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
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
    }

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

    if (link && closeBtn) {
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
