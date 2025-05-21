import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getAllParkings,
    getParkingById,
    createParking,
    updateParking,
    deleteParking,
} from "../services/parking.service";
import { toast } from "sonner";

// Fetch All Parkings
export const useParkings = () => {
    return useQuery({
        queryKey: ["parkings"],
        queryFn: getAllParkings,
    });
};

// Fetch One Parking
export const useParking = (id: string) => {
    return useQuery({
        queryKey: ["parking", id],
        queryFn: () => getParkingById(id),
        enabled: !!id,
    });
};

// Create Parking
export const useCreateParking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createParking,
        onSuccess: (data) => {
            toast.success(data.message || "Parking created");
            queryClient.invalidateQueries({ queryKey: ["parkings"] });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Error creating parking"
            );
        },
    });
};

// Update Parking
export const useUpdateParking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateParking,
        onSuccess: (data) => {
            toast.success(data.message || "Parking updated");
            queryClient.invalidateQueries({ queryKey: ["parkings"] });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Error updating parking"
            );
        },
    });
};

// Delete Parking
export const useDeleteParking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteParking,
        onSuccess: (data) => {
            toast.success(data.message || "Parking deleted");
            queryClient.invalidateQueries({ queryKey: ["parkings"] });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Error deleting parking"
            );
        },
    });
};
