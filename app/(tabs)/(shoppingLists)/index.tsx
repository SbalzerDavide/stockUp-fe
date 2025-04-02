import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

import React from "react";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ headerTitle: "Oops!" }} />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>I'm the shopping lists screen yeaa</Text>
        <Link href="/(tabs)/(shoppingLists)/Items">Go to Items</Link>
      </View>
    </>
  );
}
