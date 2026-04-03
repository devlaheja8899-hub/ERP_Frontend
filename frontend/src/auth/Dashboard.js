import React from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";

function Dashboard() {
  const navigate = useNavigate();

  const modules = [
    {
      title: "Customers",
      description: "Manage customer information and contacts",
      path: "/customers",
      color: "#3b82f6",
      icon: "👥"
    },
    {
      title: "Invoices",
      description: "Create and manage invoices",
      path: "/invoices",
      color: "#10b981",
      icon: "📄"
    },
    {
      title: "Quotations",
      description: "Generate and track quotations",
      path: "/quotations",
      color: "#f59e0b",
      icon: "📋"
    }
  ];

  return (
    <div>
      {/* Top Navigation Bar */}
      <TopBar />

      {/* Main Content */}
      <div style={{ padding: "30px", backgroundColor: "#f9fafb", minHeight: "calc(100vh - 80px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "30px" }}>
            <h1 style={{ margin: "0 0 10px 0", color: "#1f2937", fontSize: "2.5rem" }}>
              Welcome to ERP Dashboard
            </h1>
            <p style={{ margin: 0, color: "#6b7280", fontSize: "1.1rem" }}>
              Manage your business operations efficiently
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px"
          }}>
            {modules.map((module) => (
              <div
                key={module.path}
                onClick={() => navigate(module.path)}
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  border: "1px solid #e5e7eb",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                }}
              >
                <div style={{
                  fontSize: "3rem",
                  marginBottom: "16px",
                  textAlign: "center"
                }}>
                  {module.icon}
                </div>
                <h3 style={{
                  margin: "0 0 8px 0",
                  color: "#1f2937",
                  fontSize: "1.25rem",
                  textAlign: "center"
                }}>
                  {module.title}
                </h3>
                <p style={{
                  margin: 0,
                  color: "#6b7280",
                  textAlign: "center",
                  fontSize: "0.9rem"
                }}>
                  {module.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;