export const calculateTotal = (values, currentIndex, currentValue) => {
  return values.orderEntries.reduce((total, entry, index) => {
    if (index === currentIndex) {
      return total + (Number(currentValue) || 0);
    }
    return total + (Number(entry.amount) || 0);
  }, 0);
};

export const substractTotal = (values, currentValue) => {
  return values.totalAmount.value - Number(currentValue);
};

export const getDate = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${year}-${month}-${date}`;
};