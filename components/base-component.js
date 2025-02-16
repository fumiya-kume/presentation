export class BaseComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    await this.loadStyles();
  }

  // Load shared styles
  async loadStyles() {
    try {
      // Get the base path for GitHub Pages
      let basePath = '';
      if (window.location.hostname.includes('github.io')) {
        const pathParts = window.location.pathname.split('/');
        // Handle both production and PR preview paths
        if (pathParts[1] === 'pr-preview') {
          basePath = `/pr-preview/${pathParts[2]}`;
        } else {
          basePath = `/${pathParts[1]}`;
        }
      }
            
      // Try relative path first
      let response = await fetch('components/styles.css');
        
      // If that fails, try with base path
      if (!response.ok && basePath) {
        response = await fetch(`${basePath}/components/styles.css`);
      }
        
      if (!response.ok) throw new Error('Failed to load styles');
        
      const styles = await response.text();
      const styleSheet = new CSSStyleSheet();
      await styleSheet.replace(styles);
      this.shadowRoot.adoptedStyleSheets = [styleSheet];
    } catch (error) {
      console.error('Error loading styles:', error);
      // Fallback to basic styles
      const styleSheet = new CSSStyleSheet();
      await styleSheet.replace(`
        :host {
          display: block;
          color: inherit;
          background: transparent;
        }
            
        :host-context(.dark) {
          color: rgb(229 231 235);
          background: transparent;
        }
      `);
      this.shadowRoot.adoptedStyleSheets = [styleSheet];
    }
  }

  // Utility method to dispatch custom events
  emit(eventName, detail) {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail
    });
    this.dispatchEvent(event);
  }

  // Utility method to load Tailwind CSS
  async loadTailwindCSS() {
    // Check if Tailwind is already loaded
    if (!document.querySelector('#tailwind-css')) {
      const link = document.createElement('link');
      link.id = 'tailwind-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.tailwindcss.com';
      document.head.appendChild(link);

      // Wait for Tailwind to load
      await new Promise((resolve) => {
        link.onload = resolve;
      });
    }
  }
} 