import api from "@/lib/api";

const API = "/parking";

export const getAllParkings = async () => {
    const res = await api.get(API);
    return res.data;
};

export const getParkingById = async (id: string) => {
    const res = await api.get(`${API}/${id}`);
    return res.data;
};

export const createParking = async (data: {
    code: string;
    name: string;
    location: string;
    totalSlots: number;
    feePerHour: number;
}) => {
    const res = await api.post(API, data);
    return res.data;
};

export const updateParking = async ({
    id,
    data,
}: {
    id: string;
    data: {
        name: string;
        location: string;
        totalSlots: number;
        feePerHour: number;
    };
}) => {
    const res = await api.put(`${API}/${id}`, data);
    return res.data;
};

export const deleteParking = async (id: string) => {
    const res = await api.delete(`${API}/${id}`);
    return res.data;
};
