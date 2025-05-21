import api from "@/lib/api";

const API_BASE_URL = "/cars";

export const carEntry = async (plateNumber: string, parkingCode: string) => {
    const response = await api.post(`${API_BASE_URL}/entry`, {
        plateNumber,
        parkingCode,
    });
    return response.data;
};

export const carExit = async (plateNumber: string) => {
    const response = await api.put(`${API_BASE_URL}/exit`, { plateNumber });
    return response.data;
};

export const getActiveCars = async (parkingCode?: string) => {
    const response = await api.get(`${API_BASE_URL}/active`, {
        params: parkingCode ? { parkingCode } : undefined,
    });
    return response.data;
};

export const getCarHistory = async (plateNumber: string) => {
    const response = await api.get(`${API_BASE_URL}/history/${plateNumber}`);
    return response.data;
};
