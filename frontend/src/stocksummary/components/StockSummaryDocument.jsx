import React from "react";
import StockSummaryHeader from "./StockSummaryHeader.jsx";
import StockSummaryCards from "./StockSummaryCards.jsx";
import StockSummaryTable from "./StockSummaryTable.jsx";
import StockSummaryFooter from "./StockSummaryFooter.jsx";

function StockSummaryDocument({ items = [], forwardRef }) {
  return (
    <article
      ref={forwardRef}
      className="stock-summary-print-container mx-auto overflow-hidden bg-white text-[12px] leading-[1.45] text-slate-900 shadow-[0_28px_80px_rgba(15,23,42,0.18)]"
      style={{
        width: "1123px",
        minHeight: "794px",
        padding: "22px",
        border: "1px solid #dbe4f0",
        borderRadius: "28px",
        boxSizing: "border-box",
      }}
    >
      <div className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.14),_transparent_52%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_40%)]" />

        <div className="relative">
          <StockSummaryHeader />
          <StockSummaryCards items={items} />
          <StockSummaryTable items={items} />
          <StockSummaryFooter />
        </div>
      </div>
    </article>
  );
}

export default StockSummaryDocument;