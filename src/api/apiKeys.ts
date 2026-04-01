import { apiFetch } from "./client";

export interface ApiKey {
  id: string;
  key_masked: string;
  name: string;
  created_at: string;
}

export interface CreateApiKeyResponse {
  id: string;
  key: string;
  created_at: string;
}

export async function listApiKeys(): Promise<ApiKey[]> {
  const res = await apiFetch("/account/api-keys");
  if (!res.ok) throw new Error("Failed to fetch API keys");
  return res.json();
}

export async function createApiKey(name: string): Promise<CreateApiKeyResponse> {
  const res = await apiFetch("/account/api-keys", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to create API key");
  return res.json();
}

export async function deleteApiKey(id: string): Promise<void> {
  const res = await apiFetch(`/account/api-keys/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete API key");
}
