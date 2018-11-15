export default (items, filters) =>
  items.filter(item =>
    Object.entries(filters).reduce(
      (bool, [key, check]) =>
        bool &&
        (typeof check === 'function' ? check(item[key]) : item[key] === check),
      true,
    ),
  );
