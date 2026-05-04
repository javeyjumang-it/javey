document.addEventListener("DOMContentLoaded", () => {

    // --- UTILITY FUNCTIONS ---
    // Glow function for clicks
    function addGlow(el) {
        el.classList.add("glow-click");
        setTimeout(() => el.classList.remove("glow-click"), 400);
    }

    // Set active nav link
    function setActive(el) {
        document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
        el.classList.add("active");
    }

    // --- NAVIGATION & SCROLL SPY ---

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    // Smooth scroll nav and set active on click
    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                // Adjust scroll position to account for sticky header height (60px)
                window.scrollTo({
                    top: target.offsetTop - 60,
                    behavior: "smooth"
                });
            }
            setActive(link);
        });
    });

    // Scroll spy for updating active nav link while scrolling
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(sec => {
            // Check if the current scroll position is past the top of the section (minus an offset)
            const offset = sec.offsetTop - 200;
            if (pageYOffset >= offset) current = sec.getAttribute("id");
        });

        navLinks.forEach(a => {
            if (a.getAttribute("href") === "#" + current) {
                setActive(a);
            }
        });
    });

    // --- HOME SECTION (DYNAMIC TEXT ROTATOR) ---
    const homeDescEl = document.getElementById("home-description");
    const descriptions = ["Front-end Developer", "VIDEO Editor", "Power Point Expert"];
    let idx = 0;
    setInterval(() => {
        homeDescEl.style.opacity = 0;
        setTimeout(() => {
            idx = (idx + 1) % descriptions.length;
            homeDescEl.textContent = descriptions[idx];
            homeDescEl.style.opacity = 1;
        }, 350); // Match CSS transition time for smooth fade
    }, 4000);

    // --- CLICK EFFECTS (FRAMES AND BUTTONS) ---

    // Frame clicks (Avatar and About) - PROBLEM 1 SOLUTION
    document.querySelectorAll(".avatar-wrap").forEach(f => f.addEventListener("click", (e) => {
        addGlow(e.currentTarget.querySelector(".glow")); // Target the inner .glow element
    }));
    
    // Frame clicks for all project cards
    document.querySelectorAll(".project-thumb").forEach(f => f.addEventListener("click", (e) => {
        addGlow(e.currentTarget); // Apply glow directly to the thumb wrapper
    }));

    // Hero buttons
    document.getElementById("download-cv").addEventListener("click", (e) => {
        addGlow(e.currentTarget);
    });
    document.getElementById("contact-btn").addEventListener("click", (e) => {
        addGlow(e.currentTarget);
    });

    // Social buttons
    document.getElementById("facebook").addEventListener("click", (e) => {
        window.open("https://facebook.com", "_blank");
        addGlow(e.currentTarget);
    });
    document.getElementById("tiktok").addEventListener("click", (e) => {
        window.open("https://tiktok.com", "_blank");
        addGlow(e.currentTarget);
    });
    document.getElementById("instagram").addEventListener("click", (e) => {
        window.open("https://instagram.com", "_blank");
        addGlow(e.currentTarget);
    });

    // --- SERVICES SECTION (HORIZONTAL TOOL SLIDESHOW) - PROBLEM 2 SOLUTION ---
    const toolsContainer = document.getElementById("tools-container");
    const tools = ["Figma", "Deepseek", "Canva", "Capcut", "React", "Next.js", "Node.js", "PPT", "ChatGPT", "Blackbox", "Javascript", "HTML", "CSS", "Adobe XD", "WPS", "Illustrator", "Photoshop", "Premiere Pro", "Chart.js", "Storybook"];

    // Create the wrapper for the animation
    const scrollAnimate = document.createElement("div");
    scrollAnimate.classList.add("scroll-animate");

    // Function to build and append tool items
    function appendTools(container) {
        tools.forEach((t) => {
            const div = document.createElement("div");
            div.classList.add("tool-item"); // Styled in CSS for the horizontal slideshow
            div.textContent = t;
            
            // Add move and glow effect to the dynamic tool items
            div.addEventListener("click", (e) => addGlow(e.currentTarget)); 
            container.appendChild(div);
        });
    }

    // Append the tool list TWICE inside the wrapper for the seamless loop
    appendTools(scrollAnimate); // First set
    appendTools(scrollAnimate); // Second set (MUST be identical for the loop)
    
    // Insert the wrapper into the container
    toolsContainer.appendChild(scrollAnimate);
    
    // Set the overall container class to trigger CSS styles
    toolsContainer.classList.add("horizontal-slide");


    // --- VIEWPORT ADJUSTMENTS (Optional modern approach for mobile height) ---
    // Note: The min-height is already set in CSS, but this helps on mobile browsers
    function setViewportHeight() {
        // Set --vh to 1% of the viewport height (accounts for mobile address bar changes)
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Call on load and resize (optional: set 'resize' and 'load' listeners)
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('load', setViewportHeight);
    setViewportHeight(); // Initial call
});