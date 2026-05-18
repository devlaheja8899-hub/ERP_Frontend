import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function downloadPurchaseOrderPdf(
  element,
  fileName
) {
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    scrollY: -window.scrollY,
  });

  const imageData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();

  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imageHeight =
    (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(
    imageData,
    "PNG",
    0,
    0,
    pdfWidth,
    Math.min(imageHeight, pdfHeight)
  );

  pdf.save(fileName);
}