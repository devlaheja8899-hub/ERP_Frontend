const API_URL = "http://127.0.0.1:8000/api/purchaseorder/purchaseorders/";

export async function fetchPurchaseOrders() {
  const token = localStorage.getItem("access_token");

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  console.log("PURCHASE ORDER API RESPONSE:", result);

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch purchase orders");
  }

  if (Array.isArray(result)) return result;
  if (Array.isArray(result.data)) return result.data;

  return [];
}

export function mapPurchaseOrderForPrint(po) {
  return {
    company: {
      logo: "/logo192.png",
      name: "Vallabh Impex [I] pvt ltd",
      address: "Mumbai, Maharashtra, India",
      gstin: "27XXXXXXXXXXZ5",
      state: "Maharashtra",
      stateCode: "27",
      cin: "XXXXXXXXXXXX",
      pan: "XXXXXXXXXX",
      email: "sales@vallabhcomponent.com",
      phone: "+91 9876543210",
    },

    purchaseOrder: {
      no: po.purchase_order_number || po.po_number || "VIPO-2026-0001",
      date: po.purchase_order_date || po.po_date,
      supplierName: po.supplier_name || po.company_name || "-",
      salesOrderRef: po.salesorder_reference_no || po.sales_order_reference || "-",
      buyerName: po.buyers_name || po.buyer_name || "-",
      expectedDeliveryDate: po.expected_delivery_date || "-",
      status: po.status || po.purchase_order_status || "UNDER PROCESS",
      currency: po.currency || "INR",
    },

    supplier: {
      name: po.supplier_name || po.company_name || "-",
      address: po.supplier_address || po.address || "-",
      contactPerson: po.contact_person || "-",
      phone: po.phone_no || po.phone || "-",
      email: po.email || po.supplier_email || "-",
      gstin: po.gst_number || "-",
      pan: po.pan_no || "-",
    },

    delivery: {
      expectedDeliveryDate: po.expected_delivery_date || "-",
      deliveryTerms: po.delivery_terms || "As mutually agreed",
      paymentTerms: po.payment_terms || "As mutually agreed",
      docketDetails: po.docket_details || po.tracking_no || "-",
      status: po.status || "UNDER PROCESS",
    },

    items: (po.items || []).map((item) => ({
      manufacturer: item.manufacturer,
      mpn: item.mpn,
      description: item.description || item.item?.item_name,
      dateCode: item.date_code,
      packType: item.pack_type || item.packaging_type,
      quantity: item.quantity,
      rate: item.unit_price,
    })),

    totalsFromApi: {
      taxableValue: po.subtotal || po.taxable_value,
      gstAmount: po.gst || po.gst_amount,
      roundOff: po.roundoff || po.round_off,
      grandTotal: po.grand_total || po.total_amount,
    },

    terms: {
      payment: po.payment_terms || "As mutually agreed",
      delivery: po.delivery_terms || "As per supplier confirmation",
      gst: "GST extra as applicable",
    },

    declaration:
      "We declare that this purchase order is prepared based on approved purchase requirements and supplier confirmation.",

    preparedBy: po.buyers_name || po.buyer_name || "-",
    verifiedBy: "Admin",
    footerNote: "This is a computer-generated purchase order.",
  };
}