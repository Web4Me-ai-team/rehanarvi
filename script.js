// League of Legends Inspired Game Developer Portfolio

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and effects
    initAnimations();
    initScrollEffects();
    
    // Apply the League of Legends theme particle effects
    createParticles();

    // Handle publication links
    handlePublicationLinks();
    
    // Fix external links
    fixExternalLinks();
});

// Initialize animations for skill bars and sections
function initAnimations() {
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the width from inline style and animate it
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 200);
                
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        // Initially set width to 0 for animation
        skillObserver.observe(bar);
    });
    
    // Add hover effects to navigation
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Create magic effect sound
            playSound('hover');
        });
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.hero-link');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            playSound('button-hover');
        });
        
        button.addEventListener('click', () => {
            if (!button.getAttribute('href').startsWith('mailto:')) {
                playSound('button-click');
            }
        });
    });
}

// Initialize scroll effects
function initScrollEffects() {
    // Get all sections for scroll animation
    const sections = document.querySelectorAll('.section');
    
    // Options for the intersection observer
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Create intersection observer
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observe each section
    sections.forEach(section => {
        section.classList.add('hidden');
        sectionObserver.observe(section);
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .hero-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href;
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Play navigation sound
                    playSound('navigate');
                    
                    // Scroll to the section
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Highlight active section in navigation
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Create particle effects
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    document.body.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        
        // Random size
        const size = Math.random() * 5 + 1;
        
        // Random animation duration
        const duration = Math.random() * 10 + 10;
        
        // Random delay
        const delay = Math.random() * 5;
        
        // Set particle properties
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Add particle to container
        particleContainer.appendChild(particle);
    }
    
    // Add styling for particles
    const style = document.createElement('style');
    style.textContent = `
        .particle-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        }
        
        .particle {
            position: absolute;
            background-color: rgba(10, 200, 185, 0.5);
            border-radius: 50%;
            animation: float linear infinite;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
            10%, 90% {
                transform: translate3d(-1px, 0, 0);
            }
            
            20%, 80% {
                transform: translate3d(2px, 0, 0);
            }
            
            30%, 50%, 70% {
                transform: translate3d(-4px, 0, 0);
            }
            
            40%, 60% {
                transform: translate3d(4px, 0, 0);
            }
        }
        
        .hidden {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .visible {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 1s ease, transform 1s ease;
        }
        
        nav a.active {
            color: var(--primary-color);
        }
        
        nav a.active::after {
            width: 100%;
        }
    `;
    
    document.head.appendChild(style);
}

// Sound effect function (placeholders)
function playSound(type) {
    console.log(`Sound effect: ${type}`);
}

// Handle publication links
function handlePublicationLinks() {
    const urlParams = new URLSearchParams(window.location.search);
    const resumeDataParam = urlParams.get('resumeData');
    
    if (resumeDataParam) {
        try {
            const resumeData = JSON.parse(decodeURIComponent(resumeDataParam));
            
            if (resumeData.publications && resumeData.publications.length) {
                const publicationsContainer = document.getElementById('publications-container');
                if (!publicationsContainer) return;
                
                publicationsContainer.innerHTML = '';
                
                resumeData.publications.forEach(pub => {
                    const pubElement = document.createElement('div');
                    pubElement.className = 'publication-item';
                    
                    let authorText = '';
                    if (pub.authors && pub.authors.length) {
                        authorText = pub.authors.join(', ');
                    }
                    
                    pubElement.innerHTML = `
                        <h3>"${pub.title || 'Untitled Publication'}"</h3>
                        <p class="journal">${pub.journal || ''}</p>
                        <p class="year">${pub.year || ''}</p>
                        <p class="authors">${authorText}</p>
                        ${pub.links ? `
                        <div class="publication-links">
                            <a href="${ensureHttpPrefix(pub.links)}" target="_blank">
                                <i class="fas fa-external-link-alt"></i> View Paper
                            </a>
                        </div>` : ''}
                    `;
                    
                    publicationsContainer.appendChild(pubElement);
                });
            }
        } catch (error) {
            console.error('Error parsing resume data:', error);
        }
    }
}

// Ensure URL has http or https prefix
function ensureHttpPrefix(url) {
    if (!url) return '';
    return url.match(/^https?:\/\//) ? url : `https://${url}`;
}

// Fix all external links
function fixExternalLinks() {
    // Find all a tags with href attributes
    const allLinks = document.querySelectorAll('a[href]');
    
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Skip internal links (starting with # or /) and mailto/tel links
        if (href.startsWith('#') || href.startsWith('/') || 
            href.startsWith('mailto:') || href.startsWith('tel:')) {
            return;
        }
        
        // Skip links that already have a protocol
        if (href.match(/^https?:\/\//)) {
            return;
        }
        
        // Add https:// prefix to external links
        link.setAttribute('href', `https://${href}`);
    });
}
