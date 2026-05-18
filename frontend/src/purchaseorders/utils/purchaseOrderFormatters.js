export function formatCurrency(value) {
  return Number(value || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatDate(value) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function calculatePurchaseOrderTotals(purchaseOrder) {
  const taxableValue =
    Number(purchaseOrder.totalsFromApi?.taxableValue) ||
    purchaseOrder.items.reduce(
      (sum, item) =>
        sum + Number(item.quantity || 0) * Number(item.rate || 0),
      0
    );

  const totalQuantity = purchaseOrder.items.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const gstAmount =
    Number(purchaseOrder.totalsFromApi?.gstAmount) ||
    (taxableValue * 18) / 100;

  const roundOff = Number(purchaseOrder.totalsFromApi?.roundOff || 0);

  const grandTotal =
    Number(purchaseOrder.totalsFromApi?.grandTotal) ||
    taxableValue + gstAmount + roundOff;

  return {
    taxableValue,
    totalQuantity,
    gstAmount,
    roundOff,
    grandTotal,
  };
}

export function amountToWords(value) {
  const amount = Math.round(Number(value || 0));
  return `INR ${amount.toLocaleString("en-IN")} Only`;
}