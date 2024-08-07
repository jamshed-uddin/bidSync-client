import { useEffect, useState } from "react";

const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebouncedValue(value?.trim());
    }, delay);

    return () => {
      clearTimeout(timeId);
    };
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;
