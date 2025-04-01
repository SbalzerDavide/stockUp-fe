// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { login } from './auth-api-client';
// import * as SecureStore from 'expo-secure-store';

// export const AUTH_QUERY_KEY = ['auth'] as const;

// export function useLogin() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (credentials: { email: string; password: string }) => {
//       const response = await login(credentials);
      
//       // Salva il token nel SecureStore
//       if (response.token) {
//         await SecureStore.setItemAsync('jwt_token', response.token);
//       }
      
//       return response;
//     },
//     onSuccess: (data) => {
//       queryClient.setQueryData(AUTH_QUERY_KEY, data);
//     },
//   });
// }

// export function useLogout() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async () => {
//       // Rimuovi il token dal SecureStore
//       await SecureStore.deleteItemAsync('jwt_token');
//     },
//     onSuccess: () => {
//       queryClient.setQueryData(AUTH_QUERY_KEY, null);
//     },
//   });
// }