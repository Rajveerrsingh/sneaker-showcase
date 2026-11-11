import { useEffect, useState } from "react";

const resolve = (value) => (typeof value === "function" ? value() : value);

// useState that mirrors its value to localStorage
export default function usePersistedState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : resolve(initialValue);
    } catch {
      return resolve(initialValue);
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage can be full or disabled; the app still works without it
    }
  }, [key, value]);

  return [value, setValue];
}
