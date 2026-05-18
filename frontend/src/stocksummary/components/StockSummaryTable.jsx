import React from "react";
import { formatCurrency } from "../utils/stockSummaryFormatters";

export default function StockSummaryTable({ items }) {
  return (
    <section className="bg-white px-4 py-4">
      <div className="overflow-hidden rounded-[20px] border border-slate-200">
        <table className="w-full border-collapse text-[10px]">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="px-2 py-3 text-left">S.No</th>
              <th className="px-2 py-3 text-left">Item Name</th>
              <th className="px-2 py-3 text-left">MPN</th>
              <th className="px-2 py-3 text-left">Manufacturer</th>
              <th className="px-2 py-3 text-left">Category</th>
              <th className="px-2 py-3 text-right">Stock</th>
              <th className="px-2 py-3 text-right">Reserved</th>
              <th className="px-2 py-3 text-right">Available</th>
              <th className="px-2 py-3 text-right">Incoming</th>
              <th className="px-2 py-3 text-right">Min</th>
              <th className="px-2 py-3 text-right">Cost</th>
              <th className="px-2 py-3 text-right">Value</th>
              <th className="px-2 py-3 text-left">Location</th>
              <th className="px-2 py-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 && (
              <tr>
                <td
                  colSpan="14"
                  className="px-4 py-6 text-center text-slate-500"
                >
                  No stock items found.
                </td>
              </tr>
            )}

            {items.map((item, index) => (
              <tr key={item.id || index} className="border-b border-slate-200">
                <td className="px-2 py-3">{index + 1}</td>
                <td className="px-2 py-3 font-semibold">{item.item_name}</td>
                <td className="px-2 py-3">{item.mpn}</td>
                <td className="px-2 py-3">{item.manufacturer}</td>
                <td className="px-2 py-3 capitalize">{item.category}</td>
                <td className="px-2 py-3 text-right">{item.stock}</td>
                <td className="px-2 py-3 text-right">
                  {item.reserved_stock}
                </td>
                <td className="px-2 py-3 text-right font-bold">
                  {item.available_stock}
                </td>
                <td className="px-2 py-3 text-right">
                  {item.incoming_stock}
                </td>
                <td className="px-2 py-3 text-right">{item.minimum_stock}</td>
                <td className="px-2 py-3 text-right">
                  {formatCurrency(item.cost_price)}
                </td>
                <td className="px-2 py-3 text-right font-bold">
                  {formatCurrency(item.stock_value)}
                </td>
                <td className="px-2 py-3">
                  {item.warehouse_location || "-"}
                </td>
                <td className="px-2 py-3 text-center">
                  <span
                    className={`rounded-full px-2 py-1 text-[9px] font-bold ${
                      item.is_low_stock
                        ? "bg-red-100 text-red-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {item.is_low_stock ? "LOW" : "OK"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}