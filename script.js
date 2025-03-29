// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    
    const themeIcon = document.querySelector('.theme-toggle-icon');
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    
    localStorage.setItem('theme', newTheme);
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);
document.querySelector('.theme-toggle-icon').textContent = savedTheme === 'dark' ? '☀️' : '🌙';

// Typing Effect
const phrases = [
    'AI/ML Engineer',
    'Robotics Developer',
    'Full Stack Developer'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeText() {
    const currentPhrase = phrases[phraseIndex];
    const typedText = document.getElementById('typed-text');
    
    if (isDeleting) {
        charIndex--;
        typingDelay = 50;
    } else {
        charIndex++;
        typingDelay = 100;
    }
    
    typedText.textContent = currentPhrase.substring(0, charIndex);
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingDelay = 1000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    
    setTimeout(typeText, typingDelay);
}

// Start typing effect
document.addEventListener('DOMContentLoaded', typeText);

// Skill Bars Animation
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Intersection Observer for skill bars
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
        }
    });
});

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Projects Filter
const projects = [
    {
        title: 'Home Security System',
        category: 'ai',
        image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800&q=80',
        description: 'IoT-based smart home security system using CV and AI.'
    },
    {
        title: 'F1/10th Autonomous Car',
        category: 'robotics',
        image: 'https://images.unsplash.com/photo-1621360841013-c7683c659ec6?w=800&q=80',
        description: 'Autonomous driving algorithms using ROS2 Humble.'
    },
    {
        title: 'Book Kiosk System',
        category: 'web',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
        description: 'Automated book rental and management system.'
    }
];

function loadProjects(category = 'all') {
    const projectsGrid = document.querySelector('.projects-grid');
    const filteredProjects = category === 'all' 
        ? projects 
        : projects.filter(project => project.category === category);
    
    projectsGrid.innerHTML = filteredProjects.map(project => `
        <div class="project-card">
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        </div>
    `).join('');
}

// Initialize projects
loadProjects();

// Project filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');
        loadProjects(e.target.getAttribute('data-filter'));
    });
});

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Here you would typically send the form data to a server
    alert('Message sent successfully!');
    contactForm.reset();
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Smooth Scrolling with error handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        } else {
            console.warn('Target element not found:', this.getAttribute('href'));
        }
    });
});