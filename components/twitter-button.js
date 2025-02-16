import { BaseComponent } from './base-component.js';

export class TwitterButton extends BaseComponent {
  static get observedAttributes() {
    return ['url'];
  }

  constructor() {
    super();
    this._url = '';
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (name === 'url') {
      this._url = newValue;
      this.render();
    }
  }

  async connectedCallback() {
    await super.connectedCallback();
    this._url = this.getAttribute('url') || '';
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
        }

        .social-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: rgb(75 85 99); /* text-gray-600 */
          transition-property: color;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 200ms;
          font-size: 1.25rem;
          line-height: 1.75rem;
          padding: 0.25rem;
          border-radius: 0.375rem;
        }

        .social-button:hover {
          color: rgb(17 24 39); /* text-gray-900 */
        }

        :host-context(.dark) .social-button {
          color: rgb(156 163 175); /* dark:text-gray-400 */
        }

        :host-context(.dark) .social-button:hover {
          color: rgb(255 255 255); /* dark:text-white */
        }

        /* Focus styles */
        .social-button:focus-visible {
          outline: 2px solid rgb(59 130 246); /* focus:outline-blue-500 */
          outline-offset: 2px;
        }
      </style>
      ${this._url ? `
        <a href="${this._url}" 
           class="social-button"
           title="Follow on X (Twitter)"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Follow on X (Twitter)">
          <i class="fab fa-x-twitter"></i>
        </a>
      ` : ''}
    `;
  }
}

customElements.define('twitter-button', TwitterButton); 