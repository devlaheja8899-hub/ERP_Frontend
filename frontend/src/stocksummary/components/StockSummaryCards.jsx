import React from "react";
import {
  calculateStockSummary,
  formatCurrency,
} from "../utils/stockSummaryFormatters";

export default function StockSummaryCards({ items }) {
  const summary = calculateStockSummary(items);

  const cards = [
    ["Total Items", summary.totalItems],
    ["Total Stock", summary.totalStock],
    ["Available Stock", summary.availableStock],
    ["Reserved Stock", summary.reservedStock],
    ["Incoming Stock", summary.incomingStock],
    ["Low Stock Items", summary.lowStockItems],
    ["Total Stock Value", formatCurrency(summary.stockValue)],
  ];

  return (
    <section className="grid grid-cols-7 gap-3 bg-slate-50/70 px-4 py-4">
      {cards.map(([label, value]) => (
        <div
          key={label}
          className="rounded-[18px] border border-slate-200 bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            {label}
          </p>
          <p className="mt-1 text-[16px] font-black text-slate-900">{value}</p>
        </div>
      ))}
    </section>
  );
}