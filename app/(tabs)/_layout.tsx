import React from "react";
import { Tabs } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import * as Linking from "expo-linking";
import { Icon } from "@/components/ui/icon";

import {
  Home,
  User,
  ShoppingCart,
  EllipsisVertical,
  AlignEndVertical,
} from "lucide-react-native";

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

export default function TabsLayout() {
  const [colorMode, setColorMode] = React.useState<"dark" | "light">(
    defaultTheme
  );

  const toggleColorMode = async () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  const [activeTab, setActiveTab] = React.useState("Home");

  return (
    <>
      {/* top SafeAreaView */}
      <GluestackUIProvider mode={colorMode}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#e91e63",
            // headerStyle: { height: 50 }, // Adjust header height
            // headerTitleStyle: { color: colorMode === "light" ? "#000" : "#fff" }, // Ensure header text is visible
          }}
        >
          <Tabs.Screen
            name="shoppingLists"
            options={{
              headerShown: false,
              tabBarLabel: "Shopping Lists",
              tabBarIcon: ({ color }) => (
                <Icon as={ShoppingCart} size={"sm"} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="home"
            options={{
              headerTitle: "My homepage",
              tabBarIcon: ({ color }) => (
                <Icon as={Home} size={"sm"} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              headerTitle: "Explore screen",
              tabBarIcon: ({ color }) => (
                <Icon as={AlignEndVertical} size={"sm"} color={color} />
              ),
              // presentation: "modal",
            }}
          />

          <Tabs.Screen
            name="more"
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <Icon as={EllipsisVertical} size={"sm"} color={color} />
              ),
              // presentation: "modal",
            }}
          />
          <Tabs.Screen
            name="purchases"
            options={{
              href: null,
            }}
          />
        </Tabs>
      </GluestackUIProvider>
    </>
  );
}
