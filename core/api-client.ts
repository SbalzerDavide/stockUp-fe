import axios from "axios";

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  // baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Importante per i cookie CORS
});

// Interceptor per gestire gli errori
api.interceptors.response.use(
  (response) => {
    // Log dei cookie nella risposta
    console.log('Cookie nella risposta:', {
      'set-cookie': response.headers['set-cookie'],
      'cookies': response.headers.cookie,
      'jwt': response.headers['jwt'],
      'all-headers': response.headers,
      'response-url': response.config.url,
      'response-base-url': response.config.baseURL,
      'response-with-credentials': response.config.withCredentials
    });
    return response;
  },
  (error) => {
    console.error('Errore API:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      cookies: error.response?.headers?.cookie,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        data: error.config?.data,
        withCredentials: error.config?.withCredentials,
        baseURL: error.config?.baseURL
      }
    });
    return Promise.reject(error);
  }
);

// Interceptor per loggare le richieste
api.interceptors.request.use(
  (config) => {
    // Assicuriamoci che withCredentials sia sempre true
    config.withCredentials = true;
    
    // Log dei cookie nella richiesta
    console.log('Richiesta API:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      headers: config.headers,
      data: config.data,
      cookies: config.headers?.Cookie,
      withCredentials: config.withCredentials,
      allHeaders: config.headers,
      requestConfig: config
    });
    return config;
  },
  (error) => {
    console.error('Errore nella richiesta:', error);
    return Promise.reject(error);
  }
);
