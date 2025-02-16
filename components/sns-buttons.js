import { BaseComponent } from './base-component.js';

export class SNSButtons extends BaseComponent {
  static get observedAttributes() {
    return ['twitter-url', 'linkedin-url'];
  }

  constructor() {
    super();
    this._twitterUrl = '';
    this._linkedinUrl = '';
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'twitter-url':
        this._twitterUrl = newValue;
        break;
      case 'linkedin-url':
        this._linkedinUrl = newValue;
        break;
    }

    this.render();
  }

  async connectedCallback() {
    await super.connectedCallback();
    this._twitterUrl = this.getAttribute('twitter-url') || '';
    this._linkedinUrl = this.getAttribute('linkedin-url') || '';
    this.render();
  }

  render() {
    const socialLinks = [];

    if (this._twitterUrl) {
      socialLinks.push(`
        <a href="${this._twitterUrl}" 
           class="sns-button"
           title="Follow on X (Twitter)"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Follow on X (Twitter)">
          <i class="fab fa-x-twitter"></i>
        </a>
      `);
    }

    if (this._linkedinUrl) {
      socialLinks.push(`
        <a href="${this._linkedinUrl}" 
           class="sns-button"
           title="Connect on LinkedIn"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Connect on LinkedIn">
          <i class="fab fa-linkedin"></i>
        </a>
      `);
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .sns-button {
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

        .sns-button:hover {
          color: rgb(17 24 39); /* text-gray-900 */
        }

        :host-context(.dark) .sns-button {
          color: rgb(156 163 175); /* dark:text-gray-400 */
        }

        :host-context(.dark) .sns-button:hover {
          color: rgb(255 255 255); /* dark:text-white */
        }

        /* Focus styles */
        .sns-button:focus-visible {
          outline: 2px solid rgb(59 130 246); /* focus:outline-blue-500 */
          outline-offset: 2px;
        }
      </style>
      <div class="sns-buttons">
        ${socialLinks.join('\n')}
      </div>
    `;
  }
}

customElements.define('sns-buttons', SNSButtons); 