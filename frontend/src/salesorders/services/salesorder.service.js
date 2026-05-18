const sampleSalesOrder = {
  company: {
    logo: "https://dummyimage.com/120x40/ffffff/0f172a.png&text=VALLABH",
    name: "Vallabh Impex (India) Pvt. Ltd.",
    address: "14, 3rd Floor, Ahmed Mansion, 156 Lamington Road, Mumbai - 400007",
    gstin: "27AAACV3586B1ZE",
    state: "Maharashtra",
    stateCode: "27",
    cin: "U51900MH1997PTC108420",
    email: "sales@vallabhimpex.com",
    phone: "+91 22 1234 5678",
    pan: "AAACV3586B",
  },

  salesOrder: {
    no: "VISO-2026-001",
    date: "2026-05-18",
    quotationRefNo: "VIQ-2026-001",
    customerPoNo: "PO-44781",
    salesPerson: "Amit Sharma",
    expectedDeliveryDate: "2026-05-25",
    paymentTerms: "30 Days",
    status: "Pending Order",
    dispatchMode: "Blue Dart Surface",
  },

  billTo: {
    companyName: "Syrma SGS Technology Limited",
    billingAddress:
      "Plot No. 174, Sector 4, IMT Manesar, Gurugram, Haryana - 122050",
    gstin: "06AACCS7450D1ZC",
    pan: "AACCS7450D",
    state: "Haryana",
    stateCode: "06",
    contactPerson: "Ashutosh K. Singh",
    phone: "+91 98115 29217",
    email: "purchase@syrmasgs.com",
  },

  delivery: {
    shippingAddress:
      "Syrma SGS Technology Limited, Plot No. 174, Sector 4, IMT Manesar, Gurugram, Haryana - 122050",
    deliveryDate: "25-May-2026",
    dispatchMode: "Blue Dart Surface",
    deliveryTerms: "Door Delivery",
  },

  items: [
    {
      si: 1,
      manufacturer: "Royalohm",
      mpn: "CQ06S4F102T5E",
      description: "51K RMC CQ06 1/4W-S 1% Royalohm CQ Autograde",
      dateCode: "2025+",
      packType: "Reel",
      quantity: 50000,
      unitPrice: 0.18,
    },
    {
      si: 2,
      manufacturer: "Royalohm",
      mpn: "CQ03SAF8200T5E",
      description: "820E RMC CQ03 1/10WS 1% Royalohm",
      dateCode: "2025+",
      packType: "Reel",
      quantity: 10000,
      unitPrice: 0.06,
    },
  ],

  taxes: [
    {
      label: "IGST",
      rate: 18,
    },
  ],

  adjustments: {
    discount: 0,
    shipping: 0,
    roundOff: 0,
  },

  declaration:
    "We confirm that this sales order is prepared as per customer purchase order and agreed commercial terms.",

  preparedBy: "Sales Department",
  approvedBy: "Sales Manager",
  footerNote: "This is a Computer Generated Sales Order",
};

export function getSalesOrder() {
  return sampleSalesOrder;
}