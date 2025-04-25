import { Link, router, Stack } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import React from "react";
import { useShoppingLists } from "@/features/shoppingList/api/shoppingList.mutations";
import { ThemedView } from "@/components/ThemedView";
import { Heading } from "@/components/ui/heading";
import { BaseCard } from "@/components/BaseCard";
import { Plus } from "lucide-react-native";
import { ShoppingListCard } from "@/features/shoppingList/components/ShoppingListCard";

export default function ShoppingListScreen() {
  const { data: shoppingLists, isLoading, error } = useShoppingLists();

  return (
    <>
      <Stack.Screen name="shoppingLists" options={{ title: "Oops!" }} />

      <Stack.Screen
        options={{
          headerTitle: "Shopping lists",
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/(tabs)/shoppingLists/NewShoppingList")}
              className="p-5 bg-primary-500"
            >
              <Plus />
            </Pressable>
          ),
        }}
      />

      <ThemedView className="flex-col gap-4 h-full p-4">
        <ScrollView>
          <Heading className="text-2xl font-bold text-white mb-4">
            Shopping lists
          </Heading>
          <ThemedView className="flex flex-col gap-2">
            {shoppingLists?.results &&
              Object.values(shoppingLists.results).map((shoppingList) => (
                <ShoppingListCard
                  onSelect={() => router.push(`/(tabs)/shoppingLists/detail/${shoppingList.id}`)}
                  key={shoppingList.id.toString()}
                  id={shoppingList.id.toString()}
                  title={shoppingList.name}
                  description={shoppingList.description}
                  created_at={shoppingList.created_at}
                  is_active={shoppingList.is_active}
                  is_purchased={shoppingList.is_purchased}
                />
              ))}
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </>
  );
}
