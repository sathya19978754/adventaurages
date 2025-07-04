// Adventurage Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeAccordions();
    initializeTabs();
    initializeFilters();
    initializeMobileMenu();
    initializeSearch();
    initializeFormValidation();
    initializeSmoothScroll();
    initializePage();
});

// Accordion Functionality for Collapsible Sections
function initializeAccordions() {
    const accordionHeaders = document.querySelectorAll('[data-bs-toggle="collapse"]');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-bs-target');
            const targetElement = document.querySelector(targetId);
            const arrowIcon = this.querySelector('.arrow-icon');
            
            if (targetElement && arrowIcon) {
                // Toggle arrow rotation
                if (targetElement.classList.contains('show')) {
                    arrowIcon.style.transform = 'rotate(0deg)';
                } else {
                    arrowIcon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });
}

// Tab Functionality for Destination/Activities/Collections
function initializeTabs() {
    const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetTab = this.getAttribute('data-bs-target');
            const targetContent = document.querySelector(targetTab);
            
            // Remove active class from all tab buttons and content
            document.querySelectorAll('[data-bs-toggle="tab"]').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('show', 'active');
            });
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            if (targetContent) {
                targetContent.classList.add('show', 'active');
            }
        });
    });
}

// Filter Functionality for Tours Page
function initializeFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-content input[type="checkbox"]');
    
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            filterTours();
            updateActiveFilters();
        });
    });
}

// Filter Tours Based on Selected Criteria
function filterTours() {
    const activityFilters = getCheckedValues('activity');
    const difficultyFilters = getCheckedValues('difficulty');
    const destinationFilters = getCheckedValues('destination');
    
    const tourCards = document.querySelectorAll('.tour-result-card');
    
    tourCards.forEach(card => {
        let shouldShow = true;
        
        // Get tour data from card content
        const tourTitle = card.querySelector('.tour-title')?.textContent.toLowerCase() || '';
        const tourLocation = card.querySelector('.tour-location')?.textContent.toLowerCase() || '';
        const difficultyLevel = card.querySelector('.difficulty-level')?.textContent.toLowerCase() || '';
        
        // Check activity filters
        if (activityFilters.length > 0) {
            const hasMatchingActivity = activityFilters.some(activity => {
                if (activity === 'hiking' && (tourTitle.includes('trek') || tourTitle.includes('climb'))) return true;
                if (activity === 'cycling' && tourTitle.includes('cycle')) return true;
                if (activity === 'rafting' && tourTitle.includes('raft')) return true;
                if (activity === 'snorkeling' && tourTitle.includes('snorkel')) return true;
                if (activity === 'northern lights' && tourTitle.includes('aurora')) return true;
                return false;
            });
            if (!hasMatchingActivity) shouldShow = false;
        }
        
        // Check difficulty filters
        if (difficultyFilters.length > 0 && !difficultyFilters.includes(difficultyLevel)) {
            shouldShow = false;
        }
        
        // Check destination filters
        if (destinationFilters.length > 0) {
            const hasMatchingDestination = destinationFilters.some(destination => {
                if (destination === 'europe' && (tourLocation.includes('france') || tourLocation.includes('italy') || tourLocation.includes('switzerland') || tourLocation.includes('norway'))) return true;
                if (destination === 'africa' && (tourLocation.includes('morocco') || tourLocation.includes('africa'))) return true;
                if (destination === 'asia' && tourLocation.includes('georgia')) return true;
                if (destination === 'oceania' && tourLocation.includes('new zealand')) return true;
                if (destination === 'north america' && (tourLocation.includes('pennsylvania') || tourLocation.includes('us'))) return true;
                return false;
            });
            if (!hasMatchingDestination) shouldShow = false;
        }
        
        // Show or hide the card
        card.closest('.col-md-6').style.display = shouldShow ? 'block' : 'none';
    });
}

// Get checked checkbox values by name attribute
function getCheckedValues(name) {
    const checkedBoxes = document.querySelectorAll(`input[name="${name}"]:checked, input[id*="${name}"]:checked`);
    return Array.from(checkedBoxes).map(checkbox => checkbox.id.replace(name, '').toLowerCase());
}

// Update active filters display
function updateActiveFilters() {
    const activeFiltersContainer = document.querySelector('.active-filters');
    if (!activeFiltersContainer) return;
    
    const allCheckedBoxes = document.querySelectorAll('.filter-content input[type="checkbox"]:checked');
    
    // Clear existing active filters (except the header)
    const existingFilters = activeFiltersContainer.querySelectorAll('.active-filter-tag');
    existingFilters.forEach(filter => filter.remove());
    
    // Add new active filter tags
    allCheckedBoxes.forEach(checkbox => {
        const filterTag = document.createElement('span');
        filterTag.className = 'active-filter-tag badge bg-primary me-2 mb-2';
        filterTag.textContent = checkbox.nextElementSibling.textContent;
        
        // Add remove functionality
        filterTag.addEventListener('click', function() {
            checkbox.checked = false;
            filterTours();
            updateActiveFilters();
        });
        
        activeFiltersContainer.appendChild(filterTag);
    });
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            const searchTerm = this.value.toLowerCase();
            const tourCards = document.querySelectorAll('.tour-result-card');
            
            tourCards.forEach(card => {
                const title = card.querySelector('.tour-title')?.textContent.toLowerCase() || '';
                const location = card.querySelector('.tour-location')?.textContent.toLowerCase() || '';
                
                const shouldShow = title.includes(searchTerm) || location.includes(searchTerm);
                card.closest('.col-md-6').style.display = shouldShow ? 'block' : 'none';
            });
        }, 300));
    }
}

