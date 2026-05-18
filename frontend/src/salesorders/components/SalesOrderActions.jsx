import React from "react";

export default function SalesOrderActions({ onPrint, onDownload }) {
  return (
    <div className="flex items-center justify-end gap-3">
      <button
        onClick={onPrint}
        className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
      >
        Print Sales Order
      </button>

      <button
        onClick={onDownload}
        className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-700"
      >
        Download PDF
      </button>
    </div>
  );
}