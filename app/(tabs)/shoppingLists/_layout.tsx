import React from "react";
import { Stack } from "expo-router";

export default function ShoppingListsLayoutScreen() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
        />
        <Stack.Screen
          name="newShoppingList"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
