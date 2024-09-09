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
    const closeModalButton = document.querySelector('.modal .close');
    const backToTopButton = document.getElementById("back-to-top");
    const readMoreLinks = document.querySelectorAll('.read-more-link');
    const closeButtons = document.querySelectorAll('.close');
    const openEcodriveButton = document.getElementById('openEcodriveButton');
    const ecodriveModal = document.getElementById('ecodriveModal');
    const closeEcodriveButton = ecodriveModal.querySelector('.close');
    const elementsToAnimate = document.querySelectorAll('.animate-on-load');
    const sustainabilityMissionButton = document.getElementById('sustainabilityMissionButton');
    const sustainabilityMissionModal = document.getElementById('sustainabilityMissionModal');
    const closeSustainabilityMissionModal = sustainabilityMissionModal.querySelector('.close');

     // Open the modal
    sustainabilityMissionButton.addEventListener('click', function () {
        sustainabilityMissionModal.style.display = 'block';
    });

    // Close the modal with the close button
    closeSustainabilityMissionModal.addEventListener('click', function () {
        sustainabilityMissionModal.style.display = 'none';
    });

    // Close the modal by clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target == sustainabilityMissionModal) {
            sustainabilityMissionModal.style.display = 'none';
        }
    });

    // Video data
    const videos = [
        "videos/chapter-1.mp4", "videos/Chapter-2.mp4", "videos/Chapter-3.mp4",
        "videos/chapter-4.mp4", "videos/Chapter-5.mp4", "videos/chapter6.mp4",
        "videos/Chapter-7.mp4", "videos/Chapter-8.mp4", "videos/Chapter-9.mp4",
        "videos/Chapter-10.mp4"
    ];
    let currentVideoIndex = 0;

    // Functions
    function toggleMenu() {
        mobileNav.classList.toggle('open');
        hamburgerMenu.classList.toggle('open');
    }

    function closeMenu() {
        mobileNav.classList.remove('open');
        hamburgerMenu.classList.remove('open');
    }

    function updateVideo() {
        currentVideoElement.style.transform = 'translateX(-100%)';
        setTimeout(() => {
            currentVideoElement.src = videos[currentVideoIndex];
            currentVideoElement.load();
            currentVideoElement.play();
            currentVideoElement.style.transform = 'translateX(0)';
        }, 500);
    }

    function openModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }

    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
        resetReadMoreLinks();
    }

    function resetReadMoreLinks() {
        readMoreLinks.forEach(link => {
            link.textContent = 'Read More';
        });
    }

    function openEcodriveModal() {
        ecodriveModal.style.display = 'block';
    }

    function closeEcodriveModal() {
        ecodriveModal.style.display = 'none';
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    elementsToAnimate.forEach((element, index) => {
        setTimeout(() => {
            if (index % 2 === 0) {
                element.classList.add('slide-left');
            } else {
                element.classList.add('slide-right');
            }
        }, index * 200); // Delay each animation by 200ms
    });


    // Event Listeners
    if (openEcodriveButton && ecodriveModal) {
        openEcodriveButton.addEventListener('click', function () {
            openEcodriveModal();
        });

        closeEcodriveButton.addEventListener('click', function () {
            closeEcodriveModal();
        });

        window.addEventListener('click', function (event) {
            if (event.target === ecodriveModal) {
                closeEcodriveModal();
            }
        });
    }

    // Event Listeners
    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', function (event) {
            event.stopPropagation();
            toggleMenu();
        });

        document.addEventListener('click', function (event) {
            if (!mobileNav.contains(event.target) && !hamburgerMenu.contains(event.target)) {
                closeMenu();
            }
        });

        mobileNav.addEventListener('click', closeMenu);
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

        // Ensure the video is muted by default
        currentVideoElement.muted = true;
        currentVideoElement.autoplay = true;
        currentVideoElement.playsinline = true;
        currentVideoElement.loop = false;
    }

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

    readMoreLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('data-target').substring(1); // Remove the '#' from the id
            const target = document.getElementById(targetId);
            if (target) {
                target.style.display = target.style.display === 'block' ? 'none' : 'block';
                this.textContent = target.style.display === 'block' ? 'Read Less' : 'Read More';
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modalId = this.parentElement.parentElement.id;
            closeModal(modalId);
        });
    });

    window.addEventListener('click', function (event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
                resetReadMoreLinks();
            }
        });
    });

    if (backToTopButton) {
        backToTopButton.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (openStoreButton && storeModal && closeModalButton) {
        openStoreButton.addEventListener('click', function () {
            storeModal.style.display = 'block';
        });

        closeModalButton.addEventListener('click', function () {
            storeModal.style.display = 'none';
        });

        window.addEventListener('click', function (event) {
            if (event.target === storeModal) {
                storeModal.style.display = 'none';
            }
        });
    }

});
