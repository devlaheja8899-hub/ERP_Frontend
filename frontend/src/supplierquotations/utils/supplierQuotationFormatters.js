export function formatCurrency(value, currency = "INR") {
  return Number(value || 0).toLocaleString("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatDate(value) {
  if (!value || value === "-") return "-";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}