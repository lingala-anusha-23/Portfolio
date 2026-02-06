// Toggle Menu
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

// Scroll Sections Active Link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
    
    // Sticky Header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    
    // Remove toggle icon and navbar when click navbar link (scroll)
    menuIcon.classList.remove('fa-times');
    navbar.classList.remove('active');
};

// Toggle Skills Categories
const skillCategories = document.querySelectorAll('.skills-category');

skillCategories.forEach(category => {
    const header = category.querySelector('.category-header');
    const toggle = category.querySelector('.category-toggle');
    
    header.addEventListener('click', () => {
        category.classList.toggle('active');
    });
});

// Typing Text Animation
const animatedText = document.querySelector('.animated-text');
const roles = [
    "AI/ML Enthusiast🤖🧠",
    "Front-end Web Developer💻👨‍💻",
    "Python Programmer🐍💻", 
    "Problem Solver🔍✨",
    "Robotics Enthusiast🔧👾"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeText() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        // Delete character
        animatedText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Type character
        animatedText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    // Determine typing speed
    let typeSpeed = 100;
    if (isDeleting) {
        typeSpeed /= 2; // Faster deletion
    }

    // When word is complete
    if (!isDeleting && charIndex === currentRole.length) {
        isEnd = true;
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex++;
        if (roleIndex === roles.length) {
            roleIndex = 0; // Loop back to first role
        }
        typeSpeed = 500; // Pause before typing next
    }

    setTimeout(typeText, typeSpeed);
}

// Add blinking cursor
const style = document.createElement('style');
style.textContent = `
    .animated-text::after {
        content: "|";
        animation: blink 0.7s infinite;
    }
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Start typing animation
setTimeout(typeText, 1000);


ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .education-container, .projects-box, .contact form, .certifications-container', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// Animate skill level bars on scroll
const skillCards = document.querySelectorAll('.skill-card');

const animateSkillBars = () => {
    skillCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            const levelBar = card.querySelector('.level-bar');
            const width = levelBar.style.width;
            levelBar.style.width = '0';
            setTimeout(() => {
                levelBar.style.width = width;
            }, 100);
        }
    });
};

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Open all skills categories by default on page load
document.addEventListener('DOMContentLoaded', () => {
    skillCategories.forEach(category => {
        category.classList.add('active');
    });
});