import { Link, router, Stack } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import React, { useEffect, useState } from "react";

import { Box } from "@/components/ui/box";

import { useShoppingLists } from "@/features/shoppingList/api/shoppingList.mutations";
import { ThemedView } from "@/components/ThemedView";
import { Heading } from "@/components/ui/heading";
import { BaseCard } from "@/components/BaseCard";
import { Plus } from "lucide-react-native";
import { ShoppingListCard } from "@/features/shoppingList/components/ShoppingListCard";
import FilterComponent from "@/components/Filter";
import { Filter } from "@/models/filter.model";
import { useTranslation } from "react-i18next";

export default function ShoppingListScreen() {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<Filter[]>([
    {
      id: "is_active",
      name: t("common.is_active.label"),
      options: [
        { id: true, name: t("common.is_active.yes") },
        { id: false, name: t("common.is_active.no") },
      ],
      value: true,
    },
  ]);

  const {
    data: shoppingLists,
    isLoading,
    error,
  } = useShoppingLists({
    is_active: filters.find((el) => el.id === "is_active")?.value as boolean,
  });
  useEffect(() => {
    setFilters((prevFilters) => {
      const updatedFilters = [...prevFilters];

      return updatedFilters;
    });
  }, []);

  return (
    <>
      <Stack.Screen name="shoppingLists" options={{ title: "Oops!" }} />

      <Stack.Screen
        options={{
          headerTitle: "Shopping lists",
          headerRight: () => (
            <Box className="flex flex-row items-center p-2 gap-2">
              {/* TODO - go to add element */}
              <Pressable
                onPress={() =>
                  router.push("/(tabs)/shoppingLists/newShoppingList")
                }
                className="bg-primary-500 rounded-lg h-10 w-10 flex items-center justify-center"
              >
                <Plus />
              </Pressable>
            </Box>
          ),
        }}
      />

      <ThemedView className="flex-col gap-4 h-full p-4">
        <ScrollView>
          <Heading className="text-2xl font-bold text-white mb-4">
            Shopping lists
          </Heading>
          <ThemedView className="w-full flex flex-row justify-between py-4">
            <ScrollView horizontal={true}>
              <FilterComponent filters={filters} setFilters={setFilters} />
            </ScrollView>
          </ThemedView>
          <ThemedView className="flex flex-col gap-2">
            {shoppingLists?.results &&
              Object.values(shoppingLists.results).map((shoppingList) => (
                <ShoppingListCard
                  onSelect={() =>
                    router.push(
                      `/(tabs)/shoppingLists/detail/${shoppingList.id}`
                    )
                  }
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
