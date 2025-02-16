import { BaseComponent } from './base-component.js';

export class DarkModeToggle extends BaseComponent {
  constructor() {
    super();
    this.loadTailwindCSS();
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.initializeDarkMode();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        
        button {
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: background-color 0.2s;
        }
        
        button:hover {
          background-color: var(--hover-bg, #f3f4f6);
        }
        
        :host-context(.dark) button:hover {
          background-color: var(--dark-hover-bg, #374151);
        }
      </style>
      
      <button id="darkModeToggle" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
        <i class="fas fa-moon dark:text-white"></i>
      </button>
    `;
  }

  setupEventListeners() {
    const button = this.shadowRoot.getElementById('darkModeToggle');
    button.addEventListener('click', () => this.toggleDarkMode());
  }

  initializeDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true' ||
      (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
    this.updateIcon(isDark);
  }

  toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
    this.updateIcon(isDark);
    this.emit('darkModeChange', { isDark });
  }

  updateIcon(isDark) {
    const icon = this.shadowRoot.querySelector('i');
    icon.className = isDark ? 'fas fa-sun text-white' : 'fas fa-moon';
  }
} 