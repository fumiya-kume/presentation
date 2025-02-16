export class BaseComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    await this.loadStyles();
  }

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

      // Load shared styles
      const sharedStyles = await this.loadSharedStyles(basePath);
      
      // Load Tailwind utilities
      const tailwindStyles = await this.loadTailwindStyles(basePath);
      
      // Component-specific styles (if any)
      const componentStyles = await this.loadComponentStyles(basePath);
      
      // Apply all styles using constructable stylesheets
      this.shadowRoot.adoptedStyleSheets = [
        sharedStyles,
        tailwindStyles,
        componentStyles
      ].filter(Boolean); // Remove any undefined stylesheets
    } catch (error) {
      console.error('Error loading styles:', error);
      await this.loadFallbackStyles();
    }
  }

  async loadSharedStyles(basePath = '') {
    try {
      const styleSheet = new CSSStyleSheet();
      // Try relative path first
      let response = await fetch('components/styles/shared-utilities.css');
      
      // If that fails, try with base path
      if (!response.ok && basePath) {
        response = await fetch(`${basePath}/components/styles/shared-utilities.css`);
      }
      
      if (!response.ok) throw new Error('Failed to load shared styles');
      
      const styles = await response.text();
      await styleSheet.replace(styles);
      return styleSheet;
    } catch (error) {
      console.warn('Failed to load shared styles:', error);
      return null;
    }
  }

  async loadTailwindStyles(basePath = '') {
    try {
      const styleSheet = new CSSStyleSheet();
      // Try relative path first
      let response = await fetch('components/styles/components.css');
      
      // If that fails, try with base path
      if (!response.ok && basePath) {
        response = await fetch(`${basePath}/components/styles/components.css`);
      }
      
      if (!response.ok) throw new Error('Failed to load Tailwind styles');
      
      const styles = await response.text();
      await styleSheet.replace(styles);
      return styleSheet;
    } catch (error) {
      console.warn('Failed to load Tailwind styles:', error);
      return null;
    }
  }

  async loadComponentStyles(basePath = '') {
    // Override in specific components if needed
    return null;
  }

  async loadFallbackStyles() {
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

  // Utility method to dispatch custom events
  emit(eventName, detail) {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail
    });
    this.dispatchEvent(event);
  }
} 