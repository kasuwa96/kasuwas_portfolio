// script.js - Portfolio Functionality

// DOM Elements
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const currentYear = document.getElementById('currentYear');
const skillLevels = document.querySelectorAll('.skill-level');

// Set current year in footer
currentYear.textContent = new Date().getFullYear();

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling for navigation links