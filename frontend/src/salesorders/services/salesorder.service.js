import api from "../../services/api";

export async function fetchSalesOrders() {
  const response = await api.get("salesorders/");
  return response.data?.data || [];
}
