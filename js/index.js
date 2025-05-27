function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
        });
    }
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effects to Pokémon cards
document.addEventListener('DOMContentLoaded', () => {
    const pokemonCards = document.querySelectorAll('.pokemon-card');
    
    pokemonCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animation = 'bounce 0.6s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.animation = '';
        });
        
        // Add click event for Pokémon details
        card.addEventListener('click', () => {
            const pokemonName = card.dataset.pokemon;
            showPokemonDetails(pokemonName);
        });
    });
});

// Function to show Pokémon details (placeholder)
function showPokemonDetails(pokemonName) {
    alert(`You clicked on ${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}! 
    
In a real application, this would show detailed information about the Pokémon, including stats, abilities, and evolution chain.`);
}

// Add floating animation to navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'translateY(-3px)';
    });
    
    link.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'translateY(0)';
    });
});

// Add sparkle effect on button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cta-btn') || e.target.classList.contains('login-btn')) {
        createSparkleEffect(e.target);
    }
});

function createSparkleEffect(element) {
    const rect = element.getBoundingClientRect();
    const sparkle = document.createElement('div');
    
    sparkle.style.position = 'fixed';
    sparkle.style.left = rect.left + rect.width / 2 + 'px';
    sparkle.style.top = rect.top + rect.height / 2 + 'px';
    sparkle.style.width = '20px';
    sparkle.style.height = '20px';
    sparkle.style.background = 'var(--poke-yellow)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkleEffect 0.8s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 800);
}

// Add sparkle animation keyframes dynamically
const sparkleStyles = `
    @keyframes sparkleEffect {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = sparkleStyles;
document.head.appendChild(styleSheet);

// Add scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease-out';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.pokemon-card, .event-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// Add dynamic background color change on scroll
let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            const hue = (scrollPercent * 3.6) % 360;
            document.documentElement.style.setProperty('--scroll-hue', hue);
            isScrolling = false;
        });
        isScrolling = true;
    }
});