const API_BASE = import.meta.env.VITE_API_BASE ?? "";

export interface LoginResponse {
  user_id: string;
  token: string;
  workspace?: {
    claim_name: string;
    template_name: string;
    namespace: string;
  };
}

export async function loginWithGoogle(idToken: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/account-with-workspace`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_token: idToken }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}
