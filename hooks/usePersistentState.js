'use client';

import { useState, useEffect } from 'react';

function usePersistentState(key, defaultValue) {
  const [state, setState] = useState(() => {
    // Cek hanya di client-side
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    }
    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default usePersistentState;