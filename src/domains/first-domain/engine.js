import { initialDomainState } from "./state.js";

let domainState = { ...initialDomainState };

export function initDomain() {
  domainState = { ...initialDomainState };
  return domainState;
}

export function getDomainState() {
  return domainState;
}
