// Navigation Management
export class NavigationManager {
  constructor() {
    this.navToggle = document.getElementById('navToggle');
    this.navLinks = document.getElementById('navLinks');
    this.navbar = document.querySelector('.navbar');
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupScrollListener();
  }

  setupEventListeners() {
    this.navToggle?.addEventListener('click', () => this.toggleMenu());
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navToggle?.contains(e.target) && !this.navLinks?.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Close menu when clicking links
    this.navLinks?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
  }

  toggleMenu() {
    this.navToggle?.classList.toggle('active');
    this.navLinks?.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  }

  closeMenu() {
    this.navToggle?.classList.remove('active');
    this.navLinks?.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  setupScrollListener() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      // Navbar background on scroll
      if (currentScroll > 50) {
        this.navbar?.classList.add('scrolled');
      } else {
        this.navbar?.classList.remove('scrolled');
      }
      
      // Hide/show navbar on scroll direction
      if (currentScroll > 100 && currentScroll > lastScroll) {
        this.navbar?.style.transform = 'translateY(-100%)';
      } else {
        this.navbar?.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    });
  }
}