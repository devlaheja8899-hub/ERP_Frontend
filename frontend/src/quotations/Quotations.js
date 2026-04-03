import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";

function Quotations() {
  const [quotations, setQuotations] = useState([]);
  const [filteredQuotations, setFilteredQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    fetch("/api/quotations/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch quotations");
        }
        return res.json();
      })
      .then((data) => {
        setQuotations(data);
        setFilteredQuotations(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = quotations;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(quotation =>
        quotation.quotation_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quotation.customer?.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quotation.customer?.customer_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(quotation =>
        quotation.status?.toLowerCase() === statusFilter
      );
    }

    setFilteredQuotations(filtered);
  }, [searchTerm, statusFilter, quotations]);

  if (loading) {
    return (
      <>
        <TopBar />
        <div style={{ padding: "30px", textAlign: "center" }}>
          <div style={{ fontSize: "18px", color: "#6b7280" }}>Loading quotations...</div>
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
          <h2 style={{ margin: 0, color: "#1f2937" }}>Quotations</h2>
          <button
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Create Quotation
          </button>
        </div>

        {/* Search and Filter Controls */}
        <div style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          alignItems: "center",
          flexWrap: "wrap"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={{ fontSize: "14px", fontWeight: "500" }}>Search:</label>
            <input
              type="text"
              placeholder="Search by quotation number or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                fontSize: "14px",
                minWidth: "300px",
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={{ fontSize: "14px", fontWeight: "500" }}>Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            >
              <option value="all">All</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="converted">Converted</option>
            </select>
          </div>

          <div style={{ fontSize: "14px", color: "#6b7280" }}>
            Showing {filteredQuotations.length} of {quotations.length} quotations
          </div>
        </div>

        {filteredQuotations.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
            {quotations.length === 0 ? "No quotations found." : "No quotations match your search criteria."}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              overflow: "hidden",
            }}>
              <thead>
                <tr style={{ backgroundColor: "#f9fafb" }}>
                  <th style={tableHeaderStyle}>Quotation No</th>
                  <th style={tableHeaderStyle}>Date</th>
                  <th style={tableHeaderStyle}>Customer</th>
                  <th style={tableHeaderStyle}>Contact Person</th>
                  <th style={tableHeaderStyle}>Sales Person</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={tableHeaderStyle}>Total Amount</th>
                  <th style={tableHeaderStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotations.map((quotation) => (
                  <tr key={quotation.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={tableCellStyle}>{quotation.quotation_no}</td>
                    <td style={tableCellStyle}>
                      {new Date(quotation.quotation_date).toLocaleDateString()}
                    </td>
                    <td style={tableCellStyle}>
                      {quotation.customer ? `${quotation.customer.company_name} - ${quotation.customer.customer_name}` : 'N/A'}
                    </td>
                    <td style={tableCellStyle}>{quotation.contact_person}</td>
                    <td style={tableCellStyle}>{quotation.sales_person}</td>
                    <td style={tableCellStyle}>
                      <span style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        backgroundColor: getStatusColor(quotation.status),
                        color: getStatusTextColor(quotation.status)
                      }}>
                        {quotation.status || 'DRAFT'}
                      </span>
                    </td>
                    <td style={tableCellStyle}>
                      {quotation.currency} {quotation.grand_total?.toLocaleString()}
                    </td>
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

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'draft': return '#fef3c7';
    case 'sent': return '#dbeafe';
    case 'approved': return '#d1fae5';
    case 'rejected': return '#fee2e2';
    case 'converted': return '#e0e7ff';
    default: return '#f3f4f6';
  }
};

const getStatusTextColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'draft': return '#92400e';
    case 'sent': return '#1e40af';
    case 'approved': return '#065f46';
    case 'rejected': return '#991b1b';
    case 'converted': return '#3730a3';
    default: return '#374151';
  }
};

export default Quotations;