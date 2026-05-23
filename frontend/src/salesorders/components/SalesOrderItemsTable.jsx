import React from "react";
import { formatCurrency } from "../utils/salesOrderFormatters";

export default function SalesOrderItemsTable({ items }) {
  return (
    <section className="bg-white px-4 py-4">
      <div className="overflow-hidden rounded-[20px] border border-slate-200">
        <table className="w-full border-collapse text-[11px]">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="px-2 py-3 text-left">S.No</th>
              <th className="px-2 py-3 text-left">Manufacturer</th>
              <th className="px-2 py-3 text-left">MPN</th>
              <th className="px-2 py-3 text-left">Description</th>
              <th className="px-2 py-3 text-left">Date Code</th>
              <th className="px-2 py-3 text-left">Pack</th>
              <th className="px-2 py-3 text-right">Qty</th>
              <th className="px-2 py-3 text-right">Unit Price</th>
              <th className="px-2 py-3 text-right">Total</th>
              <th className="px-2 py-3 text-right">Status</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => {
              const amount = item.quantity * item.unitPrice;

              return (
                <tr key={item.si} className="border-b border-slate-200">
                  <td className="px-2 py-3">{item.si}</td>
                  <td className="px-2 py-3">{item.manufacturer}</td>
                  <td className="px-2 py-3 font-semibold">{item.mpn}</td>
                  <td className="px-2 py-3">{item.description}</td>
                  <td className="px-2 py-3">{item.dateCode}</td>
                  <td className="px-2 py-3">{item.packType}</td>
                  <td className="px-2 py-3 text-right">{item.quantity}</td>
                  <td className="px-2 py-3 text-right">
                    {formatCurrency(item.unitPrice)}
                  </td>
                 
                  <td className="px-2 py-3 text-right font-bold">
                    {formatCurrency(amount)}
                  </td>
                  <td className="px-2 py-3 text-right">{item.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}