const API_URL = "/api/quotations/";

export async function fetchQuotations() {
  const token = localStorage.getItem("access_token");

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch quotations");
  }

  const result = await response.json();

  if (Array.isArray(result)) return result;
  if (Array.isArray(result.data)) return result.data;

  return [];
}

export function mapQuotationForPrint(quotation) {
  const customer = quotation.customer || {};

  return {
    company: {
      logo: "/logo192.png",
      name: "Vallabh Impex [I] pvt ltd",
      address:
        "Mumbai, Maharashtra, India",
      gstin: "27XXXXXXXXXXZ5",
      state: "Maharashtra",
      stateCode: "27",
      cin: "XXXXXXXXXXXX",
      pan: "XXXXXXXXXX",
      email: "sales@vallabhcomponent.com",
      phone: "+91 9876543210",
    },

    quotation: {
      no: quotation.quotation_no || "VIQ-2026-0001",
      date: quotation.quotation_date,
      validity: `${quotation.validity_days || 7} Days`,
      inquirySource: quotation.inquiry_source || "-",
      salesPerson: quotation.sales_person || "-",
      currency: quotation.currency || "INR",
      leadTime: quotation.lead_time || "-",
      dispatchMode: quotation.dispatch_mode || "-",
      status: quotation.status || "DRAFT",
    },

    customer: {
      companyName:
        customer.company_name ||
        customer.customer_name ||
        quotation.contact_person ||
        "-",
      address:
        customer.dispatch_address ||
        customer.address ||
        `${customer.city || ""} ${customer.state || ""} ${customer.pin_code || ""}`,
      gstin: customer.gst_number || "-",
      pan: customer.pan_no || "-",
      state: customer.state || "-",
      contactPerson: quotation.contact_person || customer.contact_person_name || "-",
      email: quotation.customer_email || customer.email || "-",
      phone: quotation.customer_phone || customer.contact_number || "-",
    },

    delivery: {
      leadTime: quotation.lead_time || "-",
      dispatchMode: quotation.dispatch_mode || "-",
      docketDetails: quotation.delivery_docket_details || "-",
      validity: `${quotation.validity_days || 7} Days`,
    },

    items: (quotation.items || []).map((item) => ({
      manufacturer: item.manufacturer,
      mpn: item.mpn,
      description: item.description || item.item?.item_name,
      dateCode: item.date_code,
      packType: item.packaging_type,
      quantity: item.quantity,
      rate: item.unit_price,
    })),

    totalsFromApi: {
      taxableValue: quotation.taxable_value,
      gstAmount: quotation.gst_amount,
      freightCharges: quotation.freight_charges,
      grandTotal: quotation.grand_total,
    },

    terms: {
      payment: "As mutually agreed",
      delivery: quotation.lead_time || "As per availability",
      validity: `${quotation.validity_days || 7} Days`,
      gst: "GST extra as applicable",
    },

    bankDetails: {
      bankName: "-",
      accountNumber: "-",
      branch: "-",
      ifsc: "-",
    },

    declaration:
      "We declare that this quotation is prepared based on the customer requirement and is subject to stock availability and final confirmation.",

    preparedBy: quotation.sales_person || "-",
    verifiedBy: "Admin",
    footerNote: "This is a computer-generated quotation.",
  };
}