import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchUser, loginRequest } from './auth-api-client';


export function useLogin(email: string, password: string) {
  return useMutation({
    mutationFn: () => 
      loginRequest(email, password),
    onSuccess: (data) => {
      console.log("Login riuscito:", data);

    },
    onError: (error) => {
      console.error("login error", error);
    },
  });
}

export function useUser(token: string | null, options = {}) {
  return useQuery({
    queryKey: ['user', token],
    queryFn: () => fetchUser(token || undefined),
    enabled: !!token, // Esegui la query solo se è presente un token
    ...options,
  });
}