import { BaseComponent } from './base-component.js';

export class HeaderComponent extends BaseComponent {
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
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
        }

        :host-context(.dark) {
          background-color: rgb(31 41 55); /* dark:bg-gray-800 */
        }

        .header-content {
          max-width: 80rem;
          margin: 0 auto;
          padding: 1rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        h1 {
          font-size: 1.5rem;
          line-height: 2rem;
          font-weight: bold;
          color: rgb(17 24 39); /* text-gray-900 */
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        :host-context(.dark) h1 {
          color: white;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
      </style>
      <div class="header-content">
        <h1>
          <i class="fas fa-file-powerpoint"></i>
          <slot name="title">Kuu's Presentations</slot>
        </h1>
        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('app-header', HeaderComponent); 