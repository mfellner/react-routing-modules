export default (items, key) =>
  items.reduce((grouped, item) => {
    (grouped[item[key]] = grouped[item[key]] || []).push(item);
    return grouped;
  }, {});
