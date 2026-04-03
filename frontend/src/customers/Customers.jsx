import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log("Fetching customers with token:", token);

    if (!token) {
      setError("Please login first");
      setLoading(false);
      return;
    }

    fetch("/api/customers/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch customers");
        }
        return res.json();
      })
      .then((data) => {
        setCustomers(data);
        setFilteredCustomers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = customers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.customer_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.contact_person_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(customer =>
        statusFilter === "active" ? customer.is_active : !customer.is_active
      );
    }

    setFilteredCustomers(filtered);
  }, [searchTerm, statusFilter, customers]);

  if (loading) {
    return (
      <>
        <TopBar />
        <div style={{ padding: "30px", textAlign: "center" }}>
          <div style={{ fontSize: "18px", color: "#6b7280" }}>Loading customers...</div>
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
          <h2 style={{ margin: 0, color: "#1f2937" }}>Customers</h2>
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
            Add Customer
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
              placeholder="Search by company, customer, ID, or contact..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div style={{ fontSize: "14px", color: "#6b7280" }}>
            Showing {filteredCustomers.length} of {customers.length} customers
          </div>
        </div>

        {filteredCustomers.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
            {customers.length === 0 ? "No customers found." : "No customers match your search criteria."}
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
                  <th style={tableHeaderStyle}>Customer ID</th>
                  <th style={tableHeaderStyle}>Company Name</th>
                  <th style={tableHeaderStyle}>Customer Name</th>
                  <th style={tableHeaderStyle}>Contact Person</th>
                  <th style={tableHeaderStyle}>Email</th>
                  <th style={tableHeaderStyle}>Phone</th>
                  <th style={tableHeaderStyle}>Industry</th>
                  <th style={tableHeaderStyle}>Sales Person</th>
                  <th style={tableHeaderStyle}>City</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={tableHeaderStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={tableCellStyle}>{customer.customer_id}</td>
                    <td style={tableCellStyle}>{customer.company_name}</td>
                    <td style={tableCellStyle}>{customer.customer_name}</td>
                    <td style={tableCellStyle}>{customer.contact_person_name}</td>
                    <td style={tableCellStyle}>{customer.email}</td>
                    <td style={tableCellStyle}>{customer.contact_number}</td>
                    <td style={tableCellStyle}>{customer.industry}</td>
                    <td style={tableCellStyle}>{customer.sales_person}</td>
                    <td style={tableCellStyle}>{customer.city}</td>
                    <td style={tableCellStyle}>
                      <span style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        backgroundColor: customer.is_active ? "#d1fae5" : "#fee2e2",
                        color: customer.is_active ? "#065f46" : "#991b1b"
                      }}>
                        {customer.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={tableCellStyle}>
                      <button style={actionButtonStyle("#3b82f6")}>Edit</button>
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

export default Customers;