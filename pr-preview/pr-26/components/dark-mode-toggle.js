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
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: 0.375rem;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 200ms;
          color: rgb(75 85 99); /* text-gray-600 */
          font-size: 1.25rem;
          line-height: 1;
          width: 2.5rem;
          height: 2.5rem;
        }

        button:hover {
          background-color: rgb(243 244 246); /* bg-gray-100 */
        }

        :host-context(.dark) button {
          color: rgb(156 163 175); /* dark:text-gray-400 */
        }

        :host-context(.dark) button:hover {
          color: rgb(255 255 255); /* dark:text-white */
          background-color: rgb(55 65 81); /* dark:bg-gray-700 */
        }

        button:focus-visible {
          outline: 2px solid rgb(59 130 246); /* focus:outline-blue-500 */
          outline-offset: 2px;
        }

        i {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.25rem;
          height: 1.25rem;
          transition: transform 200ms;
        }

        button:hover i {
          transform: scale(1.1);
        }
      </style>
      <button 
        aria-label="${this._isDark ? 'Switch to light mode' : 'Switch to dark mode'}"
        title="${this._isDark ? 'Switch to light mode' : 'Switch to dark mode'}">
        <i class="fas ${this._isDark ? 'fa-sun' : 'fa-moon'}"></i>
      </button>
    `;
  }
}

customElements.define('dark-mode-toggle', DarkModeToggle); 