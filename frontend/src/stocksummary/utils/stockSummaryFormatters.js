export function formatCurrency(value) {
  return Number(value || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function calculateStockSummary(items = []) {
  return items.reduce(
    (summary, item) => {
      summary.totalItems += 1;
      summary.totalStock += Number(item.stock || 0);
      summary.availableStock += Number(item.available_stock || 0);
      summary.reservedStock += Number(item.reserved_stock || 0);
      summary.incomingStock += Number(item.incoming_stock || 0);
      summary.stockValue += Number(item.stock_value || 0);

      if (item.is_low_stock) {
        summary.lowStockItems += 1;
      }

      return summary;
    },
    {
      totalItems: 0,
      totalStock: 0,
      availableStock: 0,
      reservedStock: 0,
      incomingStock: 0,
      lowStockItems: 0,
      stockValue: 0,
    }
  );
}