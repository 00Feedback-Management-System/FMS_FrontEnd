import api from "../services/api";

export const getStaff = async () => {
    try {
        const response = await api.get("staff/getAllStaff");
        return response.data;
    }
    catch (error) {
        console.error("Error fetching staffs:", error);
        throw error;
    }
};

export const getStaffById = async (staffId) => {
    try {
        const response = await api.get(`staff/getStaff/${staffId}`);
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching staff with ID ${staffId}:`, error);
        throw error;
    }   
};