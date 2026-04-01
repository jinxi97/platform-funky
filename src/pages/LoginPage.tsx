import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
  const handleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) return;

    try {
      const res = await fetch(`${API_BASE}/account-with-workspace`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: response.credential }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Login failed:", error);
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_id", data.user_id);
      if (data.workspace) {
        localStorage.setItem("workspace", JSON.stringify(data.workspace));
      }

      onLogin();
    } catch (err) {
      console.error("Login request failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
          Build on the Funky API Platform
        </h1>
        <p className="mt-3 text-lg text-zinc-500">
          Sign up or login with a Google account.
        </p>

        <div className="mt-8 flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.error("Google login error")}
            theme="outline"
            size="large"
            shape="pill"
            text="continue_with"
          />
        </div>
      </div>
    </div>
  );
}
