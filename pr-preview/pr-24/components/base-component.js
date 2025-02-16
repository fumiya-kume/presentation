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
      const response = await fetch('/components/styles.css');
      if (!response.ok) throw new Error('Failed to load styles');
      const styles = await response.text();
      
      const styleSheet = new CSSStyleSheet();
      await styleSheet.replace(styles);
      this.shadowRoot.adoptedStyleSheets = [styleSheet];
    } catch (error) {
      console.error('Error loading styles:', error);
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