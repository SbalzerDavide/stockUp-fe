import { Pressable, ScrollView } from "react-native";

import { ItemCard } from "@/features/shoppingList/components/ItemCard";
import { Text } from "@/components/ui/text";

import React, { useState, useEffect, useCallback } from "react";
import {
  useCreateItem,
  useItemCategories,
  useItems,
  useMacronutriments,
} from "@/features/shoppingList/api/shoppingList.mutations";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { debounce } from "lodash";
import { router, Stack } from "expo-router";
import { useTranslation } from "react-i18next";

import { ThemedView } from "@/components/ThemedView";
import { Input, InputField } from "@/components/ui/input";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useShowToast } from "@/hooks/useShowToast";
import { Filter, FilterOption } from "@/models/filter.model";
import FilterComponent from "@/components/Filter";

export default function ItemsScreen() {
  const color = useThemeColor({}, "text");

  const { t } = useTranslation();

  const [inputText, setInputText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  const { data: macronutriments } = useMacronutriments();
  const { data: itemCategories } = useItemCategories();

  const [filters, setFilters] = useState<Filter[]>([
    {
      id: "is_edible",
      name: t("common.is_edible.label"),
      options: [
        { id: true, name: t("common.is_edible.yes") },
        { id: false, name: t("common.is_edible.no") },
      ],
      value: null,
    },
    {
      id: "macronutriments",
      name: t("common.macronutriments"),
      options: [],
      value: null,
    },
    {
      id: "categories",
      name: t("common.categories"),
      options: [],
      value: null,
    },
  ]);

  useEffect(() => {
    setFilters((prevFilters) => {
      const updatedFilters = [...prevFilters];

      // Update macronutriments filter if data is available
      if (macronutriments && Array.isArray(macronutriments)) {
        const macroIndex = updatedFilters.findIndex(
          (f) => f.id === "macronutriments"
        );
        if (macroIndex !== -1) {
          updatedFilters[macroIndex] = {
            ...updatedFilters[macroIndex],
            options: macronutriments.map((item: any) => ({
              id: item.id,
              name: item.name,
            })),
          };
        }
      }

      // Update categories filter if data is available
      if (itemCategories && Array.isArray(itemCategories)) {
        const catIndex = updatedFilters.findIndex((f) => f.id === "categories");
        if (catIndex !== -1) {
          updatedFilters[catIndex] = {
            ...updatedFilters[catIndex],
            options: itemCategories.map((item: any) => ({
              id: item.id,
              name: item.name,
            })),
          };
        }
      }

      return updatedFilters;
    });
  }, [macronutriments, itemCategories]);

  const {
    data: items,
    isLoading,
    error,
  } = useItems({
    search: debouncedSearchText,
    is_edible: filters.find((el) => el.id === "is_edible")?.value as boolean,
    macronutriments:
      (filters.find((el) => el.id === "macronutriments")?.value as string) ||
      undefined,
    category:
      (filters.find((el) => el.id === "categories")?.value as string) ||
      undefined,
  });

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setDebouncedSearchText(text);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(inputText);

    return () => {
      debouncedSearch.cancel();
    };
  }, [inputText, debouncedSearch]);

  const { mutate: createItem, isPending, isSuccess } = useCreateItem();

  const showToast = useShowToast();

  const handleCreateItem = async () => {
    createItem(
      {
        name: debouncedSearchText,
      },
      {
        onSuccess: () => {
          showToast({
            titleKey: "toasts.success.title",
            descriptionKey: "toasts.success.itemCreated",
            action: "success",
          });
          setInputText("");
        },
        onError: () => {
          showToast({
            titleKey: "toasts.error.title",
            descriptionKey: "toasts.error.createFailed",
            action: "error",
          });
        },
      }
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerBackVisible: true,
          headerShadowVisible: false
        }}
      />
      <ThemedView className="flex-col gap-4 h-full p-4">
        <ScrollView>
          <ThemedView className="w-full flex flex-row justify-between py-4">
            <ScrollView horizontal={true}>
              <FilterComponent filters={filters} setFilters={setFilters} />
            </ScrollView>
          </ThemedView>
          <Box className="w-full p-4">
            <Input>
              <InputField
                style={{ color }}
                value={inputText}
                placeholder={t("common.labels.searchText")}
                onChangeText={(text) => setInputText(text)}
              />
            </Input>
          </Box>
          <Box className="w-full p-4">
            {debouncedSearchText != "" &&
              items &&
              items.results?.filter((el) => el.name === debouncedSearchText)
                .length === 0 && (
                <Pressable
                  className="bg-primary-400 rounded-lg p-2"
                  onPress={() => handleCreateItem()}
                >
                  <Text>Add New Item: {debouncedSearchText}</Text>
                </Pressable>
              )}
          </Box>

          <VStack className="gap-4 p-4" reversed={false}>
            <Text>ciaonneee nuovo items</Text>
            {items && items.results?.length > 0 ? (
              items?.results?.map((item) => (
                <ItemCard
                  onSelect={() => router.push(`/(tabs)/shoppingLists/items/detail/${item.id}`)}
                  id={item.id}
                  key={item.id}
                  title={item.name}
                  description={item.description}
                  macronutrients={item.macronutriments?.name || ""}
                  category={item.category?.name || ""}
                  department={item.department || ""}
                />
              ))
            ) : (
              <Text>No items found</Text>
            )}
          </VStack>
        </ScrollView>
      </ThemedView>
    </>
  );
}
