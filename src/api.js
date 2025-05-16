import axios from 'axios';

// La URL de la API se toma de variables de entorno durante la construcción
const API_URL = process.env.API_URL;

export const getClients = async () => {
  try {
    const response = await axios.get(`${API_URL}/clients`);
    return response.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

export const getClientById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching client with id ${id}:`, error);
    throw error;
  }
};
