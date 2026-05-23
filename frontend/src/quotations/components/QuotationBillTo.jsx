import React from "react";

export default function QuotationBillTo({ customer, delivery }) {
  return (
    <div className="quotation-billto">
      <div className="quotation-card">
        <h4>CUSTOMER DETAILS</h4>

        <h3>{customer?.companyName || "-"}</h3>

        <p>
          <b>GSTIN/UIN:</b> {customer?.gstin || "-"}
        </p>

        <p>
          <b>PAN:</b> {customer?.pan || "-"}
        </p>

        <p>
          <b>State:</b> {customer?.state || "-"}
        </p>

        <p>
          <b>Contact Person:</b> {customer?.contactPerson || "-"}
        </p>

        <p>
          <b>Email:</b> {customer?.email || "-"}
        </p>

        <p>
          <b>Phone:</b> {customer?.phone || "-"}
        </p>
      </div>
    </div>
  );
}