export function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const callback = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(callback, wait);
  };
}
