import { BaseComponent } from './base-component.js';

export class PresentationCard extends BaseComponent {
  static get observedAttributes() {
    return ['title', 'date', 'description', 'link'];
  }

  async connectedCallback() {
    await super.connectedCallback();
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || '';
    const date = this.getAttribute('date') || '';
    const description = this.getAttribute('description') || '';
    const link = this.getAttribute('link') || '#';

    const formattedDate = new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    this.shadowRoot.innerHTML = `
      <article class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
        <a href="${link}" target="_blank" rel="noopener noreferrer" class="block">
          <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">${title}</h2>
          <time datetime="${date}" class="text-sm text-gray-600 dark:text-gray-400 mb-4 block">${formattedDate}</time>
          <p class="text-gray-700 dark:text-gray-300 line-clamp-3">${description}</p>
        </a>
      </article>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
} 