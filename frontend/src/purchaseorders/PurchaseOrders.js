import React, { useEffect, useRef, useState } from "react";
import TopBar from "../components/TopBar";
import { useReactToPrint } from "react-to-print";

import PurchaseOrderActions from "./components/PurchaseOrderActions";
import PurchaseOrderDocument from "./components/PurchaseOrderDocument";
import {
  fetchPurchaseOrders,
  mapPurchaseOrderForPrint,
} from "./services/purchaseorder.service";
import { downloadPurchaseOrderPdf } from "./utils/downloadPurchaseOrderPdf";
import { getPurchaseOrderPrintStyles } from "./utils/printPurchaseOrder";

export default function PurchaseOrders() {
  const printRef = useRef(null);

  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPurchaseOrders()
      .then((data) => {
        setPurchaseOrders(data);

        if (data.length > 0) {
          setSelectedPurchaseOrder(mapPurchaseOrderForPrint(data[0]));
        }

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch purchase orders");
        setLoading(false);
      });
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Purchase-Order-${selectedPurchaseOrder?.purchaseOrder?.no || "VIPO"}`,
    pageStyle: getPurchaseOrderPrintStyles(),
  });

  const handleDownloadPDF = async () => {
    await downloadPurchaseOrderPdf(
      printRef.current,
      `purchase-order-${selectedPurchaseOrder?.purchaseOrder?.no || "VIPO"}.pdf`
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <TopBar />
        <div className="p-8 text-center text-slate-600">
          Loading purchase orders...
        </div>
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
              Purchase Order Builder
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Structured, print-ready purchase order with invoice-style layout.
            </p>
          </div>

          <PurchaseOrderActions
            onPrint={handlePrint}
            onDownload={handleDownloadPDF}
          />
        </div>

        {purchaseOrders.length > 1 && (
          <div className="mb-5 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Select Purchase Order
            </label>

            <select
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500"
              onChange={(e) => {
                const po = purchaseOrders.find(
                  (item) => String(item.id) === e.target.value
                );

                if (po) {
                  setSelectedPurchaseOrder(mapPurchaseOrderForPrint(po));
                }
              }}
            >
              {purchaseOrders.map((po) => (
                <option key={po.id} value={po.id}>
                  {po.purchase_order_number || po.po_number} -{" "}
                  {po.supplier_name || po.company_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedPurchaseOrder ? (
          <div className="overflow-x-auto rounded-[28px] border border-slate-200/80 bg-white/50 p-3 backdrop-blur-sm md:p-6">
            <PurchaseOrderDocument
              purchaseOrder={selectedPurchaseOrder}
              forwardRef={printRef}
            />
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            No purchase order found.
          </div>
        )}
      </main>
    </div>
  );
}