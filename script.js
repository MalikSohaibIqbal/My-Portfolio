document.addEventListener("DOMContentLoaded", function () {
    /* Title and Favicon Blink on Blur */
    const originalTitle = document.title;
    const originalFavicon = document.querySelector("link[rel='icon']") || document.createElement("link");
    let blinkInterval;

    originalFavicon.rel = "icon";
    originalFavicon.href = "favicon.ico"; // Set your actual favicon
    document.head.appendChild(originalFavicon);

    window.addEventListener("blur", function () {
        let count = 0;
        blinkInterval = setInterval(() => {
            document.title = (count % 2 === 0) ? "👀 Come Back to Portfolio!" : "🚀 Missing You!";
            count++;
        }, 1000);
        originalFavicon.href = "https://cdn-icons-png.flaticon.com/512/42/42474.png";
    });

    window.addEventListener("focus", function () {
        clearInterval(blinkInterval);
        document.title = originalTitle;
        originalFavicon.href = "favicon.ico";
    });

    /* Mobile Menu Toggle */
    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuLinks = document.querySelectorAll(".mobile-menu a");

    menuBtn.addEventListener("click", () => mobileMenu.classList.add("active"));
    closeBtn.addEventListener("click", () => mobileMenu.classList.remove("active"));
    menuLinks.forEach(link => link.addEventListener("click", () => mobileMenu.classList.remove("active")));

    /* Typing Effect */
    const textElement = document.querySelector(".typing");
    const textArray = ["WordPress Developer", "Junior Frontend Developer", "UI/UX Designer", "QA Tester"];
    let textIndex = 0, charIndex = 0, isDeleting = false, lastTime = 0;

    function typeEffect(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const elapsed = timestamp - lastTime;

        if (elapsed > (isDeleting ? 50 : 100)) {
            const currentText = textArray[textIndex];
            textElement.textContent = currentText.substring(0, charIndex);

            isDeleting ? charIndex-- : charIndex++;

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => isDeleting = true, 1000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
            }
            lastTime = timestamp;
        }
        requestAnimationFrame(typeEffect);
    }
    requestAnimationFrame(typeEffect);

    /* Particles Effect */
    tsParticles.load("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 900 } },
            color: { value: ["#468bb3", "#4CAF50", "#FF9800"] },
            shape: { type: ["circle", "square", "triangle"] },
            opacity: { value: 0.6, random: true },
            size: { value: 4, random: true, anim: { enable: true, speed: 2, size_min: 0.1 } },
            move: { enable: true, speed: 1.5, out_mode: "bounce" },
            line_linked: { enable: true, distance: 140, color: "#468bb3", opacity: 0.4, width: 1 },
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: ["grab", "repulse"] },
                onclick: { enable: true, mode: "bubble" },
            },
        }
    });

    /* 3D Image Tilt Effect */
    const profilePic = document.querySelector(".hero-image,.timeline-content");
    profilePic.addEventListener("mousemove", (e) => {
        const { width, height, left, top } = profilePic.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 10;
        const y = (e.clientY - top - height / 2) / 10;
        profilePic.style.transform = `perspective(500px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    profilePic.addEventListener("mouseleave", () => {
        profilePic.style.transform = "perspective(500px) rotateX(0deg) rotateY(0deg)";
    });

    /* Timeline Animation */
    const timelineItems = document.querySelectorAll(".timeline-item,.timeline-content");
    const progressLine = document.querySelector(".timeline-progress,.timeline-content");

    function showTimelineItems() {
        let triggerHeight = window.innerHeight * 0.8;
        let visibleItems = 0;
        timelineItems.forEach((item, index) => {
            let itemTop = item.getBoundingClientRect().top;
            if (itemTop < triggerHeight) {
                item.classList.add("show");
                visibleItems = index + 1;
            }
        });
        let totalHeight = timelineItems.length * 100;
        let progressHeight = (visibleItems / timelineItems.length) * totalHeight;
        progressLine.style.height = `${progressHeight}px`;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach((item) => observer.observe(item));

    /* Smooth Scroll to Resume */
    document.querySelector(".resume-button").addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector("#resume").scrollIntoView({ behavior: "smooth" });
    });

    /* Header Scroll Effect */
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 50);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const skillElements = document.querySelectorAll('.skill');
    const options = {
        threshold: 1 // Trigger when 50% of section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Run only once
            }
        });
    }, options);

    skillElements.forEach(skill => observer.observe(skill));
});
