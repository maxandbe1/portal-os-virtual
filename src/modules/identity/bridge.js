import { initIdentity, getIdentity } from "./engine.js";

export const IdentityBridge = {
  init: initIdentity,
  get: getIdentity
};

export default IdentityBridge;
