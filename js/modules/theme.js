// Theme Management
export class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.html = document.documentElement;
    this.init();
  }

  init() {
    this.loadTheme();
    this.setupEventListeners();
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    this.setTheme(savedTheme);
  }

  setTheme(theme) {
    this.html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const currentTheme = this.html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setupEventListeners() {
    this.themeToggle?.addEventListener('click', () => this.toggleTheme());
  }
}