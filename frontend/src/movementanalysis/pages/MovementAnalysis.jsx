import React, { useState } from "react";

export default function MovementAnalysis() {
  const itemsList = [
    {
      id: 1,
      item_description: "STM32 Microcontroller",
      mpn: "STM32F103",
      package_type: "Tray",
      category: "Industrial",
      rate: 120,
    },
    {
      id: 2,
      item_description: "Automotive IC",
      mpn: "ATMEGA328",
      package_type: "Reel",
      category: "Automotive",
      rate: 90,
    },
    {
      id: 3,
      item_description: "Defence Sensor",
      mpn: "SEN-900",
      package_type: "Tray",
      category: "Defence",
      rate: 250,
    },
  ];

  const [form, setForm] = useState({
    item_id: "",
    item_description: "",
    mpn: "",
    package_type: "",
    category: "",
    date: "",
    rate: "",
    purchase_date: "",
    current_stock: "",
    inward_quantity: "",
    inward_total_amount: "",
    billing_date: "",
    total_stock_sell: "",
    outward_quantity: "",
    outward_total_amount: "",
    gross_profit_percent: "",
  });

  const [movementInward, setMovementInward] = useState([
    {
      id: 1,
      item_description: "STM32 Microcontroller",
      mpn: "STM32F103",
      package_type: "Tray",
      category: "Industrial",
      date: "2026-05-18",
      purchase_date: "2026-05-18",
      rate: 120,
      current_stock: 100,
      total_quantity: 100,
      total_amount: 12000,
      average_purchase: 120,
    },
  ]);

  const [movementOutward, setMovementOutward] = useState([
    {
      id: 1,
      item_description: "Automotive IC",
      mpn: "ATMEGA328",
      package_type: "Reel",
      category: "Automotive",
      date: "2026-05-17",
      billing_date: "2026-05-17",
      rate: 90,
      gross_profit_percent: 12,
      total_stock_sell: 50,
      total_quantity: 50,
      total_amount: 9000,
      average_selling: 180,
    },
  ]);

  const handleItemSelect = (e) => {
    const selectedItem = itemsList.find(
      (item) => item.id === Number(e.target.value)
    );

    if (selectedItem) {
      setForm({
        ...form,
        item_id: selectedItem.id,
        item_description: selectedItem.item_description,
        mpn: selectedItem.mpn,
        package_type: selectedItem.package_type,
        category: selectedItem.category,
        rate: selectedItem.rate,
      });
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveInward = () => {
    const avg =
      Number(form.inward_total_amount) / Number(form.inward_quantity || 1);

    const newInward = {
      id: Date.now(),
      item_description: form.item_description,
      mpn: form.mpn,
      package_type: form.package_type,
      category: form.category,
      date: form.date,
      purchase_date: form.purchase_date,
      rate: form.rate,
      current_stock: form.current_stock,
      total_quantity: form.inward_quantity,
      total_amount: form.inward_total_amount,
      average_purchase: avg.toFixed(2),
    };

    setMovementInward([newInward, ...movementInward]);
  };

  const saveOutward = () => {
    const avg =
      Number(form.outward_total_amount) / Number(form.outward_quantity || 1);

    const newOutward = {
      id: Date.now(),
      item_description: form.item_description,
      mpn: form.mpn,
      package_type: form.package_type,
      category: form.category,
      date: form.date,
      billing_date: form.billing_date,
      rate: form.rate,
      gross_profit_percent: form.gross_profit_percent,
      total_stock_sell: form.total_stock_sell,
      total_quantity: form.outward_quantity,
      total_amount: form.outward_total_amount,
      average_selling: avg.toFixed(2),
    };

    setMovementOutward([newOutward, ...movementOutward]);
  };

  return (
    <div style={{ padding: "25px", background: "#f4f6f9", minHeight: "100vh" }}>
      <h2>Movement Analysis</h2>

      <div style={cardStyle}>
        <h3>Select Item</h3>

        <select
          name="item_id"
          value={form.item_id}
          onChange={handleItemSelect}
          style={inputStyle}
        >
          <option value="">Search / Select Item</option>
          {itemsList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.item_description} - {item.mpn}
            </option>
          ))}
        </select>

        <div style={gridStyle}>
          <input
            style={inputStyle}
            value={form.item_description}
            placeholder="Item Description"
            readOnly
          />

          <input
            style={inputStyle}
            value={form.mpn}
            placeholder="MPN"
            readOnly
          />

          <input
            style={inputStyle}
            value={form.package_type}
            placeholder="Package Type"
            readOnly
          />

          <input
            style={inputStyle}
            value={form.category}
            placeholder="Category"
            readOnly
          />

          <input
            style={inputStyle}
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            name="rate"
            value={form.rate}
            placeholder="Rate"
            onChange={handleChange}
          />
        </div>
      </div>

      <div style={cardStyle}>
        <h3>Movement Inward Entry</h3>

        <div style={gridStyle}>
          <input
            style={inputStyle}
            type="date"
            name="purchase_date"
            value={form.purchase_date}
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            name="current_stock"
            value={form.current_stock}
            placeholder="Current Stock"
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            name="inward_quantity"
            value={form.inward_quantity}
            placeholder="Total Quantity"
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            name="inward_total_amount"
            value={form.inward_total_amount}
            placeholder="Total Amount"
            onChange={handleChange}
          />
        </div>

        <button style={buttonStyle} onClick={saveInward}>
          Save Inward
        </button>
      </div>

      <MovementTable title="Movement Inward" data={movementInward} type="inward" />

      <div style={cardStyle}>
        <h3>Movement Outward Entry</h3>

        <div style={gridStyle}>
          <input
            style={inputStyle}
            type="date"
            name="billing_date"
            value={form.billing_date}
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            name="total_stock_sell"
            value={form.total_stock_sell}
            placeholder="Total Stock Sell"
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            name="outward_quantity"
            value={form.outward_quantity}
            placeholder="Total Quantity"
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            name="outward_total_amount"
            value={form.outward_total_amount}
            placeholder="Total Amount"
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            name="gross_profit_percent"
            value={form.gross_profit_percent}
            placeholder="Gross Profit % / Loss Negative"
            onChange={handleChange}
          />
        </div>

        <button style={buttonStyle} onClick={saveOutward}>
          Save Outward
        </button>
      </div>

      <MovementTable title="Movement Outward" data={movementOutward} type="outward" />
    </div>
  );
}

