import React from "react";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <div
      style={{
        height: "60px",
        backgroundColor: "#1e293b",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
      }}
    >
      <h3>ERP System</h3>

      <div style={{ display: "flex", gap: "20px" }}>
        <button onClick={() => navigate("/")} style={btnStyle}>Dashboard</button>
        <button onClick={() => navigate("/customers")} style={btnStyle}>Customers</button>
        <button onClick={() => navigate("/invoices")} style={btnStyle}>Invoices</button>
        <button onClick={handleLogout} style={logoutStyle}>Logout</button>
      </div>
    </div>
  );
}

const btnStyle = {
  background: "transparent",
  border: "none",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
};

const logoutStyle = {
  ...btnStyle,
  color: "#f87171",
};

export default TopBar;