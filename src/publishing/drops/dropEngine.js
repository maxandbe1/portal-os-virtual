// src/publishing/drops/dropEngine.js
// Portal‑OS — Drop Engine (v1)

import { v4 as uuid } from "uuid";

let drops = []; // { id, title, description, products, startsAt, endsAt, featured }

export function createDrop({ title, description, products, startsAt, endsAt, featured = false }) {
  const drop = {
    id: uuid(),
    title,
    description,
    products,
    startsAt,
    endsAt,
    featured,
    createdAt: Date.now()
  };
  drops.push(drop);
  return drop;
}

export function getActiveDrops(now = Date.now()) {
  return drops.filter(d => d.startsAt <= now && d.endsAt >= now);
}

export function getUpcomingDrops(now = Date.now()) {
  return drops.filter(d => d.startsAt > now);
}

export function getDrop(id) {
  return drops.find(d => d.id === id) || null;
}

export function getAllDrops() {
  return [...drops];
}

export function clearDrops() {
  drops = [];
}
