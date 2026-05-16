import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={styles.nav}>
      <h3>ERP System</h3>

      <div style={styles.links}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/invoices">Invoices</Link>
        <Link to="/quotations">Quotations</Link>
        <Link to="/purchaseorders">Purchase Orders</Link>
        <Link to="/salesorders">Sales Orders</Link>
        <Link to="/supplier-quotations">Supplier Quotations</Link>
        <Link to="/stock-summary">Stock Summary</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 20px",
    background: "#1e293b",
    color: "#fff",
  },
  links: {
    display: "flex",
    gap: "15px",
  },
};

export default Navbar;