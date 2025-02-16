import { BaseComponent } from './base-component.js';

export class PresentationCard extends BaseComponent {
  static get observedAttributes() {
    return ['title', 'description', 'path', 'last-modified', 'html-url', 'pdf-url'];
  }

  constructor() {
    super();
    this.loadTailwindCSS();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .card {
          background-color: var(--card-bg, white);
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: box-shadow 0.2s;
        }
        
        .card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        :host-context(.dark) .card {
          background-color: var(--dark-card-bg, #1f2937);
        }
        
        .title {
          color: var(--text-primary, #111827);
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        :host-context(.dark) .title {
          color: var(--dark-text-primary, white);
        }
        
        .description {
          color: var(--text-secondary, #4b5563);
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        :host-context(.dark) .description {
          color: var(--dark-text-secondary, #9ca3af);
        }
        
        .actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .date {
          color: var(--text-tertiary, #6b7280);
          font-size: 0.875rem;
        }
        
        :host-context(.dark) .date {
          color: var(--dark-text-tertiary, #9ca3af);
        }
        
        .links {
          display: flex;
          gap: 0.5rem;
        }
        
        .link {
          color: var(--link-color, #2563eb);
          transition: color 0.2s;
        }
        
        .link:hover {
          color: var(--link-hover-color, #1d4ed8);
        }
        
        :host-context(.dark) .link {
          color: var(--dark-link-color, #60a5fa);
        }
        
        :host-context(.dark) .link:hover {
          color: var(--dark-link-hover-color, #93c5fd);
        }
        
        .pdf-link {
          color: var(--pdf-link-color, #dc2626);
        }
        
        .pdf-link:hover {
          color: var(--pdf-link-hover-color, #b91c1c);
        }
        
        :host-context(.dark) .pdf-link {
          color: var(--dark-pdf-link-color, #f87171);
        }
        
        :host-context(.dark) .pdf-link:hover {
          color: var(--dark-pdf-link-hover-color, #fca5a5);
        }

        .content {
          padding: 1.5rem;
        }
      </style>
      
      <article class="card">
        <div class="content">
          <h2 class="title">
            <a href="detail.html?id=${this.path}" class="link">
              ${this.title}
            </a>
          </h2>
          <p class="description">${this.description}</p>
          <div class="actions">
            <time class="date" datetime="${this.lastModified}">
              ${this.formatDate(this.lastModified)}
            </time>
            <div class="links">
              <a href="detail.html?id=${this.path}" 
                 class="link"
                 title="View Details">
                <i class="fas fa-info-circle"></i>
              </a>
              <a href="${this.htmlUrl}" 
                 class="link"
                 title="View Online"
                 target="_blank"
                 rel="noopener noreferrer">
                <i class="fas fa-globe"></i>
              </a>
              <a href="${this.pdfUrl}" 
                 class="pdf-link"
                 title="Download PDF"
                 target="_blank"
                 rel="noopener noreferrer">
                <i class="fas fa-file-pdf"></i>
              </a>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  // Getters for properties
  get title() {
    return this.getAttribute('title') || '';
  }

  get description() {
    return this.getAttribute('description') || '';
  }

  get path() {
    return this.getAttribute('path') || '';
  }

  get lastModified() {
    return this.getAttribute('last-modified') || '';
  }

  get htmlUrl() {
    return this.getAttribute('html-url') || '';
  }

  get pdfUrl() {
    return this.getAttribute('pdf-url') || '';
  }

  // Date formatting utility
  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days < 1) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
} 