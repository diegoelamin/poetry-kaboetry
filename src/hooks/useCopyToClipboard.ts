import { useState, useCallback, useRef } from 'react';

interface CopyState {
  [key: string]: boolean;
}

export function useCopyToClipboard(resetDelay = 2000) {
  const [copyStates, setCopyStates] = useState<CopyState>({});
  const timeoutRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const copyToClipboard = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      
      // Clear existing timeout if any
      if (timeoutRefs.current[id]) {
        clearTimeout(timeoutRefs.current[id]);
      }

      // Set copy state for this specific ID
      setCopyStates(prev => ({ ...prev, [id]: true }));
      
      // Set timeout to reset this specific ID
      timeoutRefs.current[id] = setTimeout(() => {
        setCopyStates(prev => ({ ...prev, [id]: false }));
        delete timeoutRefs.current[id];
      }, resetDelay);

    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }, [resetDelay]);

  const hasCopied = useCallback((id: string) => {
    return copyStates[id] || false;
  }, [copyStates]);

  return { copyToClipboard, hasCopied };
}