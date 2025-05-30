import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SafeAreaView } from "react-native";
import * as Linking from "expo-linking";
import AuthProvider, { useAuth }  from "@/components/providers/auth.provider";
import '@/i18n/config'; // Importa la configurazione i18n

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

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

function RootLayoutNav() {
  const [colorMode, setColorMode] = useState<"dark" | "light">(defaultTheme);
  const { token } = useAuth();

  const toggleColorMode = async () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token]);

  return (
    <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
      <GluestackUIProvider mode={colorMode}>
        <SafeAreaView
          className={`${
            colorMode === "light" ? "bg-white" : "bg-[#171717]"
          } flex-1 overflow-hidden`}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            {/* <Stack.Screen name="not-found" options={{ headerShown: false }} /> */}
          </Stack>
        </SafeAreaView>
      </GluestackUIProvider>
    </ThemeContext.Provider>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </QueryClientProvider>
  );
}
