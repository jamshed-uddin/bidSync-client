export const debouncer = (callback, delay) => {
  let timeId;

  return (...args) => {
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
