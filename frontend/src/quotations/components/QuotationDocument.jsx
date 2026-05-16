import React from "react";
import QuotationHeader from "./QuotationHeader";
import QuotationBillTo from "./QuotationBillTo";
import QuotationItemsTable from "./QuotationItemsTable";
import QuotationSummary from "./QuotationSummary";
import QuotationFooter from "./QuotationFooter";

export default function QuotationDocument({ quotation, forwardRef }) {
  return (
    <article
      ref={forwardRef}
      className="quotation-print-container mx-auto overflow-hidden bg-white text-[12px] leading-[1.45] text-slate-900 shadow-[0_28px_80px_rgba(15,23,42,0.18)]"
      style={{
        width: "794px",
        minHeight: "1123px",
        padding: "22px",
        border: "1px solid #dbe4f0",
        borderRadius: "28px",
        boxSizing: "border-box",
      }}
    >
      <div className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.14),_transparent_52%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_40%)]" />

        <div className="relative">
          <QuotationHeader company={quotation.company} quotation={quotation.quotation} />
          <QuotationBillTo customer={quotation.customer} delivery={quotation.delivery} />
          <QuotationItemsTable items={quotation.items} />
          <QuotationSummary quotation={quotation} />
          <QuotationFooter quotation={quotation} />
        </div>
      </div>
    </article>
  );
}