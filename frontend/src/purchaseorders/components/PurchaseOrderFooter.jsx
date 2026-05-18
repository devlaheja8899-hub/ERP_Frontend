import React from "react";

export default function PurchaseOrderFooter({ purchaseOrder }) {
  const {
    company,
    declaration,
    preparedBy,
    verifiedBy,
    footerNote,
    terms,
  } = purchaseOrder;

  return (
    <>
      <section className="grid grid-cols-3 gap-4 bg-slate-50/70 px-4 pb-4">
        <div className="rounded-[22px] border border-slate-200 bg-white p-4 text-[11px] shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
          <p className="mb-1 font-semibold uppercase tracking-[0.18em] text-blue-700">
            Company PAN
          </p>
          <p className="mb-3">{company.pan}</p>

          <p className="mb-1 font-semibold uppercase tracking-[0.18em] text-slate-500">
            Declaration
          </p>
          <p className="leading-5 text-slate-700">{declaration}</p>
        </div>

        <div className="rounded-[22px] border border-slate-200 bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] p-4 text-[11px] shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
          <p className="mb-2 font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Terms
          </p>

          <p>
            <span className="font-semibold text-slate-500">Payment:</span>{" "}
            {terms.payment}
          </p>
          <p>
            <span className="font-semibold text-slate-500">Delivery:</span>{" "}
            {terms.delivery}
          </p>
          <p>
            <span className="font-semibold text-slate-500">GST:</span>{" "}
            {terms.gst}
          </p>
        </div>

        <div className="flex min-h-[190px] flex-col justify-between rounded-[22px] border border-slate-200 bg-[linear-gradient(180deg,_#ffffff_0%,_#eff6ff_100%)] p-4 text-[11px] shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
          <div>
            <p className="font-semibold uppercase tracking-[0.18em] text-blue-700">
              Authorized Signatory
            </p>
          </div>

          <div className="space-y-2 text-right">
            <p>
              <span className="font-semibold text-slate-500">Prepared By:</span>{" "}
              {preparedBy}
            </p>
            <p>
              <span className="font-semibold text-slate-500">Verified By:</span>{" "}
              {verifiedBy}
            </p>

            <div className="ml-auto mt-6 w-36 border-t border-dashed border-slate-400 pt-2 text-center font-semibold text-slate-900">
              for {company.name}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-4 mb-4 rounded-[18px] bg-[linear-gradient(135deg,_#0f172a_0%,_#1e3a8a_100%)] px-4 py-3 text-center text-[11px] font-medium tracking-[0.16em] text-white shadow-[0_14px_35px_rgba(15,23,42,0.16)]">
        {footerNote}
      </section>
    </>
  );
}