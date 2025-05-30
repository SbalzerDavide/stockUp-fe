import { Button, Pressable, StyleSheet } from "react-native";

import React from "react";
import { useItems } from "@/features/shoppingList/api/shoppingList.mutations";
import { Box } from "@/components/ui/box";

import { router, Stack } from "expo-router";
import { Icon, Plus } from "lucide-react-native";

export default function MoreListsScreen() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "More screen layout",
            headerRight: () => (
              <Box className="flex flex-row items-center p-2 gap-2">
                {/* TODO - go to add element */}
                <Pressable
                  onPress={() => router.push("/(tabs)/more/newshoppingList")}
                  className="bg-primary-500 rounded-lg h-10 w-10 flex items-center justify-center"
                >
                  <Plus />
                </Pressable>
              </Box>
            ),
          }}
        />
      </Stack>
      <Stack.Screen
        name="newshoppingList"
        options={{ title: "new shopping list...!" }}
      />
      <Stack.Screen
        name="macronutriments"
        options={{ title: "Macronutriments" }}
      />
      <Stack.Screen name="itemCategories" options={{ title: "Categories" }} />
    </>
  );
}
