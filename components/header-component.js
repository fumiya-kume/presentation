import { BaseComponent } from './base-component.js';

export class HeaderComponent extends BaseComponent {
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
        
        .social-link {
          color: var(--text-gray-600);
          transition: color 0.2s;
        }
        
        .social-link:hover {
          color: var(--text-gray-900);
        }
        
        :host-context(.dark) .social-link {
          color: var(--text-gray-400);
        }
        
        :host-context(.dark) .social-link:hover {
          color: var(--text-white);
        }
      </style>
      
      <header class="bg-white dark:bg-gray-800 shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            <i class="fas fa-file-powerpoint mr-2"></i>
            <slot name="title">Kuu's Presentations</slot>
          </h1>
          <div class="flex items-center space-x-4">
            <slot name="social-links"></slot>
            <dark-mode-toggle></dark-mode-toggle>
          </div>
        </div>
      </header>
    `;
  }
} 