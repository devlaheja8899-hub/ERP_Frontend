const getToken = () => localStorage.getItem("access_token");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export async function fetchMovementInward() {
  const res = await fetch("/api/movement-inward/", {
    headers: headers(),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch movement inward");
  }

  return Array.isArray(result.data) ? result.data : [];
}

export async function createMovementInward(payload) {
  const res = await fetch("/api/movement-inward/", {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error("Failed to create movement inward");
  }

  return result;
}

export async function fetchMovementOutward() {
  const res = await fetch("/api/movement-outward/", {
    headers: headers(),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch movement outward");
  }

  return Array.isArray(result.data) ? result.data : [];
}

export async function createMovementOutward(payload) {
  const res = await fetch("/api/movement-outward/", {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error("Failed to create movement outward");
  }

  return result;
}