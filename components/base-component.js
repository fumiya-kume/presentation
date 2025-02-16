export class BaseComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // Utility method to inject styles
  injectStyles(styles) {
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(styles);
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