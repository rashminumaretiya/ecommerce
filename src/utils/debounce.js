const debounce = (func, delay) => {
  let apiDebounceId = 0;
  return function (...arg) {
    clearTimeout(apiDebounceId);
    apiDebounceId = setTimeout(() => {
      func.apply(this, arg);
    }, delay);
  };
};

export default debounce;
