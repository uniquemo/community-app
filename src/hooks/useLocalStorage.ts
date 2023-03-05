import { useState, useCallback } from 'react';

const useLocalStorage = (key: string, initialValue: any = '') => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  const removeItem = useCallback((key: string) => {
    window.localStorage.removeItem(key);
  }, []);

  return [storedValue, setValue, removeItem];
}

export default useLocalStorage;
