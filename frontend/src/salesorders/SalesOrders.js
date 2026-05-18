import React, { useMemo, useRef } from "react";
import TopBar from "../components/TopBar";
import { useReactToPrint } from "react-to-print";
import SalesOrderActions from "./components/SalesOrderActions";
import SalesOrderDocument from "./components/SalesOrderDocument";
import { getSalesOrder } from "./services/salesorder.service";
import { downloadSalesOrderPdf } from "./utils/downloadSalesOrderPdf";
import { getSalesOrderPrintStyles } from "./utils/printSalesOrder";

export default function SalesOrders() {
  const printRef = useRef(null);
  const salesOrder = useMemo(() => getSalesOrder(), []);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `SalesOrder-${salesOrder.salesOrder.no}`,
    pageStyle: getSalesOrderPrintStyles(),
  });

  const handleDownloadPDF = async () => {
    await downloadSalesOrderPdf(
      printRef.current,
      `sales-order-${salesOrder.salesOrder.no}.pdf`
    );
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#e2e8f0_0%,_#f8fafc_45%,_#e2e8f0_100%)]">
      <TopBar />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Sales Order Builder
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Structured, print-ready sales order with invoice-style premium layout.
            </p>
          </div>

          <SalesOrderActions
            onPrint={handlePrint}
            onDownload={handleDownloadPDF}
          />
        </div>

        <div className="overflow-x-auto rounded-[28px] border border-slate-200/80 bg-white/50 p-3 backdrop-blur-sm md:p-6">
          <SalesOrderDocument salesOrder={salesOrder} forwardRef={printRef} />
        </div>
      </main>
    </div>
  );
}