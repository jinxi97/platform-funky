import { apiFetch } from "./client";

export interface Workspace {
  workspace_id: string;
  claim_name: string;
  template_name: string;
  created_at: string;
  status: string;
}

export async function listWorkspaces(): Promise<Workspace[]> {
  const res = await apiFetch("/workspaces");
  if (!res.ok) throw new Error("Failed to fetch workspaces");
  return res.json();
}

export async function deleteWorkspace(claimName: string): Promise<void> {
  const res = await apiFetch(`/workspaces/${claimName}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete workspace");
}
