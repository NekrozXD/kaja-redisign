import { ImageListItem } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchEmployees, fetchSocieties, fetchDepartments, fetchWorkhours } from './api.js';

export const createEmployeeAction = async (newEmployee) => {
    try {
        const response = await axios.post('http://localhost:8000/api/employees', newEmployee);
        toast.success('Employee created successfully');
        fetchEmployees();
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Failed to create employee:', error);
        throw error;
    }
};

export const updateEmployeeAction = async (id, editedEmployee) => {
    try {
        await axios.put(`http://localhost:8000/api/employees/${id}`, editedEmployee);
        toast.info('Employee updated successfully');
    } catch (error) {
        console.error('Failed to update employee:', error);
        throw error;
    }
};

export const deleteEmployeeAction = async (id) => {
    try {
        console.log('deleting employee: ',id)
        await axios.delete(`http://localhost:8000/api/employees/${id}`);
        
        toast.success('Employee deleted successfully');
    } catch (error) {
        console.error('Failed to delete employee:', error);
        throw error;
    }
};
