import { api } from '@/core/api-client';
import { createItemRequest, Item, ItemsQueryParams } from '@/models/items.model';

export const getItems = async (params: ItemsQueryParams): Promise<{
  count: number,
  next: string | null,
  previous: string | null,
  results: Item[]}> => {  
  try {    
    const response = await api.get('/items/', { params });    
    return response.data;
  } catch (error) {
    console.error('Errore in getItems:', {
      error,
    });
    throw error;
  }
};

export const createItem = async (item: createItemRequest): Promise<Item> => {
  try {
    const response = await api.post('/items/', item);
    return response.data;
  } catch (error) {
    console.error('Errore in createItem:', {
      error,
    });
    throw error;
  }
};


