import axios from 'axios';

export const fetchEmployees = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/employees');
        return response.data.employees;
    } catch (error) {
        if (error.response.status === 429) {
            console.error('Failed to fetch employees:', error);

            await new Promise((resolve) => setTimeout(resolve, 5000));
            return fetchEmployees();
        } else {
            console.error('Failed to fetch employees:', error);
            throw error;
        }
    }
};

export const fetchSocieties = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/societies');
        return response.data;
    } catch (error) {
        console.error('Error fetching societies:', error);
        throw error;
    }
};

export const fetchDepartments = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/departments');
        return response.data.departments;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};

export const fetchWorkhours = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/workhours');
        return response.data;
    } catch (error) {
        console.error('Error fetching work hours:', error);
        throw error;
    }
};
