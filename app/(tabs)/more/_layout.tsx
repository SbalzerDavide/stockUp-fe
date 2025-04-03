import { Button, Pressable, StyleSheet } from "react-native";

import React from "react";
import { useItems } from "@/features/items/api/shoppingList.mutations";
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
            headerRight: () => <Pressable
            onPress={() => router.push('/(tabs)/more/newshoppingList')}
            className="p-5 bg-primary-500"
          >
            <Plus />
          </Pressable>,
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
      <Stack.Screen
        name="itemCategories"
        options={{ title: "Categories" }}
      />
    </>
  );
}
