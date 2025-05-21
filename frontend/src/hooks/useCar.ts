import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as carService from "../services/car.service";
import { toast } from "sonner";

export const useCarEntry = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            plateNumber,
            parkingCode,
        }: {
            plateNumber: string;
            parkingCode: string;
        }) => carService.carEntry(plateNumber, parkingCode),
        onSuccess: () => {
            toast.success("Car entered successfully.");
            queryClient.invalidateQueries({ queryKey: ["activeCars"] });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Failed to enter car."
            );
        },
    });
};

export const useCarExit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (plateNumber: string) => carService.carExit(plateNumber),
        onSuccess: () => {
            toast.success("Car exited successfully.");
            queryClient.invalidateQueries({ queryKey: ["activeCars"] });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Failed to exit car."
            );
        },
    });
};

export const useActiveCars = (parkingCode?: string) => {
    return useQuery({
        queryKey: ["activeCars", parkingCode],
        queryFn: () => carService.getActiveCars(parkingCode),
    });
};

export const useCarHistory = (plateNumber: string) => {
    return useQuery({
        queryKey: ["carHistory", plateNumber],
        queryFn: () => carService.getCarHistory(plateNumber),
        enabled: !!plateNumber,
    });
};
