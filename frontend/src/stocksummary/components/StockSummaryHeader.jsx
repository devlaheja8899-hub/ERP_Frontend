import React from "react";

export default function StockSummaryHeader() {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <section className="overflow-hidden rounded-t-[22px] border-b border-slate-200">
      <div className="flex items-center justify-between bg-[linear-gradient(135deg,_#0f172a_0%,_#1e293b_55%,_#2563eb_120%)] px-5 py-4 text-white">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-300">
            Inventory Report
          </p>
          <p className="mt-1 text-[20px] font-bold uppercase tracking-[0.24em]">
            Stock Summary
          </p>
        </div>

        <div className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]">
          {today}
        </div>
      </div>

      <div className="grid grid-cols-[1.2fr_0.8fr]">
        <div className="border-r border-slate-200 bg-slate-50 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-blue-700">
            Company
          </p>

          <h1 className="mt-1 text-[28px] font-black uppercase leading-none text-slate-900">
            Vallabh Impex [I] Pvt Ltd
          </h1>

          <p className="mt-2 max-w-xl text-[11px] leading-5 text-slate-600">
            Mumbai, Maharashtra, India
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
            <p>
              <span className="font-semibold text-slate-500">GSTIN:</span>{" "}
              27XXXXXXXXXXZ5
            </p>
            <p>
              <span className="font-semibold text-slate-500">State:</span>{" "}
              Maharashtra
            </p>
            <p>
              <span className="font-semibold text-slate-500">Email:</span>{" "}
              sales@vallabhimpex.com
            </p>
            <p>
              <span className="font-semibold text-slate-500">Report:</span>{" "}
              Stock Summary
            </p>
          </div>
        </div>

        <div className="bg-white p-5">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Report Type
            </p>
            <p className="mt-1 text-[20px] font-black text-slate-900">
              Inventory Stock
            </p>
          </div>

          <div className="mt-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Purpose
            </p>
            <p className="mt-1 text-[12px] font-semibold text-slate-700">
              Available, Reserved, Incoming and Low Stock Tracking
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}