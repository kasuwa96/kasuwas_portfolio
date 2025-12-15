// Animation Management
export class AnimationManager {
  constructor() {
    this.observers = [];
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.setupTypingAnimation();
    this.setupCounterAnimations();
    this.setupSkillAnimations();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
      observer.observe(el);
    });
  }

  setupScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
  }

  setupTypingAnimation() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;

    const titles = [
      'Full Stack Engineer',
      'Cloud Architect',
      'UI/UX Enthusiast',
      'Problem Solver'
    ];
    
    let currentTitle = 0;
    let currentChar = 0;
    let isDeleting = false;
    let isEnd = false;

    const type = () => {
      const current = titles[currentTitle];
      
      if (isDeleting) {
        typingText.textContent = current.substring(0, currentChar - 1);
        currentChar--;
      } else {
        typingText.textContent = current.substring(0, currentChar + 1);
        currentChar++;
      }

      if (!isDeleting && currentChar === current.length) {
        isEnd = true;
        setTimeout(() => {
          isDeleting = true;
          type();
        }, 1500);
      } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentTitle = (currentTitle + 1) % titles.length;
        setTimeout(() => type(), 500);
      } else {
        const speed = isDeleting ? 50 : 100;
        setTimeout(() => type(), speed);
      }
    };

    // Start typing animation
    setTimeout(() => type(), 1000);
  }

  setupCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.count);
          const increment = target / 100;
          let current = 0;
          
          const updateCounter = () => {
            if (current < target) {
              current += increment;
              counter.textContent = Math.floor(current);
              setTimeout(updateCounter, 20);
            } else {
              counter.textContent = target + '+';
            }
          };
          
          updateCounter();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  setupSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.dataset.level;
          bar.style.width = `${level}%`;
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
  }
}