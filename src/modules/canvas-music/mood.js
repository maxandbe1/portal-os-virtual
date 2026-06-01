// Mood Engine — V1 Mapping

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

