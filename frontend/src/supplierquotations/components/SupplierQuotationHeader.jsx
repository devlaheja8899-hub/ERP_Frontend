import React from "react";
import { formatDate } from "../utils/supplierQuotationFormatters";

export default function SupplierQuotationHeader({ company, quotation }) {
  return (
    <section className="overflow-hidden rounded-t-[22px] border-b border-slate-200">
      <div className="flex items-center justify-between bg-[linear-gradient(135deg,_#0f172a_0%,_#1e293b_55%,_#2563eb_120%)] px-5 py-4 text-white">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-300">
            Supplier Response
          </p>
          <p className="mt-1 text-[20px] font-bold uppercase tracking-[0.24em]">
            Supplier Quotation
          </p>
        </div>

        <div className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]">
          Received Quote
        </div>
      </div>

      <div className="grid grid-cols-[1.1fr_0.9fr]">
        <div className="border-r border-slate-200 bg-slate-50 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-blue-700">
            Company
          </p>

          <h1 className="mt-1 text-[28px] font-black uppercase leading-none text-slate-900">
            {company.name}
          </h1>

          <p className="mt-2 text-[11px] leading-5 text-slate-600">
            {company.address}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
            <p>
              <span className="font-semibold text-slate-500">GSTIN:</span>{" "}
              {company.gstin}
            </p>
            <p>
              <span className="font-semibold text-slate-500">State:</span>{" "}
              {company.state}
            </p>
            <p>
              <span className="font-semibold text-slate-500">Email:</span>{" "}
              {company.email}
            </p>
            <p>
              <span className="font-semibold text-slate-500">Report:</span>{" "}
              Supplier Quotation
            </p>
          </div>
        </div>

        <div className="bg-white p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-blue-100 bg-blue-50 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Quote No.
              </p>
              <p className="mt-1 text-[17px] font-black text-slate-900">
                {quotation.quoteNumber}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Currency
              </p>
              <p className="mt-1 text-[17px] font-black text-slate-900">
                {quotation.currency}
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 text-[10px]">
            <div className="border-b border-r border-slate-200 px-2 py-2">
              <p className="font-semibold text-slate-500">RFQ Ref No.</p>
              <p className="font-bold">{quotation.rfqReferenceNo}</p>
            </div>

            <div className="border-b border-slate-200 px-2 py-2">
              <p className="font-semibold text-slate-500">Quotation Date</p>
              <p className="font-bold">{formatDate(quotation.quotationDate)}</p>
            </div>

            <div className="border-r border-slate-200 px-2 py-2">
              <p className="font-semibold text-slate-500">Validity Date</p>
              <p className="font-bold">{formatDate(quotation.validityDate)}</p>
            </div>

            <div className="px-2 py-2">
              <p className="font-semibold text-slate-500">Created At</p>
              <p className="font-bold">{formatDate(quotation.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}