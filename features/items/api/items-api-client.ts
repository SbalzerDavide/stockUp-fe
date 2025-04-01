import { api } from '@/core/api-client';
import { Item } from '@/models/items.model';

export const getItems = async (): Promise<Item[]> => {  
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
