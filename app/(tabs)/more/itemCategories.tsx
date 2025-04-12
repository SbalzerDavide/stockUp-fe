import { Stack } from "expo-router";
import { ScrollView} from "react-native";

import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { useItemCategories } from "@/features/shoppingList/api/shoppingList.mutations";
import { BaseCard } from "@/components/BaseCard";
import { Heading } from "@/components/ui/heading";

export default function ItemcategoriesScreen() {
  const { data: itemCategories, isLoading, error } = useItemCategories();
  return (
    <>
      <Stack.Screen options={{ title: "Item categories screen" }} />

      <ThemedView className="flex-col gap-4 h-full p-4">
        <ScrollView>
          <Heading className="text-2xl font-bold text-white mb-4">
            Categories
          </Heading>
          <ThemedView className="flex flex-col gap-2">
            {itemCategories &&
              Object.values(itemCategories).map(
                (categories) => (
                  <BaseCard
                    key={categories.id.toString()}
                    title={categories.name}
                    description={categories.description}
                  />
                )
              )}
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </>
  );
}
