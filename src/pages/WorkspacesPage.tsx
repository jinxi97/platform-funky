import { useCallback, useEffect, useState } from "react";
import {
  type Workspace,
  listWorkspaces,
  deleteWorkspace,
} from "../api/workspaces";

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Workspace | null>(null);

  const fetchWorkspaces = useCallback(async () => {
    setLoading(true);
    try {
      setWorkspaces(await listWorkspaces());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteWorkspace(deleteTarget.claim_name);
    setWorkspaces((prev) => prev.filter((ws) => ws.workspace_id !== deleteTarget.workspace_id));
    setDeleteTarget(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Workspaces</h1>
        <button
          onClick={fetchWorkspaces}
          className="flex items-center gap-1.5 rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
          </svg>
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-zinc-400">Loading…</p>
      ) : workspaces.length === 0 ? (
        <p className="text-sm text-zinc-400">No workspaces yet.</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-zinc-400">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Created</th>
              <th className="pb-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {workspaces.filter((ws) => ws.status !== "Deleted").map((ws) => (
              <tr key={ws.workspace_id} className="border-b border-zinc-100">
                <td className="py-4 font-mono text-zinc-900">{ws.claim_name}</td>
                <td className="py-4">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      ws.status === "Running"
                        ? "bg-green-100 text-green-700"
                        : ws.status === "Succeeded"
                          ? "bg-blue-100 text-blue-700"
                          : ws.status === "Failed" || ws.status === "Deleted" || ws.status === "Not Found"
                            ? "bg-red-100 text-red-700"
                            : ws.status === "Pending" || ws.status === "Creating"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {ws.status}
                  </span>
                </td>
                <td className="py-4 text-zinc-500">
                  {new Date(ws.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="py-4">
                  <button
                    onClick={() => setDeleteTarget(ws)}
                    className="text-sm font-medium text-red-500 transition hover:text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-zinc-900">Delete Workspace</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Are you sure you want to delete <span className="font-medium text-zinc-900">{deleteTarget.claim_name}</span>? This action cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
