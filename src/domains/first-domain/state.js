export const initialDomainState = {
  id: "first-domain",
  name: "The First Domain",
  version: "1.0.0",
  createdAt: new Date().toISOString(),
  nodes: [
    { id: "root", label: "Origin Node" },
    { id: "gate", label: "Gateway Node" }
  ]
};
