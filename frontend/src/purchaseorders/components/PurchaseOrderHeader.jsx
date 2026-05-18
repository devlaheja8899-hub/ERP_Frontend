import React from "react";
import { formatDate } from "../utils/purchaseOrderFormatters";

export default function PurchaseOrderHeader({ company, purchaseOrder }) {
  const fields = [
    ["PO No.", purchaseOrder.no],
    ["PO Date", formatDate(purchaseOrder.date)],
    ["Supplier", purchaseOrder.supplierName],
    ["Sales Order Ref.", purchaseOrder.salesOrderRef],
    ["Buyer Name", purchaseOrder.buyerName],
    ["Expected Delivery", formatDate(purchaseOrder.expectedDeliveryDate)],
    ["Currency", purchaseOrder.currency],
    ["Status", purchaseOrder.status],
  ];

  return (
    <section className="overflow-hidden rounded-t-[22px] border-b border-slate-200">
      <div className="flex items-center justify-between bg-[linear-gradient(135deg,_#0f172a_0%,_#1e293b_55%,_#2563eb_120%)] px-5 py-4 text-white">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-300">
            Vendor Purchase Document
          </p>
          <p className="mt-1 text-[20px] font-bold uppercase tracking-[0.24em]">
            Purchase Order
          </p>
        </div>

        <div className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] shadow-inner">
          Supplier Copy
        </div>
      </div>

      <div className="grid grid-cols-[1.2fr_0.88fr]">
        <div className="border-r border-slate-200 bg-[linear-gradient(180deg,_rgba(255,255,255,0.95)_0%,_rgba(248,250,252,0.95)_100%)] p-5">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-[20px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              <img src={company.logo} alt="Company Logo" className="h-9 w-11 object-contain" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-blue-700">
                Buyer
              </p>
              <h1 className="mt-1 text-[28px] font-black uppercase leading-none tracking-tight text-slate-900">
                {company.name}
              </h1>
              <p className="mt-2 text-[11px] leading-5 text-slate-600">
                {company.address}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <p><span className="font-semibold text-slate-500">GSTIN:</span> {company.gstin}</p>
            <p><span className="font-semibold text-slate-500">State:</span> {company.state}, Code: {company.stateCode}</p>
            <p><span className="font-semibold text-slate-500">CIN:</span> {company.cin}</p>
            <p><span className="font-semibold text-slate-500">PAN:</span> {company.pan}</p>
            <p><span className="font-semibold text-slate-500">Email:</span> {company.email}</p>
            <p><span className="font-semibold text-slate-500">Phone:</span> {company.phone}</p>
          </div>
        </div>

        <div className="bg-white p-3">
          <table className="w-full border-collapse text-[11px]">
            <tbody>
              {fields.map(([label, value], index) => (
                <tr key={label}>
                  <td className="w-[46%] border-r border-b border-slate-200 bg-slate-50 px-3 py-2 font-semibold text-slate-600">
                    {label}
                  </td>
                  <td className="border-b border-slate-200 px-3 py-2 font-medium text-slate-900">
                    {value || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}