import api from "@/lib/api";

const API_BASE_URL = "/reports";

export const fetchOutgoingCarsReport = async (params: {
    startDate: string;
    endDate: string;
    parkingCode?: string;
}) => {
    const res = await api.get(`${API_BASE_URL}/outgoing`, { params });
    return res.data;
};

export const fetchEnteredCarsReport = async (params: {
    startDate: string;
    endDate: string;
    parkingCode?: string;
}) => {
    const res = await api.get(`${API_BASE_URL}/entered`, { params });
    return res.data;
};

export const fetchDashboardStats = async () => {
    const res = await api.get(`${API_BASE_URL}/dashboard`);
    return res.data;
};
