// js/script.js

// Change header background on scroll
const scrollHeader = () => {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header')
    } else {
        header.classList.remove('scroll-header')
    }
}
window.addEventListener('scroll', scrollHeader)

// Mobile Menu Toggle
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle')

if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu')
        
        // Toggle icon between menu and x
        const icon = navToggle.querySelector('i');
        if(navMenu.classList.contains('show-menu')) {
            icon.classList.remove('bx-menu');
            icon.classList.add('bx-x');
        } else {
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        }
    })
}

// Close menu when clicking a link
const navLink = document.querySelectorAll('.nav-link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    const icon = navToggle.querySelector('i')
    navMenu.classList.remove('show-menu')
    
    // reset icon
    if(icon && icon.classList.contains('bx-x')) {
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
    }
}
navLink.forEach(n => n.addEventListener('click', linkAction))

// Scroll Animation with Intersection Observer
const animateElements = document.querySelectorAll('.fade-up, .fade-in');

const observerOptions = {
    root: null,
    rootMargin: '0px', // Execute animation when it reaches viewport
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animate');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

animateElements.forEach(el => {
    observer.observe(el);
});
