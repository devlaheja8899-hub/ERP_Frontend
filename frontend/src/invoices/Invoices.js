import React, { useMemo, useRef } from "react";
import TopBar from "../components/TopBar";
import { useReactToPrint } from "react-to-print";
import InvoiceActions from "./components/InvoiceActions";
import InvoiceDocument from "./components/InvoiceDocument";
import { getInvoice } from "./services/invoice.service";
import { downloadInvoicePdf } from "./utils/downloadInvoicePdf";
import { getInvoicePrintStyles } from "./utils/printInvoice";

export default function Invoices() {
  const printRef = useRef(null);
  const invoice = useMemo(() => getInvoice(), []);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Invoice-${invoice.invoice.no}`,
    pageStyle: getInvoicePrintStyles(),
  });

  const handleDownloadPDF = async () => {
    await downloadInvoicePdf(printRef.current, `invoice-${invoice.invoice.no}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#e2e8f0_0%,_#f8fafc_45%,_#e2e8f0_100%)]">
      <TopBar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Invoice Builder</h2>
            <p className="mt-1 text-sm text-slate-600">Structured, print-ready GST invoice with a cleaner premium document layout.</p>
          </div>
          <InvoiceActions onPrint={handlePrint} onDownload={handleDownloadPDF} />
        </div>
        <div className="overflow-x-auto rounded-[28px] border border-slate-200/80 bg-white/50 p-3 backdrop-blur-sm md:p-6">
          <InvoiceDocument invoice={invoice} forwardRef={printRef} />
        </div>
      </main>
    </div>
  );
}
