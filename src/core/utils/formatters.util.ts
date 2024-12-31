export const euro = Intl.NumberFormat("en-DE", {
  style: "currency",
  currency: "EUR",
});

export const percent = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
export const getDateValidation = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${year}-${month}-${date}`;
};
export const getDateShow = (orderDate: string) => {
  const [year, month, date] = orderDate.split("-");
  return `${date}-${month}-${year}`;
};
