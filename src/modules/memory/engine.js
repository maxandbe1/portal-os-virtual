const store = new Map();

export function initMemory() {
  return store;
}

export function getMemory(key) {
  return store.get(key);
}

export function setMemory(key, value) {
  store.set(key, value);
  return value;
}
