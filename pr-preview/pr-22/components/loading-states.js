import { BaseComponent } from './base-component.js';

export class LoadingStates extends BaseComponent {
  static get observedAttributes() {
    return ['state'];
  }

  constructor() {
    super();
    this.loadTailwindCSS();
  }

  connectedCallback() {
    this.render();
    this.updateState(this.getAttribute('state') || 'loading');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'state' && oldValue !== newValue) {
      this.updateState(newValue);
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .state {
          display: none;
        }
        
        .state.active {
          display: block;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
      </style>
      
      <div class="states-container">
        <!-- Loading State -->
        <div id="loadingState" class="state text-center py-12">
          <div class="animate-pulse">
            <i class="fas fa-circle-notch fa-spin fa-2x text-gray-600 dark:text-gray-400"></i>
            <p class="mt-4 text-gray-600 dark:text-gray-400">
              <slot name="loading-text">Loading...</slot>
            </p>
          </div>
        </div>

        <!-- Error State -->
        <div id="errorState" class="state text-center py-12">
          <div class="text-red-600 dark:text-red-400">
            <i class="fas fa-exclamation-circle fa-2x"></i>
            <p class="mt-4"><slot name="error-message">An error occurred</slot></p>
            <slot name="error-action"></slot>
          </div>
        </div>

        <!-- Empty State -->
        <div id="emptyState" class="state text-center py-12">
          <div class="text-gray-600 dark:text-gray-400">
            <i class="fas fa-folder-open fa-2x"></i>
            <p class="mt-4"><slot name="empty-message">No items found</slot></p>
          </div>
        </div>
      </div>
    `;
  }

  updateState(state) {
    const states = this.shadowRoot.querySelectorAll('.state');
    states.forEach(el => el.classList.remove('active'));
    
    const activeState = this.shadowRoot.getElementById(`${state}State`);
    if (activeState) {
      activeState.classList.add('active');
      this.emit('stateChange', { state });
    }
  }
} 