import React from "react";
import { formatCurrency } from "../utils/purchaseOrderFormatters";

export default function PurchaseOrderItemsTable({ items }) {
  const totalQuantity = items.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const totalAmount = items.reduce(
    (sum, item) =>
      sum + Number(item.quantity || 0) * Number(item.rate || 0),
    0
  );

  return (
    <section className="bg-white px-4 pb-4">
      <div className="overflow-hidden rounded-[22px] border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
        <table className="min-w-full border-collapse text-[10px]">
          <thead className="bg-[linear-gradient(135deg,_#0f172a_0%,_#1d4ed8_120%)] uppercase text-white">
            <tr>
              <th className="border-r border-white/10 px-2 py-3 text-center">S No</th>
              <th className="border-r border-white/10 px-2 py-3 text-left">Manufacturer</th>
              <th className="border-r border-white/10 px-2 py-3 text-left">MPN</th>
              <th className="border-r border-white/10 px-2 py-3 text-left">Description</th>
              <th className="border-r border-white/10 px-2 py-3 text-center">Date Code</th>
              <th className="border-r border-white/10 px-2 py-3 text-center">Pack Type</th>
              <th className="border-r border-white/10 px-2 py-3 text-center">Qty</th>
              <th className="border-r border-white/10 px-2 py-3 text-right">Unit Price</th>
              <th className="px-2 py-3 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-3 py-8 text-center text-slate-500">
                  No items added.
                </td>
              </tr>
            ) : (
              items.map((item, index) => {
                const amount =
                  Number(item.quantity || 0) * Number(item.rate || 0);

                return (
                  <tr
                    key={index}
                    className="odd:bg-white even:bg-slate-50/70"
                  >
                    <td className="border-r border-b border-slate-200 px-2 py-3 text-center">
                      {index + 1}
                    </td>
                    <td className="border-r border-b border-slate-200 px-2 py-3">
                      {item.manufacturer || "-"}
                    </td>
                    <td className="border-r border-b border-slate-200 px-2 py-3">
                      {item.mpn || "-"}
                    </td>
                    <td className="border-r border-b border-slate-200 px-2 py-3">
                      {item.description || "-"}
                    </td>
                    <td className="border-r border-b border-slate-200 px-2 py-3 text-center">
                      {item.dateCode || "-"}
                    </td>
                    <td className="border-r border-b border-slate-200 px-2 py-3 text-center">
                      {item.packType || "-"}
                    </td>
                    <td className="border-r border-b border-slate-200 px-2 py-3 text-center">
                      {item.quantity || 0}
                    </td>
                    <td className="border-r border-b border-slate-200 px-2 py-3 text-right">
                      {formatCurrency(item.rate)}
                    </td>
                    <td className="border-b border-slate-200 px-2 py-3 text-right font-semibold">
                      {formatCurrency(amount)}
                    </td>
                  </tr>
                );
              })
            )}

            <tr className="bg-slate-50 font-semibold text-slate-900">
              <td colSpan="6" className="border-r border-slate-300 px-3 py-3 text-center">
                Total
              </td>
              <td className="border-r border-slate-300 px-3 py-3 text-center">
                Total Quantity : {totalQuantity}
              </td>
              <td className="border-r border-slate-300 px-3 py-3" />
              <td className="px-3 py-3 text-right">
                {formatCurrency(totalAmount)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}