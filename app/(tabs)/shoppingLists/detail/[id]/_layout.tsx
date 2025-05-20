import React from "react";
import { Stack } from "expo-router";

export default function ShoppingListsDetailLayoutScreen() {
  return (
    <>
      <Stack 
      screenOptions={{ headerTitle: 'shopping list items' }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Shopping list detail",
            // headerShown: false,
          }}
        />

        <Stack.Screen
          name="shoppingListItem/[id]/index"
          options={{
            title: "shoppingListItemDetail screen!",
            presentation: "modal",
          }}
        />
      </Stack>
    </>
  );
}
