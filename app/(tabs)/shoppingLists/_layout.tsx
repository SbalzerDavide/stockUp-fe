import React from "react";
import { Stack } from "expo-router";

export default function ShoppingListsLayoutScreen() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
        />
        {/* <Stack.Screen name="Items" /> */}

        <Stack.Screen
          name="(items)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="newShoppingList"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="detail"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
