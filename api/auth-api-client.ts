import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

// Configurazione dell'istanza axios
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  // withCredentials: true, // ensures that Axios sends cookies with requests
});

// Interceptor per gestire i cookie dalle risposte
api.interceptors.response.use(
  async response => {
    const setCookieHeader =
      response.headers['set-cookie'] || response.headers['Set-Cookie'];
    if (setCookieHeader?.[0]) {
      console.log('Setting cookie:', setCookieHeader[0]);
      
      // await CookieManager.setFromResponse(config.baseURL, setCookieHeader[0]);
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

// Funzione per effettuare il login
export async function loginRequest(email: string, password: string) {
  const response = await api.post('/login', {
    email,
    password,
  });
  return response.data;
}

// Hook per utilizzare la mutation di login con TanStack Query
export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => 
      loginRequest(email, password),
  });
}

// Funzione per ottenere i dati dell'utente
export async function fetchUser() {
  
  const response = await api.get('/me', {
    headers: {
      'accept': 'text/html; q=1.0, */*',
      // 'Cookie': `jwt`,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      // ...(jwt ? { 'Authorization': `Bearer ${jwt}` } : {})
    },
  });
  
  return response.data;
}

// Hook per utilizzare la query di recupero utente con TanStack Query
export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });
}