// Performance optimized portfolio JavaScript

// DOM elements cache for better performance
const elements = {
    particlesContainer: document.getElementById('particles-js'),
    portfolioWindow: document.getElementById('portfolio-window'),
    startButton: document.getElementById('start-button'),
    startMenu: document.getElementById('start-menu'),
    darkModeToggle: document.getElementById('dark-mode-toggle'),
    timeDisplay: document.getElementById('time-display'),
    typedText: document.getElementById('typed-text'),
    cursor: document.querySelector('.cursor'),
    navItems: document.querySelectorAll('.nav-item'),
    sections: document.querySelectorAll('.section'),
    desktopIcons: document.querySelectorAll('.desktop-icon'),
    windowControls: document.querySelectorAll('.window-controls button'),
    startMenuItems: document.querySelectorAll('.start-menu-item')
};

// Configuration for performance
const config = {
    typingSpeed: 100,
    particlesEnabled: true,
    particlesCount: 50, // Reduced for performance
    darkMode: localStorage.getItem('darkMode') === 'true'
};

// Initialize particles with optimized settings
function initParticles() {
    if (!config.particlesEnabled || !elements.particlesContainer) return;

    particlesJS('particles-js', {
        particles: {
            number: {
                value: config.particlesCount,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: false // Disabled for performance
                },
                onclick: {
                    enable: false // Disabled for performance
                }
            }
        },
        retina_detect: false // Disabled for performance
    });
}

// Typing animation with performance optimization
function typeWriter(text, i = 0) {
    if (i < text.length) {
        elements.typedText.textContent += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), config.typingSpeed);
    } else {
        elements.cursor.style.animation = 'blink 1s infinite';
    }
}

// Optimized section switching
function switchSection(sectionId) {
    // Use requestAnimationFrame for smooth transitions
    requestAnimationFrame(() => {
        elements.navItems.forEach(item => item.classList.remove('active'));
        elements.sections.forEach(section => section.classList.add('hidden'));

        const targetNav = document.querySelector(`[data-section="${sectionId}"]`);
        const targetSection = document.getElementById(sectionId);

        if (targetNav) targetNav.classList.add('active');
        if (targetSection) targetSection.classList.remove('hidden');
    });
}

// Optimized window management
function toggleWindow(show = true) {
    if (show) {
        elements.portfolioWindow.style.display = 'block';
        // Force reflow for smooth animation
        elements.portfolioWindow.offsetHeight;
        elements.portfolioWindow.style.opacity = '1';
        elements.portfolioWindow.style.transform = 'scale(1)';
    } else {
        elements.portfolioWindow.style.opacity = '0';
        elements.portfolioWindow.style.transform = 'scale(0.95)';
        setTimeout(() => {
            elements.portfolioWindow.style.display = 'none';
        }, 300);
    }
}

// Optimized start menu toggle
function toggleStartMenu(show = true) {
    if (show) {
        elements.startMenu.classList.remove('hidden');
    } else {
        elements.startMenu.classList.add('hidden');
    }
}

// Dark mode toggle with performance optimization
function toggleDarkMode() {
    config.darkMode = !config.darkMode;
    document.documentElement.setAttribute('data-theme', config.darkMode ? 'dark' : 'light');
    elements.darkModeToggle.textContent = config.darkMode ? '☀️' : '🌙';
    localStorage.setItem('darkMode', config.darkMode);
}

// Optimized clock update
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    elements.timeDisplay.textContent = timeString;
}