function MovementTable({ title, data, type }) {
  return (
    <div style={cardStyle}>
      <h3>{title}</h3>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#1e293b", color: "#fff" }}>
            <th style={thStyle}>Item</th>
            <th style={thStyle}>MPN</th>
            <th style={thStyle}>Package</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>
              {type === "inward" ? "Purchase Date" : "Billing Date"}
            </th>
            <th style={thStyle}>Rate</th>

            {type === "outward" && <th style={thStyle}>GP %</th>}

            <th style={thStyle}>
              {type === "inward" ? "Current Stock" : "Total Stock Sell"}
            </th>

            <th style={thStyle}>Total Qty</th>
            <th style={thStyle}>Total Amount</th>

            <th style={thStyle}>
              {type === "inward" ? "Avg Purchase" : "Avg Selling"}
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td style={tdStyle}>{item.item_description}</td>
              <td style={tdStyle}>{item.mpn}</td>
              <td style={tdStyle}>{item.package_type}</td>
              <td style={tdStyle}>{item.category}</td>
              <td style={tdStyle}>{item.date}</td>

              <td style={tdStyle}>
                {type === "inward" ? item.purchase_date : item.billing_date}
              </td>

              <td style={tdStyle}>{item.rate}</td>

              {type === "outward" && (
                <td
                  style={{
                    ...tdStyle,
                    color:
                      Number(item.gross_profit_percent) < 0 ? "red" : "green",
                    fontWeight: "bold",
                  }}
                >
                  {item.gross_profit_percent}%
                </td>
              )}

              <td style={tdStyle}>
                {type === "inward"
                  ? item.current_stock
                  : item.total_stock_sell}
              </td>

              <td style={tdStyle}>{item.total_quantity}</td>
              <td style={tdStyle}>₹ {item.total_amount}</td>

              <td style={tdStyle}>
                {type === "inward"
                  ? item.average_purchase
                  : item.average_selling}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "25px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "15px",
};

const inputStyle = {
  padding: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  marginTop: "10px",
};

const buttonStyle = {
  marginTop: "20px",
  padding: "12px 25px",
  background: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
};

const thStyle = {
  padding: "12px",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
};