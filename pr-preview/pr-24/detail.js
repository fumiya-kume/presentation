// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days < 1) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// State Management
class PresentationState {
    constructor() {
        this.presentations = [];
        this.currentIndex = -1;
    }

    async initialize() {
        await this.loadPresentations();
        this.setupEventListeners();
    }

    async loadPresentations() {
        try {
            // Try loading from the current directory first
            let response = await fetch('metadata.json');
            
            // If that fails, try the GitHub Pages path
            if (!response.ok && window.location.hostname.includes('github.io')) {
                const basePath = window.location.pathname.split('/')[1]; // Should be 'presentation'
                response = await fetch(`/${basePath}/metadata.json`);
            }

            if (!response.ok) {
                throw new Error(`Failed to load metadata (Status: ${response.status})`);
            }
            
            const data = await response.json();
            if (!data.presentations || !Array.isArray(data.presentations)) {
                throw new Error('Invalid metadata format: missing presentations array');
            }

            this.presentations = data.presentations.sort(
                (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
            );
        } catch (error) {
            console.error('Error loading presentations:', error);
            throw new Error(
                `Failed to load presentation data: ${error.message}. ` +
                'Please try refreshing the page or return to the index page.'
            );
        }
    }

    findPresentationIndex(path) {
        return this.presentations.findIndex(p => p.path === path);
    }

    getNavigation(currentPath) {
        const currentIndex = this.findPresentationIndex(currentPath);
        return {
            prev: currentIndex > 0 ? this.presentations[currentIndex - 1] : null,
            next: currentIndex < this.presentations.length - 1 
                  ? this.presentations[currentIndex + 1] 
                  : null
        };
    }

    setupEventListeners() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            this.loadPresentationFromUrl();
        });
    }
}

// Detail Page Controller
class DetailPageController {
    constructor() {
        this.state = new PresentationState();
        this.elements = {
            title: document.getElementById('presentationTitle'),
            description: document.getElementById('presentationDescription'),
            lastModified: document.getElementById('lastModified'),
            path: document.getElementById('presentationPath'),
            formatLinks: document.querySelector('.format-links'),
            navigation: document.querySelector('.presentation-nav'),
            loadingState: document.getElementById('loadingState'),
            errorState: document.getElementById('errorState'),
            presentationDetails: document.getElementById('presentationDetails'),
            darkModeToggle: document.getElementById('darkModeToggle')
        };
        
        this.setupDarkMode();
    }

    async initialize() {
        this.showLoading();
        try {
            await this.state.initialize();
            await this.loadPresentationFromUrl();
        } catch (error) {
            console.error('Initialization error:', error);
            this.showError(error.message);
        }
    }

    setupDarkMode() {
        const darkModeToggle = this.elements.darkModeToggle;
        const moonIcon = darkModeToggle.querySelector('i');

        const updateDarkModeIcon = (isDark) => {
            moonIcon.className = isDark ? 'fas fa-sun text-white' : 'fas fa-moon';
        };

        darkModeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('darkMode', isDark);
            updateDarkModeIcon(isDark);
        });

        // Initialize dark mode from localStorage or system preference
        const isDark = localStorage.getItem('darkMode') === 'true' ||
            (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        if (isDark) {
            document.documentElement.classList.add('dark');
        }
        updateDarkModeIcon(isDark);
    }

    async loadPresentationFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const presentationId = params.get('id');
        
        if (!presentationId) {
            this.showError('No presentation specified');
            return;
        }
        
        const presentation = this.state.presentations.find(
            p => p.path === presentationId
        );
        
        if (!presentation) {
            this.showError('Presentation not found');
            return;
        }
        
        this.renderPresentation(presentation);
    }

    showLoading() {
        this.elements.loadingState.classList.remove('hidden');
        this.elements.errorState.classList.add('hidden');
        this.elements.presentationDetails.classList.add('hidden');
    }

    showError(message) {
        this.elements.loadingState.classList.add('hidden');
        this.elements.errorState.classList.remove('hidden');
        this.elements.presentationDetails.classList.add('hidden');
        document.getElementById('errorMessage').textContent = message;
    }

    showContent() {
        this.elements.loadingState.classList.add('hidden');
        this.elements.errorState.classList.add('hidden');
        this.elements.presentationDetails.classList.remove('hidden');
    }

    renderPresentation(presentation) {
        // Update metadata
        document.title = `${presentation.title} | Kuu's Presentations`;
        this.elements.title.textContent = presentation.title;
        this.elements.description.textContent = presentation.description;
        this.elements.lastModified.textContent = formatDate(presentation.lastModified);
        this.elements.path.textContent = presentation.path;
        
        // Render format links
        this.renderFormatLinks(presentation.formats);
        
        // Render navigation
        this.renderNavigation(presentation.path);
        
        // Show content
        this.showContent();
    }

    renderFormatLinks(formats) {
        const template = document.getElementById('formatLinkTemplate');
        this.elements.formatLinks.innerHTML = '';
        
        const formatConfig = {
            html: {
                icon: 'fa-globe',
                title: 'View Online',
                subtitle: 'HTML Format',
                classes: 'bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
            },
            pdf: {
                icon: 'fa-file-pdf',
                title: 'Download',
                subtitle: 'PDF Format',
                classes: 'bg-red-50 dark:bg-red-900 text-red-900 dark:text-red-100'
            },
            pptx: {
                icon: 'fa-file-powerpoint',
                title: 'Download',
                subtitle: 'PowerPoint Format',
                classes: 'bg-orange-50 dark:bg-orange-900 text-orange-900 dark:text-orange-100'
            }
        };
        
        Object.entries(formats).forEach(([format, url]) => {
            const config = formatConfig[format];
            if (!config) return;
            
            const link = template.content.cloneNode(true).querySelector('.format-link');
            link.href = url;
            link.classList.add(...config.classes.split(' '));
            link.querySelector('.format-icon').classList.add('fas', config.icon);
            link.querySelector('.format-title').textContent = config.title;
            link.querySelector('.format-subtitle').textContent = config.subtitle;
            
            this.elements.formatLinks.appendChild(link);
        });
    }

    renderNavigation(currentPath) {
        const { prev, next } = this.state.getNavigation(currentPath);
        const template = document.getElementById('navButtonTemplate');
        this.elements.navigation.innerHTML = '';
        
        if (prev) {
            const prevButton = template.content.cloneNode(true).querySelector('.nav-button');
            prevButton.href = `detail.html?id=${encodeURIComponent(prev.path)}`;
            prevButton.querySelector('.nav-icon').classList.add('fas', 'fa-chevron-left');
            prevButton.querySelector('.nav-text').textContent = 'Previous';
            this.elements.navigation.appendChild(prevButton);
        }
        
        if (next) {
            const nextButton = template.content.cloneNode(true).querySelector('.nav-button');
            nextButton.href = `detail.html?id=${encodeURIComponent(next.path)}`;
            nextButton.querySelector('.nav-icon').classList.add('fas', 'fa-chevron-right');
            nextButton.querySelector('.nav-text').textContent = 'Next';
            this.elements.navigation.appendChild(nextButton);
        }
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    const controller = new DetailPageController();
    controller.initialize().catch(console.error);
});
