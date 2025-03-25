import axios from 'axios';

// Configurazione dell'istanza axios
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  // withCredentials: true, // ensures that Axios sends cookies with requests
});

// Interceptor per gestire i cookie dalle risposte
api.interceptors.response.use(
  async response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

// Funzione per impostare il token di autenticazione
export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

// Funzione per effettuare il login
export async function loginRequest(email: string, password: string) {
  const response = await api.post('/login', {
    email,
    password,
  });
  
  // Imposta il token per le future richieste
  if (response.data.token) {
    setAuthToken(response.data.token);
  }
  
  return response.data;
}

// Funzione per ottenere i dati dell'utente
export async function fetchUser(token?: string) {
  if (token) {
    setAuthToken(token);
  }
  
  try {
    const response = await api.get('/me', {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Errore durante il recupero dati utente:', error);
    throw error;
  }
}
