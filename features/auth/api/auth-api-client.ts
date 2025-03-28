import { api } from '@/core/api-client';

// Funzione per effettuare il login
export async function loginRequest(email: string, password: string) {
  const response = await api.post('/login', {
    email,
    password,
  }, {
    withCredentials: true // Assicuriamoci che i cookie vengano inviati
  });
  
  
  return response.data;
}

// Funzione per ottenere i dati dell'utente
export async function fetchUser() {
  try {
    
    const response = await api.get('/me', {
      withCredentials: true, // Assicuriamoci che i cookie vengano inviati
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Errore durante il recupero dati utente:', error);
    throw error;
  }
}
