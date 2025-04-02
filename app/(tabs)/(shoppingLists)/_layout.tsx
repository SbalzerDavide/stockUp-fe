import { Button, Pressable, StyleSheet } from "react-native";

import React from "react";
import { useItems } from "@/features/items/api/items.mutations";
import { router, Stack } from "expo-router";
import { Icon, Plus } from "lucide-react-native";

export default function ShoppingListsScreen() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerRight: () => <Pressable
            onPress={() => router.push('/(tabs)/(shoppingLists)/NewItem')}
            className="p-5 bg-primary-500"
          >
            <Plus />
          </Pressable>,
          }}
        />
        <Stack.Screen
          name="Items"
        />

        <Stack.Screen
          name="NewItem"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    </>
  );
}
