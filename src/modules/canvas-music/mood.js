// Mood Engine — V1 Mapping
export const MOOD_PARTICLE_STYLE = {
  energetic: { speed: 0.004, drift: 0.02, intensity: 2 },
  romantic: { speed: 0.002, drift: 0.01, intensity: 1.5 },
  aggressive: { speed: 0.006, drift: 0.03, intensity: 3 },
  melancholy: { speed: 0.001, drift: 0.008, intensity: 1 },
  neutral: { speed: 0.0025, drift: 0.012, intensity: 1.2 }
};

export const MOOD_GRADIENTS = {
  energetic: ["#00E5FF", "#0077FF", "#00FFC8"],
  romantic: ["#FF7AE5", "#FF4FBF", "#FF9AD9"],
  aggressive: ["#FF3B30", "#FF6A00", "#FF1A1A"],
  melancholy: ["#4B8BFF", "#1E3AFF", "#6A8CFF"],
  neutral: ["#27F3FF", "#1BC7D9", "#5AF3FF"]
};

export const MOOD_MAP = {
  "Blinding Lights – The Weeknd": "energetic",
  "Bad Habit – Steve Lacy": "romantic",
  "HUMBLE – Kendrick Lamar": "aggressive",
  "Nights – Frank Ocean": "melancholy",
  "Other": "neutral"
};

export function getMoodFromSong(song) {
  return MOOD_MAP[song] || "neutral";
}

