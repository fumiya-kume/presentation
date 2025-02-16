import { BaseComponent } from './base-component.js';

export class DarkModeToggle extends BaseComponent {
  constructor() {
    super();
    this._isDark = false;
  }

  async connectedCallback() {
    await super.connectedCallback();
    this._isDark = document.documentElement.classList.contains('dark');
    this.render();
    this.addEventListener('click', this._handleClick.bind(this));
  }

  _handleClick() {
    this._isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', this._isDark);
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }

        button {
          padding: 0.5rem;
          border-radius: 0.375rem;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: background-color 200ms;
          color: rgb(75 85 99); /* text-gray-600 */
          font-size: 1.25rem;
          line-height: 1;
        }

        button:hover {
          background-color: rgb(243 244 246); /* bg-gray-100 */
        }

        :host-context(.dark) button {
          color: rgb(255 255 255); /* text-white */
        }

        :host-context(.dark) button:hover {
          background-color: rgb(55 65 81); /* dark:bg-gray-700 */
        }

        i {
          display: inline-block;
          width: 1em;
          height: 1em;
          vertical-align: -0.125em;
        }
      </style>
      <button aria-label="Toggle dark mode" title="Toggle dark mode">
        <i class="fas ${this._isDark ? 'fa-sun' : 'fa-moon'}"></i>
      </button>
    `;
  }
}

customElements.define('dark-mode-toggle', DarkModeToggle); 