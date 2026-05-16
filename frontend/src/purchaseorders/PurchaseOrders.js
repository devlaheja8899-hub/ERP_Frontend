import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import { fetchPurchaseOrders } from "./services/purchaseorder.service";

function PurchaseOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    let isMounted = true;

    fetchPurchaseOrders()
      .then((data) => {
        if (!isMounted) return;
        setOrders(data);
        setFilteredOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "Failed to fetch purchase orders");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let filtered = Array.isArray(orders) ? orders : [];

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter((order) =>
        order.purchase_order_number?.toLowerCase().includes(search) ||
        order.supplier_company_name?.toLowerCase().includes(search) ||
        order.buyer_name?.toLowerCase().includes(search) ||
        order.contact_person?.toLowerCase().includes(search)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (order) => order.status?.toLowerCase() === statusFilter
      );
    }

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, orders]);

  if (loading) {
    return (
      <>
        <TopBar />
        <div style={{ padding: "30px", textAlign: "center" }}>
          <div style={{ fontSize: "18px", color: "#6b7280" }}>
            Loading purchase orders...
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
            <h2 style={{ margin: 0, color: "#1f2937" }}>Purchase Orders</h2>
            <p style={{ margin: "8px 0 0", color: "#6b7280" }}>
              Manage and review purchase orders from suppliers.
            </p>
          </div>
          <button style={addButtonStyle}>Create Purchase Order</button>
        </div>

        <div style={{ display: "flex", gap: "15px", marginBottom: "20px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={labelStyle}>Search:</label>
            <input
              type="text"
              placeholder="Search by PO number, supplier, buyer or contact"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={labelStyle}>Status:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={selectStyle}>
              <option value="all">All</option>
              <option value="received">Received</option>
              <option value="processed">Processed</option>
              <option value="shipped">Shipped</option>
            </select>
          </div>

          <div style={{ fontSize: "14px", color: "#6b7280" }}>
            Showing {filteredOrders.length} of {orders.length} purchase orders
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
            {orders.length === 0 ? "No purchase orders found." : "No purchase orders match your search criteria."}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ backgroundColor: "#f9fafb" }}>
                  <th style={tableHeaderStyle}>PO Number</th>
                  <th style={tableHeaderStyle}>PO Date</th>
                  <th style={tableHeaderStyle}>Supplier</th>
                  <th style={tableHeaderStyle}>Buyer</th>
                  <th style={tableHeaderStyle}>Contact</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={tableHeaderStyle}>Total</th>
                  <th style={tableHeaderStyle}>Delivery Date</th>
                  <th style={tableHeaderStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={tableCellStyle}>{order.purchase_order_number || "-"}</td>
                    <td style={tableCellStyle}>{order.purchase_order_date ? new Date(order.purchase_order_date).toLocaleDateString() : "-"}</td>
                    <td style={tableCellStyle}>{order.supplier_company_name || "-"}</td>
                    <td style={tableCellStyle}>{order.buyer_name || "-"}</td>
                    <td style={tableCellStyle}>{order.contact_person || "-"}</td>
                    <td style={tableCellStyle}>
                      <span style={{ padding: "4px 8px", borderRadius: "4px", fontSize: "12px", backgroundColor: getStatusBackground(order.status), color: getStatusColor(order.status) }}>
                        {order.status || "processed"}
                      </span>
                    </td>
                    <td style={tableCellStyle}>{order.total_amount ? `₹ ${Number(order.total_amount).toLocaleString()}` : "-"}</td>
                    <td style={tableCellStyle}>{order.expected_delivery_date ? new Date(order.expected_delivery_date).toLocaleDateString() : "-"}</td>
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

const getStatusBackground = (status) => {
  switch (status?.toLowerCase()) {
    case "received":
      return "#d1fae5";
    case "processed":
      return "#dbeafe";
    case "shipped":
      return "#fef3c7";
    default:
      return "#f3f4f6";
  }
};

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "received":
      return "#065f46";
    case "processed":
      return "#1e40af";
    case "shipped":
      return "#92400e";
    default:
      return "#374151";
  }
};

export default PurchaseOrders;
