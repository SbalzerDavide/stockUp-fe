import { Link, Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import React from "react";
import { useShoppingLists } from "@/features/shoppingList/api/shoppingList.mutations";
import { ThemedView } from "@/components/ThemedView";
import { Heading } from "@/components/ui/heading";
import { BaseCard } from "@/components/BaseCard";

export default function Index() {
  const { data: shoppingLists, isLoading, error } = useShoppingLists();
  console.log(shoppingLists);

  return (
    <>
      <Stack.Screen
        name="shoppingLists"
        options={{ title: "Oops!" }}
      />

<Stack.Screen options={{ title: "Macronutriments screen" }} />

<ThemedView className="flex-col gap-4 h-full p-4">
  <ScrollView>
    <Heading className="text-2xl font-bold text-white mb-4">
      Shopping lists
    </Heading>
    <ThemedView className="flex flex-col gap-2">
      {shoppingLists?.results &&
        Object.values(shoppingLists.results).map(
          (shoppingList) => (
            <BaseCard
              key={shoppingList.id.toString()}
              title={shoppingList.name}
              description={shoppingList.description}
            />
          )
        )}
    </ThemedView>
  </ScrollView>
</ThemedView>
</>
  );
}
