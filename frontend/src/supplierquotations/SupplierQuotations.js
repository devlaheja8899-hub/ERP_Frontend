import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import { fetchSupplierQuotations } from "./services/supplierquotation.service";

function SupplierQuotations() {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("all");

  useEffect(() => {
    let isMounted = true;

    fetchSupplierQuotations()
      .then((data) => {
        if (!isMounted) return;
        setQuotes(data);
        setFilteredQuotes(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "Failed to fetch supplier quotations");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let filtered = Array.isArray(quotes) ? quotes : [];

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter((quote) =>
        quote.quote_number?.toLowerCase().includes(search) ||
        quote.company_name?.toLowerCase().includes(search) ||
        quote.contact_person?.toLowerCase().includes(search) ||
        quote.rfq_reference_no?.toLowerCase().includes(search)
      );
    }

    if (currencyFilter !== "all") {
      filtered = filtered.filter((quote) => quote.currency === currencyFilter);
    }

    setFilteredQuotes(filtered);
  }, [searchTerm, currencyFilter, quotes]);

  if (loading) {
    return (
      <>
        <TopBar />
        <div style={{ padding: "30px", textAlign: "center" }}>
          <div style={{ fontSize: "18px", color: "#6b7280" }}>
            Loading supplier quotations...
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <TopBar />
        <div style={{ padding: "30px", textAlign: "center" }}>
          <div style={{ fontSize: "18px", color: "#ef4444" }}>Error: {error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar />
      <div style={{ padding: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h2 style={{ margin: 0, color: "#1f2937" }}>Supplier Quotations</h2>
            <p style={{ margin: "8px 0 0", color: "#6b7280" }}>
              Review supplier quotes and RFQ details.
            </p>
          </div>
          <button style={addButtonStyle}>Create Supplier Quote</button>
        </div>

        <div style={{ display: "flex", gap: "15px", marginBottom: "20px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={labelStyle}>Search:</label>
            <input
              type="text"
              placeholder="Search by quote number, company, contact or RFQ"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={labelStyle}>Currency:</label>
            <select value={currencyFilter} onChange={(e) => setCurrencyFilter(e.target.value)} style={selectStyle}>
              <option value="all">All</option>
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>

          <div style={{ fontSize: "14px", color: "#6b7280" }}>
            Showing {filteredQuotes.length} of {quotes.length} supplier quotations
          </div>
        </div>

        {filteredQuotes.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
            {quotes.length === 0 ? "No supplier quotations found." : "No supplier quotations match your search criteria."}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ backgroundColor: "#f9fafb" }}>
                  <th style={tableHeaderStyle}>Quote No</th>
                  <th style={tableHeaderStyle}>Date</th>
                  <th style={tableHeaderStyle}>Company</th>
                  <th style={tableHeaderStyle}>Contact Person</th>
                  <th style={tableHeaderStyle}>RFQ Ref</th>
                  <th style={tableHeaderStyle}>Validity</th>
                  <th style={tableHeaderStyle}>Currency</th>
                  <th style={tableHeaderStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.map((quote) => (
                  <tr key={quote.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={tableCellStyle}>{quote.quote_number || "-"}</td>
                    <td style={tableCellStyle}>{quote.quotation_date ? new Date(quote.quotation_date).toLocaleDateString() : "-"}</td>
                    <td style={tableCellStyle}>{quote.company_name || "-"}</td>
                    <td style={tableCellStyle}>{quote.contact_person || "-"}</td>
                    <td style={tableCellStyle}>{quote.rfq_reference_no || "-"}</td>
                    <td style={tableCellStyle}>{quote.validity_date ? new Date(quote.validity_date).toLocaleDateString() : "-"}</td>
                    <td style={tableCellStyle}>{quote.currency || "-"}</td>
                    <td style={tableCellStyle}>
                      <button style={actionButtonStyle("#3b82f6")}>View</button>
                      <button style={actionButtonStyle("#ef4444")}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  overflow: "hidden",
};

const tableHeaderStyle = {
  padding: "12px 16px",
  textAlign: "left",
  fontWeight: "600",
  color: "#374151",
  borderBottom: "2px solid #e5e7eb",
};

const tableCellStyle = {
  padding: "12px 16px",
  color: "#6b7280",
};

const addButtonStyle = {
  backgroundColor: "#3b82f6",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: "500",
};

const inputStyle = {
  padding: "8px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "4px",
  fontSize: "14px",
  minWidth: "280px",
};

const selectStyle = {
  padding: "8px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "4px",
  fontSize: "14px",
};

const actionButtonStyle = (color) => ({
  backgroundColor: color,
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px",
  marginRight: "8px",
});

export default SupplierQuotations;
