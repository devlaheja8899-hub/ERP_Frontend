import React, { useEffect, useMemo, useRef, useState } from "react";
import TopBar from "../components/TopBar";
import { useReactToPrint } from "react-to-print";
import SupplierQuotationActions from "./components/SupplierQuotationActions.jsx";
import SupplierQuotationDocument from "./components/SupplierQuotationDocument.jsx";
import {
  fetchSupplierQuotations,
  mapSupplierQuotationForPrint,
} from "./services/supplierquotation.service";
import { downloadSupplierQuotationPdf } from "./utils/downloadSupplierQuotationPdf";
import { getSupplierQuotationPrintStyles } from "./utils/printSupplierQuotation";

export default function SupplierQuotations() {
  const printRef = useRef(null);

  const [quotations, setQuotations] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [documentMode, setDocumentMode] = useState("view");

  const selectedQuotation = useMemo(() => {
    if (!quotations.length) return null;

    const found = quotations.find(
      (quotation) => String(quotation.id) === String(selectedId)
    );

    return mapSupplierQuotationForPrint(found || quotations[0]);
  }, [quotations, selectedId]);

  useEffect(() => {
    async function loadSupplierQuotations() {
      try {
        setLoading(true);
        const data = await fetchSupplierQuotations();
        setQuotations(data);

        if (data.length > 0) {
          setSelectedId(data[0].id);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch supplier quotations");
      } finally {
        setLoading(false);
      }
    }

    loadSupplierQuotations();
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: selectedQuotation
      ? `SupplierQuotation-${selectedQuotation.quotation.quoteNumber}`
      : "SupplierQuotation",
    pageStyle: getSupplierQuotationPrintStyles(),
  });

  const handleDownloadPDF = async () => {
  if (!printRef.current || !selectedQuotation) return;

  try {
    setDocumentMode("pdf");

    // wait for rerender
    await new Promise((resolve) => setTimeout(resolve, 100));

    await downloadSupplierQuotationPdf(
      printRef.current,
      `supplier-quotation-${selectedQuotation.quotation.quoteNumber}.pdf`
    );
  } finally {
    setDocumentMode("view");
  }
};

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#e2e8f0_0%,_#f8fafc_45%,_#e2e8f0_100%)]">
      <TopBar />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Supplier Quotation
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Supplier quotation received format with item, terms and price comparison.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="min-w-[260px] rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-500"
            >
              {quotations.map((quotation) => (
                <option key={quotation.id} value={quotation.id}>
                  {quotation.quote_number} - {quotation.company_name}
                </option>
              ))}
            </select>

            <SupplierQuotationActions
              onPrint={handlePrint}
              onDownload={handleDownloadPDF}
              disabled={!selectedQuotation}
            />
          </div>
        </div>

        {loading && (
          <div className="rounded-2xl bg-white p-6 text-center text-slate-600 shadow">
            Loading supplier quotations...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && !selectedQuotation && (
          <div className="rounded-2xl bg-white p-6 text-center text-slate-600 shadow">
            No supplier quotations found.
          </div>
        )}

        {!loading && !error && selectedQuotation && (
          <div className="overflow-x-auto rounded-[28px] border border-slate-200/80 bg-white/50 p-3 backdrop-blur-sm md:p-6">
            <SupplierQuotationDocument
              quotation={selectedQuotation}
              forwardRef={printRef}
              mode={documentMode}
            />
          </div>
        )}
      </main>
    </div>
  );
}