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

// --- Dynamic Article Loading ---
document.addEventListener('click', function(e) {
    const link = e.target.closest('.news-title a') || e.target.closest('.news-card');
    
    if (link) {
        // Find if this click leads to artikel.html
        const href = (e.target.closest('a') && e.target.closest('a').href) || '';
        if (href.includes('artikel.html') || (link.tagName === 'A' && link.href.includes('artikel.html'))) {
            const card = link.closest('.news-card');
            if (card) {
                const titleEl = card.querySelector('.news-title');
                const catEl = card.querySelector('.card-category');
                const imgEl = card.querySelector('img');
                const excerptEl = card.querySelector('.news-excerpt');
                
                const articleData = {
                    title: titleEl ? titleEl.innerText : 'Berita Utama',
                    category: catEl ? catEl.innerText : 'Berita',
                    img: imgEl ? imgEl.src : '',
                    excerpt: excerptEl ? excerptEl.innerText : ''
                };
                
                sessionStorage.setItem('currentArticle', JSON.stringify(articleData));
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // If we are on artikel.html, load the dynamic data
    if (window.location.pathname.includes('artikel.html') || document.title.includes('SUDUT MEDIA')) {
        const articleDataStr = sessionStorage.getItem('currentArticle');
        if (articleDataStr) {
            try {
                const articleData = JSON.parse(articleDataStr);
                
                const titleEl = document.querySelector('.article-title');
                if (titleEl) titleEl.innerText = articleData.title;
                
                const catEl = document.querySelector('.article-category');
                if (catEl) catEl.innerText = articleData.category;
                
                const imgEl = document.querySelector('.article-hero img');
                if (imgEl && articleData.img) imgEl.src = articleData.img;
                
                document.title = articleData.title + " - SUDUT MEDIA";
                
                const firstP = document.querySelector('.article-body p');
                if (firstP && articleData.excerpt && firstP.innerText.includes('SUDUT MEDIA')) {
                    firstP.innerHTML = `<strong>SUDUT MEDIA, Jakarta</strong> - ${articleData.excerpt}... <br><br> ${firstP.innerHTML}`;
                } else if (firstP && articleData.excerpt) {
                   firstP.innerHTML = `<strong>SUDUT MEDIA, Jakarta</strong> - ${articleData.excerpt}...`;
                }
            } catch (e) {
                console.error("Error loading article data", e);
            }
        }
    }
});


// search bar

