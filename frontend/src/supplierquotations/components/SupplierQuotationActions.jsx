import React from "react";

export default function SupplierQuotationActions({
  onPrint,
  onDownload,
  disabled,
}) {
  return (
    <div className="flex items-center justify-end gap-3">
      <button
        disabled={disabled}
        onClick={onPrint}
        className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Print
      </button>

      <button
        disabled={disabled}
        onClick={onDownload}
        className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Download PDF
      </button>
    </div>
  );
}