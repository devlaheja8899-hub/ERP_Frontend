import api from "../../services/api";

export async function fetchStockItems() {
  const response = await api.get("stock-summary/items/");
  return response.data?.data || [];
}
