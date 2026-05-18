import React from "react";

export default function SupplierQuotationSupplier({ supplier }) {
  return (
    <section className="grid grid-cols-2 gap-4 border-b border-slate-200 bg-slate-50/70 px-4 py-4">
      <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700">
          Supplier Details
        </p>

        <p className="text-[17px] font-bold text-slate-900">
          {supplier.companyName}
        </p>

        <div className="mt-3 grid grid-cols-1 gap-y-1.5 text-[11px]">
          <p>
            <span className="font-semibold text-slate-500">Contact Person:</span>{" "}
            {supplier.contactPerson}
          </p>
          <p>
            <span className="font-semibold text-slate-500">Email:</span>{" "}
            {supplier.email}
          </p>
        </div>
      </div>

      <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
          Quote Purpose
        </p>

        <p className="text-[11px] leading-5 text-slate-700">
          This document records supplier quoted items against RFQ reference,
          commercial terms, lead time, MOQ and price comparison.
        </p>
      </div>
    </section>
  );
}