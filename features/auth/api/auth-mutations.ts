// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { fetchUser, loginRequest } from './auth-api-client';
// import { useStorageState } from '@/components/providers/useStorageState';
// import { useCallback } from 'react';
// import { router } from 'expo-router';

// // Definiamo il tipo per le props del login
// interface LoginProps {
//   email: string;
//   password: string;
// }

// // Hook per gestire il login e memorizzare il token
// export function useLogin() {
//   const queryClient = useQueryClient();
//   const [, setToken] = useStorageState("token");
//   const [, setSession] = useStorageState("session");
  
//   return useMutation({
//     mutationFn: (props: LoginProps) => 
//       loginRequest(props.email, props.password),
//     onSuccess: (data) => {
//       console.log("Login riuscito:", data);
      
//       // Salva i dati utente nel localStorage
//       if (typeof localStorage !== 'undefined') {
//         const userData = {
//           id: data.id,
//           email: data.email,
//           first_name: data.first_name,
//           last_name: data.last_name,
//         };
//         localStorage.setItem("user", JSON.stringify(userData));
//       }
      
//       // Invalida e aggiorna i dati utente
//       queryClient.invalidateQueries({ queryKey: ['user'] });
      
//       // Reindirizza all'esplorazione
//       router.push('/explore');
//     },
//     onError: (error) => {
//       console.error("Errore di login:", error);
//     },
//   });
// }

// // export function useUser(token: string | null, options = {}) {
// //   return useQuery({
// //     queryKey: ['user', token],
// //     queryFn: () => fetchUser(token || undefined),
// //     enabled: !!token, // Esegui la query solo se è presente un token
// //     ...options,
// //   });
// // }