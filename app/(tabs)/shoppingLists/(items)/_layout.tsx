import React from "react";
import { Stack } from "expo-router";

export default function ItemsLayoutScreen() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Items screen",
          }}
        />
      </Stack>
      <Stack.Screen
        name="NewItem"
        options={{
          presentation: "modal",
        }}
      />
    </>
  );
}
