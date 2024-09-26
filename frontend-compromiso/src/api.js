import axios from 'axios';

// Obtén la URL base de la API desde las variables de entorno
const API_URL = import.meta.env.VITE_BACKEND_URL;

// Configura Axios con la URL base
const clienteAxios = axios.create({
  baseURL: API_URL,
});

// Función para obtener datos
export const fetchData = async (endpoint, token) => {
  try {
    const response = await clienteAxios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Función para enviar datos (POST)
export const postData = async (endpoint, data, token) => {
  try {
    const response = await clienteAxios.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Función para actualizar datos (PUT)
export const putData = async (endpoint, data, token) => {
  try {
    const response = await clienteAxios.put(endpoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

// Función para eliminar datos (DELETE)
export const deleteData = async (endpoint, token) => {
  try {
    const response = await clienteAxios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

export default clienteAxios;
