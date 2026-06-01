let state = {
  id: "user",
  createdAt: null
};

export function initIdentity() {
  if (!state.createdAt) state.createdAt = new Date().toISOString();
  return state;
}

export function getIdentity() {
  return state;
}
