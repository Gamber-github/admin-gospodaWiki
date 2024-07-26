import { useEffect, useState } from "react";

export const getStorageValue = <T,>(key: string, initialValue: T) => {
  const savedValue = localStorage.getItem(key);

  if (!savedValue) return initialValue;
  try {
    return JSON.parse(savedValue) as T;
  } catch (e) {
    return initialValue;
  }
};

export const usePersistedState = <T,>(
  key: string,
  initialValue: T,
  cb?: (value: T) => void
) => {
  const [value, setValue] = useState(() => getStorageValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    if (cb) cb(value);
  }, [key, value]);

  return [value, setValue] as const;
};
