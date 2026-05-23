import React, { useState, useEffect } from "react";
import { addQuotationItem, fetchItems } from "../services/quotation.service";

function normalizeDateCode(value) {
  const trimmedValue = value.trim();
  const ddMmYyyyMatch = trimmedValue.match(/^(\d{2})-(\d{2})-(\d{4})$/);

  if (!ddMmYyyyMatch) return trimmedValue;

  const [, day, month, year] = ddMmYyyyMatch;
  return `${year}-${month}-${day}`;
}

export default function QuotationItemForm({ quotationId, onItemAdded }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    item: "",
    manufacturer: "",
    mpn: "",
    date_code: "",
    quantity: "",
    unit_price: "",
    packaging_type: "REEL",
    description: "",
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await fetchItems();
      setItems(data);
      setError("");
    } catch (err) {
      setError("Failed to load items");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleItemSelect = (e) => {
    const itemId = e.target.value;
    setFormData({ ...formData, item: itemId });

    const item = items.find((i) => String(i.id) === itemId);
    if (item) {
      setFormData((prev) => ({
        ...prev,
        item: itemId,
        manufacturer: item.manufacturer_name || "",
        mpn: item.manufacturer_part_number || "",
        description: item.item_name || "",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.item) {
      setError("Please select an item");
      return;
    }
    if (!formData.quantity || formData.quantity <= 0) {
      setError("Please enter a valid quantity");
      return;
    }
    if (!formData.unit_price || formData.unit_price <= 0) {
      setError("Please enter a valid unit price");
      return;
    }

    try {
      setLoading(true);
      await addQuotationItem(quotationId, {
        item: formData.item,
        manufacturer: formData.manufacturer,
        mpn: formData.mpn,
        date_code: normalizeDateCode(formData.date_code),
        quantity: parseFloat(formData.quantity),
        unit_price: parseFloat(formData.unit_price),
        packaging_type: formData.packaging_type,
        description: formData.description,
        gst_percentage: 18,
      });

      setSuccess("Item added successfully!");
      setFormData({
        item: "",
        manufacturer: "",
        mpn: "",
        date_code: "",
        quantity: "",
        unit_price: "",
        packaging_type: "REEL",
        description: "",
      });

      if (onItemAdded) {
        onItemAdded();
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to add item");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">Add Item to Quotation</h3>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-200">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700 border border-green-200">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Item Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Select Item *
            </label>
            <select
              name="item"
              value={formData.item}
              onChange={handleItemSelect}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">-- Select an Item --</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.item_name} - {item.manufacturer_part_number}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Quantity *
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              disabled={loading}
              step="0.01"
              min="0"
              placeholder="Enter quantity"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Manufacturer */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Manufacturer
            </label>
            <input
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              disabled={loading}
              placeholder="Manufacturer name"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Unit Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Unit Price *
            </label>
            <input
              type="number"
              name="unit_price"
              value={formData.unit_price}
              onChange={handleChange}
              disabled={loading}
              step="0.01"
              min="0"
              placeholder="Enter unit price"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* MPN */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              MPN
            </label>
            <input
              type="text"
              name="mpn"
              value={formData.mpn}
              onChange={handleChange}
              disabled={loading}
              placeholder="Manufacturer Part Number"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Packaging Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Packaging Type
            </label>
            <select
              name="packaging_type"
              value={formData.packaging_type}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="REEL">Reel</option>
              <option value="TRAY">Tray</option>
              <option value="TUBE">Tube</option>
              <option value="LOOSE">Loose</option>
            </select>
          </div>

          {/* Date Code */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Date Code
            </label>
            <input
              type="text"
              name="date_code"
              value={formData.date_code}
              onChange={handleChange}
              disabled={loading}
              placeholder="e.g., 2026-05"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
              placeholder="Item description"
              rows="2"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add Item"}
          </button>
        </div>
      </form>
    </div>
  );
}