// Mobile Menu Toggle
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.navbar-toggler');
    const navMenu = document.querySelector('.navbar-collapse');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
            });
        });
    }
}

// Form Validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                e.stopPropagation();
            }
            this.classList.add('was-validated');
        });
    });
}

// Validate Form Function
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        }
    });
    
    return isValid;
}

// Smooth Scroll for Anchor Links
function initializeSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Utility Functions

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Loading animation helpers
function showLoading(element, message = 'Loading...') {
    const loadingHTML = `
        <div class="d-flex justify-content-center align-items-center p-4">
            <div class="spinner-border text-primary me-2" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <span>${message}</span>
        </div>
    `;
    element.innerHTML = loadingHTML;
}

function hideLoading(element, originalContent) {
    element.innerHTML = originalContent;
}

// Animation on scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate in
    const animatedElements = document.querySelectorAll('.tour-card, .destination-card, .guide-card, .feature-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
});

// Handle window resize
window.addEventListener('resize', function() {
    // Recalculate any layout-dependent features
    const sidebar = document.querySelector('.filters-sidebar');
    if (sidebar && window.innerWidth < 768) {
        sidebar.style.position = 'static';
    } else if (sidebar) {
        sidebar.style.position = 'sticky';
    }
});

// Handle page navigation highlighting
function updateActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', updateActiveNavigation);

// Custom event for tour card interactions
document.addEventListener('click', function(e) {
    if (e.target.closest('.tour-card') || e.target.closest('.tour-result-card')) {
        const card = e.target.closest('.tour-card') || e.target.closest('.tour-result-card');
        
        // Add click effect
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // You can add more functionality here like opening a modal or navigating to tour details
        console.log('Tour card clicked:', card.querySelector('.tour-title')?.textContent);
    }
});

// Initialize tooltips if Bootstrap is available
document.addEventListener('DOMContentLoaded', function() {
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});

// Navigation function for login
function navigateToLogin() {
    window.location.href = 'login.html';
}

// Traveler counter functions
let travelerCount = 1;

function incrementTravelers() {
    travelerCount++;
    updateTravelerDisplay();
}

function decrementTravelers() {
    if (travelerCount > 1) {
        travelerCount--;
        updateTravelerDisplay();
    }
}

function updateTravelerDisplay() {
    const displays = document.querySelectorAll('.traveler-count, .traveler-display');
    displays.forEach(display => {
        display.textContent = travelerCount === 1 ? '1 ADULT' : `${travelerCount} ADULTS`;
    });
}

// Form validation functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateCardNumber(cardNumber) {
    const cleaned = cardNumber.replace(/\D/g, '');
    return cleaned.length >= 13 && cleaned.length <= 19;
}

function validateExpiryDate(expiryDate) {
    const re = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return re.test(expiryDate);
}

function validateCVV(cvv) {
    return cvv.length >= 3 && cvv.length <= 4;
}

// Card number formatting
function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    input.value = value;
}

function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

function formatCVV(input) {
    input.value = input.value.replace(/\D/g, '');
}

// Form submission handlers
function handleLoginSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    showLoadingMessage('Logging in...');
    setTimeout(() => {
        hideLoadingMessage();
        window.location.href = 'booking.html';
    }, 1500);
}

function handleBookingSubmit(event) {
    event.preventDefault();
    const phone = document.getElementById('phone').value;
    const country = document.getElementById('country').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    if (!phone || !country) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (!agreeTerms) {
        alert('Please agree to the booking terms and conditions');
        return;
    }
    
    showLoadingMessage('Processing booking details...');
    setTimeout(() => {
        hideLoadingMessage();
        window.location.href = 'payment.html';
    }, 1500);
}

function handlePaymentSubmit(event) {
    event.preventDefault();
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    
    if (!validateCardNumber(cardNumber)) {
        alert('Please enter a valid card number');
        return;
    }
    
    if (!validateExpiryDate(expiryDate)) {
        alert('Please enter a valid expiry date (MM/YY)');
        return;
    }
    
    if (!validateCVV(cvv)) {
        alert('Please enter a valid CVV');
        return;
    }
    
    showLoadingMessage('Processing payment...');
    setTimeout(() => {
        hideLoadingMessage();
        window.location.href = 'confirmation.html';
    }, 2000);
}

function showLoadingMessage(message) {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingMessage';
    loadingDiv.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 9999; display: flex; justify-content: center; align-items: center;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; text-align: center;">
                <div style="margin-bottom: 20px;">
                    <div style="border: 4px solid #f3f3f3; border-top: 4px solid #16404D; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
                </div>
                <p style="margin: 0; font-weight: 600; color: #16404D;">${message}</p>
            </div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    document.body.appendChild(loadingDiv);
}

function hideLoadingMessage() {
    const loadingDiv = document.getElementById('loadingMessage');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

function initializePage() {
    // Add booking button click handlers
    const bookButtons = document.querySelectorAll('.book-this-date');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    });
    
    // Add form event listeners
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
    
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentSubmit);
        
        // Add input formatting
        const cardNumberInput = document.getElementById('cardNumber');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', () => formatCardNumber(cardNumberInput));
        }
        
        const expiryInput = document.getElementById('expiryDate');
        if (expiryInput) {
            expiryInput.addEventListener('input', () => formatExpiryDate(expiryInput));
        }
        
        const cvvInput = document.getElementById('cvv');
        if (cvvInput) {
            cvvInput.addEventListener('input', () => formatCVV(cvvInput));
        }
    }
    
    console.log('Page initialized successfully');
}