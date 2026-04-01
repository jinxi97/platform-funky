import { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );

  const handleLogin = () => setIsLoggedIn(true);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("workspace");
    setIsLoggedIn(false);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {isLoggedIn ? (
        <DashboardPage onSignOut={handleSignOut} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </GoogleOAuthProvider>
  );
}

export default App;
