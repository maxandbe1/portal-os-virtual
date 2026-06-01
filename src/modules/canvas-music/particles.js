// Particle Engine — Mood Reactive

export function createParticles(count, mood) {
  const particles = [];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * 1,
      y: Math.random() * 1,
      vx: 0,
      vy: 0,
      size: 1,
      mood
    });
  }

  return particles;
}

export function updateParticles(particles, moodStyle, dt) {
  const { speed, drift, intensity } = moodStyle;

  for (let p of particles) {
    // Drift motion
    p.vx += (Math.random() - 0.5) * drift;
    p.vy += (Math.random() - 0.5) * drift;

    // Apply velocity
    p.x += p.vx * speed;
    p.y += p.vy * speed;

    // Wrap around edges
    if (p.x < 0) p.x += 1;
    if (p.x > 1) p.x -= 1;
    if (p.y < 0) p.y += 1;
    if (p.y > 1) p.y -= 1;

    // Size reacts to intensity
    p.size = 1 + Math.sin(Date.now() * 0.002) * intensity;
  }
}
