export const euro = Intl.NumberFormat("en-DE", {
  style: "currency",
  currency: "EUR",
});

export const percent = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
