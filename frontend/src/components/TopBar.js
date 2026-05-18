import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/customers", label: "Customers" },
    { path: "/invoices", label: "Invoices" },
    { path: "/quotations", label: "Quotations" },
    { path: "/purchaseorders", label: "Purchase Orders" },
    { path: "/salesorders", label: "Sales Orders" },
    { path: "/supplier-quotations", label: "Supplier Quotations" },
    { path: "/stock-summary", label: "Stock Summary" },
    { path: "/movement-analysis", label: "Movement Analysis", icon: "📊" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        backgroundColor: "#1f2937",
        color: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
        <h3 style={{ margin: 0, color: "#3b82f6" }}>ERP Dashboard</h3>

        <nav style={{ display: "flex", gap: "20px" }}>
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                background: "none",
                border: "none",
                color: location.pathname === item.path ? "#3b82f6" : "white",
                cursor: "pointer",
                padding: "8px 12px",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: location.pathname === item.path ? "bold" : "normal",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#374151";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                {item.icon && <span>{item.icon}</span>}
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#ef4444",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          transition: "background-color 0.2s",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#dc2626";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#ef4444";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default TopBar;