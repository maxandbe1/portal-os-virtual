import { initialDomainState } from "./state.js";

let domainState = { ...initialDomainState };

export function initDomain() {
  domainState = { ...initialDomainState };
  return domainState;
}

export function getDomainState() {
  return domainState;
}
export function getDomainResonance() {
  const total = domainState.nodes.reduce((sum, n) => sum + n.resonance, 0);
  return total / domainState.nodes.length;
}

