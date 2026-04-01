const API_BASE = import.meta.env.VITE_API_BASE ?? "";

export function getToken() {
  return localStorage.getItem("token") ?? "";
}

export async function apiFetch(path: string, init?: RequestInit) {
  return fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      ...init?.headers,
    },
  });
}
