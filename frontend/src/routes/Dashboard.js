import React from "react";

function Dashboard() {
  return (
    <div>
      {/* Top Navbar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#570101",
        color: "turqoiuse"
      }}>
        <h2>ERP System</h2>

        <div style={{ display: "flex", gap: "25px" }}>
          <span style={{ cursor: "pointer" }}>Customers</span>
          <span style={{ cursor: "pointer" }}>Invoices</span>
          <span style={{ cursor: "pointer" }}>Users</span>
          <span style={{ cursor: "pointer" }}>Logout</span>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: "30px" }}>
        <h1>Welcome to ERP Dashboard</h1>
        <p>Select a module from the top menu.</p>
      </div>
    </div>
  );
}

export default Dashboard;