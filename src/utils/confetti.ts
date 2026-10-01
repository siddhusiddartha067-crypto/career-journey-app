import confetti from 'canvas-confetti';

export function triggerCelebration(originX = 0.5, originY = 0.6) {
  try {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x: originX, y: originY },
      colors: ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'],
      disableForReducedMotion: true
    });
  } catch (err) {
    // Graceful fallback if canvas is unavailable
  }
}
