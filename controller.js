// GSAP Typewriter Effect - Types out the full title with line break
gsap.registerPlugin(TextPlugin);

// Create the full text with HTML line break
const typewriterElement = document.getElementById('typewriter');

// First line
gsap.to("#typewriter", {
    duration: 1.2,
    text: "Elite Security",
    ease: "none",
    delay: 0.3,
    onComplete: function() {
        // Add line break
        typewriterElement.innerHTML = "Elite Security<br>";
        // Second line
        gsap.to("#typewriter", {
            duration: 1,
            text: {value: "Elite Security<br>Operations"},
            ease: "none",
            delay: 0.2
        });
    }
});

// Prefill Service Function
window.prefillService = function(serviceName) {
    const contactSection = document.getElementById('contact');
    
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    setTimeout(() => {
        const messageField = document.getElementById('message');
        
        if (messageField) {
            messageField.value = "I'm interested in learning more about " + serviceName + ".";
            messageField.focus();
        } else {
            console.error('Message field not found!');
        }
    }, 800);
}

// Scroll Functions
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function scrollToServices() {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
}

// Add event listeners to all service links after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    const serviceLinks = document.querySelectorAll('.service-link');
    
    serviceLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
            window.prefillService(this.dataset.service);
        });
    });
});

// Mobile Menu
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for contacting Arden Risk. Our security specialists will respond within 24 hours.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});