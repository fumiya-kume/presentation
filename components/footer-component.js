import { BaseComponent } from './base-component.js';

export class FooterComponent extends BaseComponent {
  async connectedCallback() {
    await super.connectedCallback();
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <footer class="bg-white shadow">
        <div class="px-4 py-4">
          <div class="flex justify-between items-center">
            <p class="text-gray-600">
              <a href="https://github.com/fumiya-kume/presentation" 
                 class="hover:text-gray-900">
                <i class="fab fa-github mr-2"></i>
                View on GitHub
              </a>
            </p>
            <p class="text-gray-500 text-sm">
              <a href="https://github.com/marp-team/marp" 
                 class="hover:text-gray-900">
                Built with Marp
              </a>
            </p>
          </div>
        </div>
      </footer>
    `;
  }
} 