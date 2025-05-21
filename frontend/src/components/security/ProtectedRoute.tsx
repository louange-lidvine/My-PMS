import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuthContext } from "@/context/AuthContext";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuthContext();
    return isAuthenticated ? children : <Navigate to="/login" />;
};
