import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    fetchDashboardStats,
    fetchEnteredCarsReport,
    fetchOutgoingCarsReport,
} from "@/services/reports.service";

// Outgoing Cars Report Hook
export const useOutgoingCarsReport = (
    params: { startDate: string; endDate: string; parkingCode?: string },
    enabled = true
) => {
    return useQuery({
        queryKey: ["outgoing-cars-report", params],
        queryFn: () => fetchOutgoingCarsReport(params),
        enabled,
        //@ts-ignore
        onSuccess: () => toast.success("Outgoing cars report loaded"),
        onError: (err: any) => {
            toast.error(
                err?.response?.data?.message || "Failed to load outgoing report"
            );
        },
    });
};

// Entered Cars Report Hook
export const useEnteredCarsReport = (
    params: { startDate: string; endDate: string; parkingCode?: string },
    enabled = true
) => {
    return useQuery({
        queryKey: ["entered-cars-report", params],
        queryFn: () => fetchEnteredCarsReport(params),
        enabled,
        //@ts-ignore
        onSuccess: () => toast.success("Entered cars report loaded"),
        onError: (err: any) => {
            toast.error(
                err?.response?.data?.message || "Failed to load entered report"
            );
        },
    });
};

// Dashboard Stats Hook
export const useDashboardStats = () => {
    return useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: fetchDashboardStats,
        //@ts-ignore
        onSuccess: () => toast.success("Dashboard stats loaded"),
        onError: (err: any) => {
            toast.error(
                err?.response?.data?.message || "Failed to load dashboard stats"
            );
        },
    });
};
