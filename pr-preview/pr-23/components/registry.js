const componentRegistry = new Map();

export function registerComponent(name, component) {
  if (!componentRegistry.has(name)) {
    customElements.define(name, component);
    componentRegistry.set(name, component);
  }
}

export function getComponent(name) {
  return componentRegistry.get(name);
}

// Utility function to register all components at once
export function registerAllComponents(components) {
  Object.entries(components).forEach(([name, component]) => {
    registerComponent(name, component);
  });
} 