import axios from 'axios';

const API_URL = 'http://localhost:8000/api/societies';

export const createSociety = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSociety = async (id, formData) => {
  try {
    console.log(formData);
    const response = await axios.put(`${API_URL}/${id}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSocieties = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSociety = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
