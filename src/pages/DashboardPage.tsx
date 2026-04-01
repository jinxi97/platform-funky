export default function DashboardPage({ onSignOut }: { onSignOut: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
          Welcome to the Funky API Platform
        </h1>
        <p className="mt-3 text-lg text-zinc-500">
          You're signed in and ready to build.
        </p>

        <button
          onClick={onSignOut}
          className="mt-8 rounded-full border border-zinc-300 bg-white px-6 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
