import React from "react";
import { formatCurrency } from "../utils/supplierQuotationFormatters";

export default function SupplierQuotationComparison({
  comparisons = [],
  histories = [],
}) {
  return (
    <section className="grid grid-cols-2 gap-4 bg-white px-4 py-4">
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700">
          Supplier Price Comparison
        </p>

        <div className="overflow-hidden rounded-[20px] border border-slate-200">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-2 py-3 text-left">Supplier</th>
                <th className="px-2 py-3 text-right">Price</th>
                <th className="px-2 py-3 text-left">Lead Time</th>
              </tr>
            </thead>

            <tbody>
              {comparisons.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-4 py-5 text-center text-slate-500">
                    No comparison data.
                  </td>
                </tr>
              )}

              {comparisons.map((item, index) => (
                <tr key={item.id || index} className="border-b border-slate-200">
                  <td className="px-2 py-3">{item.supplier}</td>
                  <td className="px-2 py-3 text-right font-bold">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="px-2 py-3">{item.lead_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
          Supplier Price History
        </p>

        <div className="overflow-hidden rounded-[20px] border border-slate-200">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-2 py-3 text-left">Supplier</th>
                <th className="px-2 py-3 text-left">MPN</th>
                <th className="px-2 py-3 text-right">Price</th>
                <th className="px-2 py-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {histories.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-4 py-5 text-center text-slate-500">
                    No history data.
                  </td>
                </tr>
              )}

              {histories.map((item, index) => (
                <tr key={item.id || index} className="border-b border-slate-200">
                  <td className="px-2 py-3">{item.supplier}</td>
                  <td className="px-2 py-3">{item.mpn}</td>
                  <td className="px-2 py-3 text-right font-bold">
                    {formatCurrency(item.price, item.currency)}
                  </td>
                  <td className="px-2 py-3">{item.quotation_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}