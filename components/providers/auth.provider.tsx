import { createContext, useContext, useState, useEffect } from "react";
import {
  loginRequest,
  fetchUser,
} from "@/features/auth/api/auth-api-client";

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
  const [[tokenLoading, token], setToken] = useStorageState("jwt_token");
  // const [[sessionUser, user], setUser] = useStorageState("user");
  const [[storedInfoLoading, storedInfoString], setStoredInfo] = useStorageState("storedInfo");
  const storedInfo = storedInfoString
    ? JSON.parse(storedInfoString || "{}")
    : null;
  const [user, setUser] = useState<User | null>(storedInfo?.email);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

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
        setStoredInfo(JSON.stringify(userData));
        // localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error: unknown) {
      console.error("error in fetchUserData:", error);
      logout();
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

      setStoredInfo(JSON.stringify(user));

      router.push("/home");
    } catch (error) {
      console.error("Errore durante il login:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log("logout");
    setUser(null);
    setToken(null);
    setStoredInfo(null);
    // localStorage.removeItem("user");
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
