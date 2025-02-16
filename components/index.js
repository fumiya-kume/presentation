import { registerAllComponents } from './registry.js';
import { HeaderComponent } from './header-component.js';
import { FooterComponent } from './footer-component.js';
import { DarkModeToggle } from './dark-mode-toggle.js';
import { LoadingStates } from './loading-states.js';
import { PresentationCard } from './presentation-card.js';

// Register all components
registerAllComponents({
  'header-component': HeaderComponent,
  'footer-component': FooterComponent,
  'dark-mode-toggle': DarkModeToggle,
  'loading-states': LoadingStates,
  'presentation-card': PresentationCard
}); 