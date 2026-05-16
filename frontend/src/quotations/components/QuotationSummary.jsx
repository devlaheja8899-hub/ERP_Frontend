import React, { useMemo } from "react";
import {
  amountToWords,
  calculateQuotationTotals,
  formatCurrency,
} from "../utils/quotationFormatters";

export default function QuotationSummary({ quotation }) {
  const totals = useMemo(() => calculateQuotationTotals(quotation), [quotation]);

  return (
    <>
      <section className="grid grid-cols-[1fr_0.9fr] gap-4 bg-slate-50/70 px-4 pb-4">
        <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
            Tax Summary
          </div>

          <table className="w-full border-collapse text-[11px]">
            <tbody>
              <tr>
                <td className="border-r border-b border-slate-200 px-4 py-3 font-semibold text-slate-600">
                  Taxable Value
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-right font-medium text-slate-900">
                  {formatCurrency(totals.taxableValue)}
                </td>
              </tr>

              <tr>
                <td className="border-r border-b border-slate-200 px-4 py-3 font-semibold text-slate-600">
                  IGST 18%
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-right font-medium text-slate-900">
                  {formatCurrency(totals.gstAmount)}
                </td>
              </tr>

              <tr>
                <td className="border-r border-slate-200 px-4 py-3 font-semibold text-slate-600">
                  Total Tax Amount
                </td>
                <td className="bg-blue-50 px-4 py-3 text-right text-[13px] font-bold text-slate-900">
                  {formatCurrency(totals.gstAmount)}
                </td>
              </tr>
            </tbody>
          </table>
        </article>

        <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-[linear-gradient(180deg,_#ffffff_0%,_#eff6ff_100%)] shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Total Section
          </div>

          <div className="text-[11px]">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <span className="font-semibold text-slate-600">Total Quantity</span>
              <span className="font-medium text-slate-900">{totals.totalQuantity}</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <span className="text-slate-600">Freight Charges</span>
              <span className="font-medium text-slate-900">
                {formatCurrency(totals.freightCharges)}
              </span>
            </div>

            <div className="flex items-center justify-between bg-[linear-gradient(135deg,_#0f172a_0%,_#1d4ed8_120%)] px-4 py-4 text-[14px] font-bold text-white">
              <span>Grand Total Amount</span>
              <span>{formatCurrency(totals.grandTotal)}</span>
            </div>
          </div>
        </article>
      </section>

      <section className="mx-4 mb-4 rounded-[22px] border border-slate-200 bg-[linear-gradient(135deg,_#f8fafc_0%,_#dbeafe_100%)] px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
          Amount in Words
        </p>
        <p className="mt-2 text-[13px] font-semibold text-slate-900">
          {amountToWords(totals.grandTotal)}
        </p>
      </section>
    </>
  );
}