import React from "react";

export default function StockSummaryActions({ onPrint, onDownload }) {
  return (
    <div className="flex items-center justify-end gap-3">
      <button
        onClick={onPrint}
        className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
      >
        Print Stock Summary
      </button>

      <button
        onClick={onDownload}
        className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
      >
        Download PDF
      </button>
    </div>
  );
}