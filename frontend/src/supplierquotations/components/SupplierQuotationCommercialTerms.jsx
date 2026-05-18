import React from "react";

export default function SupplierQuotationCommercialTerms({ terms }) {
  return (
    <section className="grid grid-cols-4 gap-3 bg-slate-50/70 px-4 py-4">
      <div className="rounded-[18px] border border-slate-200 bg-white p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          Incoterms
        </p>
        <p className="mt-1 text-[13px] font-black text-slate-900">
          {terms.incoterms}
        </p>
      </div>

      <div className="rounded-[18px] border border-slate-200 bg-white p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          Payment Terms
        </p>
        <p className="mt-1 text-[13px] font-black text-slate-900">
          {terms.paymentTerms}
        </p>
      </div>

      <div className="rounded-[18px] border border-slate-200 bg-white p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          Shipping Days
        </p>
        <p className="mt-1 text-[13px] font-black text-slate-900">
          {terms.shippingDays}
        </p>
      </div>

      <div className="rounded-[18px] border border-slate-200 bg-white p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          Quality Terms
        </p>
        <p className="mt-1 text-[11px] font-semibold text-slate-900">
          {terms.qualityAuthenticityTerms}
        </p>
      </div>
    </section>
  );
}