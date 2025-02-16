import { BaseComponent } from './base-component.js';

export class FooterComponent extends BaseComponent {
  constructor() {
    super();
    this.loadTailwindCSS();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        
        a {
          transition: color 0.2s;
        }
      </style>
      
      <footer class="bg-white dark:bg-gray-800 shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex justify-between items-center">
            <p class="text-gray-600 dark:text-gray-400">
              <a href="https://github.com/fumiya-kume/presentation" 
                 class="hover:text-gray-900 dark:hover:text-white">
                <i class="fab fa-github mr-2"></i>
                View on GitHub
              </a>
            </p>
            <p class="text-gray-500 dark:text-gray-400 text-sm">
              <a href="https://github.com/marp-team/marp" 
                 class="hover:text-gray-900 dark:hover:text-white">
                Built with Marp
              </a>
            </p>
          </div>
        </div>
      </footer>
    `;
  }
} 