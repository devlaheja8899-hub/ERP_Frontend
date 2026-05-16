export function formatCurrency(value) {
  return Number(value || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatDate(value) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function calculateQuotationTotals(quotation) {
  const taxableValue =
    Number(quotation.totalsFromApi?.taxableValue) ||
    quotation.items.reduce(
      (sum, item) => sum + Number(item.quantity || 0) * Number(item.rate || 0),
      0
    );

  const totalQuantity = quotation.items.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const gstAmount =
    Number(quotation.totalsFromApi?.gstAmount) || (taxableValue * 18) / 100;

  const freightCharges = Number(quotation.totalsFromApi?.freightCharges || 0);

  const grandTotal =
    Number(quotation.totalsFromApi?.grandTotal) ||
    taxableValue + gstAmount + freightCharges;

  return {
    taxableValue,
    totalQuantity,
    gstAmount,
    freightCharges,
    grandTotal,
  };
}

const ONES = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const TENS = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function numberToWordsUnderThousand(num) {
  const hundred = Math.floor(num / 100);
  const remainder = num % 100;
  const tens = Math.floor(remainder / 10);
  const ones = remainder % 10;
  const parts = [];

  if (hundred) parts.push(`${ONES[hundred]} Hundred`);

  if (remainder < 20) {
    if (remainder) parts.push(ONES[remainder]);
  } else {
    parts.push([TENS[tens], ONES[ones]].filter(Boolean).join(" "));
  }

  return parts.join(" ").trim();
}

export function amountToWords(value) {
  const roundedValue = Math.round(Number(value || 0));

  if (roundedValue === 0) {
    return "INR Zero Only";
  }

  const crore = Math.floor(roundedValue / 10000000);
  const lakh = Math.floor((roundedValue % 10000000) / 100000);
  const thousand = Math.floor((roundedValue % 100000) / 1000);
  const hundred = roundedValue % 1000;
  const parts = [];

  if (crore) parts.push(`${numberToWordsUnderThousand(crore)} Crore`);
  if (lakh) parts.push(`${numberToWordsUnderThousand(lakh)} Lakh`);
  if (thousand) parts.push(`${numberToWordsUnderThousand(thousand)} Thousand`);
  if (hundred) parts.push(numberToWordsUnderThousand(hundred));

  return `INR ${parts.join(" ").trim()} Only`;
}