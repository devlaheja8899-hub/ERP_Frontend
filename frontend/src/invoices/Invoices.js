import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import axios from "../api/axios";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    customer: '',
    invoice_date: '',
    due_date: '',
    delivery_date: '',
    e_way_bill_no: '',
    e_invoice_no: '',
    insurance_no: '',
    mode_of_payment: '',
    customer_po_no: '',
    customer_po_date: '',
    dispatch_docket_no: '',
    dispatch_courier_name: '',
    dispatch_mode: '',
    items: [],
    discount: 0,
    shipping_charges: 0,
    round_off: 0,
    prepared_by: '',
    verified_by: '',
    authorized_by: '',
    terms_conditions_original: '1. Payment terms: 30 days from invoice date.\n2. Interest at 18% p.a. will be charged on overdue payments.\n3. Goods once sold will not be taken back.\n4. All disputes subject to [City] jurisdiction.',
    terms_conditions_duplicate: '1. Payment terms: 30 days from invoice date.\n2. Interest at 18% p.a. will be charged on overdue payments.\n3. Goods once sold will not be taken back.\n4. All disputes subject to [City] jurisdiction.',
    terms_conditions_extra: '1. Payment terms: 30 days from invoice date.\n2. Interest at 18% p.a. will be charged on overdue payments.\n3. Goods once sold will not be taken back.\n4. All disputes subject to [City] jurisdiction.',
  });

  useEffect(() => {
    fetchInvoices();
    fetchCompanies();
    fetchCustomers();
    fetchItems();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('/api/invoices/');
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('/api/companies/');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/api/customers/');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/invoices/items/');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, {
        item: '',
        description: '',
        hsn_code: '',
        quantity: 1,
        rate: 0,
        gst_slab: '18_9_9',
        manufacture_name: '',
        date_code: '',
        customer_item_code: '',
      }]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const calculateTotals = () => {
    let taxable = 0;
    let gst = 0;
    let totalQty = 0;

    formData.items.forEach(item => {
      const amount = item.quantity * item.rate;
      taxable += amount;
      totalQty += parseFloat(item.quantity);

      // Calculate GST based on slab
      const gstRate = item.gst_slab === '18_9_9' ? 0.18 : item.gst_slab === '18_2.5_2.5' ? 0.18 : 0.12;
      gst += amount * gstRate;
    });

    const grandTotal = taxable + gst + parseFloat(formData.shipping_charges) - parseFloat(formData.discount) + parseFloat(formData.round_off);

    return { taxable, gst, totalQty, grandTotal };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totals = calculateTotals();

    const invoiceData = {
      ...formData,
      taxable_value: totals.taxable,
      gst_amount: totals.gst,
      total_quantity: totals.totalQty,
      grand_total: totals.grandTotal,
      status: 'DRAFT',
    };

    try {
      await axios.post('/api/invoices/', invoiceData);
      setShowForm(false);
      setFormData({
        company: '',
        customer: '',
        invoice_date: '',
        due_date: '',
        delivery_date: '',
        e_way_bill_no: '',
        e_invoice_no: '',
        insurance_no: '',
        mode_of_payment: '',
        customer_po_no: '',
        customer_po_date: '',
        dispatch_docket_no: '',
        dispatch_courier_name: '',
        dispatch_mode: '',
        items: [],
        discount: 0,
        shipping_charges: 0,
        round_off: 0,
        prepared_by: '',
        verified_by: '',
        authorized_by: '',
        terms_conditions_original: '1. Payment terms: 30 days from invoice date.\n2. Interest at 18% p.a. will be charged on overdue payments.\n3. Goods once sold will not be taken back.\n4. All disputes subject to [City] jurisdiction.',
        terms_conditions_duplicate: '1. Payment terms: 30 days from invoice date.\n2. Interest at 18% p.a. will be charged on overdue payments.\n3. Goods once sold will not be taken back.\n4. All disputes subject to [City] jurisdiction.',
        terms_conditions_extra: '1. Payment terms: 30 days from invoice date.\n2. Interest at 18% p.a. will be charged on overdue payments.\n3. Goods once sold will not be taken back.\n4. All disputes subject to [City] jurisdiction.',
      });
      fetchInvoices();
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <>
      <TopBar />
      <div style={{ padding: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ margin: 0, color: "#1f2937" }}>Invoices</h2>
          <button
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
            }}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Create Invoice'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ backgroundColor: "#f9fafb", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
            <h3>Create New Invoice</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Company:</label>
                <select name="company" value={formData.company} onChange={handleInputChange} required>
                  <option value="">Select Company</option>
                  {companies.map(company => (
                    <option key={company.id} value={company.id}>{company.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Customer:</label>
                <select name="customer" value={formData.customer} onChange={handleInputChange} required>
                  <option value="">Select Customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.company_name}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Invoice Date:</label>
                <input type="date" name="invoice_date" value={formData.invoice_date} onChange={handleInputChange} required />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Due Date:</label>
                <input type="date" name="due_date" value={formData.due_date} onChange={handleInputChange} required />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Delivery Date:</label>
                <input type="date" name="delivery_date" value={formData.delivery_date} onChange={handleInputChange} />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>E-Way Bill No:</label>
                <input type="text" name="e_way_bill_no" placeholder="E-Way Bill No" value={formData.e_way_bill_no} onChange={handleInputChange} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>E-Invoice No:</label>
                <input type="text" name="e_invoice_no" placeholder="E-Invoice No" value={formData.e_invoice_no} onChange={handleInputChange} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Insurance No:</label>
                <input type="text" name="insurance_no" placeholder="Insurance No" value={formData.insurance_no} onChange={handleInputChange} />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Mode of Payment:</label>
                <select name="mode_of_payment" value={formData.mode_of_payment} onChange={handleInputChange}>
                  <option value="">Mode of Payment</option>
                  <option value="CASH">Cash</option>
                  <option value="CHEQUE">Cheque</option>
                  <option value="ONLINE">Online Transfer</option>
                  <option value="CREDIT">Credit</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Customer PO No:</label>
                <input type="text" name="customer_po_no" placeholder="Customer PO No" value={formData.customer_po_no} onChange={handleInputChange} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Customer PO Date:</label>
                <input type="date" name="customer_po_date" value={formData.customer_po_date} onChange={handleInputChange} />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Dispatch Docket No:</label>
                <input type="text" name="dispatch_docket_no" placeholder="Dispatch Docket No" value={formData.dispatch_docket_no} onChange={handleInputChange} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Dispatch Courier Name:</label>
                <input type="text" name="dispatch_courier_name" placeholder="Courier Name" value={formData.dispatch_courier_name} onChange={handleInputChange} />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Dispatch Mode:</label>
                <select name="dispatch_mode" value={formData.dispatch_mode} onChange={handleInputChange}>
                  <option value="">Dispatch Mode</option>
                  <option value="COURIER">Courier</option>
                  <option value="HAND_DELIVERY">Hand Delivery</option>
                  <option value="POST">Post</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Discount:</label>
                <input type="number" name="discount" placeholder="Discount" value={formData.discount} onChange={handleInputChange} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Shipping Charges:</label>
                <input type="number" name="shipping_charges" placeholder="Shipping Charges" value={formData.shipping_charges} onChange={handleInputChange} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Round Off:</label>
                <input type="number" name="round_off" placeholder="Round Off" value={formData.round_off} onChange={handleInputChange} />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Prepared By:</label>
                <input type="text" name="prepared_by" placeholder="Prepared By" value={formData.prepared_by} onChange={handleInputChange} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Verified By:</label>
                <input type="text" name="verified_by" placeholder="Verified By" value={formData.verified_by} onChange={handleInputChange} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Authorized By:</label>
                <input type="text" name="authorized_by" placeholder="Authorized By" value={formData.authorized_by} onChange={handleInputChange} />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Terms & Conditions (Original):</label>
                <textarea name="terms_conditions_original" placeholder="Terms & Conditions (Original)" value={formData.terms_conditions_original} onChange={handleInputChange} rows="4" />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Terms & Conditions (Duplicate):</label>
                <textarea name="terms_conditions_duplicate" placeholder="Terms & Conditions (Duplicate)" value={formData.terms_conditions_duplicate} onChange={handleInputChange} rows="4" />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Terms & Conditions (Extra):</label>
                <textarea name="terms_conditions_extra" placeholder="Terms & Conditions (Extra)" value={formData.terms_conditions_extra} onChange={handleInputChange} rows="4" />
              </div>
            </div>

            <h4>Items</h4>
            {formData.items.map((item, index) => (
              <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Item:</label>
                  <select value={item.item} onChange={(e) => handleItemChange(index, 'item', e.target.value)}>
                    <option value="">Select Item</option>
                    {items.map(i => (
                      <option key={i.id} value={i.id}>{i.item_name}</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Description:</label>
                  <input type="text" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "5px", fontWeight: "bold" }}>HSN Code:</label>
                  <input type="text" placeholder="HSN Code" value={item.hsn_code} onChange={(e) => handleItemChange(index, 'hsn_code', e.target.value)} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Quantity:</label>
                  <input type="number" placeholder="Quantity" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Rate:</label>
                  <input type="number" placeholder="Rate" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', e.target.value)} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "5px", fontWeight: "bold" }}>GST Slab:</label>
                  <select value={item.gst_slab} onChange={(e) => handleItemChange(index, 'gst_slab', e.target.value)}>
                    <option value="18_9_9">IGST 18%, CGST 9%, SGST 9%</option>
                    <option value="18_2.5_2.5">IGST 18%, CGST 2.5%, SGST 2.5%</option>
                    <option value="12_6_6">IGST 12%, CGST 6%, SGST 6%</option>
                  </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Manufacture Name:</label>
                  <input type="text" placeholder="Manufacture Name" value={item.manufacture_name} onChange={(e) => handleItemChange(index, 'manufacture_name', e.target.value)} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Date Code:</label>
                  <input type="text" placeholder="Date Code" value={item.date_code} onChange={(e) => handleItemChange(index, 'date_code', e.target.value)} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Customer Item Code:</label>
                  <input type="text" placeholder="Customer Item Code" value={item.customer_item_code} onChange={(e) => handleItemChange(index, 'customer_item_code', e.target.value)} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <button type="button" onClick={() => removeItem(index)} style={{ padding: "8px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Remove Item</button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addItem}>Add Item</button>

            <button type="submit" style={{ marginTop: "20px", backgroundColor: "#10b981", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px" }}>
              Create Invoice
            </button>
          </form>
        )}

        <div>
          <h3>Invoice List</h3>
          {invoices.length === 0 ? (
            <p>No invoices found.</p>
          ) : (
            <ul>
              {invoices.map(invoice => (
                <li key={invoice.id}>
                  Invoice #{invoice.invoice_no} - {invoice.customer.company_name} - ₹{invoice.grand_total}
                  <a href={`/api/invoices/${invoice.id}/pdf/`} target="_blank" rel="noopener noreferrer"> Download PDF</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Invoices;