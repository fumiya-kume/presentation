import { BaseComponent } from './base-component.js';

export class SocialButtons extends BaseComponent {
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
          display: flex;
          gap: 1rem;
          align-items: center;
        }
      </style>
      <slot></slot>
    `;
  }
}

customElements.define('social-buttons', SocialButtons); 