import { BaseComponent } from './base-component.js';

export class HeaderComponent extends BaseComponent {
  async connectedCallback() {
    await super.connectedCallback();
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <header class="bg-white shadow">
        <div class="px-4 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">
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