// Event listeners with passive options for performance
function initEventListeners() {


    // Navigation items
    elements.navItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            switchSection(section);
        }, { passive: true });
    });

    // Start menu items
    elements.startMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            switchSection(section);
            toggleWindow(true);
            toggleStartMenu(false);
        }, { passive: true });
    });

    // Window controls
    elements.windowControls.forEach(control => {
        control.addEventListener('click', () => {
            if (control.classList.contains('close')) {
                toggleWindow(false);
            } else if (control.classList.contains('minimize')) {
                toggleWindow(false);
            } else if (control.classList.contains('maximize')) {
                // Toggle maximize logic could be added here
            }
        }, { passive: true });
    });

    // Start button
    elements.startButton.addEventListener('click', () => {
        toggleStartMenu(!elements.startMenu.classList.contains('hidden'));
    }, { passive: true });

    // Dark mode toggle
    elements.darkModeToggle.addEventListener('click', toggleDarkMode, { passive: true });

    // Drag functionality helper function
    function addDragFunctionality(element, container) {
        let isDragging = false;
        let startX, startY, initialX, initialY;

        element.addEventListener('dragstart', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            const rect = element.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
            element.style.opacity = '0.5';
            e.dataTransfer.effectAllowed = 'move';
        });

        element.addEventListener('dragend', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                const newLeft = initialX + deltaX;
                const newTop = initialY + deltaY;

                // Constrain to container area
                const containerRect = container.getBoundingClientRect();
                const elementRect = element.getBoundingClientRect();

                const constrainedLeft = Math.max(0, Math.min(newLeft, containerRect.width - elementRect.width));
                const constrainedTop = Math.max(0, Math.min(newTop, containerRect.height - elementRect.height));

                element.style.position = 'absolute';
                element.style.left = constrainedLeft + 'px';
                element.style.top = constrainedTop + 'px';
                element.style.opacity = '1';
            }
            isDragging = false;
        });
    }

    // Desktop icons
    elements.desktopIcons.forEach(icon => {
        // Click functionality
        icon.addEventListener('click', () => {
            const url = icon.dataset.url;
            const section = icon.dataset.section;
            if (url) {
                window.open(url, '_blank');
            } else if (section) {
                switchSection(section);
                toggleWindow(true);
            }
        }, { passive: true });

        // Add drag functionality
        addDragFunctionality(icon, document.querySelector('.desktop'));
    });

    // Sidebar navigation items
    elements.navItems.forEach(item => {
        // Click functionality (already handled above)
        // Add drag functionality
        addDragFunctionality(item, document.querySelector('.sidebar'));
    });

    // Start menu items
    elements.startMenuItems.forEach(item => {
        // Click functionality (already handled above)
        // Add drag functionality
        addDragFunctionality(item, document.querySelector('.start-menu-content'));
    });

    // Prevent default drag behavior globally
    document.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    // Add drop functionality to containers
    const desktop = document.querySelector('.desktop');
    const sidebar = document.querySelector('.sidebar');
    const startMenuContent = document.querySelector('.start-menu-content');

    [desktop, sidebar, startMenuContent].forEach(container => {
        if (container) {
            container.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            });

            container.addEventListener('drop', (e) => {
                e.preventDefault();
                // The drop logic is handled in the dragend event of each element
            });
        }
    });

    // Close menus on outside click
    document.addEventListener('click', (e) => {
        if (!elements.startButton.contains(e.target) && !elements.startMenu.contains(e.target)) {
            toggleStartMenu(false);
        }
    }, { passive: true });
}

// Initialize application
function init() {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', config.darkMode ? 'dark' : 'light');
    elements.darkModeToggle.textContent = config.darkMode ? '☀️' : '🌙';

    // Initialize particles
    initParticles();

    // Start typing animation
    const aboutText = "I'm a passionate developer creating innovative solutions and beautiful user experiences.";
    setTimeout(() => typeWriter(aboutText), 1000);

    // Initialize event listeners
    initEventListeners();

    // Start clock
    updateClock();
    setInterval(updateClock, 1000);

    // Show portfolio window on load
    setTimeout(() => toggleWindow(true), 500);
}

// Performance optimization: Use requestIdleCallback if available
if ('requestIdleCallback' in window) {
    requestIdleCallback(init);
} else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(init, 100);
}

// Service worker registration for caching (optional performance boost)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Note: Service worker would need to be created separately
        // navigator.serviceWorker.register('/sw.js');
    });
}
