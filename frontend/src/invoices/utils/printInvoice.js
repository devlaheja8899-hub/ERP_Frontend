export function getInvoicePrintStyles() {
  return `
    @page { size: A4 portrait; margin: 8mm; }
    @media print {
      html, body {
        background: #ffffff !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .invoice-print-container {
        width: 100% !important;
        min-height: auto !important;
        border: 1px solid #cbd5e1 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        padding: 0 !important;
      }
      .invoice-print-container * {
        box-shadow: none !important;
      }
    }
  `;
}
