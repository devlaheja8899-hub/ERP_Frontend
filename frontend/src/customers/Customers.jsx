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

    if (!token || token === "undefined") {
      setError("Please login first");
      setLoading(false);
      return;
    }

    fetch("/api/accounts/customers/", {
      method: "GET",
      headers: {
        Accept: "application/json",
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
        console.log("Customers API Response:", data);

        const customerList = Array.isArray(data?.data) ? data.data : [];

        setCustomers(customerList);
        setFilteredCustomers(customerList);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Customer fetch error:", err);
        setCustomers([]);
        setFilteredCustomers([]);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = Array.isArray(customers) ? customers : [];

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      filtered = filtered.filter((customer) =>
        customer.company_name?.toLowerCase().includes(search) ||
        customer.customer_name?.toLowerCase().includes(search) ||
        customer.customer_id?.toLowerCase().includes(search) ||
        customer.contact_person_name?.toLowerCase().includes(search) ||
        customer.email?.toLowerCase().includes(search) ||
        customer.contact_number?.toLowerCase().includes(search) ||
        customer.city?.toLowerCase().includes(search)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((customer) =>
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
          <div style={{ fontSize: "18px", color: "#6b7280" }}>
            Loading customers...
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
          <div style={{ fontSize: "18px", color: "#ef4444" }}>
            Error: {error}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar />

      <div style={{ padding: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: 0, color: "#1f2937" }}>Customers</h2>

          <button style={addButtonStyle}>Add Customer</button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "20px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={labelStyle}>Search:</label>
            <input
              type="text"
              placeholder="Search by company, customer, ID, contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={labelStyle}>Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={selectStyle}
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
            {customers.length === 0
              ? "No customers found."
              : "No customers match your search criteria."}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
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
                    <td style={tableCellStyle}>{customer.customer_id || "-"}</td>
                    <td style={tableCellStyle}>{customer.company_name || "-"}</td>
                    <td style={tableCellStyle}>{customer.customer_name || "-"}</td>
                    <td style={tableCellStyle}>{customer.contact_person_name || "-"}</td>
                    <td style={tableCellStyle}>{customer.email || "-"}</td>
                    <td style={tableCellStyle}>{customer.contact_number || "-"}</td>
                    <td style={tableCellStyle}>{customer.industry || "-"}</td>
                    <td style={tableCellStyle}>{customer.sales_person || "-"}</td>
                    <td style={tableCellStyle}>{customer.city || "-"}</td>

                    <td style={tableCellStyle}>
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          backgroundColor: customer.is_active ? "#d1fae5" : "#fee2e2",
                          color: customer.is_active ? "#065f46" : "#991b1b",
                        }}
                      >
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

const addButtonStyle = {
  backgroundColor: "#3b82f6",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "6px",
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
  minWidth: "300px",
};

const selectStyle = {
  padding: "8px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "4px",
  fontSize: "14px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  overflow: "hidden",
  backgroundColor: "white",
};

const tableHeaderStyle = {
  padding: "12px 16px",
  textAlign: "left",
  fontWeight: "600",
  color: "#073378",
  borderBottom: "2px solid #e5e7eb",
  whiteSpace: "nowrap",
};

const tableCellStyle = {
  padding: "12px 16px",
  color: "#6b7280",
  whiteSpace: "nowrap",
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