import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <App />
                    <Toaster position="top-center" richColors />
                </AuthProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>
);
