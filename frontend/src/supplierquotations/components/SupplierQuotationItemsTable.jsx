import React from "react";

export default function SupplierQuotationItemsTable({ items = [] }) {
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
              <th className="px-2 py-3 text-right">Qty</th>
              <th className="px-2 py-3 text-left">Lead Time</th>
              <th className="px-2 py-3 text-right">MOQ</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan="8" className="px-4 py-6 text-center text-slate-500">
                  No quotation items found.
                </td>
              </tr>
            )}

            {items.map((item, index) => (
              <tr key={item.id || index} className="border-b border-slate-200">
                <td className="px-2 py-3">{index + 1}</td>
                <td className="px-2 py-3">{item.manufacturer}</td>
                <td className="px-2 py-3 font-semibold">{item.mpn}</td>
                <td className="px-2 py-3">{item.description}</td>
                <td className="px-2 py-3">{item.dateCode}</td>
                <td className="px-2 py-3 text-right">{item.quantity}</td>
                <td className="px-2 py-3">{item.leadTime}</td>
                <td className="px-2 py-3 text-right">{item.moq}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}