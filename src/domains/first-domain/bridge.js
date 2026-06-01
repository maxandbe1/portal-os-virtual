import { initDomain, getDomainState } from "./engine.js";

export const FirstDomainBridge = {
  init: initDomain,
  state: getDomainState
};

export default FirstDomainBridge;
