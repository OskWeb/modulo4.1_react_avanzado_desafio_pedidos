export const validateMinLength = (value, minValue) => {
  return value.length >= minValue;
};

export const validateMaxLength = (value, maxValue) => {
  return value.length <= maxValue;
};
