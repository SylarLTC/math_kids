import { useState, useEffect } from "react";

export const useSessionStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = sessionStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  });

  useEffect(() => {
    if (value === undefined) return;
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
