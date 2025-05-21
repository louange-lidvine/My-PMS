/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { redirectBasedOnRole } from "@/utils/auth";
import api from "@/lib/api";
import { setCookie } from "@/utils/cookie";
import { useAuthContext } from "@/context/AuthContext";

export const useAuth = () => {
    const navigate = useNavigate();
    const { setAuthenticated } = useAuthContext();

    const loginMutation = useMutation({
        mutationFn: async (data: { email: string; password: string }) => {
            const response = await api.post("/auth/login", data);
            return response.data;
        },
        onSuccess: (data) => {
            toast.success("Login successful!");
            setCookie("auth_token", data.token, 3);
            setAuthenticated(true);
            redirectBasedOnRole(navigate);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Login failed");
        },
    });

    const registerMutation = useMutation({
        mutationFn: async (data: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
        }) => {
            const response = await api.post("/auth/register", data);
            return response.data;
        },
        onSuccess: (data) => {
            toast.success("Registered successfully! Logging in...");
            setCookie("auth_token", data.token, 3);
            setAuthenticated(true);
            redirectBasedOnRole(navigate);
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Registration failed"
            );
        },
    });

    return {
        login: loginMutation.mutateAsync,
        register: registerMutation.mutateAsync,
        loginLoading: loginMutation.isPending,
        registerLoading: registerMutation.isPending,
    };
};
