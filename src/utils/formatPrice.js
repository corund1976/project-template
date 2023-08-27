const formatPrice = (price) => {
  const val = price.toString();
  const { length } = val;

  if (length > 3)
    return `
      ${val.slice(0, length - 3)}.${val.slice(length - 3, length)}`;

  if (length > 6)
    return `
      ${val.slice(0, length - 6)}.${val.slice(length - 6, length - 3)}.${val.slice(length - 3, length)}`;

  return val;
};

export default formatPrice