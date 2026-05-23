import React, { useEffect, useRef, useState } from "react";
import TopBar from "../components/TopBar";
import { useReactToPrint } from "react-to-print";
import QuotationActions from "./components/QuotationActions";
import QuotationDocument from "./components/QuotationDocument";
import QuotationItemForm from "./components/QuotationItemForm";
import { fetchQuotations, mapQuotationForPrint } from "./services/quotation.service";
import { downloadQuotationPdf } from "./utils/downloadQuotationPdf";
import { getQuotationPrintStyles } from "./utils/printQuotation";

export default function Quotations() {
  const printRef = useRef(null);

  const [quotations, setQuotations] = useState([]);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [selectedQuotationId, setSelectedQuotationId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadQuotations();
  }, []);

  const loadQuotations = async () => {
    try {
      setLoading(true);
      const data = await fetchQuotations();
      setQuotations(data);

      if (data.length > 0) {
        setSelectedQuotationId(data[0].id);
        setSelectedQuotation(mapQuotationForPrint(data[0]));
      }

      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch quotations");
      setLoading(false);
    }
  };

  const handleSelectQuotation = (quotation) => {
    setSelectedQuotationId(quotation.id);
    setSelectedQuotation(mapQuotationForPrint(quotation));
  };

  const handleItemAdded = async () => {
    // Reload quotations to get the updated items
    await loadQuotations();
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Quotation-${selectedQuotation?.quotation?.no || "VIQ"}`,
    pageStyle: getQuotationPrintStyles(),
  });

  const handleDownloadPDF = async () => {
    await downloadQuotationPdf(
      printRef.current,
      `quotation-${selectedQuotation?.quotation?.no || "VIQ"}.pdf`
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <TopBar />
        <div className="p-8 text-center text-slate-600">Loading quotations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <TopBar />
        <div className="p-8 text-center text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#e2e8f0_0%,_#f8fafc_45%,_#e2e8f0_100%)]">
      <TopBar />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Quotation Builder
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Structured, print-ready GST quotation with the same premium invoice layout.
            </p>
          </div>

          <QuotationActions onPrint={handlePrint} onDownload={handleDownloadPDF} />
        </div>

        {quotations.length > 1 && (
          <div className="mb-5 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Select Quotation
            </label>

            <select
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500"
              onChange={(e) => {
                const quotation = quotations.find((q) => String(q.id) === e.target.value);
                if (quotation) handleSelectQuotation(quotation);
              }}
            >
              {quotations.map((quotation) => (
                <option key={quotation.id} value={quotation.id}>
                  {quotation.quotation_no} - {quotation.contact_person || "No Contact Person"}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* {selectedQuotationId && (
          <QuotationItemForm quotationId={selectedQuotationId} onItemAdded={handleItemAdded} />
        )} */}

        {selectedQuotation ? (
          <div className="overflow-x-auto rounded-[28px] border border-slate-200/80 bg-white/50 p-3 backdrop-blur-sm md:p-6">
            <QuotationDocument quotation={selectedQuotation} forwardRef={printRef} />
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            No quotation found.
          </div>
        )}
      </main>
    </div>
  );
}