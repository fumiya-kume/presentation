import { BaseComponent } from './base-component.js';

export class FooterComponent extends BaseComponent {
  constructor() {
    super();
  }

  async connectedCallback() {
    await super.connectedCallback();
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: white;
          box-shadow: 0 -1px 3px 0 rgb(0 0 0 / 0.1);
        }

        :host-context(.dark) {
          background-color: rgb(31 41 55); /* dark:bg-gray-800 */
        }

        .footer-content {
          max-width: 80rem;
          margin: 0 auto;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        a {
          color: rgb(75 85 99); /* text-gray-600 */
          text-decoration: none;
          transition: color 200ms;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        a:hover {
          color: rgb(17 24 39); /* text-gray-900 */
        }

        :host-context(.dark) a {
          color: rgb(156 163 175); /* dark:text-gray-400 */
        }

        :host-context(.dark) a:hover {
          color: white;
        }

        .marp-link {
          font-size: 0.875rem;
        }
      </style>
      <div class="footer-content">
        <a href="https://github.com/fumiya-kume/presentation">
          <i class="fab fa-github"></i>
          View on GitHub
        </a>
        <a href="https://github.com/marp-team/marp" class="marp-link">
          Built with Marp
        </a>
      </div>
    `;
  }
}

customElements.define('app-footer', FooterComponent); 