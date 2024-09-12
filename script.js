document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const contactForm = document.getElementById('contact-form');
    const currentVideoElement = document.getElementById("current-video");
    const prevButton = document.getElementById("prev-video");
    const nextButton = document.getElementById("next-video");
    const openStoreButton = document.getElementById('openStoreButton');
    const storeModal = document.getElementById('storeModal');
    const openEcodriveButton = document.getElementById('openEcodriveButton');
    const ecodriveModal = document.getElementById('ecodriveModal');
    const sustainabilityMissionButton = document.getElementById('sustainabilityMissionButton');
    const sustainabilityMissionModal = document.getElementById('sustainabilityMissionModal');
    const leftButtons = document.querySelectorAll('.left-button');
    const readMoreLinks = document.querySelectorAll('.read-more-link');
    const closeButtons = document.querySelectorAll('.close');
    const elementsToAnimate = document.querySelectorAll('.animate-on-load');
    const backToTopButton = document.getElementById("back-to-top");

    // Function to Open Modals
    function openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Function to Close Modals
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Specific functions to open and close Ecodrive and Store modals
    function openEcodriveModal() {
        openModal(ecodriveModal);
    }

    function closeEcodriveModal() {
        closeModal(ecodriveModal);
    }

    function openStoreModal() {
        openModal(storeModal);
    }

    function closeStoreModal() {
        closeModal(storeModal);
    }

    // Event Listeners for Opening Modals
    if (sustainabilityMissionButton) {
        sustainabilityMissionButton.addEventListener('click', function () {
            openModal(sustainabilityMissionModal);
        });
    }
    if (openEcodriveButton) {
        openEcodriveButton.addEventListener('click', openEcodriveModal);
    }
    if (openStoreButton) {
        openStoreButton.addEventListener('click', openStoreModal);
    }

    // Event Listeners for Closing Ecodrive Modal
    const closeEcodriveButtons = document.querySelectorAll('.close-ecodrive-modal');
    closeEcodriveButtons.forEach(button => {
        button.addEventListener('click', closeEcodriveModal);
    });

    // Event Listeners for Closing Store Modal
    const closeStoreButtons = document.querySelectorAll('.close-store-modal');
    closeStoreButtons.forEach(button => {
        button.addEventListener('click', closeStoreModal);
    });

    // Event Listeners for Closing Other Modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = button.closest('.modal');
            if (modal) closeModal(modal);
        });
    });

    // Close Modals When Clicking Outside
    window.addEventListener('click', function (event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });

    // Close All Modals on Left Button Click
    leftButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = button.closest('.modal');
            if (modal) closeModal(modal);
        });
    });

    // Hamburger Menu Toggle
    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', function (event) {
            event.stopPropagation();
            mobileNav.classList.toggle('open');
            hamburgerMenu.classList.toggle('open');
        });

        document.addEventListener('click', function (event) {
            if (!mobileNav.contains(event.target) && !hamburgerMenu.contains(event.target)) {
                mobileNav.classList.remove('open');
                hamburgerMenu.classList.remove('open');
            }
        });

        mobileNav.addEventListener('click', function () {
            mobileNav.classList.remove('open');
            hamburgerMenu.classList.remove('open');
        });
    }

    // Video Controls
    const videos = [
        "videos/chapter-1.mp4", "videos/Chapter-2.mp4", "videos/Chapter-3.mp4",
        "videos/chapter-4.mp4", "videos/Chapter-5.mp4", "videos/chapter6.mp4",
        "videos/Chapter-7.mp4", "videos/Chapter-8.mp4", "videos/Chapter-9.mp4",
        "videos/Chapter-10.mp4"
    ];
    let currentVideoIndex = 0;

    function updateVideo() {
        currentVideoElement.style.transform = 'translateX(-100%)';
        setTimeout(() => {
            currentVideoElement.src = videos[currentVideoIndex];
            currentVideoElement.load();
            currentVideoElement.play();
            currentVideoElement.style.transform = 'translateX(0)';
        }, 500);
    }

    if (prevButton && nextButton && currentVideoElement) {
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

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate Elements on Load
    elementsToAnimate.forEach((element, index) => {
        setTimeout(() => {
            if (index % 2 === 0) {
                element.classList.add('slide-left');
            } else {
                element.classList.add('slide-right');
            }
        }, index * 200);
    });

    // Contact Form Handling
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

    // Read More Links Toggle
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('data-target').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.style.display = target.style.display === 'block' ? 'none' : 'block';
                this.textContent = target.style.display === 'block' ? 'Read Less' : 'Read More';
            }
        });
    });

    // Back to Top Button
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
