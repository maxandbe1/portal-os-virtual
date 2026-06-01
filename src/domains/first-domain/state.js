export const initialDomainState = {
  id: "first-domain",
  name: "The First Domain",
  version: "1.0.0",
  createdAt: new Date().toISOString(),

  nodes: [
    { id: "root", label: "Origin Node", resonance: 0.8 },
    { id: "gate", label: "Gateway Node", resonance: 0.4 }
  ]
};

