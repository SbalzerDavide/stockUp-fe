import { api } from '@/core/api-client';

export const getItems = async () => {
  try {
    console.log('Inizio richiesta getItems');
    
    // Recupera il cookie JWT dal localStorage
    const jwtCookie = localStorage.getItem('jwt');
    console.log('JWT Cookie trovato:', jwtCookie);
    
    const response = await api.get('/items', {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    
    return response.data;
  } catch (error) {
    console.error('Errore in getItems:', {
      error,
    });
    throw error;
  }
};
