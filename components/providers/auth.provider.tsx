import { createContext, useContext, useState, useEffect } from "react";
import {
  loginRequest,
  fetchUser,
  // setAuthToken,
} from "@/features/auth/api/auth-api-client";
import axios from "axios";

import { router } from "expo-router";
import { useStorageState } from "./useStorageState";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
} | null;

interface ProviderProps {
  user: User;
  token: string | null;
  login(username: string, password: string): void;
  logout(): void;
  isLoading: boolean;
  fetchUserData(): Promise<void>;
}

const AuthContext = createContext<ProviderProps>({
  user: null,
  token: "",
  login: () => {},
  logout: () => {},
  isLoading: false,
  fetchUserData: async () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storedInfo = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;
  const [user, setUser] = useState<User | null>(storedInfo?.email);
  const [isLoading, setIsLoading] = useState(false);

  const [[tokenLoading, token], setToken] = useStorageState("token");
  const [[sessionLoading, session], setSession] = useStorageState("session");

  // Inizializza il token nelle headers quando l'app si avvia
  useEffect(() => {
    if (token) {
      // setAuthToken(token);
      // Se abbiamo un token ma non abbiamo i dati utente, recuperali
      if (!user) {
        fetchUserData();
      }
    }
  }, [token]);

  // Funzione per recuperare i dati dell'utente
  const fetchUserData = async (): Promise<void> => {
    if (!token) return;

    setIsLoading(true);
    try {
      const userData = await fetchUser();
      if (userData) {
        setUser({
          id: userData.id,
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name,
        });
        // Salva i dati utente nel localStorage
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error: unknown) {
      console.error("Errore nel recupero dati utente:", error);
      // Se c'è un errore di autenticazione, fare logout
      if (
        (axios.isAxiosError(error) && (error.response?.status === 401 ||
        error.response?.status === 403)
      )
      ) {
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      let response = await loginRequest(username, password);
      setToken(response.token);    

      const user = {
        email: response.email,
        id: response.id,
        first_name: response.first_name,
        last_name: response.last_name,
      };
      setUser(user);

      // Salva i dati utente nel localStorage
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/home");
    } catch (error) {
      console.error("Errore durante il login:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    // setAuthToken(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isLoading,
        fetchUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
