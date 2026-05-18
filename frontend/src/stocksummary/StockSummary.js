import React, { useEffect, useMemo, useRef, useState } from "react";
import TopBar from "../components/TopBar";
import { useReactToPrint } from "react-to-print";
import StockSummaryActions from "./components/StockSummaryActions";
import StockSummaryDocument from "./components/StockSummaryDocument";
import { fetchStockItems } from "./services/stocksummary.service";
import { downloadStockSummaryPdf } from "./utils/downloadStockSummaryPdf";
import { getStockSummaryPrintStyles } from "./utils/printStockSummary";

export default function StockSummary() {
  const printRef = useRef(null);

  const [items, setItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const searchText = `${item.item_name} ${item.mpn} ${item.manufacturer} ${item.category}`
        .toLowerCase();

      const matchesSearch = searchText.includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;

      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "low" && item.is_low_stock) ||
        (stockFilter === "available" && Number(item.available_stock) > 0) ||
        (stockFilter === "reserved" && Number(item.reserved_stock) > 0);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [items, searchTerm, categoryFilter, stockFilter]);

  useEffect(() => {
    async function loadStockItems() {
      try {
        setLoading(true);
        const data = await fetchStockItems();
        setItems(data);
      } catch (err) {
        setError(err.message || "Failed to fetch stock items");
      } finally {
        setLoading(false);
      }
    }

    loadStockItems();
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Stock-Summary",
    pageStyle: getStockSummaryPrintStyles(),
  });

  const handleDownloadPDF = async () => {
    await downloadStockSummaryPdf(printRef.current, "stock-summary.pdf");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#e2e8f0_0%,_#f8fafc_45%,_#e2e8f0_100%)]">
      <TopBar />

      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Stock Summary
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Inventory overview with stock, reserved stock, incoming stock and
              low stock status.
            </p>
          </div>

          <StockSummaryActions
            onPrint={handlePrint}
            onDownload={handleDownloadPDF}
          />
        </div>

        <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-4">
          <input
            type="text"
            placeholder="Search item, MPN, manufacturer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-500"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-500"
          >
            <option value="all">All Categories</option>
            <option value="resistor">Resistor</option>
            <option value="capacitor">Capacitor</option>
            <option value="ic">IC</option>
            <option value="diode">Diode</option>
            <option value="connector">Connector</option>
            <option value="mosfet">MOSFET</option>
            <option value="conductor">Conductor</option>
          </select>

          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-500"
          >
            <option value="all">All Stock</option>
            <option value="available">Available Stock</option>
            <option value="reserved">Reserved Stock</option>
            <option value="low">Low Stock</option>
          </select>
        </div>

        {loading && (
          <div className="rounded-2xl bg-white p-6 text-center text-slate-600 shadow">
            Loading stock summary...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto rounded-[28px] border border-slate-200/80 bg-white/50 p-3 backdrop-blur-sm md:p-6">
            <StockSummaryDocument
              forwardRef={printRef}
              items={filteredItems}
            />
          </div>
        )}
      </main>
    </div>
  );
}