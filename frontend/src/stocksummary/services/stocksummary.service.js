const API_URL = "/api/stocksummary/items/";

function getToken() {
  return localStorage.getItem("access_token") || localStorage.getItem("access");
}

function unwrapResponse(result) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result.data)) return result.data;
  if (Array.isArray(result.results)) return result.results;
  return [];
}

export async function fetchStockItems() {
  const token = getToken();

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch stock items");
  }

  const result = await response.json();
  return unwrapResponse(result);
}

export async function fetchLowStockItems() {
  const token = getToken();

  const response = await fetch("/api/stocksummary/low-stock-alerts/", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch low stock items");
  }

  const result = await response.json();
  return unwrapResponse(result);
}