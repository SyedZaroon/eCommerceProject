
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  // Jab tak /me ka response nahi aata, wait karo
  if (loading) {
    return <div className="p-6">Checking authentication...</div>;
  }

  // Login nahi hai, token invalid/expired hai,
  // ya account inactive hai
  if (!user || user.status !== "Active") {
    return <Navigate to="/login" replace />;
  }

  // Sab theek hai, protected page open karo
  return <Outlet />;
}
