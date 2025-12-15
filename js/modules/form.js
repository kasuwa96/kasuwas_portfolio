// Contact Form Management
export class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.formStatus = document.getElementById('formStatus');
    this.init();
  }

  init() {
    if (this.form) {
      this.setupEventListeners();
    }
  }

  setupEventListeners() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Input validation
    this.form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';

    switch (field.type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
        message = 'Please enter a valid email address';
        break;
      
      case 'text':
        isValid = value.length >= 2;
        message = field.id === 'name' ? 'Name must be at least 2 characters' : 'Subject is required';
        break;
      
      case 'textarea':
        isValid = value.length >= 10;
        message = 'Message must be at least 10 characters';
        break;
    }

    if (!isValid && value) {
      this.showFieldError(field, message);
      return false;
    }

    this.clearFieldError(field);
    return true;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    let errorElement = field.parentElement.querySelector('.field-error');
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'field-error';
      field.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
  }

  clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    const fields = this.form.querySelectorAll('input, textarea');
    let isValid = true;
    
    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    
    if (!isValid) {
      this.showStatus('Please fix the errors above', 'error');
      return;
    }
    
    // Get form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
      // In production, replace with actual API endpoint
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, always show success
      this.showStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
      this.form.reset();
      
      // Clear floating labels
      this.form.querySelectorAll('input, textarea').forEach(field => {
        field.dispatchEvent(new Event('input'));
      });
      
    } catch (error) {
      this.showStatus('Something went wrong. Please try again.', 'error');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  showStatus(message, type) {
    this.formStatus.textContent = message;
    this.formStatus.className = `form-status ${type}`;
    
    setTimeout(() => {
      this.formStatus.style.opacity = '0';
      setTimeout(() => {
        this.formStatus.className = 'form-status';
        this.formStatus.style.opacity = '1';
      }, 300);
    }, 5000);
  }
}