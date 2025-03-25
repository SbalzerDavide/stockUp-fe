import React, { useEffect } from "react";
import { Stack, router } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SafeAreaView } from "react-native";
import * as Linking from "expo-linking";
import AuthProvider, { useAuth }  from "@/components/providers/auth.provider";
import { useStorageState } from "@/components/providers/useStorageState";

let defaultTheme: "dark" | "light" = "light";

Linking.getInitialURL().then((url: any) => {
  let { queryParams } = Linking.parse(url) as any;
  defaultTheme = queryParams?.iframeMode ?? defaultTheme;
});

type ThemeContextType = {
  colorMode?: "dark" | "light";
  toggleColorMode?: () => void;
};
export const ThemeContext = React.createContext<ThemeContextType>({
  colorMode: "light",
  toggleColorMode: () => {},
});

export default function RootLayout() {
  const [colorMode, setColorMode] = React.useState<"dark" | "light">(
    defaultTheme
  );

  const toggleColorMode = async () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  // const { token } = useAuth(); 
  const [[loading, token], setToken] = useStorageState('token');
  

  useEffect(() => {
    console.log("effect inside layout");
    console.log("token", token);
    
    
    if (!token) {
      console.log("Token not found, redirecting to login...");
      router.push("/login");
    }
  }, [token]); // Esegui l'effetto quando il token cambia


  return (
    <>
      <AuthProvider>
        <SafeAreaView
          className={`${
            colorMode === "light" ? "bg-[#E5E5E5]" : "bg-[#262626]"
          }`}
        />
        <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
          <GluestackUIProvider mode={colorMode}>
            <SafeAreaView
              className={`${
                colorMode === "light" ? "bg-white" : "bg-[#171717]"
              } flex-1 overflow-hidden`}
            >
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen name="loginPage" />
                <Stack.Screen name="not-found" />
              </Stack>
            </SafeAreaView>
          </GluestackUIProvider>
        </ThemeContext.Provider>
      </AuthProvider>
    </>
  );
}
