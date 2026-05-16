import api from "../../services/api";

export async function fetchPurchaseOrders() {
  const response = await api.get("purchaseorders/");
  return response.data?.data || [];
}
