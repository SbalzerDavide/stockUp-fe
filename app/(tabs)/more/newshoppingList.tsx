import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

import React from "react";

export default function NewShoppingListScreen() {
  return (
    <>
      <Stack.Screen
        options={{ title: "new shopping lis!" }}
      />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>New shopping list screen</Text>
      </View>
    </>
  );
}
