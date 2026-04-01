import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ApiKeysPage from "./ApiKeysPage";
import WorkspacesPage from "./WorkspacesPage";

export default function DashboardPage({ onSignOut }: { onSignOut: () => void }) {
  const [activePage, setActivePage] = useState("api-keys");

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        onSignOut={onSignOut}
      />

      <main className="flex-1 px-12 py-10">
        {activePage === "api-keys" && <ApiKeysPage />}
        {activePage === "workspaces" && <WorkspacesPage />}
        {activePage === "settings" && (
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Account Settings</h1>
            <p className="mt-3 text-sm text-zinc-400">Coming soon.</p>
          </div>
        )}
      </main>
    </div>
  );
}
