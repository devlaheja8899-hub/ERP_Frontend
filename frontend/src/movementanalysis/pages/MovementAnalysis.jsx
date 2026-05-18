import React, { useEffect, useState } from "react";

export default function MovementAnalysis() {
  const [activeTab, setActiveTab] = useState("inward");

  const [inwardData, setInwardData] = useState([]);
  const [outwardData, setOutwardData] = useState([]);

  const emptyForm = {
    item_description: "",
    mpn: "",
    package_type: "Reel",
    category: "Industrial",
    date: "",
    rate: "",
    gross_profit_percent: "",
    purchase_date: "",
    current_stock: "",
    billing_date: "",
    total_stock_sell: "",
    total_quantity: "",
    total_amount: "",
  };

  const [form, setForm] = useState(emptyForm);

  const loadData = () => {
    const inward = [
      {
        id: 1,
        item_description: "STM32 Microcontroller",
        mpn: "STM32F103",
        package_type: "Tray",
        category: "Industrial",
        date: "2026-05-18",
        rate: 120,
        gross_profit_percent: 18,
        total_amount: 12000,
        average_purchase: 110,
      },

      {
        id: 2,
        item_description: "Automotive IC",
        mpn: "ATMEGA328",
        package_type: "Reel",
        category: "Automotive",
        date: "2026-05-17",
        rate: 90,
        gross_profit_percent: 12,
        total_amount: 9000,
        average_purchase: 85,
      },

      {
        id: 3,
        item_description: "Defence Sensor",
        mpn: "SEN-900",
        package_type: "Tray",
        category: "Defence",
        date: "2026-05-15",
        rate: 250,
        gross_profit_percent: -5,
        total_amount: 25000,
        average_purchase: 260,
      },
    ];

    const outward = [
      {
        id: 1,
        item_description: "Power MOSFET",
        mpn: "IRF540",
        package_type: "Reel",
        category: "Industrial",
        date: "2026-05-18",
        rate: 150,
        gross_profit_percent: 20,
        total_amount: 15000,
        average_selling: 145,
      },

      {
        id: 2,
        item_description: "CAN Controller",
        mpn: "MCP2515",
        package_type: "Tray",
        category: "Automotive",
        date: "2026-05-16",
        rate: 180,
        gross_profit_percent: 25,
        total_amount: 18000,
        average_selling: 170,
      },

      {
        id: 3,
        item_description: "Radar Processor",
        mpn: "RDP-700",
        package_type: "Tray",
        category: "Defence",
        date: "2026-05-12",
        rate: 500,
        gross_profit_percent: -8,
        total_amount: 50000,
        average_selling: 540,
      },
    ];

    setInwardData(inward);
    setOutwardData(outward);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      item_description: form.item_description,
      mpn: form.mpn,
      package_type: form.package_type,
      category: form.category,
      date: form.date,
      rate: form.rate,
      gross_profit_percent: form.gross_profit_percent,
      total_amount: form.total_amount,
      average_purchase:
        activeTab === "inward"
          ? (
              Number(form.total_amount) / Number(form.total_quantity || 1)
            ).toFixed(2)
          : undefined,

      average_selling:
        activeTab === "outward"
          ? (
              Number(form.total_amount) / Number(form.total_quantity || 1)
            ).toFixed(2)
          : undefined,
    };

    if (activeTab === "inward") {
      setInwardData([newItem, ...inwardData]);
    } else {
      setOutwardData([newItem, ...outwardData]);
    }

    setForm(emptyForm);
  };

  const data = activeTab === "inward" ? inwardData : outwardData;

  return (
    <div
      style={{
        padding: "30px",
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
          color: "#1e293b",
        }}
      >
        Movement Analysis
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("inward")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            border: "none",
            borderRadius: "8px",
            background:
              activeTab === "inward" ? "#2563eb" : "#cbd5e1",
            color:
              activeTab === "inward" ? "#fff" : "#000",
            cursor: "pointer",
          }}
        >
          Movement Inward
        </button>

        <button
          onClick={() => setActiveTab("outward")}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            background:
              activeTab === "outward" ? "#2563eb" : "#cbd5e1",
            color:
              activeTab === "outward" ? "#fff" : "#000",
            cursor: "pointer",
          }}
        >
          Movement Outward
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "30px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "15px",
          }}
        >
          <input
            type="text"
            name="item_description"
            placeholder="Item Description"
            value={form.item_description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="mpn"
            placeholder="MPN"
            value={form.mpn}
            onChange={handleChange}
          />

          <select
            name="package_type"
            value={form.package_type}
            onChange={handleChange}
          >
            <option>Reel</option>
            <option>Tray</option>
          </select>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option>Industrial</option>
            <option>Automotive</option>
            <option>Defence</option>
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <input
            type="number"
            name="rate"
            placeholder="Rate"
            value={form.rate}
            onChange={handleChange}
          />

          <input
            type="number"
            name="gross_profit_percent"
            placeholder="Gross Profit % / Loss Negative"
            value={form.gross_profit_percent}
            onChange={handleChange}
          />

          {activeTab === "inward" && (
            <>
              <input
                type="date"
                name="purchase_date"
                value={form.purchase_date}
                onChange={handleChange}
              />

              <input
                type="number"
                name="current_stock"
                placeholder="Current Stock"
                value={form.current_stock}
                onChange={handleChange}
              />
            </>
          )}

          {activeTab === "outward" && (
            <>
              <input
                type="date"
                name="billing_date"
                value={form.billing_date}
                onChange={handleChange}
              />

              <input
                type="number"
                name="total_stock_sell"
                placeholder="Total Stock Sell"
                value={form.total_stock_sell}
                onChange={handleChange}
              />
            </>
          )}

          <input
            type="number"
            name="total_quantity"
            placeholder="Total Quantity"
            value={form.total_quantity}
            onChange={handleChange}
          />

          <input
            type="number"
            name="total_amount"
            placeholder="Total Amount"
            value={form.total_amount}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: "20px",
            padding: "12px 25px",
            border: "none",
            borderRadius: "8px",
            background: "#16a34a",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Save
        </button>
      </form>

      <div
        style={{
          overflowX: "auto",
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#1e293b",
                color: "#fff",
              }}
            >
              <th style={thStyle}>Item</th>
              <th style={thStyle}>MPN</th>
              <th style={thStyle}>Package</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Rate</th>
              <th style={thStyle}>GP %</th>
              <th style={thStyle}>Total Amount</th>

              <th style={thStyle}>
                {activeTab === "inward"
                  ? "Average Purchase"
                  : "Average Selling"}
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td style={tdStyle}>
                  {item.item_description}
                </td>

                <td style={tdStyle}>{item.mpn}</td>

                <td style={tdStyle}>
                  {item.package_type}
                </td>

                <td style={tdStyle}>
                  {item.category}
                </td>

                <td style={tdStyle}>{item.date}</td>

                <td style={tdStyle}>{item.rate}</td>

                <td
                  style={{
                    ...tdStyle,
                    color:
                      Number(item.gross_profit_percent) < 0
                        ? "red"
                        : "green",
                    fontWeight: "bold",
                  }}
                >
                  {item.gross_profit_percent}%
                </td>

                <td style={tdStyle}>
                  ₹ {item.total_amount}
                </td>

                <td style={tdStyle}>
                  {activeTab === "inward"
                    ? item.average_purchase
                    : item.average_selling}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "14px",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #e2e8f0",
};