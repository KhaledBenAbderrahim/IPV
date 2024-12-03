import { useEffect } from 'react';

interface UseKeyboardSwipeProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  enabled?: boolean;
}

export function useKeyboardSwipe({
  onSwipeLeft,
  onSwipeRight,
  enabled = true
}: UseKeyboardSwipeProps) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          onSwipeLeft();
          break;
        case 'ArrowRight':
          onSwipeRight();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSwipeLeft, onSwipeRight, enabled]);
}
