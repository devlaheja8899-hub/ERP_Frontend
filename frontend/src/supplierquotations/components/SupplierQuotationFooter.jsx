import React from "react";

export default function SupplierQuotationFooter({ quotation }) {
  return (
    <>
      <section className="grid grid-cols-2 gap-4 bg-slate-50/70 px-4 pb-4">
        <div className="rounded-[22px] border border-slate-200 bg-white p-4 text-[11px]">
          <p className="mb-2 font-semibold uppercase tracking-[0.18em] text-blue-700">
            Notes
          </p>
          <p className="leading-5 text-slate-700">
            This quotation is received from supplier and should be reviewed
            against RFQ, price history, lead time and quality terms before PO
            confirmation.
          </p>
        </div>

        <div className="flex min-h-[120px] flex-col justify-between rounded-[22px] border border-slate-200 bg-[linear-gradient(180deg,_#ffffff_0%,_#eff6ff_100%)] p-4 text-[11px]">
          <p className="font-semibold uppercase tracking-[0.18em] text-blue-700">
            Reviewed By
          </p>

          <div className="ml-auto mt-6 w-36 border-t border-dashed border-slate-400 pt-2 text-center font-semibold text-slate-900">
            Purchase Team
          </div>
        </div>
      </section>

      <section className="mx-4 mb-4 rounded-[18px] bg-[linear-gradient(135deg,_#0f172a_0%,_#1e3a8a_100%)] px-4 py-3 text-center text-[11px] font-medium tracking-[0.16em] text-white">
        This is a Computer Generated Supplier Quotation Report
      </section>
    </>
  );
}