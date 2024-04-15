import axios from 'axios';

export const fetchDepartments = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/departments");
        return response.data.departments;
    } catch (error) {
        console.error("Failed to fetch departments:", error);
        throw error;
    }
};

export const fetchSocieties = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/societies");
        return response.data; // Return the fetched societies data
    } catch (error) {
        console.error("Error fetching societies:", error);
        throw error;
    }
};

export const createDepartment = async (newDepartment) => {
    try {
        const response = await axios.post("http://localhost:8000/api/departments", newDepartment);
        return response.data.department;
    } catch (error) {
        console.error("Failed to create department:", error);
        throw error;
    }
};

export const updateDepartment = async (id, editedDepartment) => {
    try {
        await axios.put(`http://localhost:8000/api/departments/${id}`, editedDepartment);
    } catch (error) {
        console.error("Failed to update department:", error);
        throw error;
    }
};

export const deleteDepartment = async (id) => {
    try {
        await axios.delete(`http://localhost:8000/api/departments/${id}`);
    } catch (error) {
        console.error("Failed to delete department:", error);
        throw error;
    }
};
