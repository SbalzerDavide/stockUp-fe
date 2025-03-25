import { createContext, useContext, useState } from "react";
import { loginRequest } from "@/api/auth-api-client";

import { router } from "expo-router";
import { useStorageState } from "./useStorageState";

type LoginType = {
  email: string;
  password: string;
  remember_me?: boolean | undefined;
}

type User = {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
} | null


interface ProviderProps {
  user: User,
  token:  string | null,
  login (username: string, password: string): void,
  logout() :void,
}

const AuthContext = createContext<ProviderProps>({
  user: null,
  token: '',
  login: () => {},
  logout: () => {}
})


const AuthProvider = ({ children }: { children: React.ReactNode}) => {
  const storedInfo =  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null
  const [user, setUser ] = useState<User | null>(storedInfo?.email)


  const [[loading, token], setToken] = useStorageState('token');


  // const [ token, setToken ] = useState( storedInfo?.token || '')
  // const naigate = useNavigate()

  const login = async (username: string, password: string ) => {
    console.log('login')
    let response = await loginRequest(username, password)
    setToken(response.token)
    const user = {
      email: response.email,
      id: response.id,
      first_name: response.first_name,
      last_name: response.last_name
    } 
    setUser(user)
    
    setSession(response.token)
    // router.push('/home')


  }

  const logout = () => {
      setUser(null)
      setToken('')
      setSession(null)
      localStorage.removeItem('user')
  }

  const [[isLoading, session], setSession] = useStorageState('session');

  return (
      <AuthContext.Provider value={{ user, token, login, logout}}>
          { children }
      </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => {
  return useContext(AuthContext)
}