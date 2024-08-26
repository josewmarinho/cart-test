import { useState, useEffect } from 'react';

export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
  initialState: Partial<T>,
) => {
  const result = store(callback) as F;

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  return hydrated ? result : callback(initialState as T);
};
