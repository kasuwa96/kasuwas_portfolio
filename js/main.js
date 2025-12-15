// Main Application File
import { ThemeManager } from './modules/theme.js';
import { NavigationManager } from './modules/navigation.js';
import { AnimationManager } from './modules/animations.js';
import { ParticleSystem } from './modules/particles.js';
import { ContactForm } from './modules/form.js';

class PortfolioApp {
  constructor() {
    this.modules = {};
    this.init();
  }

  init() {
    // Initialize all modules
    this.modules.theme = new ThemeManager();
    this.modules.navigation = new NavigationManager();
    this.modules.animations = new AnimationManager();
    this.modules.particles = new ParticleSystem();
    this.modules.contactForm = new ContactForm();
    
    // Set current year in footer
    this.setCurrentYear();
    
    // Initialize any other global functionality
    this.setupGlobalListeners();
    
    console.log('Portfolio App Initialized 🚀');
  }

  setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  setupGlobalListeners() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Prevent form submission for demo newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        input.value = '';
        alert('Thanks for subscribing! (This is a demo)');
      });
    }
    
    // Lazy load images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

// Export for debugging
window.PortfolioApp = PortfolioApp;