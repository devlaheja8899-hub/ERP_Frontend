import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import { fetchStockItems } from "./services/stocksummary.service";

function StockSummary() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    let isMounted = true;

    fetchStockItems()
      .then((data) => {
        if (!isMounted) return;
        setItems(data);
        setFilteredItems(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "Failed to fetch stock items");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let filtered = Array.isArray(items) ? items : [];

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter((item) =>
        item.item_name?.toLowerCase().includes(search) ||
        item.mpn?.toLowerCase().includes(search) ||
        item.manufacturer?.toLowerCase().includes(search) ||
        item.category?.toLowerCase().includes(search) ||
        item.warehouse_location?.toLowerCase().includes(search)
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((item) => item.category?.toLowerCase() === categoryFilter);
    }

    setFilteredItems(filtered);
  }, [searchTerm, categoryFilter, items]);

  if (loading) {
    return (
      <>
        <TopBar />
        <div style={{ padding: "30px", textAlign: "center" }}>
          <div style={{ fontSize: "18px", color: "#6b7280" }}>
            Loading stock summary...
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

  const categories = Array.from(new Set(items.map((item) => item.category).filter(Boolean)));

  return (
    <>
      <TopBar />
      <div style={{ padding: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h2 style={{ margin: 0, color: "#1f2937" }}>Stock Summary</h2>
            <p style={{ margin: "8px 0 0", color: "#6b7280" }}>
              Monitor inventory levels and stock movement.
            </p>
          </div>
          <button style={addButtonStyle}>Add Stock Item</button>
        </div>

        <div style={{ display: "flex", gap: "15px", marginBottom: "20px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={labelStyle}>Search:</label>
            <input
              type="text"
              placeholder="Search by item, MPN, manufacturer, or warehouse"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={labelStyle}>Category:</label>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={selectStyle}>
              <option value="all">All</option>
              {categories.map((category) => (
                <option key={category} value={category.toLowerCase()}>{category}</option>
              ))}
            </select>
          </div>

          <div style={{ fontSize: "14px", color: "#6b7280" }}>
            Showing {filteredItems.length} of {items.length} stock items
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
            {items.length === 0 ? "No stock items found." : "No stock items match your search criteria."}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ backgroundColor: "#f9fafb" }}>
                  <th style={tableHeaderStyle}>Item Name</th>
                  <th style={tableHeaderStyle}>MPN</th>
                  <th style={tableHeaderStyle}>Manufacturer</th>
                  <th style={tableHeaderStyle}>Category</th>
                  <th style={tableHeaderStyle}>Available</th>
                  <th style={tableHeaderStyle}>Incoming</th>
                  <th style={tableHeaderStyle}>Minimum</th>
                  <th style={tableHeaderStyle}>Cost Price</th>
                  <th style={tableHeaderStyle}>Sales Price</th>
                  <th style={tableHeaderStyle}>Low Stock</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={tableCellStyle}>{item.item_name || "-"}</td>
                    <td style={tableCellStyle}>{item.mpn || "-"}</td>
                    <td style={tableCellStyle}>{item.manufacturer || "-"}</td>
                    <td style={tableCellStyle}>{item.category || "-"}</td>
                    <td style={tableCellStyle}>{item.available_stock ?? "-"}</td>
                    <td style={tableCellStyle}>{item.incoming_stock ?? "-"}</td>
                    <td style={tableCellStyle}>{item.minimum_stock ?? "-"}</td>
                    <td style={tableCellStyle}>{item.cost_price ? `₹ ${Number(item.cost_price).toLocaleString()}` : "-"}</td>
                    <td style={tableCellStyle}>{item.sales_price ? `₹ ${Number(item.sales_price).toLocaleString()}` : "-"}</td>
                    <td style={tableCellStyle}>
                      <span style={{ padding: "4px 8px", borderRadius: "4px", fontSize: "12px", backgroundColor: item.is_low_stock ? "#fee2e2" : "#d1fae5", color: item.is_low_stock ? "#991b1b" : "#065f46" }}>
                        {item.is_low_stock ? "Low" : "Healthy"}
                      </span>
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

export default StockSummary;
