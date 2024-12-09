import { useEffect } from 'react';

interface KeyboardNavigationProps {
  onNext?: () => void;
  onPrevious?: () => void;
  onSubmit?: () => void;
  isEnabled?: boolean;
}

export function useKeyboardNavigation({
  onNext,
  onPrevious,
  onSubmit,
  isEnabled = true
}: KeyboardNavigationProps) {
  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'n':
          if (onNext && !event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            onNext();
          }
          break;
        case 'ArrowLeft':
        case 'p':
          if (onPrevious && !event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            onPrevious();
          }
          break;
        case 'Enter':
          if (onSubmit && !event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            onSubmit();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onNext, onPrevious, onSubmit, isEnabled]);
}