import { api } from '@/core/api-client';

export const getItems = async () => {  
  try {    
    const response = await api.get('/items/');    
    return response.data;
  } catch (error) {
    console.error('Errore in getItems:', {
      error,
    });
    throw error;
  }
};
