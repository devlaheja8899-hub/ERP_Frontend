import React from "react";
import {
  amountToWords,
  calculateSalesOrderTotals,
  formatCurrency,
} from "../utils/salesOrderFormatters";

export default function SalesOrderSummary({ salesOrder }) {
  const totals = calculateSalesOrderTotals(salesOrder);

  return (
    <section className="grid grid-cols-[1fr_320px] gap-4 bg-slate-50/70 px-4 py-4">
      <div className="rounded-[22px] border border-slate-200 bg-white p-4 text-[11px] shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
        <p className="mb-2 font-semibold uppercase tracking-[0.18em] text-blue-700">
          Amount Chargeable In Words
        </p>

        <p className="text-[13px] font-bold text-slate-900">
          {amountToWords(totals.grandTotal)}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <p className="font-semibold text-slate-500">Total Quantity</p>
            <p className="font-bold">{totals.totalQuantity}</p>
          </div>

          <div>
            <p className="font-semibold text-slate-500">Taxable Value</p>
            <p className="font-bold">{formatCurrency(totals.taxableValue)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-[22px] border border-slate-200 bg-white p-4 text-[11px] shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
        <p className="mb-3 font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Order Summary
        </p>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(totals.taxableValue)}</span>
          </div>

          <div className="flex justify-between">
            <span>GST</span>
            <span>{formatCurrency(totals.totalTaxAmount)}</span>
          </div>

          <div className="flex justify-between">
            <span>Discount</span>
            <span>{formatCurrency(totals.discount)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{formatCurrency(totals.shipping)}</span>
          </div>

          <div className="flex justify-between">
            <span>Round Off</span>
            <span>{formatCurrency(totals.roundOff)}</span>
          </div>

          <div className="mt-3 flex justify-between border-t border-slate-300 pt-3 text-[15px] font-black text-slate-900">
            <span>Grand Total</span>
            <span>{formatCurrency(totals.grandTotal)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}