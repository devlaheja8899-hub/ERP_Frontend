import React from "react";

export default function QuotationBillTo({ customer, delivery }) {
  return (
    <section className="grid grid-cols-2 gap-4 border-b border-slate-200 bg-slate-50/70 px-4 py-4">
      <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700">
          Customer Details
        </p>

        <p className="text-[17px] font-bold text-slate-900">
          {customer.companyName}
        </p>

        <p className="mt-2 text-[11px] leading-5 text-slate-600">
          {customer.address}
        </p>

        <div className="mt-3 grid grid-cols-1 gap-y-1.5 text-[11px]">
          <p><span className="font-semibold text-slate-500">GSTIN/UIN:</span> {customer.gstin}</p>
          <p><span className="font-semibold text-slate-500">PAN:</span> {customer.pan}</p>
          <p><span className="font-semibold text-slate-500">State:</span> {customer.state}</p>
          <p><span className="font-semibold text-slate-500">Contact Person:</span> {customer.contactPerson}</p>
          <p><span className="font-semibold text-slate-500">Email:</span> {customer.email}</p>
          <p><span className="font-semibold text-slate-500">Phone:</span> {customer.phone}</p>
        </div>
      </div>

      <div className="rounded-[22px] border border-slate-200 bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
          Delivery / Dispatch Details
        </p>

        <div className="space-y-3 text-[11px] leading-5 text-slate-700">
          <p><span className="font-semibold text-slate-500">Lead Time:</span> {delivery.leadTime}</p>
          <p><span className="font-semibold text-slate-500">Dispatch Mode:</span> {delivery.dispatchMode}</p>
          <p><span className="font-semibold text-slate-500">Docket Details:</span> {delivery.docketDetails}</p>
          <p><span className="font-semibold text-slate-500">Validity:</span> {delivery.validity}</p>
        </div>
      </div>
    </section>
  );
}