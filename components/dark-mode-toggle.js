import { BaseComponent } from './base-component.js';

export class DarkModeToggle extends BaseComponent {
  async connectedCallback() {
    await super.connectedCallback();
    this.render();
    this.setupEventListeners();
    this.initializeDarkMode();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <button id="darkModeToggle" class="p-2 rounded-lg hover:bg-gray-100">
        <i class="fas fa-moon text-gray-600"></i>
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
    icon.className = isDark ? 'fas fa-sun text-white' : 'fas fa-moon text-gray-600';
  }
} 