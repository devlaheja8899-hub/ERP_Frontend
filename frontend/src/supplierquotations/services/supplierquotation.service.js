const API_URL = "/api/supplier-quotations/";

function getToken() {
  return localStorage.getItem("access_token") || localStorage.getItem("access");
}

function unwrapResponse(result) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result.data)) return result.data;
  if (Array.isArray(result.results)) return result.results;
  return [];
}

export async function fetchSupplierQuotations() {
  const token = getToken();

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch supplier quotations");
  }

  const result = await response.json();
  return unwrapResponse(result);
}

export function mapSupplierQuotationForPrint(data) {
  return {
    company: {
      logo: "/logo192.png",
      name: "Vallabh Impex [I] Pvt Ltd",
      address: "Mumbai, Maharashtra, India",
      gstin: "27XXXXXXXXXXZ5",
      state: "Maharashtra",
      email: "sales@vallabhimpex.com",
      phone: "+91 22 1234 5678",
    },

    quotation: {
      quoteNumber: data.quote_number || "-",
      rfqReferenceNo: data.rfq_reference_no || "-",
      quotationDate: data.quotation_date || "-",
      validityDate: data.validity_date || "-",
      currency: data.currency || "INR",
      createdAt: data.created_at || "-",
    },

    supplier: {
      companyName: data.company_name || "-",
      contactPerson: data.contact_person || "-",
      email: data.email || "-",
    },

    items:
      data.items && data.items.length > 0
        ? data.items
        : [
            {
              manufacturer: "ST",
              mpn: "STM32F103",
              description: "Microcontroller",
              date_code: "2025",
              quantity: 100,
              lead_time: "2 Weeks",
              moq: 50,
            },
            {
              manufacturer: "Texas Instruments",
              mpn: "LM358",
              description: "Operational Amplifier IC",
              date_code: "2024",
              quantity: 500,
              lead_time: "1 Week",
              moq: 100,
            },
          ],

    commercialTerms: data.commercial_terms || {
      incoterms: "EXW",
      payment_terms: "30 Days",
      shipping_days: 7,
      quality_authenticity_terms: "Original and tested material",
    },

    priceComparisons:
      data.price_comparisons && data.price_comparisons.length > 0
        ? data.price_comparisons
        : [
            {
              supplier: data.company_name || "ABC Electronics",
              price: 120,
              lead_time: "2 Weeks",
            },
            {
              supplier: "XYZ Components",
              price: 115,
              lead_time: "3 Weeks",
            },
          ],

    priceHistories:
      data.price_histories && data.price_histories.length > 0
        ? data.price_histories
        : [
            {
              supplier: data.company_name || "ABC Electronics",
              mpn: "STM32F103",
              price: 118,
              currency: data.currency || "INR",
              quotation_date: data.quotation_date || "2026-05-16",
            },
          ],
  };
}