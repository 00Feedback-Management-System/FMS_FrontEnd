import api from "./api";

export const getModules = async () => {
    try {
        const response = await api.get("Modules");
        return response.data;
    }
    catch (error) {
        console.error("Error fetching modules:", error);
        throw error;
    }
};

export const getModuleById = async (moduleId) => {
    try {
        const response = await api.get(`Modules/${moduleId}`);
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching module with ID ${moduleId}:`, error);
        throw error;
    }
};