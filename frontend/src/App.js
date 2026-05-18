import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Dashboard from "./auth/Dashboard";
import Customers from "./customers/Customers";
import Invoices from "./invoices/Invoices";
import Quotations from "./quotations/Quotations";
import PurchaseOrders from "./purchaseorders/PurchaseOrders";
import SalesOrders from "./salesorders/SalesOrders";
import SupplierQuotations from "./supplierquotations/SupplierQuotations";
import StockSummary from "./stocksummary/StockSummary";
import MovementAnalysis from "./movementanalysis/pages/MovementAnalysis";
function PrivateRoute({ children }) {
  const token = localStorage.getItem("access_token");
  console.log("PRIVATE ROUTE TOKEN:", token);

  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <PrivateRoute>
              <Customers />
            </PrivateRoute>
          }
        />

        <Route
          path="/invoices"
          element={
            <PrivateRoute>
              <Invoices />
            </PrivateRoute>
          }
        />

        <Route
          path="/quotations"
          element={
            <PrivateRoute>
              <Quotations />
            </PrivateRoute>
          }
        />

        <Route
          path="/purchaseorders"
          element={
            <PrivateRoute>
              <PurchaseOrders />
            </PrivateRoute>
          }
        />

        <Route
          path="/salesorders"
          element={
            <PrivateRoute>
              <SalesOrders />
            </PrivateRoute>
          }
        />

        <Route
          path="/supplier-quotations"
          element={
            <PrivateRoute>
              <SupplierQuotations />
            </PrivateRoute>
          }
        />

        <Route
          path="/stock-summary"
          element={
            <PrivateRoute>
              <StockSummary />
            </PrivateRoute>
          }
        />
        <Route
          path="/movement-analysis"
          element={
            <PrivateRoute>
              <MovementAnalysis />
            </PrivateRoute>
          }
        />

        {/* Default route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;