import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && user.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
