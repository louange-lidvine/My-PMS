/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "@/utils/cookie";

type AuthContextType = {
    isAuthenticated: boolean;
    setAuthenticated: (val: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setAuthenticated: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState(
        !!getCookie("auth_token")
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const token = getCookie("auth_token");
            setAuthenticated(!!token);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
