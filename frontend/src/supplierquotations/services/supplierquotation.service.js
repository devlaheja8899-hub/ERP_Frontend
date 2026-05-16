import api from "../../services/api";

export async function fetchSupplierQuotations() {
  const response = await api.get("supplier-quotations/");
  return response.data?.data || [];
}
